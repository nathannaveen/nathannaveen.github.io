---
title: "Optimizing eBPF Policies for Speed and Space (Not AI Gen)"
date: 2026-09-01T08:30:00-05:00
toc: false
images:
tags: [eBPF]
---

When writing our eBPF code, my brother and I wanted our policies to be extremely fast and space efficient, and we also wanted processes to inherit policies (while still being fast and space efficient). This blog post explains what we did to make our eBPF code fast.

This blog post is kind of long and dense, so to not keep you (the reader) on a weird cliffhanger, the short answer is “bitmasks”! I’m also pretty sure that my writing “bitmasks” just made the cliffhanger worse ;)

Also, our code is open source, so you can find everything we talk about in this blog post at https://github.com/bomfather/agent.

# An Explanation of the Problem We Are Trying To Solve

I think the easiest way to understand this problem is with an example:

Imagine we are trying to send a couple of files (`test1` and `file1`) to a couple of servers, `1.1.1.1` and `1.1.1.2`. We also have two executables, `sendTestData.sh` and `sendFileData.sh`, both of which utilize `curl` to send the data up.

![test1 flows through sendTestData.sh into curl to 1.1.1.1, and file1 flows through sendFileData.sh into curl to 1.1.1.2](/img/BMBlogNoPolicy.jpeg)

If the files and the server are protected resources, the policy would have to state that `sendTestData.sh` can access `test1`, and `sendFileData.sh` can access `file1`. And since `curl` has to read the contents of the files and send them to specific IPs, it can access `test1`, `file1`, and the IPs.

![curl's policy includes 1.1.1.1, test1, 1.1.1.2, and file1 because both scripts call it](/img/BMBlogBasicPolicy.jpeg)

But now we have a problem: if `curl` has access to `test1` and `file1` and access to the server's IPs, a malicious process could call `curl` with a file of its choosing and send it up.

# An Overview of What the Inheritance Should Do

So how do we prevent curl from accessing the files by default, but still allow it to read them so it can send them to their respective IPs?

Drum roll, please… Policy inheritance!

So, the policies for `sendTestData.sh` and `sendFileData.sh` would have access to their respective files and IPs. curl wouldn’t have permission to access the files or the IPs. Then, when `sendTestData.sh` or `sendFileData.sh` calls the child process, curl gains access to the parent's policy.  

In our example, the policy would look like this: `sendTestData.sh` has access to `test1` and `1.1.1.1`, `sendFileData.sh` has access to `file1` and `1.1.1.2`, and `curl` has no access. Then, if we wanted to send `file1` up to the server, we would call `sendFileData.sh`, and it would call its child process, `curl`. But during this run, the policy for `curl` would change because it inherits `sendFileData.sh`’s policy. So, `curl` would now have access to `1.1.1.2` and `file1`, so that it can read `file1` and send the data to the server.

![curl inherits the parent policy, so the child policy includes 1.1.1.2 and file1](/img/BMBlogInheritance.jpeg)

This idea has a nice side effect: since we don’t need to write policies for all child executables, the policy file is much smaller and easier to manage.

Additionally, note that we don’t want to replace a child's policy with the parent's policy; instead, we want to merge them. I know that this example isn’t the best to represent merging two policies, but bear with me…

# Now, how can we Make This Work?

So, this is cool… But how can we do the inheritance without taking up a crazy amount of time? Generally, merging policies takes time because we have to combine two maps. And that is where bitmasks come into the picture!

## How We Store Our Bitmasks

To explain how the bitmasks work, I think it is easier to start by understanding how we pass them around.

``` c
struct bitmask_array {
    u32 words[BITMASK_WORDS];
};

struct access_control {
    struct bitmask_array read;
    struct bitmask_array write;
    struct bitmask_array execute;
    u32 gpu;
    struct bitmask_array ip_egress;
    struct bitmask_array ip_exclusive_owner;
    u32 output_openats;
};
``` 

`access_control` is a struct with multiple bitmasks based on the type of access. So, for an executable, the resources it can read are stored in the read bitmask, the resources it can write to are stored in the write bitmask, etc.

We use the struct `bitmask_array` as our bitmasks instead of just a u32 because `bitmask_array` is multiple u32s put together, so we can store 32 ids, 64 ids, 96 ids, etc.

## How the Bitmasks work

Each directory/resource in the policy gets an ID, and then that ID is stored in a bit in the bitmask. 

For example, we have a policy that says, “this executable can read and write to `/data`, and it can write to `/tmp/out`.” Once we have this policy, the userspace code can assign IDs to these two directories; in this example, `/data` can have ID 3, and `/tmp/out` can have ID 5.

So, we set bit 3 in the read and write bitmasks so we know that the executable can read and write to `/data`. We can also set bit 5 in the write bitmask so we know we can write to `/tmp/out`.

```
read  = [0, 0, 1, 0, 0, 0, 0, 0, ...]
         1  2  3  4  5  6  7  8

write = [0, 0, 1, 0, 1, 0, 0, 0, ...]
         1  2  3  4  5  6  7  8
```

Then, once we have created the bitmasks in userspace, we can load them in the kernel. 

Next, when a process has a policy, the eBPF code copies the `access_control` into the process’s task local storage. Since `access_control` is attached to the task local storage, the process always has its permission with it, so we don’t need any map lookups to get its policy.

Once we have the policy, checking whether an action is allowed isn’t too complicated; if the resource is protected, we just have to check whether the bit for the resource the executable is trying to access is set:

```
allowed = (mask.words[id / 32] & (1u << (id % 32))) != 0;
```

## The Inheritance With Bitmasks

And we have finally gotten to the part that required all of this buildup! How do we do policy inheritance with bitmasks so that it’s very time and space efficient?

Well, with bitmasks, it is actually pretty simple. We just have to bitwise OR the parent bitmasks and the child bitmasks.

```
Parent:
read  = [0, 1, 0, 0, 0, 0, 0, 0, ...]
         1  2  3  4  5  6  7  8
Child:
read  = [0, 0, 0, 0, 1, 1, 0, 0, ...]
         1  2  3  4  5  6  7  8

Bitwise OR them both together:
read  = [0, 1, 0, 0, 1, 1, 0, 0, ...]
         1  2  3  4  5  6  7  8
```

Since policy inheritance is a set union problem, and the fastest way to do a set union is with a bitwise OR. So, this is literally the fastest way to do policy inheritance.

## Even Without Inheritance, It's Better to Use Bitmasks

Even if we don’t care about policy inheritance, I think that using bitmasks is probably the best way to store policies in eBPF.

The next best option is to assign each directory an ID in userspace, then have an array of IDs for each process in the kernel. But I feel that this is just worse than using bitmasks. Each ID stored would be a u32, so each would be 4 bytes. So, if we wanted to store 20 IDs for a process, it would be around 80 bytes. Using bitmasks is almost always more space efficient because 4 bytes allow 32 IDs, 8 bytes allow 64 IDs, etc. 

Additionally, bitmasks are faster than this option because we can check whether a specific ID is allowed. With an array, we would have to loop through it to check whether the ID is in the allow list. 

I know that someone out there reading this blog post is thinking, “Why not just use a map with IDs instead of an array so that we have O(1) lookups?” Well, the issue is that adding an element to a map isn’t 4 bytes for the u32 because the kernel needs to store the key, value, and pointers, so we are just adding more space. 

Additionally, I know there are a couple of other ways to store policies, and most of them have their own benefits, but I personally feel that using bitmasks is a good middle ground for storing policies in a fast and space efficient manner. 

# Final Thoughts

I spent most of my time and energy writing the meat of this blog post, so I don’t really have a proper conclusion to this write up, but I guess I can say that I thought bitmasks for policy inheritance were really cool, so I decided to write this blog post! Anyway… Thanks for reading!


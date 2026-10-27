---
title: "The Relationship Between Threads and Processes"
date: 2026-10-27T08:30:00-05:00
toc: false
images:
tags: [eBPF]
---


When I started writing eBPF, I didn’t really understand how processes, threads, and thread groups were related. During that time, most of the eBPF code I wrote didn’t make much sense. But after learning how processes and threads relate, everything started clicking. 

So, when you start a program, Linux creates a task and gives it an ID, for example, ID 1234. That task is the main thread, and its thread ID matches the task ID, so the thread ID (`tid`) is 1234. And because it is the only thread created so far, the process ID (`pid`) is also 1234. And the thread group ID (`tgid`) is also going to be 1234 because the thread group is just a different name for the process.

![A process with pid 1234 and tgid 1234 contains one main thread, also id 1234, which points to shared memory.](/img/blog/The-Relationship-Between-Threads-And-Processes/mainThread.jpeg)
{width="400"}

Then afterward, your userspace code (in this example, Golang) asks the kernel for more threads to do garbage collection and network polling while your code is running. Each thread gets its own ID, like 1235, 1236, etc. These tasks share the original task's memory and process ID. Linux calls this group of threads a thread group.

![The same process, pid 1234 and tgid 1234, now has a main thread 1234, a GC thread 1235, and a netpoll thread 1236, and all three point at the same memory.](/img/blog/The-Relationship-Between-Threads-And-Processes/multipleThreads.jpeg)
{width="400"}

This was an absolutely tiny write up, but I think it's a pretty important concept to understand if you are interested in writing/understanding eBPF code.


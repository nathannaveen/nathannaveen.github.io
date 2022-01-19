---
title: "Leetcode 2095"
date: 2022-01-19T13:01:36-06:00
toc: false
images:
tags: [leetcode, golang, images, linked list]
---

[2095. Delete the Middle Node of a Linked List](https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/)

The idea of this solution is to use three-pointers, like in the following example:

Remember that the `hare` will always go up two values, while `prev` and `turtle` will only go up one.

![](https://i.imgur.com/GCh5KZK.png)

The hare has reached the end, so we can stop moving the `hare`, `turtle`, and `prev`. Now, we have to remove the turtles position by doing `prev.Next = prev.Next.Next`.

We can do the same thing for input with even length.

![](https://i.imgur.com/d8is3KJ.png)


``` go
func deleteMiddle(head *ListNode) *ListNode {
    if head.Next == nil { return nil }
    
    turtle, hare, prev := head, head, &ListNode{ -1, head }
    
    for hare != nil && hare.Next != nil {
        hare = hare.Next.Next
        turtle = turtle.Next
        prev = prev.Next
    }
    
    prev.Next = prev.Next.Next
    
    return head
}
```

**The Solution Can Be Simplified:**

Then we can remove the whole turtle pointer because it is not used in removing the middle node, so we can do:

![](https://i.imgur.com/BFAoFjG.png)

``` go
func deleteMiddle(head *ListNode) *ListNode {
    if head.Next == nil { return nil }
    
    hare, prev := head, &ListNode{ -1, head }
    
    for hare != nil && hare.Next != nil {
        hare = hare.Next.Next
        prev = prev.Next
    }
    
    prev.Next = prev.Next.Next
    
    return head
}
```
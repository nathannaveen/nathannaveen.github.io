---
title: "Leetcode 1721"
date: 2021-03-14T15:57:58-04:00
toc: false
images:
tags: [linked list, golang, leetcode]
---

[1721. Swapping Nodes in a Linked List](https://leetcode.com/problems/swapping-nodes-in-a-linked-list/)

The idea of this solution is pretty simple.

* First, we find the length of the linked list
* Next, we iterate through the linked list up until the ending `kth` node
* And then we iterate through the linked list to to `kth` node
* Then, last of all, switch the value of the `kth` node with the value of the `kth` node from the end.

Finding the length of the linked list is pretty simple. Just get a counter. In this problem, it is `lengthOfLinkedList`, then iterate through the linked list and add one to the counter every iteration.

We get the `kth` node from the end by iterating a counter `i` through `0` to `lengthOfLinkedList - k`, `lengthOfLinkedList - k` gets the length of the linked list and then subtracts `k` from it, so we get the ending `kth` node.

We get the `kth` node by just iterating through `0` to `k - 1`. We do `k - 1` because we do `first = first.Next` which makes it the next value.

Then we switch the two values by just assigning them to each other if you don't understand `second.Val, first.Val = first.Val, second.Val` it is basically:

```
temp := second.Val

second.Val = first.Val
first.Val = temp
```

**The code:**

``` go
func swapNodes(head *ListNode, k int) *ListNode {
    first := head
    second := head
    findLength := head
    lengthOfLinkedList := 0

    for findLength != nil {
        lengthOfLinkedList++
        findLength = findLength.Next
    }

    for i := 0; i < lengthOfLinkedList-k; i++ {
        second = second.Next
    }

    for i := 0; i < k-1; i++ {
        first = first.Next
    }

    second.Val, first.Val = first.Val, second.Val
    return head
}
```
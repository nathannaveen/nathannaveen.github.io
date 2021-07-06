---
title: "Leetcode 61"
date: 2021-07-06T18:25:10-05:00
toc: false
images:
tags: [leetcode, golang, linked list]
---

[61. Rotate List](https://leetcode.com/problems/rotate-list/)

The idea of this solution is pretty simple, and I will explain it using this image below:

![](https://i.imgur.com/vbdeDXI.png)

*Note: Before we get into what this picture represents, I want you to know that we already know the length of the linked list because the first loop in the code is for finding the length.*

* The image above is from the problem description and is showing the input and output as:

`Input: head = [1,2,3,4,5], k = 2`
`Output: [4,5,1,2,3]`

* The red part I have drawn over it signifies the `k` rotations. We are not going to call this the `k` rotations. Instead, we are going to call it `k % length` rotations. We do this because if we have a huge input of `k`, such as `k = 2000000000`, we don't want to keep rotating that many times, and since we keep on rotating through the same list, we can do `k % length`.
* The green part I have drawn is what we are using in this solution. It is `length - (k % length)`. I think it is pretty self-explanatory.

In this solution, we take the green part, add it to the end of the linked list and return the new `cur` (Not the `head` node).

If you don't understand, look at the following image, it should help clear things up:

![](https://i.imgur.com/XOcTlVe.jpg)

**The Code:**

``` go
func rotateRight(head *ListNode, k int) *ListNode {
    length := 0
    end := head
    cur := head
    
    for end != nil && end.Next != nil {
        length++
        end = end.Next
    }
    
    length++
    
    for i := 0; i < length - (k % length); i++ {
        if end != nil {
            end.Next = &ListNode{ Val: cur.Val, }
            end = end.Next
            cur = cur.Next
        }
    }
    
    return cur
}
```

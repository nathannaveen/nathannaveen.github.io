---
title: "Leetcode 1669"
date: 2021-07-06T18:24:53-05:00
toc: false
images:
tags: [golang, images, linked list, leetcode]
---

[1669. Merge In Between Linked Lists](https://leetcode.com/problems/merge-in-between-linked-lists/)

The idea of this solution can be explained with a simple image:

![](https://i.imgur.com/vfhZz0X.jpg)

* In image 1 we can see the input of `list1 = [0, 1, 2, 3, 4, 5]`, `list2 = [10, 11, 12]`, `a = 3`, and `b = 4`.
* We can iterate through `list2` and store the beginning and end of the list.
* Then, we can iterate through `list1` and find the pos of `a - 1`.
* Then, we can iterate through `list1` and find the pos of `b + 1`.
* Then, the position of `a - 1`'s next pointer should be the beginning of `list2`, and the end of `list2` should be pointing to the position of `b + 1` in `list1`.

``` go
func mergeInBetween(list1 *ListNode, a int, b int, list2 *ListNode) *ListNode {
    counter := 0
    cur := list1
    start := list1
    end := list2
    
    for end.Next != nil {
        end = end.Next
    }
    
    for cur != nil {
        if counter == a - 1 {
            start = cur
        } else if counter == b + 1 {
            start.Next = list2
            end.Next = cur
            break
        }
        counter++
        cur = cur.Next
    }
    
    return list1
}
```
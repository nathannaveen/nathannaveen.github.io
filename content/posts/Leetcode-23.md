---
title: "Leetcode 23"
date: 2022-02-07T10:21:53-06:00
toc: false
images:
tags: [leetcode, golang, images, linked list]
---

[23. Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)

I think that the idea of this solution can be shown bellow:

![](https://i.imgur.com/NEf5Pv9.gif)



``` go
func mergeKLists(lists []*ListNode) *ListNode {
    res := &ListNode{}
    cur := res
    done := false
    
    for !done {
        done = true
        min := 10000
        
        for _, list := range lists {
            if list != nil && list.Val < min {
                min = list.Val
                done = false
            }
        }
        
        for i := range lists {
            if lists[i] != nil && lists[i].Val == min {
                cur.Next = &ListNode{ Val: min }
                cur = cur.Next
                lists[i] = lists[i].Next
            }
        }
    }
    
    return res.Next
}
```
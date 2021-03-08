---
title: "Leetcode 915"
date: 2021-03-08T08:20:50-05:00
toc: false
images:
tags: [golang, leetcode, images, array]
---

The idea of this solution is to find the max of the left and then check whether the max is always smaller than all the rights. If it is smaller than all of them return the index **(1 indexed)**.

This can be shown with a picture:

![](https://i.imgur.com/ZzXwU7p.jpg)


``` go
func partitionDisjoint(A []int) int {
    max := A[0]

    for i := 0; i < len(A); i++ {
        shouldReturn := true

        if max < A[i] {
            max = A[i]
        }
        for j := i + 1; j < len(A); j++ {
            if A[j] < max {
                shouldReturn = false
                break
            }
        }
        if shouldReturn {
            return i + 1
        }
    }

    return -1
}
```
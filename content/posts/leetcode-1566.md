---
title: "Leetcode 1566"
date: 2021-02-25T15:46:57-05:00
toc: false
images:
tags: [leetcode, golang, array, images]
---

[1566. Detect Pattern of Length M Repeated K or More Times](https://leetcode.com/problems/detect-pattern-of-length-m-repeated-k-or-more-times/)
The idea of this can be show by this image

![](https://i.imgur.com/XEPQ2YV.jpg)


```
func containsPattern(arr []int, m int, k int) bool {
    counter := 0

    for i := 0; i < len(arr) - m; i++ {
        if arr[i] != arr[i+m] {
            counter = 0
        } else {
            counter++
        }

        if counter == (k-1)*m {
            return true
        }
    }

    return false
}
```


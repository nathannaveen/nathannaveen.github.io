---
title: "Leetcode 888"
date: 2021-08-17T12:30:29-05:00
toc: false
images:
tags: [images, golang, leetcode, math]
---

[888. Fair Candy Swap](https://leetcode.com/problems/fair-candy-swap/)

The idea of this solution can be shown using the following image:

![](https://i.imgur.com/xhn1h9B.png)

**The Code:**

``` go
func fairCandySwap(A []int, B []int) []int {
    alice, bob := 0, 0
    m := make(map[int] int)
    
    for _, i := range A { alice += i }
    for _, i := range B { 
        bob += i 
        m[i]++
    }
    
    temp := (alice - bob) / 2
    
    for _, i := range A {
        if m[i - temp] >= 1 {
            return []int{i, i - temp}
        }
    }
    
    return []int{}
}
```
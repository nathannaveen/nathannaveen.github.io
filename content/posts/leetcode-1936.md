---
title: "Leetcode 1936"
date: 2021-08-17T12:31:28-05:00
toc: false
images:
tags: [golang, leetcode, math]
---

[1936. Add Minimum Number of Rungs](https://leetcode.com/problems/add-minimum-number-of-rungs/)

``` go
func addRungs(rungs []int, dist int) int {
    prev := 0
    res := 0
    
    for i := 0; i < len(rungs); i++ {
        rung := rungs[i]
        res += (rung - prev - 1) / dist
        prev = rung
    }
    return res
}
```

The idea of both of these solution are pretty much the same except for this solution we pre-pend `0` to the rungs instead of having `prev`.

``` go
func addRungs(rungs []int, dist int) int {
    res := 0
    rungs = append(rungs[:0], append([]int{0}, rungs[0:]...)...)
    
    for i := 1; i < len(rungs); i++ {
        res += (rungs[i] - rungs[i - 1] - 1) / dist
    }
    return res
}
```

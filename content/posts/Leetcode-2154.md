---
title: "Leetcode 2154"
date: 2022-02-04T12:12:34-06:00
toc: false
images:
tags: [leetcode, golang]
---

[2154. Keep Multiplying Found Values by Two](https://leetcode.com/problems/keep-multiplying-found-values-by-two/)

The idea of both of these solutions is to add `nums` elements to a map, and then just keep checking whether `original *= 2` is in the map.

Instead of `original *= 2` I am doing `original <<= 1` for better time.

***

In the first solution I am only adding elements that are multiples of `original` to the map.

``` go
func findFinalValue(nums []int, original int) int {
    m := make(map[int] bool)
    
    for _, n := range nums {
        if n % original == 0 {
            m[n] = true
        }
    }
    
    for m[original] {
        original <<= 1
    }
    
    return original
}
```

***

In the second solution I am adding all elements from `nums` to the map. Note that this solution has a little worse average space complexity. In the worst case they will both have the same complexity.

``` go
func findFinalValue(nums []int, original int) int {
    m := make(map[int] bool)
    
    for _, n := range nums {
        m[n] = true
    }
    
    for m[original] {
        original <<= 1
    }
    
    return original
}
```
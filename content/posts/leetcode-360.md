---
title: "Leetcode 360"
date: 2021-03-23T12:20:59-04:00
toc: false
images:
tags: [leetcode, golang, array, sort, math]
---

[360. Sort Transformed Array](https://leetcode.com/problems/sort-transformed-array/)

The idea of this solution is to loop through `nums` and do the quadratic equation `f(x) = ax^2 + bx + c` where `x = nums[i]` and then make `nums[i]` the result of the `ax^2 + bx + c`. After that we can sort and return `nums`.

**Solution Using Manual Sort**

``` go
func sortTransformedArray(nums []int, a int, b int, c int) []int {
    for i := 0; i < len(nums); i++ {
        nums[i] = a*nums[i]*nums[i] + b*nums[i] + c
    }

    for i := 1; i < len(nums); i++ {
        if i >= 1 && nums[i] < nums[i-1] {
            nums[i], nums[i-1] = nums[i-1], nums[i]
            i -= 2
        }
    }

    return nums
}
```

**The Same Solution But Using a Built In Sort:**

``` go
func sortTransformedArray(nums []int, a int, b int, c int) []int {
    for i := 0; i < len(nums); i++ {
        nums[i] = a*nums[i]*nums[i] + b*nums[i] + c
    }

    sort.Ints(nums)
    
    return nums
}
```
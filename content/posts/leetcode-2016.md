---
title: "Leetcode 2016"
date: 2021-10-28T15:58:50-05:00
toc: false
images:
tags: [leetcode, golang, array, math]
---

[2016. Maximum Difference Between Increasing Elements](https://https://leetcode.com/problems/maximum-difference-between-increasing-elements/)

The idea of this solution is we loop through `nums`, and if a number is greater than `min` we can check whether to make it `max`, otherwise if the number is smaller than `min` we can re-make `min`.

``` go
func maximumDifference(nums []int) int {
    min := nums[0]
    max := -1
    
    for i := 0; i < len(nums); i++ {
        if nums[i] > min && nums[i] - min > max {
            max = nums[i] - min
        } else if nums[i] < min {
            min = nums[i]
        }
    }
    
    return max
}
```
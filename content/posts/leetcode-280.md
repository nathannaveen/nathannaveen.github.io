---
title: "Leetcode 280"
date: 2021-07-06T18:24:43-05:00
toc: false
images:
tags: [leetcode, golang, array]
---

[280. Wiggle Sort](https://leetcode.com/problems/wiggle-sort/)

The idea of this solution is pretty simple. We sort `nums` and then keep switching the numbers, so we get the array wiggled.

``` go
func wiggleSort(nums []int)  {
    sort.Ints(nums)
    for i := 1; i < len(nums) - 1; i += 2 {
        nums[i], nums[i + 1] = nums[i + 1], nums[i]
    }
}
```
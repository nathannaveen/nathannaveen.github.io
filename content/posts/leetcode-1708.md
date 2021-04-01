---
title: "Leetcode 1708"
date: 2021-04-01T11:53:48-05:00
toc: false
images:
tags: [leetcode, golang, array]
---

[1708. Largest Subarray Length K](https://leetcode.com/problems/largest-subarray-length-k/)

The idea of this solution is pretty simple we get every subarray so length `k`. We get the max subarray, compare it with the current subarray, and then check which array is greater, the current subarray, or the maximum subarray.

We compare subarrays by looping through the length of the subarrays (They are both have the same size). Every time we iterate, we check whether the index of the current subarray is greater than the index of the max subarray and the opposite.

``` go
func largestSubarray(nums []int, k int) []int {
    res := make([]int, k)
    for i := 0; i < len(nums) - k + 1; i++ {
        res = whichArrayIsGreater(res, nums[i : i + k])
    }
    return res
}

func whichArrayIsGreater(one, two []int) []int {
    for i := 0; i < len(one); i++ {
        if one[i] > two[i] {
            return one
        } else if one[i] < two[i] {
            return two
        }
    }
    return []int{}
}
```
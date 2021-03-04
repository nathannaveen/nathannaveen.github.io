---
title: "Leetcode 34"
date: 2021-03-02T11:27:12-05:00
toc: false
images:
tags: [leetcode, golang, array, two pointer]
---

[34. Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

Both of the solutions use a two pointer approche. The first solution is slower than the second solution because it checks an extra `if` statment inside the loop, while the second solution checks it outside of the loop.

```
func searchRange(nums []int, target int) []int {
    left := 0
    right := len(nums) - 1

    for left < right {
        if nums[left] != target {
            left++
        }
        if nums[right] != target {
            right--
        }
        if nums[left] == target && nums[right] == target {
            return []int{left, right}
        }
    }

    if len(nums) > 0 && nums[left] == target && nums[right] == target {
        return []int{left, right}
    }

    return []int{-1, -1}
}
```

```
func searchRange(nums []int, target int) []int {
    left := 0
    right := len(nums) - 1

    for (left < right) && (nums[left] != target || nums[right] != target) {
        if nums[left] != target {
            left++
        }
        if nums[right] != target {
            right--
        }
    }

    if len(nums) > 0 && nums[left] == target && nums[right] == target {
        return []int{left, right}
    }

    return []int{-1, -1}
}
```

---
title: "Leetcode 1827"
date: 2021-05-17T09:50:09-05:00
toc: false
images:
tags: [leetcode, golang, array]
---

[1827. Minimum Operations to Make the Array Increasing](https://leetcode.com/problems/minimum-operations-to-make-the-array-increasing/)

The ideas of both of the solutions are similar and simple. We know that an array is strictly increasing if the current element in the array, `nums[i]`, is greater than the previous element `nums[i - 1]`. So if `nums[i - 1]` is greater than or equal to `nums[i]` we know that we have to make `nums[i] = nums[i - 1] + 1`.

**The Idea Of The First Solution:**

The idea of the first solution is to loop from the first element (0 indexed) to the end element. Then check whether `nums[i] <= nums[i - 1]`, if so we can add `nums[i - 1] + 1 - nums[i]` to `res`. We add `nums[i - 1] + 1 - nums[i]` to res because `nums[i - 1] + 1` is the value we want res to be, and we subtract `nums[i]` from it because we want to find the number of operations.

**The Idea Of The Second Solution:**

Like I said the second solution is pretty similar. We loop from the first element (0 indexed) to the end element and add `max(0, nums[i - 1] + 1 - nums[i])` to `res`. We add `max(0, nums[i - 1] + 1 - nums[i])` to `res` because if `nums[i]` is greater than `nums[i - 1]` we add `0`, otherwise we add the difference between them. Then we remake `nums[i]` equal to the maximum of `nums[i]`, or `nums[i - 1] + 1`.


**The First Solution:**

``` go
func minOperations(nums []int) int {
	res := 0
	for i := 1; i < len(nums); i++ {
		if nums[i] <= nums[i - 1] {
			res += nums[i - 1] + 1 - nums[i]
			nums[i] = nums[i - 1] + 1
		}
	}
	return res
}
```

**The Second Solution:**

``` go
func minOperations(nums []int) int {
	res := 0
	for i := 1; i < len(nums); i++ {
		res += max(0, nums[i - 1] + 1 - nums[i])
		nums[i] = max(nums[i], nums[i - 1] + 1)
	}
	return res
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

```
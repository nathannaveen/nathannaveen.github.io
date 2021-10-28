---
title: "Leetcode 1984"
date: 2021-10-28T15:59:09-05:00
toc: false
images:
tags: [leetcode, golang, math]
---

[1984. Minimum Difference Between Highest and Lowest of K Scores](https://leetcode.com/problems/minimum-difference-between-highest-and-lowest-of-k-scores/)

The idea of this solution is pretty simple:

* We just sort `nums`
* And then we can use a sliding window to check for the min of the last number in the sub-array minus the first number in the sub-array.

The reason we sort `nums` is the minimum distance will always be between the two closest numbers. For example if we have the array `nums = [1, 2, 3, 4, 6, 10]`, and we had `k = 3`, we can see that the differences would be:

* `3 - 1 = 2`
* `4 - 2 = 2`
* `6 - 3 = 3`
* `10 - 4 = 6`

And we can use this to find the minimum difference.

``` go
func minimumDifference(nums []int, k int) int {
    min := 100000
    sort.Ints(nums)

    for i := k - 1; i < len(nums); i++ {
        min = int(math.Min(float64(min), float64(nums[i] - nums[i - k + 1]))) 
    }
    return min
}
```
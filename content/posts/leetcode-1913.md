---
title: "Leetcode 1913"
date: 2021-07-06T18:25:29-05:00
toc: false
images:
tags: [golang, leetcode, array]
---

[1913. Maximum Product Difference Between Two Pairs](https://leetcode.com/problems/maximum-product-difference-between-two-pairs/)

For this solution, we have to get the maximum *Product Difference* and to do this, we have to subtract the smallest product from the largest product. So in this solution, I decided to sort `nums` and return the max product minus the min product.

``` go
func maxProductDifference(nums []int) int {
    sort.Ints(nums)
    return nums[len(nums) - 1] * nums[len(nums) - 2] - nums[0] * nums[1]
}
```
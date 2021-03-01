---
title: "Leetcode 4"
date: 2021-03-01T14:20:15-05:00
toc: false
images:
tags: [leetcode, math, array, golang]
---

[4. Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/)


The idea of this solution is pretty simple, first append all the `nums2` values to `nums1`. Then sort `nums1`. If there are a even number of values then the median is the middle two numbers added together and divided by `2`. An example could be:

`input: nums1 = [1,2], nums2 = [3,4]`
`expected output: 2.5`

When the two arrays are combined the new array would be `[1, 2, 3, 4]` and the two middle numbers are `2`, and `3`. When `2` and `3` are added together we get `5`, and `5` divided by `2` is `2.5`.

If the number of values of `nums1` is odd, the median is the middle number.

```
func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {
    nums1 = append(nums1, nums2...)
    sort.Ints(nums1)

    if len(nums1) % 2 == 0 {
        return float64(nums1[len(nums1) / 2 - 1] + nums1[len(nums1) / 2]) / 2
    } else {
        return float64(nums1[len(nums1)/2])
    }
}
```
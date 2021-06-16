---
title: "Leetcode 1874"
date: 2021-06-16T11:22:12-05:00
toc: false
images:
tags: [leetcode, golang, images, math]
---

[1874. Minimize Product Sum of Two Arrays](https://leetcode.com/problems/minimize-product-sum-of-two-arrays/)

The idea of both solutions is pretty much the same: The smallest number multiplied by the greatest number always makes the smallest sum. If you don't understand, look at the following image:

![](https://i.imgur.com/WKnSS11.jpg)


In the image above, the top array is sorted in non-decreasing order, and the bottom array is sorted in non-increasing order. So when we multiply `nums1[i]` and `nums2[i]` together, we get the minimum product, and when we sum the products up, we get the minimum sum.

In the image, we multiply `9 * 1`, and `4 * 1`, which both make the minimum we can get, because if we multiplied `9` by any other number, we would get a greater sum:

* `9 * 2 = 18`
* `9 * 3 = 27`
* `9 * 4 = 36`

Which are all greater than `9 * 1 = 9`. We can also do the same for the maximum of the top array `4`. `4 * 1 = 4`, and if we multiply it any other number, the product will be greater than `4`:

* `4 * 2 = 8`
* `4 * 7 = 28`
* `4 * 9 = 36`

All of which are greater than `4`. If we want, we can continue with the rest of the numbers, `2, 3, 7`, and the `2`. But I will leave that to you.

If we get the minimum products, we can add them up and get the minimum sum.

**The Code:** *(In this code, we don't reverse the second array, so we have to get the product of `nums1[i]` and`nums2[len(nums2) - i - 1]`)*

``` go
func minProductSum(nums1 []int, nums2 []int) int {
	res := 0
	sort.Ints(nums1)
	sort.Ints(nums2)

	for i := 0; i < len(nums1); i++ {
		res += nums1[i] * nums2[len(nums2) - 1 - i]
	}
	return res
}
```

**The Second Code:** *(In this solution, we reverse the array while sorting it, so we have to get the product of `nums1[i]` and `nums2[i]`, somehow I feel this is simpler)*

``` go
func minProductSum(nums1 []int, nums2 []int) int {
	res := 0
	sort.Ints(nums1)
	sort.Sort(sort.Reverse(sort.IntSlice(nums2)))

	for i := 0; i < len(nums1); i++ {
		res += nums1[i] * nums2[i]
	}
	return res
}
```
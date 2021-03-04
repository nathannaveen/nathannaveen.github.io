---
title: "Leetcode 908"
date: 2021-03-04T15:47:37-05:00
toc: false
images:
tags: [math, golang, leetcode, array]
---

[908. Smallest Range I](https://leetcode.com/problems/smallest-range-i/)

```
func smallestRangeI(A []int, K int) int {
	max, min := A[0], A[0]

	for _, i := range A {
		if i > max {max = i}
		if i < min {min = i}
	}
	if max-min-2*K > 0 {
		return max - min - 2 * K
	}
	return 0
} 
```
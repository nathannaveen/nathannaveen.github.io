---
title: "Leetcode 1689"
date: 2021-06-16T11:21:37-05:00
toc: false
images:
tags: [leetcode, golang, images, math]
---

[1689. Partitioning Into Minimum Number Of Deci-Binary Numbers](https://leetcode.com/problems/partitioning-into-minimum-number-of-deci-binary-numbers/)

The idea of this solution is that the max digit in `n` will be the result. But you might be wondering why this works.

This works because the max digit can only be made by adding the max digit number of `1`'s. If you don't understand, look at the following image: ![](https://i.imgur.com/yqqbNtu.jpg) The first image is an example, and the second example is for anyone who doesn't understand the first example.

**The Code:**

``` go
func minPartitions(n string) int {
	max := '0'

	for _, i := range n {
		if i > max {
			max = i
		}
	}
	
	return int(max - '0')
}
```
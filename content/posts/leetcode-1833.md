---
title: "Leetcode 1833"
date: 2021-05-17T09:50:14-05:00
toc: false
images:
tags: [leetcode, golang, array]
---

[1833. Maximum Ice Cream Bars](https://leetcode.com/problems/maximum-ice-cream-bars/)

To be truthful, I think that this problem's difficulty should be easy instead of medium.

This solution aims to sort `costs` because the maximum number of popsicles is obtained with the least price.

``` go
func maxIceCream(costs []int, coins int) int {
	sort.Ints(costs)
	res := 0
	for _, cost := range costs {
		if coins - cost < 0 {
			break
		}
		res++
		coins -= cost
	}
	return res
}
```
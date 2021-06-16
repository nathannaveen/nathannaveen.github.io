---
title: "Leetcode 1828"
date: 2021-06-16T11:22:53-05:00
toc: false
images:
tags: [leetcode, golang, math, images]
---

[1828. Queries on Number of Points Inside a Circle](https://leetcode.com/problems/queries-on-number-of-points-inside-a-circle/)

The idea of this solution is to:

loop through the `queries` and then a nested loop to go through `points`.

After that we check whether `squared(point[0] - query[0]) + squared(point[1] - query[1]) <= squared(query[2])`. This is bascily checking whether the distance between two points is smaller than or equal to the radius but edited. This image that I have drawn and wrote up explains this part: *(Note: `point[0] = x1, query[0] = x2, point[1] = y1, query[1] = y2, query[2] = radius`)*

![](https://i.imgur.com/ahOEhnk.jpg)

**The Code:**

``` go
func countPoints(points [][]int, queries [][]int) []int {
	res := make([]int, len(queries))
	
	for i, query := range queries {
		for _, point := range points {
			if squared(point[0] - query[0]) + squared(point[1] - query[1]) <= squared(query[2]) {
				res[i]++
			}
		}
	}
	return res
}

func squared(a int) int {
	return a * a
}
```
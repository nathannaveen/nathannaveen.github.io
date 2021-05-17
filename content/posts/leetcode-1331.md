---
title: "Leetcode 1331"
date: 2021-05-17T09:49:56-05:00
toc: false
images:
tags: [leetcode, golang, array]
---

[1331. Rank Transform of an Array](https://leetcode.com/problems/rank-transform-of-an-array/)

The idea of this solution is to:

* Copy `arr`.
* Then sort the copy
* Then loop through the copy and add all the values and indexes of the copy to a map called `m`.
* Then loop through `0` to `len(arr) - 1`, and make `arr[i] = m[arr[i]]`.
* Then return `arr`.

``` go
func arrayRankTransform(arr []int) []int {
	g := make([]int, len(arr))
	m := make(map[int]int)
	counter := 1

	copy(g, arr)
	sort.Ints(g)

	for i := range g {
		if i >= 1 && g[i] == g[i-1] {
			counter -= 1
		}
		m[g[i]] = counter
		counter++
	}

	for i := range arr {
		arr[i] = m[arr[i]]
	}

	return arr
}

```
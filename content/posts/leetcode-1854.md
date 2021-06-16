---
title: "Leetcode 1854"
date: 2021-06-16T11:22:38-05:00
toc: false
images:
tags: [leetcode, golang, math]
---

[1854. Maximum Population Year](https://leetcode.com/problems/maximum-population-year/)

I first did this solution using an `O(n^2)` approach but then tried to think about how to do it better. I couldn't, so I looked at the discussion and saw [votrubac solution](https://leetcode.com/problems/maximum-population-year/discuss/1198892/O(n)-Line-Sweep). The code below is pretty similar, except I make an array of size `101` instead of `2051` because we only need the years from `2050` to `1950`.

``` go
func maximumPopulation(logs [][]int) int {
	populationPerYear := make([]int, 101)
	res := 0
	for _, log := range logs {
		populationPerYear[log[0] - 1950]++
		populationPerYear[log[1] - 1950]--
	}
	for i := 1; i < 101; i++ {
		populationPerYear[i] += populationPerYear[i - 1]
		if populationPerYear[i] > populationPerYear[res] {
			res = i
		}
	}
	return res + 1950
}
```
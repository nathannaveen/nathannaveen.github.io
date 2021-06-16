---
title: "Leetcode 1338"
date: 2021-06-16T11:21:07-05:00
toc: false
images:
tags: [leetcode, golang, array]
---

[1338. Reduce Array Size to The Half](https://leetcode.com/problems/reduce-array-size-to-the-half/)

The idea of the first solution is to:

* Find the frequency of all values in `arr` using a map called `m`.
* Then add all the values of `m` to an array called `h`.
* Then reverse sort `h`.
* Then loop through `h`, and subtract the maximum frequencies to be removing the minimum number of integers. While subtracting check whether `n <= len(arr) / 2` if so return `i + 1`.

**The Code:**

``` go
func minSetSize(arr []int) int {
	h := []int{}
	m := make(map[int]int)
	n := len(arr)
	for _, i := range arr {
		m[i]++
	}
	for _, i := range m {
		h = append(h, i)
	}

	sort.Slice(h, func(i, j int) bool {
		return h[i] > h[j]
	})

	for i, i2 := range h {
		n -= i2
		if n <= len(arr) / 2 {
			return i + 1
		}
	}
	return len(arr)
}
```

The idea of the second solution is pretty similar to the first solution, but we remove the map, so space becomes `100%`.

**The Second Code:**

``` go
func minSetSize(arr []int) int {
	h := make([]int, 100001)
	n := len(arr)
	res := 0
	
	for _, i := range arr {
		h[i]++
	}

	sort.Slice(h, func(i, j int) bool {
		return h[i] > h[j]
	})
	
	for _, i2 := range h {
		if i2 != 0 {
			n -= i2
			res++
			if n <= len(arr)/2 {
				return res
			}
		}
	}
	return len(arr)
}
```
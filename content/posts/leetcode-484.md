---
title: "Leetcode 484"
date: 2021-06-16T11:22:18-05:00
toc: false
images:
tags: [leetcode, golang, string, array]
---

[484. Find Permutation](https://leetcode.com/problems/find-permutation/)

The idea of this solution is to:

* We get the first `n + 1` numbers in order `[1, 2, 3, ..., n + 1]`.
* Then we reverse the numbers whenever we find a `'D'`, and we reverse a whole set of numbers when we find multiple `'D'`'s together.
* Then we return the array.

You might be wondering why we reverse sets of `'D'`'s instead of just reversing every `'D'`, it can be shown using an image:


``` go
func findPermutation(s string) []int {
	res := make([]int, len(s)+1)

	for i := 1; i <= len(s) + 1; i++ { res[i - 1] = i }

	for i := 0; i < len(s); i++ {
		if s[i] == 'D' {
			temp := i
			for temp < len(s) && s[temp] == 'D' { temp++ }
			res = append(res[: i], append(reverseArray(res[i : temp + 1]), res[temp + 1 :]...)...)
			i = temp
		}
	}
	return res
}

func reverseArray(res []int) []int {
	left, right := 0, len(res) - 1
	for left < right {
		res[left], res[right] = res[right], res[left]
		left, right = left + 1, right - 1
	}
	return res
}
```
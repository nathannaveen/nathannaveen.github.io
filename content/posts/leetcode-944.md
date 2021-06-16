---
title: "Leetcode 944"
date: 2021-06-16T11:21:55-05:00
toc: false
images:
tags: [leetcode, golang, string]
---

[944. Delete Columns to Make Sorted](https://leetcode.com/problems/delete-columns-to-make-sorted/)

This solution loops through every column, and then if the previous letter in the column is greater than the current letter, we know that this column can be removed.

``` go
func minDeletionSize(strs []string) int {
	res := 0
	for i := 0; i < len(strs[0]); i++ {
		for j := 1; j < len(strs); j++ {
			if strs[j][i] < strs[j-1][i] {
				res++
				break
			}
		}
	}
	return res
}
```
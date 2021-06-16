---
title: "Leetcode 1605"
date: 2021-06-16T11:21:28-05:00
toc: false
images:
tags: [leetcode, golang, images, array]
---

[1605. Find Valid Matrix Given Row and Column Sums](https://leetcode.com/problems/find-valid-matrix-given-row-and-column-sums/)

The idea of this solution is pretty simple:

We loop through `len(rowSum)`, and `len(colSum)`. We find the minimum for `colSum[j]`, and `rowSum[i]`, making the resulting matrix have the minimum. After that, we subtract the minimum from both `colSum[j]`, and `rowSum[i]`.

Here is an image example to help with the explanation:

![](https://i.imgur.com/MJQGppC.jpg)


``` go
func restoreMatrix(rowSum []int, colSum []int) [][]int {
	res := make([][]int, len(rowSum))

	for i := 0; i < len(rowSum); i++ {
		arr := make([]int, len(colSum))

		for j := 0; j < len(colSum); j++ {
			arr[j] = colSum[j]
			if colSum[j] > rowSum[i] {
				arr[j] = rowSum[i]
			}
			rowSum[i], colSum[j] = rowSum[i] - arr[j], colSum[j] - arr[j]
		}

		res[i] = arr
	}
	return res
}
```
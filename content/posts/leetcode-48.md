---
title: "Leetcode 48"
date: 2021-06-16T11:22:22-05:00
toc: false
images:
tags: [golang, leetcode, images, array]
---

[48. Rotate Image](https://leetcode.com/problems/rotate-image/)

The idea of this solution is first to flip the matrix, so it is upside down, and then transpose the matrix. If you don't understand, look at the following images:

![](https://i.imgur.com/9ZfliIg.jpg)

We flip the matrix by fliping the top and bottom `len(matrix) / 2` rows, like in this image:

![](https://i.imgur.com/VWu6zok.jpg)

And transposing the matrix is basically making `matrix[i][j] = matrix[j][i]`, and the flips should only flip from yellow to the blue, or blue to yellow in the following image:

![](https://i.imgur.com/NLmsIsv.jpg)


So, we only need to loop from the yellow part and flip from the yellow to the blue.


**The Code:**

``` go
func rotate(matrix [][]int) {
	for i := 0; i < len(matrix)/2; i++ {
		newI := abs(i-len(matrix)) - 1
		for j := 0; j < len(matrix); j++ {
			matrix[newI][j], matrix[i][j] = matrix[i][j], matrix[newI][j]
		}
	}
	for i := 0; i < len(matrix); i++ {
		for j := i + 1; j < len(matrix); j++ {
			matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
		}
	}
}

func abs(a int) int {
	if a > 0 {
		return a
	}
	return -a
}

```
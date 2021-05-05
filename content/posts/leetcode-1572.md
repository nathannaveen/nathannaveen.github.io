---
title: "Leetcode 1572"
date: 2021-05-05T15:45:36-05:00
toc: false
images:
tags: [array, leetcode, golang, images]
---

[1572. Matrix Diagonal Sum](https://leetcode.com/problems/matrix-diagonal-sum/)

The idea of the first solution is to add all the values in the diagonals, and if `len(mat)` is odd, we can subtract the middle element from `res`. You might be able to understand this solution a little more with two example images: ![](https://i.imgur.com/H0DfIpU.jpg)


The idea of the second solution is to find two positions in the array (Where a position is in the format `(x, y)`) which are on diagonals and are equal. Suppose we find those two positions, we don't need to add the value at that position twice. If you don't understand, look at the example image: ![](https://i.imgur.com/x98WvIl.jpg) You might be wondering why the code only compares `i`, and `len(mat) - i - 1`. The `len(mat) - i - 1` is all the points on the pinkish reddish line going from the top right to the bottom left, and `i` is all the points on the orange line that goes from the top left to the bottom right. You also might be wondering why the code doesn't check the whole position and only `i, len(mat) - i - 1`. It is because every time we compare two two elements they are on the same row, so the code doesn't need to check for the row, but if the code did it would be `if i != len(mat) - i - 1 && i == i` (where `i` is also the row), instead of just `if i != len(mat) - i - 1`.

**The First Code:**

``` go
func diagonalSum(mat [][]int) int {
	res := 0
	for i := 0; i < len(mat); i++ {
		res += mat[i][i] + mat[i][len(mat) - i - 1]
	}
	if len(mat) % 2 == 1 {
		res -= mat[len(mat) / 2][len(mat) / 2]
	}
	return res
}
```

**The Second Code:**

``` go
func diagonalSum(mat [][]int) int {
	res := 0
	for i := 0; i < len(mat); i++ {
		res += mat[i][i]
		if i != len(mat) - i - 1 {
			res += mat[i][len(mat) - i - 1]
		}
	}
	return res
}
```
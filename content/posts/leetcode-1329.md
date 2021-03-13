---
title: "Leetcode 1329"
date: 2021-03-13T10:42:03-05:00
toc: false
images:
tags: [leetcode, golang, images, array]
---

[1329. Sort the Matrix Diagonally](https://leetcode.com/problems/sort-the-matrix-diagonally/)

The idea of this solution is kind of hard to explain so I will show it with the following images:

![](https://i.imgur.com/aoRkExV.jpg)


> `i = len(mat)`, and `j = len(mat[0])`

> The yellow part is every where `i` and `j` will iterate

> the diagonal lines are in red

![](https://i.imgur.com/vfJAh1L.jpg)

> Before we continue you might be confused about why we switch `2` and `1` even though `i = 1` and `j = 1`. This can be shown with the example array `[3, 2, 1] ` we can pretend that `3, 2, 1` is diagonal:

```
3
 2
  1
```

When we switch `3` and `2`

```
2
 3
  1
```

Then when we switch `3` and `1`

```
2
 1
  3
```

This is not sorted, so we have to switch `1` and `2`

```
1
 2
  3
```

![](https://i.imgur.com/hmdt5Jx.jpg)


**The Code:**

``` go
func diagonalSort(mat [][]int) [][]int {
    for i := 0; i < len(mat)-1; i++ {
        for j := 0; j < len(mat[0])-1; j++ {
            newI := i + 1
            newJ := j + 1
            for k := 1; k <= min(newI, newJ); k++ {
                if mat[newI-k][newJ-k] > mat[newI-k+1][newJ-k+1] {

                    mat[newI-k][newJ-k], mat[newI-k+1][newJ-k+1] = 
                    mat[newI-k+1][newJ-k+1], mat[newI-k][newJ-k]
                }
            }
        }
    }
    return mat
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```
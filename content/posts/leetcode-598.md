---
title: "Leetcode 598"
date: 2021-10-28T15:59:00-05:00
toc: false
images:
tags: [leetcode, golang, math, image]
---

[598. Range Addition II](https://leetcode.com/problems/range-addition-ii/)

The idea of this solution is pretty simple, the positions with the max value will be in the sub-matrix of range `0 to minimum y pos`, and `0 to minimum x pos`.

If you don't understand look at the example bellow:

`input: m = 6, n = 5, ops = [[4, 3], [2, 6], [3, 5]]` *(Note: They give the input `1-indexed`, instead of `0-indexed`)*

![](https://i.imgur.com/Nz4lmSJ.png)

As you can see, all rectangles top left corner is `(0, 0)` (I added an orange dot at `(0, 0)`). And the sub-matrix that has the maximum values is surrounded by the yellow dotted line.

We have four parts of the dotted line, the `top`, `bottom`, `right`, and `left`.

* The `top` line is on the `x-axis`, so we don't have to worry about that.
* The `left` line is on the `y-axis`, so we also don't have to worry about that.
* The `right` line is the minimum `x` value in all the `ops` because the minimum is the max position that we know we have all the operations in.
* The `bottom` line is the minimum `y` value in `ops`, and it is that for the same reason as the `right` line.

``` go
func maxCount(m int, n int, ops [][]int) int {
    x, y := m, n
    for _, op := range ops {
        x = min(op[0], x)
        y = min(op[1], y)
    }
    return x * y
}

func min(a, b int) int {
    if a > b {
        return b
    }
    return a
}
```
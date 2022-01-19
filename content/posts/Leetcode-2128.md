---
title: "Leetcode 2128"
date: 2022-01-19T13:01:56-06:00
toc: false
images:
tags: [leetcode, golang]
---

[2128. Remove All Ones With Row and Column Flips](https://leetcode.com/problems/remove-all-ones-with-row-and-column-flips/)

The idea of this solution can be shown using the following image:

![](https://i.imgur.com/eP4CU9w.jpg)

> As we can see if a row is equal to the inverse of the first row we know that we can flip it to be equal to the first row. And if the row is equal to the first row we don't need to flip it at all.
>
> Then if all the rows are equal we can just flip the columns that need flipping.

This solution doesn't flip rows or columns, it checks whether a row is the inverse or the same as the first row.

The time complexity is `O(n + m)` because we first loop throught row 0, then we loop through column 0.

``` go
func removeOnes(grid [][]int) bool {
    n, m := len(grid), len(grid[0])
    invert := make([]int, len(grid[0]))
    
    for i := 0; i < m; i++ {
        invert[i] = -1 * (grid[0][i] - 1)
    }
    
    for i := 0; i < n; i++ {
        if reflect.DeepEqual(grid[i], grid[0]) || reflect.DeepEqual(grid[i], invert) {
            continue
        }
        return false
    }
    return true
}
```

I got the idea of this solution from [this solution](https://leetcode.com/problems/remove-all-ones-with-row-and-column-flips/discuss/1671908/Python-3-or-Math-or-Explanation).
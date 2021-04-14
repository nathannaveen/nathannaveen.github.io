---
title: "Leetcode 118"
date: 2021-04-14T12:29:07-04:00
toc: false
images:
tags: [leetcode, golang, math, array]
---

[118. Pascal's Triangle](https://leetcode.com/problems/pascals-triangle/)

The idea of this solution is pretty simple:

* We first have a matrix array called `res`
* Then we loop through `numRows`
* While iterating through `numRows` we have to make an array called `temp`. It is going to be our current row.
* We make `temp[0]` and `temp[len(temp)]` equal to `1` so we get the outer `1`'s.
* Then we loop through the middle elements (basically excluding the outside `1`'s)
* We have to make every `temp[j]` equal to the previous rows `previous rows[j - 1] + previous rows[j]`. We do `j - 1` and `j`. If you don't understand, why look at the image below: ![](https://i.imgur.com/KLtNp7P.png)
* Then we append `temp` to `res`
* After iterating, we can return `res`.

**The Code:**

``` go
func generate(numRows int) [][]int {
    res := [][]int{}

    for i := 0; i < numRows; i++ {
        temp := make([]int, i+1)
        temp[0], temp[len(temp)-1] = 1, 1
        for j := 1; j < len(temp)-1; j++ {
            temp[j] = res[i-1][j-1] + res[i-1][j]
        }
        res = append(res, temp)
    }

    return res
}
```

**We can Take Out Temp And Get:**

``` go
func generate(numRows int) [][]int {
    res := [][]int{}

    for i := 0; i < numRows; i++ {
        res = append(res, make([]int, i+1))
        res[i][0], res[i][len(res[i])-1] = 1, 1
        for j := 1; j < len(res[i])-1; j++ {
            res[i][j] = res[i-1][j-1] + res[i-1][j]
        }
    }

    return res
}
```
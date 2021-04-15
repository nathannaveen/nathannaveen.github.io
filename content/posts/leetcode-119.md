---
title: "Leetcode 119"
date: 2021-04-15T08:49:51-04:00
toc: false
images:
tags: [leetcode, golang, array]
---

[119. Pascal's Triangle II](https://leetcode.com/problems/pascals-triangle-ii/)

I will explain the first solution.

If you want to understand the second solution click on the link above the code.

So the first solution only wants us to return the last row of the triangle.

Since we need two rows always for this problem the current row and the previous row. In this problem `res` is the current row and `temp` is the previous row.

Here is how the problem works

* We have `res[0]` equal to `1` so all we have to do is keep on appending `1` to `res` every time we iterate.
* Then we have to loop through `res`'s indexes starting at `1` and ending at `len(res) - 1` because we don't want to count the start and end `1`'s.
* Inside the nested for we can make `res[j] = temp[j-1] + temp[j]`. If you don't understand why this works look at the image bellow: ![](https://i.imgur.com/vPafRCe.png)
* After iterating through everything we can return `res`.


**The Code:** *This is the one that is 100%, 100%*

``` go
func getRow(rowIndex int) []int {
    res := []int{}

    for i := 0; i <= rowIndex; i++ {
        temp := make([]int, len(res))
        copy(temp, res)
        res = append(res, 1)
        for j := 1; j < len(res)-1; j++ {
            res[j] = temp[j-1] + temp[j]
        }
    }
    return res
}
```

**We could do somthing similar to what we did in [Leetcode 118](https://nathannaveen.dev/posts/leetcode-118/) But it is a pretty brute force solution for this problem:**

``` go
func getRow(rowIndex int) []int {
    res := [][]int{}

    for i := 0; i < rowIndex; i++ {
        temp := make([]int, i+1)
        temp[0], temp[len(temp)-1] = 1, 1
        for j := 1; j < len(temp)-1; j++ {
            temp[j] = res[i-1][j-1] + res[i-1][j]
        }
        res = append(res, temp)
    }

    return res[len(res) - 1]
}
```
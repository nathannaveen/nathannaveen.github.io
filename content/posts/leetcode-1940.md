---
title: "Leetcode 1940"
date: 2021-07-25T18:33:29-05:00
toc: false
images:
tags: [leetcode, golang, images, array]
---

[1940. Longest Common Subsequence Between Sorted Arrays](https://leetcode.com/problems/longest-common-subsequence-between-sorted-arrays/)

At first, I thought that this would need a nice algorithm, but then when I read the description, it said that
> "`arrays` is sorted in **strictly increasing** order"

and

> "longest common **subsequence**"

The first part, "`arrays` is sorted in **strictly increasing** order," tells us that each array is sorted and each array has unique numbers.

The second part, "longest common **subsequence**" says that it is a **subsequence** and not a **subarray**. A **subsequence** are any elements in an array with the same order, but a **subarray** is contiguous elements in an array.

##  The First Solution:

For the first solution, we don't care whether the arrays are sorted. We just care that we need subsequence, and each array has unique numbers. So all we have to do is loop through every element in `arrays` and check whether the frequency of any element is equal to `len(arrays)` (Whether every array contains that element).

``` go
func longestCommomSubsequence(arrays [][]int) []int {
    res := []int{}
    m := make(map[int] int)
    for _, arr := range arrays {
        for _, i := range arr {
            m[i]++
            if m[i] == len(arrays) {
                res = append(res, i)
            }
        }
    }
    return res
}
```

## The Second Solution:

I thought that the first solution was boring, so I decided to develop a solution that is a little more advanced *(FUN)*. I drew up a quick image to explain how this solution works:

![](https://i.imgur.com/UCxprqh.png)

The explanation for images 2 and 3 is pretty much how this solution works.

``` go
func longestCommomSubsequence(arrays [][]int) []int {
    arr := make([]int, len(arrays)) // the counters for each array
    keepGoing := true
    res := []int{}
    
    for keepGoing {
        keepGoing = false
        temp := 0
        max := arrays[0][arr[0]]
        
        for i := 1; i < len(arrays); i++ { // find the max
            if arrays[i][arr[i]] > max {
                max = arrays[i][arr[i]]
            }
        }
        for i := 0; i < len(arrays); i++ {
            if arrays[i][arr[i]] == max {
                temp++
            } else if arrays[i][arr[i]] < max && arr[i] != len(arrays[i]) - 1 {
                keepGoing = true
                arr[i]++
            }
        }
        if temp == len(arrays) {
            res = append(res, max)
            for i := 0; i < len(arrays); i++ {
                if arr[i] != len(arrays[i]) - 1 {
                    arr[i]++
                    keepGoing = true
                }
            }
        }
    }
    return res
}
```
---
title: "Leetcode 1198"
date: 2021-03-22T12:57:36-04:00
toc: false
images:
tags: [leetcode, golang, array]
---

[1198. Find Smallest Common Element in All Rows](https://leetcode.com/problems/find-smallest-common-element-in-all-rows/)

m = len(mat), n = len(mat[0])
* speed = O(mn)
* space = O(number of unique numbers)

**What The Problem Is Asking:**

The problem description is

> Given a matrix `mat` where every row is sorted in **strictly increasing** order, return the **smallest common element** in all rows.
>
> If there is no common element, return `-1`.

The problem is asking us to return an element that appears in every array of the matrix array, and if there are multiple, we should return the smallest.

You might not have seen some things that are said in the problem description. It is ok because they are pretty small.

* First, when they say **strictly increasing** they mean that all the elements are unique. Now, if they said **sorted in non-decreasing order** it wouldn't mean that the elements are unique.
* Next, when they say **strictly increasing**, they mean that every array in the matrix is sorted.

**How This Solution Works:**

As we have seen, the arrays inside the matrix array are sorted and unique. We can say that a common element in all rows will only appear `len(mat)` times. And since we know that each array is sorted, we can see that the minimum element that appears in each row will be the first element that will appear in each row.

**How The Code Works:**

Now we can implement the idea into code, so we can use a map to store the number and the frequency of the number. When we iterate through `mat`, we first add one to the frequency of that element. Then we check whether that element frequency is equal to `len(mat)`. If it is, then return the element because it will be the smallest, and it will be in all rows.

``` go
func smallestCommonElement(mat [][]int) int {
    m := make(map[int]int)

    for i := 0; i < len(mat); i++ {
        for j := 0; j < len(mat[0]); j++ {
            m[mat[i][j]]++
            if m[mat[i][j]] == len(mat) {
                return mat[i][j]
            }
        }
    }
    return -1
}
```
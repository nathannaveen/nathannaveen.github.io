---
title: "Leetcode 658"
date: 2021-04-04T16:47:26-05:00
toc: false
images:
tags: [leetcode, golang, array, sort]
---

[658. Find K Closest Elements](https://leetcode.com/problems/find-k-closest-elements/)

**What The Problem Is Asking:**

The problem asks us to find the `k` closest elements in an array to the value `x`. We find the distance between elements by doing `|value - x|` and the `k` elements with the smallest distances.

**The Main Idea Of This Solution:**

Since we have to find the `k` closest elements, we can sort the array from the smallest distance to the greatest distance. After we have done that, we can get the smallest `k` elements by getting the first `k` elements of `arr`. The problem wants us to return the smallest `k` elements in a sorted array so we can sort the first `k` elements of `arr`.

The manual sort can be similarly explained with this post: [How the Manual Sort Works](https://nathannaveen.dev/posts/how-the-manual-sort-works/).

**The Code:**

``` go
func findClosestElements(arr []int, k int, x int) []int {
    for i := 1; i < len(arr); i++ {
        if i >= 1 && abs(arr[i-1]-x) > abs(arr[i]-x) {
            arr[i], arr[i-1] = arr[i-1], arr[i]
            i -= 2
        }
    }
    arr = arr[:k]

    for i := 1; i < len(arr); i++ {
        if i >= 1 && arr[i-1] > arr[i] {
            arr[i - 1], arr[i] = arr[i], arr[i - 1]
            i -= 2
        }
    }

    return arr
}

func abs(a int) int {
    if a > 0 {
        return a
    }
    return -a
}
```
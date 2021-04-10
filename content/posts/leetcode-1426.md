---
title: "Leetcode 1426"
date: 2021-04-10T09:44:48-05:00
toc: false
images:
tags: [leetcode, golang, array, map]
---

[1426. Counting Elements](https://leetcode.com/problems/counting-elements/)

This solution is straightforward, and the idea of this solution is we add all the values of `arr` into a map called `m`. All we do is check whether `m` contains `arr[i] + 1`. If it does, we can add one to the resulting counter.

So the code:

* First, makes a map called `m` and a variable called `res`.
* Then we loop through `arr` and add all the values into `m`.
* Then we loop through `arr` again, but this time check whether `m` contains `arr[i] + 1`, and if it does, is it greater than `0`. If so, we can add one to `res`.
* Now, all we have to do is return `res`.

**The Code:**

``` go
func countElements(arr []int) int {
    m := make(map[int]int)
    res := 0

    for _, i := range arr {
        m[i]++
    }

    for _, i := range arr {
        if m[i + 1] > 0 {
            res++
        }
    }
    return res
}
```
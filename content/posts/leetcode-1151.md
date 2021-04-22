---
title: "Leetcode 1151"
date: 2021-04-22T09:14:35-04:00
toc: false
images:
tags: [leetcode, golang, array, sliding window]
---


[1151. Minimum Swaps to Group All 1's Together](https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together/)

The idea of this solution is:

* We find the number of `1`'s.
* Then we know that the `1`'s have to be in a subarray of the length of all the `1`'s. We know that this works because the problem statement says that all the `1`'s should be together in **any place**. Since we know that all the ones should be in a substring of length the number of ones in `data`, we just have to find the substring with the maximum number of `1`'s in it already so, we get the minimum switches.

``` go
func minSwaps(data []int) int {
    oneCounter, maximum, counter := 0, 0, 0

    for _, i := range data {
        oneCounter += i
    }

    for i := 0; i < oneCounter; i++ {
        counter += data[i]
    }
    maximum = max(maximum, counter)

    for i := oneCounter; i < len(data); i++ {
        counter += data[i] - data[i - oneCounter]
        maximum = max(maximum, counter)
    }

    return oneCounter - maximum
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```
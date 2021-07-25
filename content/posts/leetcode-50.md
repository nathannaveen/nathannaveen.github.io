---
title: "Leetcode 50"
date: 2021-07-25T18:33:06-05:00
toc: false
images:
tags: [golang, leetcode, math]
---

[50. Pow(x, n)](https://leetcode.com/problems/powx-n/)

This solution is if `n < 0` (If `n` is negative) we can return `1 / (x ^ (-n))` (The `-n` is for making `n` positive). Otherwise we can just return `math.Pow(x, n)`.

``` go
func myPow(x float64, n int) float64 {
    if n < 0 {
        return 1 / math.Pow(x, float64(-n))
    }
    return math.Pow(x, float64(n))
}
```

Technically we could do the following code and solve the problem, but that isn't the idea of the problem because Golang takes care of test cases when `n` is negative.

``` go
func myPow(x float64, n int) float64 {
    return math.Pow(x, float64(n))
}
```
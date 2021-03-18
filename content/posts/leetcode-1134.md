---
title: "Leetcode 1134"
date: 2021-03-18T17:44:12-04:00
toc: false
images:
tags: [math, golang, leetcode]
---

[1134. Armstrong Number](https://leetcode.com/problems/armstrong-number/)

The idea of this solution is to just loop through every digit of `n` then add the `n^(lengthOfNumber)` to a variable called `sum`, then we return `sum == n`.

``` go
func isArmstrong(n int) bool {
    lengthOfNumber := len(strconv.Itoa(n))
    sum := 0
    newN := n

    for newN > 0 {
        sum += powerOfK(lengthOfNumber, newN%10)
        newN /= 10
    }
    return sum == n
}

func powerOfK(lengthOfNumber, n int) int {
    res := 1
    for i := 0; i < lengthOfNumber; i++ {
        res *= n
    }
    return res
}
```
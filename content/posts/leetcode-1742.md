---
title: "Leetcode 1742"
date: 2021-04-10T09:44:53-05:00
toc: false
images:
tags: [leetcode, golang, map]
---

[1742. Maximum Number of Balls in a Box](https://leetcode.com/problems/maximum-number-of-balls-in-a-box/)

The idea of this solution is pretty simple:

* We use a map to store all the elements and their frequencies, and we use a variable called `maximum` to store the maximum frequency.
* We loop from `lowLimit` to `highLimit`.
* Inside the first loop, we make a nested loop to sum up all the digits of each number between `lowLimit` and `highLimt`.
* After we have got the sum, we do `m[sum]++` because we have to add one to the frequency of `sum`.
* Then we check whether the new frequency is greater than our old `maximum`. If so, we should make `maximum = m[sum]`.
* Then we return `maximum`.

``` go
func countBalls(lowLimit int, highLimit int) int {
    m, maximum := make(map[int]int), 0
    for i := lowLimit; i <= highLimit; i++ {
        n, sum := i, 0

        for n > 0 {
            sum, n = sum+(n % 10), n / 10
        }
        m[sum]++

        if m[sum] > maximum {
            maximum = m[sum]
        }
    }
    return maximum
}
```

**Using A `max()` Function:**

``` go
func countBalls(lowLimit int, highLimit int) int {
    m, maximum := make(map[int]int), 0
    for i := lowLimit; i <= highLimit; i++ {
        n, sum := i, 0

        for n > 0 {
            sum, n = sum + (n % 10), n / 10
        }
        m[sum]++
        maximum = max(maximum, m[sum])
    }
    return maximum
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```
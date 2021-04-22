---
title: "Leetcode 1176"
date: 2021-04-19T10:48:25-04:00
toc: false
images:
tags: [leetcode, golang, math, array]
---


[1176. Diet Plan Performance](https://leetcode.com/problems/diet-plan-performance/)

This is how the code works:

* We sum up the first `k` elements.
* Then compare whether sum is greater than upper or smaller than lower.
* After comparing we can loop from `k` to `len(calories)`.
* Then we can take off the beggining of the subarray by subtracting `calories[i - k]`. And then we have to add the next element from the end of the subarray to the end to the subarray, we do this by adding `calories[i]`. We can do `sum -= calories[i - k]`, and then `sum += calories[i]`, or we can simplify these two lines into one line, `sum -= calories[i - k] - calories[i]` or `sum += calories[i] - calories[i - k]`.
* Then compare whether sum is greater than upper or smaller than lower.

**The Code:**

``` go
func dietPlanPerformance(calories []int, k int, lower int, upper int) int {
    sum := 0
    res := 0
    for i := 0; i < k; i++ {
        sum += calories[i]
    }
    res += comparison(sum, lower, upper)

    for i := k; i < len(calories); i++ {
        sum -= calories[i - k] - calories[i]
        res += comparison(sum, lower, upper)
    }
    return res
}

func comparison(sum int, lower int, upper int) int {
    if sum < lower {
        return -1
    } else if sum > upper {
        return 1
    }
    return 0
}
```
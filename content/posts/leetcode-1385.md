---
title: "Leetcode 1385"
date: 2021-03-03T13:25:26-05:00
toc: false
images:
tags: [leetcode, golang, math, array]
---

[1385. Find the Distance Value Between Two Arrays](https://leetcode.com/problems/find-the-distance-value-between-two-arrays/)

The idea of this solution is to iterate through `arr1` and then inside each iteration iterate through `arr2`. If the absolute value of `arr1[i] - arr2[j]` is smaller than or equal to `d`, we know that `arr1[i]` can't be added to the resulting counter, so we can just `break` from the loop.

There is a abs function because `math.Abs` takes longer. When using `math.Abs` we have to make `float64(arr1[i] - arr2[j])`, and then make the `int(math.Abs)`.

```
func findTheDistanceValue(arr1 []int, arr2 []int, d int) int {
    res := 0
    shouldAdd := true
    for i := 0; i < len(arr1); i++ {
        for j := 0; j < len(arr2); j++ {
            if abs(arr1[i]-arr2[j]) <= d {
                shouldAdd = false
                break
            }
        }
        if shouldAdd {res++} else {shouldAdd = true}
    }
    return res
}

func abs(n int) int {
    if n < 0 {
        return -n
    }
    return n
}
```
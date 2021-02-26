---
title: "Leetcode 448"
date: 2021-02-26T10:28:29-05:00
images:
tags: [leetcode, map, array, golang]
---

[448. Find All Numbers Disappeared in an Array](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/)

The idea of this solution is to add all the numbers to a map and then check whether the map doesn't contain a number. If it doesn't contain then add it to the array `arr`.

We return the array from the first position to the end because when we make the array it comes out with a `0` at the zeroth index. For example a input array could be `[4,3,2,7,8,2,3,1]`. If we just returned `arr` then we would get `[0, 5, 6]` instead of `[5, 6]`. This can also be fixed by making `i` in the second loop start at `1` instead of `0`.
```
func findDisappearedNumbers(nums []int) []int {

    m := make(map[int]int)
    arr := []int{}

    for _, i := range nums {
        m[i]++
    }

    for i := 0; i <= len(nums); i++ {
        if _, ok := m[i]; !ok {
            arr = append(arr, i)
        }
    }
    return arr[1:]
}
```


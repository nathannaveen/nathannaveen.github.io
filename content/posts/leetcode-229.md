---
title: "Leetcode 229"
date: 2021-04-17T09:23:24-04:00
toc: false
images:
tags: [leetcode, golang, array, map]
---

[229. Majority Element II](https://leetcode.com/problems/majority-element-ii/)

This solution is pretty simple:

* We loop through `nums`
* We add `1` to a map of integers called `m`, so we add `1` to `m[num]` where `num` is the current number in `nums`.
* Then we check whether `m[num] == len(nums) / 3 + 1` this is checking whether the element is a majority element.

Note: We can't do `m[num] >= len(nums) / 3 + 1`. This can be shown with an example:

If we have the example `nums = [1, 2, 1, 1, 1]`, and we have the expected output of `res = [1]`, it won't work because we can:

1. First add one to `m[1]` so `m = [1 : 1]`
2. Then add one to `m[2]` so `m = [1 : 1, 2 : 1]`
3. Then add one to `m[1]` so `m = [1 : 2, 2 : 1]`, since `5 / 3 == 1`, `m[1] = 2`, and `2 > 1`. We can append `1` to `res`, so `res = [1]`.
4. Then add one to `m[1]` so `m = [1 : 3, 2 : 1]`, since `5 / 3 == 1`, `m[1] = 3`, and `3 > 1`. We can append `1` to `res`, so `res = [1, 1]`.
5. Then add one to `m[1]` so `m = [1 : 4, 2 : 1]`, since `5 / 3 == 1`, `m[1] = 4`, and `4 > 1`. We can append `1` to `res`, so `res = [1, 1, 1]`.

Since `res = [1, 1, 1]` we can see how it is not the expected output of `res = [1]`.

**The Code:**
``` go
func majorityElement(nums []int) []int {
    m := make(map[int] int)
    res := []int{}

    for _, num := range nums {
        m[num]++
        if m[num] == len(nums)/3 + 1 {
            res = append(res, num)
        }
    }
    return res
}
```
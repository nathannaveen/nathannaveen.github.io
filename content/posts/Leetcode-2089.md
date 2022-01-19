---
title: "Leetcode 2089"
date: 2022-01-19T13:01:15-06:00
toc: false
images:
tags: [leetcode, golang, array]
---

[2089. Find Target Indices After Sorting Array](https://leetcode.com/problems/find-target-indices-after-sorting-array/)

Let us take an example of `nums = [1, 2, 5, 2, 3, 1, 2]` and `target = 2`. If we sort `nums` we get `nums = [1, 1, 2, 2, 2, 3, 5]`. If we know, there are three twos in `nums` and two items with values smaller than theirs. We know that the result will be `[2, 3, 4]`.

So basically, this solution makes an array of the number of values that equal `target` where each value will be one more than the previous value. After that, the code then adds the number of values smaller than `target` them.

Let us say that we take the same example that we used before (`nums = [1, 2, 5, 2, 3, 1, 2]` and `target = 2`). If we find the number of values equal to target, we get `3`, and the number of values smaller than the target is `2`. So we will first make an array of `res = [0, 1, 2]`, then we can add `2` to all of them and get `res = [2, 3, 4]`.

``` go
func targetIndices(nums []int, target int) []int {
    startAt := 0
    c := 0
    res := []int{}
    
    for _, num := range nums {
        if num == target {
            res = append(res, c)
            c++
        } else if num < target {
            startAt++
        }
    }
    
    for i := 0; i < c; i++ {
        res[i] += startAt
    }
    return res
}
```

We can remove the part where we make `res` at first from the first loop and put it into the second one (We are removing the part where we do the `res = [0, 1, 2]` from the first loop and combining it with the second loop, so `res = [2, 3, 4]` in one go). This might be easier to understand.

``` go
func targetIndices(nums []int, target int) []int {
    startAt := 0
    c := 0
    res := []int{}
    
    for _, num := range nums {
        if num == target {
            c++
        } else if num < target {
            startAt++
        }
    }
    
    for i := 0; i < c; i++ {
        res = append(res, i + startAt)
    }
    
    return res
}
```
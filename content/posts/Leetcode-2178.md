---
title: "Leetcode 2178"
date: 2022-03-03T15:29:26-06:00
toc: false
images:
tags: [leetcode, golang, math]
---

[2178. Maximum Split of Positive Even Integers](https://leetcode.com/problems/maximum-split-of-positive-even-integers/)

## The Idea of this Solution:

We can subtract multiples of `2` from the number until it is smaller than or equal to `0`. Then if it is smaller we can remove the absolute value of the number from the result.

For example:

`input: finalSum = 28`

`finalSum = 26, res = [2]`

`finalSum = 22, res = [2, 4]`

`finalSum = 16, res = [2, 4, 6]`

`finalSum = 8, res = [2, 4, 6, 8]`

`finalSum = -2, res = [2, 4, 6, 8, 10]`

Since `finalSum` is negative we have to make it `0`. To do this we have to remove `2` from `res` to cancel out the `-2` in `finalSum`.

`finalSum = 0, res = [4, 6, 8, 10]`

Remember that this is not the only solution.

We know that `even - even = even` (ie. `8 - 2 = 6`). And since we only have even numbers in `res` we can just remove the number from `res`.

Removeing the element from `res` is pretty simple since all numbers are sorted and they are even. We can just find the index that we want to remove by doing `(finalSum * -1) / 2` (The `finalSum * -1` is to make `finalSum` positive). Since we know the position of the number that we want to remove we can just use golang slice tricks to remove it.

``` go
func maximumEvenSplit(finalSum int64) []int64 {
    if finalSum % 2 == 1 { // odd
        return []int64{}
    }
    
    res := []int64{}
    
    i := int64(0)
    
    for finalSum > 0 {
        i += 2
        res = append(res, i)
        finalSum -= i
    }
    
    if finalSum < 0 { 
        // Remove the element from res using slice tricks
        index := (finalSum * -1) / 2
        res = append(res[: index - 1], res[index:]...)
    }
    
    return res
}
```
---
title: "Leetcode 2155"
date: 2022-02-04T12:12:40-06:00
toc: false
images:
tags: [leetcode, golang, images]
---

[2155. All Divisions With the Highest Score of a Binary Array](https://leetcode.com/problems/all-divisions-with-the-highest-score-of-a-binary-array/)

The idea of this solution is to loop through `nums` and add one to a zero count if we have a zero, and subtract one from a one counter if it is a one. This can be shown using an illustration:

![](https://i.imgur.com/ymBAmcM.gif)


``` go
func maxScoreIndices(nums []int) []int {
    numZeros := 0
    numOnes := 0
    
    for _, n := range nums {
        numOnes += n
    }
    
    max := numOnes
    res := []int{0}
    
    for i, n := range nums {
        if n == 0 {
            numZeros++
        } else {
            numOnes--
        }
        
        if numZeros + numOnes > max {
            max = numZeros + numOnes
            res = []int{ i + 1 }
        } else if numZeros + numOnes == max {
            res = append(res, i + 1)
        }
    }
    return res
}
```

***

We can put:

```
if numZeros + numOnes > max {
    max = numZeros + numOnes
    res = []int{ i + 1 }
} else if numZeros + numOnes == max {
    res = append(res, i + 1)
}
```

Into if `n == 0` because we can only get a max if we add to `numZeros`, not subtracting from `numOnes`.

This makes the code less readable, but it is better time-wise.

``` go
func maxScoreIndices(nums []int) []int {
    numZeros := 0
    numOnes := 0
    
    for _, n := range nums {
        numOnes += n
    }
    
    max := numOnes
    res := []int{0}
    
    for i, n := range nums {
        if n == 0 {
            numZeros++
            if numZeros + numOnes > max {
                max = numZeros + numOnes
                res = []int{ i + 1 }
            } else if numZeros + numOnes == max {
                res = append(res, i + 1)
            }
        } else {
            numOnes--
        }
    }
    return res
}
```

***

In this solution, we can put `numZeros`, and `numOnes` into one variable called `total`. This works because if we have a zero, we can add one to `total`, and if we have a `1`, we can subtract from `total`.

``` go
func maxScoreIndices(nums []int) []int {
    total := 0
    
    for _, n := range nums {
        total += n
    }
    
    max := total
    res := []int{ 0 }
    
    for i, n := range nums {
        if n == 0 {
            total++
        } else {
            total--
        }
        
        if total > max {
            max = total
            res = []int{ i + 1 }
        } else if total == max {
            res = append(res, i + 1)
        }
    }
    return res
}
```




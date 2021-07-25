---
title: "Leetcode 495"
date: 2021-07-25T18:33:13-05:00
toc: false
images:
tags: [golang, leetcode, array]
---

[495. Teemo Attacking](https://leetcode.com/problems/teemo-attacking/)

The idea of these two solutions is pretty simple, but in the second solution, I didn't want to use a variable to store the result, so I manipulated `timeSeries` into storing the resulting values (Basically used DP).

**The First Solution**

I first did this solution like this:

``` go
func findPoisonedDuration(timeSeries []int, duration int) int {
    res := 0
    
    for i := 1; i < len(timeSeries); i++ {
        if timeSeries[i - 1] + duration - 1 < timeSeries[i] {
            res += duration
        } else {
            res += timeSeries[i] - timeSeries[i - 1]
        }
    }
    
    if len(timeSeries) != 0 {
        res += duration        
    }
    
    return res
}
```

But then relised that I could make a nicer code by doing:

``` go
func findPoisonedDuration(timeSeries []int, duration int) int {
    res := 0
    
    for i := 1; i < len(timeSeries); i++ {
        res += int(math.Min(float64(duration), float64(timeSeries[i] - timeSeries[i - 1])))
    }
    
    if len(timeSeries) != 0 {
        res += duration        
    }
    
    return res
}
```

**The Second Solution**

And for the second solution I first did this:

``` go
func findPoisonedDuration(timeSeries []int, duration int) int {
    if len(timeSeries) == 1 {
        return duration
    }
    
    timeSeries = helper(timeSeries, 0, duration, timeSeries[1] - timeSeries[0], 0)
    
    
    for i := 1; i < len(timeSeries) - 1; i++ {
        timeSeries = helper(timeSeries, i, duration, timeSeries[i + 1] - timeSeries[i], timeSeries[i - 1])
    }
    
    return timeSeries[len(timeSeries) - 2] + duration
}

func helper(timeSeries []int, i, duration, elseAdd, previous int) []int {
    if timeSeries[i + 1] > timeSeries[i] + duration - 1 {
        timeSeries[i] = previous + duration
    } else {
        timeSeries[i] = previous + elseAdd
    }
    return timeSeries
}
```

But relized that I could make it nicer by doing:

``` go
func findPoisonedDuration(timeSeries []int, duration int) int {
    if len(timeSeries) == 1 {
        return duration
    }
    
    timeSeries[0] = int(math.Min(float64(duration), float64(timeSeries[1] - timeSeries[0])))
    
    for i := 1; i < len(timeSeries) - 1; i++ {
        timeSeries[i] = int(math.Min(float64(timeSeries[i - 1] + duration), float64(timeSeries[i - 1] + timeSeries[i + 1] - timeSeries[i])))
    }
    
    return timeSeries[len(timeSeries) - 2] + duration
}
```
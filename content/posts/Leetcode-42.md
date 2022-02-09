---
title: "Leetcode 42"
date: 2022-02-08T20:06:54-06:00
toc: false
images:
tags: [leetcode, golang, images, array]
---

[42. Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)

I got the idea of this solution from [qddpx's solution](https://leetcode.com/problems/trapping-rain-water/discuss/17395/A-different-O(n)-approach-easy-to-understand-and-simple-code). I thought that it was an ingenious solution, so I decided to explain it.

I think that this solution will be easier to understand if you first understand what the code is doing, so I decided to make a GIF about this.

![](https://i.imgur.com/aMo2GxQ.gif)

We loop through `height` 3 different times:

* The first time we loop through `height`, we loop from `0` to `len(height)` and make each value in a new array called `lToR` (left to right) the maximum value that we have reached so far in `height`.
* Then we can loop through `height` backwards from `len(height) - 1` to `0`. We can do the same thing except with a different array called `rToL` (right to left).
* Then, we can find the minimum of `lToR[i]` and `rToL[i]` to see the maximum level that our water will fill. Then we can subtract `height[i]` from the minimum to remove any extra water that would be in the place of `height[i]`.

You might want to take another look at the GIF. It might make some more sense since you know what is happening.


``` go
func trap(height []int) int {
    res := 0
    lToR := make([]int, len(height))
    rToL := make([]int, len(height))
    max := height[0]
    
    for i := 0; i < len(height); i++ {
        if height[i] > max { max = height[i] }
        lToR[i] = max
    }
    
    max = height[len(height) - 1]
    
    for i := len(height) - 1; i >= 0; i-- {
        if height[i] > max { max = height[i] }
        rToL[i] = max
    }
    
    for i := 0; i < len(height); i++ {        
        res += int(math.Min(float64(rToL[i]), float64(lToR[i]))) - height[i]
    }
    
    return res
}
```
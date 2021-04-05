---
title: "Leetcode 1465"
date: 2021-04-05T12:23:52-05:00
toc: false
images:
tags: [leetcode, golang, array, math]
---

[1465. Maximum Area of a Piece of Cake After Horizontal and Vertical Cuts](https://leetcode.com/problems/maximum-area-of-a-piece-of-cake-after-horizontal-and-vertical-cuts/)

**What The Problem Is Asking:**

The problem is telling us that there are cuts in a rectangular cake of width `w` and height `h`. The cuts are only horizontal and vertical.

The problem wants us to find the largest slice of cake.

**The Main Idea of This Solution:**

We can find the maximum area slice by finding the maximum vertical length between each horizontal portion and the maximum horizontal length between each slice and then multiplying them together to get the maximum area.

We might have some edge cases of the maximum slice is on the edge of the cake. An example can be shown with the following image:

![](https://i.imgur.com/oPk3uzd.jpg)

> In this image, the max slice is the distance from a cut to the edge of the cake. It is not between two cuts but between a cut and the edge of the cake.

**The Code:**

``` go
func maxArea(h int, w int, horizontalCuts []int, verticalCuts []int) int {
    sort.Ints(horizontalCuts)
    sort.Ints(verticalCuts)

    maxX := max(h - horizontalCuts[len(horizontalCuts) - 1],
    horizontalCuts[0])
    
    maxY := max(w - verticalCuts[len(verticalCuts) - 1],
    verticalCuts[0])

    for i := 0; i < len(horizontalCuts) - 1; i++ {
        maxX = max(maxX, horizontalCuts[i + 1]-horizontalCuts[i])
    }
    for i := 0; i < len(verticalCuts) - 1; i++ {
        maxY = max(maxY, verticalCuts[i + 1]-verticalCuts[i])
    }
    
    return (maxX * maxY) % 1000000007
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```
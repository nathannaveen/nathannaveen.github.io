---
title: "Leetcode 1779"
date: 2021-03-06T19:05:54-05:00
toc: false
images:
tags: [golang, leetcode, math, array, images]
---

[1779. Find Nearest Point That Has the Same X or Y Coordinate](https://leetcode.com/problems/find-nearest-point-that-has-the-same-x-or-y-coordinate/)

**What The Problem Is Asking:**

This problem asks you to find the smallest Manhattan distance from a given point to a matrix array of points called `points`.

The problem also asks you to only find the Manhattan distance of the points that have the same x value as the first given point, or the same y value as the given point.

Then the problem asks you to return the index of the minimum distance. If there is no point that has the same x value or the save y value `return -1`.

The Manhattan distance is the distance between two points by doing `abs(y1 - y2) + abs(x1 - x2)`.

**How The Solution Works:**

The main idea of this solution is that the problem asks to find the Manhattan distance of the points that have the same x or y value.

*The reason this is so important can be shown using an image:*

The average 2 points that don't have the same x value or y value can by shown by this image:

![](https://i.imgur.com/9VP0fWS.jpg)

This is for two points that have the same x value:

![](https://i.imgur.com/ppluacv.jpg)

> When the two `x` values are the same we just have to calculate the `y` part because when we subtract both the `x` parts we get `0`. This can be shown by the image above `(4 - 2) + (3 - 3) = 2 + 0 = 2`. The part `(4 - 2)` is the part that follows the `y` axis, and the part `(3 - 3)` is the `x` part.

This is for two points that have the same y value:

![](https://i.imgur.com/u4sdUZO.jpg)

> When both `y`'s are equal then the `y` part will be equal to zero so we wont have to calculate the `y` part. This can be show by the above example, `(1 - 1) + (4 - 1) = 3`. The `y` part `(1 - 1) = 0`.

So, when a point in the array has a `x` value equal to the given `x` value just calculate the `y` part. And when the `y` part of a point in the array is eqal to the given `y` value just calculate the `x` part.

**Extra Notes:**

This solution doesn't use a build in `math.Abs()` function because it would take longer to process than using a self made absolute function.

``` go
func nearestValidPoint(x int, y int, points [][]int) int {
    minimum := 100000000 // the max value has to be 10^4 * 10^4 = 10^8
    // 10^8 = 100,000,000
    
    resIndex := -1
    for i, point := range points {
        manhattanYAbs := absoluteValue(point[1] - y)
        manhattanXAbs := absoluteValue(point[0] - x)
        
        if point[0] == x && manhattanYAbs < minimum {
            minimum = manhattanYAbs
            resIndex = i
        } else if point[1] == y && manhattanXAbs < minimum {
            minimum = manhattanXAbs
            resIndex = i
        }
    }
    return resIndex
}

func absoluteValue(n int) int {
    if n < 0 {
        return -n
    }
    return n
}
```
---
title: "Leetcode 1232"
date: 2021-04-25T21:15:52-05:00
toc: false
images:
tags: [leetcode, golang, math]
---

[1232. Check If It Is a Straight Line](https://leetcode.com/problems/check-if-it-is-a-straight-line/)

The idea of this solution is we use `3` points to find whether two slopes are equal. We can use the equation:![image](https://assets.leetcode.com/users/images/b1a5e6f1-79e2-48fd-9595-97bbc4e799b5_1619403108.4592967.jpeg)
where `x0, x1, x2, y0, y1, y2` are all coordinates: ![image](https://assets.leetcode.com/users/images/436b4e59-b158-4901-b2fb-4865f2a5ab6a_1619403125.7176585.jpeg)
You might not understand the equation, so we can multiply divide both sides by `(x1 - x0)` and `(x2 - x1)` and we can get: ![image](https://assets.leetcode.com/users/images/a9321f76-d54f-4003-bed0-b772c0a5867f_1619403157.863461.jpeg)
The equation above is based off of a familar slope equation: ![image](https://assets.leetcode.com/users/images/a9f5ac94-57c1-476b-8747-e67e32b34b13_1619403182.6362567.jpeg)
The reason we are doing the original equation instead of the where we have divided both sides by `(x1 - x0)` and `(x2 - x1)` is we don't have to worry about dividing by `0` such as when we divide both sides by `(x1 - x0)` and `(x2 - x1)` but `(x1 - x0) = 0` or `(x2 - x1) = 0` we have to contumplate what to do.

**The Code:**

``` go
func checkStraightLine(coordinates [][]int) bool {
    x0, x1, := coordinates[0][0], coordinates[1][0]
    y0, y1 := coordinates[0][1], coordinates[1][1]

    for i := 1; i < len(coordinates); i++ {
        x2, y2 := coordinates[i][0], coordinates[i][1]
        if (x1 - x0) * (y2 - y1) != (y1 - y0) * (x2 - x1) {
            return false
        }
    }
    return true
}
```
---
title: "Leetcode 296"
date: 2021-03-22T11:57:20-04:00
toc: false
images:
tags: [leetcode, golang, array]
---

[296. Best Meeting Point](https://leetcode.com/problems/best-meeting-point/)

**What the Problem Is Asking:**

The problem gives us an input binary matrix array called `grid`. If `grid[i][j] = 1` then it is a house of a friend, and if `grid[i][j] = 0` then there is no house there.

The problem asks us to find a point on the grid that is the smallest distance to walk from all the houses. *Note that the point on the grid with the smallest distance can be on a house or an empty space.*

They want you to calculate manhattan distance. The manhattan distance is:

![](https://i.imgur.com/dW8q8xG.jpg)

Where the lines signify absolute value.

For example, the example input given by the problem statement in Leetcode is:

```
[
[1,0,0,0,1],
[0,0,0,0,0],
[0,0,1,0,0]
]
```

And the output is `6`. The meeting spot is `(2, 0)` because the one points are `(0, 0)(4, 0)(2, 2)`, and the manhattan distance from `(2, 0)` to the one points are `2`, so `2 + 2 + 2 = 6`.

**The Idea Of This Solution:**

The idea of this solution is pretty simple:

* First, add all the `1`'s on the grid (houses) to an array called `ones`.
* Next, create a variable called `minimum` and loop through the grid at all points, then find the manhattan distance from all house points to the current point and sum them up. Make `minimum` the minimum of `minimum` and `manhattanDistance`.


**How This Solution Works:**

* First, we find all the `1`'s (houses) in the grid and add them to an array of `point`. Point is a struct that I created to store the points, so `point.x` is the x value, and `point.y` is the value. Anyways continuing, we add all the values that have to the array of points.
* After that, we make a variable called `minimum` and set it to the max integer value `2^31 = 2147483648`.
* We loop through the grid again and go through every point and get the manhattan distance from the position of that point to all the positions of the houses and sum up all the distances. If the sum of all the distances is smaller than the minimum distance, make `minimum = manhattanDistance`.
* Then all we have to do is return the minimum distance.

**The Code:**

``` go
type point struct {
    x int
    y int
}

func minTotalDistance(grid [][]int) int {
    ones := []point{}

    for i := 0; i < len(grid); i++ {
        for j := 0; j < len(grid[0]); j++ {
            if grid[i][j] == 1 {
                ones = append(ones, point{x: j, y: i})
            }
        }
    }

    minimum := 2147483648
    for i := 0; i < len(grid); i++ {
        for j := 0; j < len(grid[0]); j++ {
            minimum = min(manhattanDistance(i, j, ones), minimum)
        }
    }
    return minimum
}

func manhattanDistance(i, j int, ones []point) int {
    sum := 0
    for _, thePoint := range ones {
        sum += abs(j-thePoint.x) + abs(i-thePoint.y)
    }
    return sum
}

func abs(a int) int {
    if a > 0 {
        return a
    }
    return -a
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

**Code Without The Struct Point:** *(This solution stores the points in a matrix array instead of a struct called point)*

``` go
func minTotalDistance(grid [][]int) int {
    ones := [][]int{}

    for i := 0; i < len(grid); i++ {
        for j := 0; j < len(grid[0]); j++ {
            if grid[i][j] == 1 {
                ones = append(ones, []int{i, j})
            }
        }
    }

    minimum := 2147483648
    for i := 0; i < len(grid); i++ {
        for j := 0; j < len(grid[0]); j++ {
            minimum = min(manhattanDistance(i, j, ones), minimum)
        }
    }
    return minimum
}

func manhattanDistance(i, j int, ones [][]int) int {
    sum := 0
    for _, one := range ones {
        sum += abs(j-one[1]) + abs(i-one[0])
    }
    return sum
}

func abs(a int) int {
    if a > 0 {
        return a
    }
    return -a
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```
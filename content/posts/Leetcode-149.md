---
title: "Leetcode 149"
date: 2022-02-04T12:12:27-06:00
toc: false
images:
tags: [leetcode, golang, math]
---
[149. Max Points on a Line](https://leetcode.com/problems/max-points-on-a-line/)

The idea of this solution is that we start off with a point and then use all the other points to make a line from the start point to one of the other points. Then we can find the slope of the line. Then we can find which slope has the highest number of points.

``` go
func maxPoints(points [][]int) int {
    max := 0
    
    for i := 0; i < len(points); i++ {
        m := make(map[float64] int) // slope : number of points on the slope
        for j := 0; j < len(points); j++ {
            x1, x2, y1, y2 := points[i][0], points[j][0], points[i][1], points[j][1]
            
            slope := float64(y2 - y1) / float64(x2 - x1)
            m[slope]++
        }
        
        for _, b := range m {
            newB := (b + 1)
            if newB > max { max = newB }
        }
    }
    
    if len(points) == 1 { return 1 }
    
    return max
}
```
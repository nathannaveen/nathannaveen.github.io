---
title: "Leetcode 1861"
date: 2022-03-03T15:29:12-06:00
toc: false
images:
tags: [leetcode, golang, images, matrix]
---

[1861. Rotating the Box](https://leetcode.com/problems/rotating-the-box/)

## The Base Idea of This Solution:

I would say that this solution is like a line sweep solution.

This solution uses the fact that if an empty place separates two stones, they will be next to each other when the box is rotated. This is just like in the example input:

![](https://i.imgur.com/HGdCvu3.png)

So this solution just moves all the stones together until we hit the end of the box or an obstacle.

## What This Solution is Doing:

This solution starts at the front of a row, and then it finds the number of stones before an obstacle or the end of the row.

I think that explaining this solution will be easier with an example, so we can take an example of box = `[["#", "#", ".", "#", ".", "*", ".", "#", "."]]`

![](https://i.imgur.com/VJdYcZ7.gif)


We move the stones by doing the following: (Note: I made the new stones red, but that is only for visualization. The stones in the code are not different)

![](https://i.imgur.com/kto58RO.gif)

``` go
func rotateTheBox(box [][]byte) [][]byte {
    n, m := len(box), len(box[0])
    
    for row := 0; row < n; row++ {
        numStones := 0
        start := 0
        for i := 0; i < m; i++ {
            if box[row][i] == '#' {
                numStones++
            } else if box[row][i] == '*' {
                for j := i - numStones; j < i; j++ {
                    box[row][j] = '#'
                }
                for j := start; j < i - numStones; j++ {
                    box[row][j] = '.'
                }
                
                numStones = 0
                start = i + 1
            }
        }
        
        for j := m - numStones; j < m; j++ { 
            box[row][j] = '#'
        }
        for j := start; j < m - numStones; j++ {
            box[row][j] = '.'
        }
    }
    
    res := make([][]byte, m)
    
    for i := 0; i < m; i++ {
        arr := make([]byte, n)
        for row := n - 1; row >= 0; row-- {
            arr[n - 1 - row] = box[row][i]
        }
        res[i] = arr
    }
    
    return res
}
```
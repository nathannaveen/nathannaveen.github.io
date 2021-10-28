---
title: "Leetcode 200"
date: 2021-10-28T15:58:14-05:00
toc: false
images:
tags: [golang, leetcode, images, array]
---

[200. Number of Islands](https://leetcode.com/problems/number-of-islands/)

The idea of this solution can be portrayed in its ***most basic*** idea by the following image:

![](https://i.imgur.com/jcYOE5j.png)


``` go
var doneAlready = make(map[[2]int] bool)

func numIslands(grid [][]byte) int {
    res := 0
    doneAlready = make(map[[2]int] bool)
    
    for i := 0; i < len(grid); i++ {
        for j := 0; j < len(grid[0]); j++ {
            if helper(grid, i, j) {
                res++
            }
        }
    }
    
    return res
}

func helper(grid [][]byte, i, j int) bool {
    
    temp := [2]int{i, j}
    
    if i < 0 || i >= len(grid) || j < 0 || j >= len(grid[0]) || 
        doneAlready[temp] || grid[i][j] == '0' {
        
        return false
    }
    
    doneAlready[temp] = true
    
    helper(grid, i - 1, j)
    helper(grid, i + 1, j)
    helper(grid, i, j - 1)
    helper(grid, i, j + 1)
    
    return true
}
```

**This is a variation of my Max Area of Island solution:**

``` go
var doneAlready = make(map[[2]int] bool)

func numIslands(grid [][]byte) int {
    res := 0
    doneAlready = make(map[[2]int] bool)
    
    for i := 0; i < len(grid); i++ {
        for j := 0; j < len(grid[0]); j++ {
            if helper(grid, i, j) != 0 {
                res++
            }
        }
    }
    
    return res
}

func helper(grid [][]byte, i, j int) int {
    
    /* 
    This part is for finding the area of the island, 
    but we can just check whether the area of the island 
    is greater than 0, if so we know there is an island.
    
    This is based off of Leetcode 695
    */
    
    if i < 0 || i >= len(grid) || j < 0 || j >= len(grid[0]) || 
        doneAlready[point{ i, j }] || grid[i][j] == '0' {
        
        return 0
    }
    
    doneAlready[point{ i, j }] = true
    
    return 1 + helper(grid, i - 1, j) + helper(grid, i + 1, j) + 
        helper(grid, i, j - 1) + helper(grid, i, j + 1)
}
```
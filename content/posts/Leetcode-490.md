---
title: "Leetcode 490"
date: 2022-02-04T12:12:59-06:00
toc: false
images:
tags: [leetcode, golang, breath first search, images]
---

[490. The Maze](https://leetcode.com/problems/the-maze/)

The idea of this solution is to use BFS to find every path. And then if we find a path that leads to the destination we can return `true`.

I made a gif that basicly gives an example of all paths from start. Note that this is the same example as the problem statment.

![](https://i.imgur.com/Dq6Pei6.gif)

While in the gif we just see the paths, in the code we have to make the path, meaning that we have to make a path one move at a time.

``` go
type point struct {
    i, j int
}

func hasPath(maze [][]int, start []int, destination []int) bool {
    stack := []point{ point{ start[0], start[1] } }
    visited := make(map[point] bool)
    n, m := len(maze), len(maze[0])
    
    helper := func(moveI, moveJ, i, j int) {
        for i < n && j < m && i >= 0 && j >= 0 && maze[i][j] != 1 {
            i += moveI
            j += moveJ
        }
        i -= moveI
        j -= moveJ
        
        if !visited[point{ i, j }] {
            stack = append(stack, point{ i, j })
            visited[point{ i, j }] = true
        }
    }
    
    for len(stack) != 0 {
        pop := stack[0]
        stack = stack[1:]
        
        if pop.i == destination[0] && pop.j == destination[1] {
            return true
        }
        
        helper(1, 0, pop.i, pop.j)
        helper(-1, 0, pop.i, pop.j)
        helper(0, 1, pop.i, pop.j)
        helper(0, -1, pop.i, pop.j)
    }
    
    return false
}
```

***

I have put `helper` outside of `hasPath`, so it might be easier to read.

``` go
type point struct {
    i, j int
}

var stack = []point{ }
var visited = make(map[point] bool)
var globalMaze = [][]int{}

func helper(moveI, moveJ, i, j int) {
    n, m := len(globalMaze), len(globalMaze[0])
    for i < n && j < m && i >= 0 && j >= 0 && globalMaze[i][j] != 1 {
        i += moveI
        j += moveJ
    }
    i -= moveI
    j -= moveJ

    if !visited[point{ i, j }] {
        stack = append(stack, point{ i, j })
        visited[point{ i, j }] = true
    }
}

func hasPath(maze [][]int, start []int, destination []int) bool {
    stack = []point{ point{ start[0], start[1] } }
    visited = make(map[point] bool)
    globalMaze = maze
    // n, m := len(maze), len(maze[0])
    
    for len(stack) != 0 {
        pop := stack[0]
        stack = stack[1:]
        
        if pop.i == destination[0] && pop.j == destination[1] {
            return true
        }
        
        helper(1, 0, pop.i, pop.j)
        helper(-1, 0, pop.i, pop.j)
        helper(0, 1, pop.i, pop.j)
        helper(0, -1, pop.i, pop.j)
    }
    
    return false
}
```
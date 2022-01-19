---
title: "Leetcode 778"
date: 2022-01-19T13:00:51-06:00
toc: false
images:
tags: [leetcode, golang, heap]
---

[778. Swim in Rising Water](https://leetcode.com/problems/swim-in-rising-water/)

Time complexity = O(n<sup>2</sup>log(n))
* n<sup>2</sup> is for looping through all the elements in `grid` where `n == len(grid)`. Note that it is n<sup>2</sup> instead of `n * m` because `len(grid) == len(grid[0])`.
* log(n) is for the priority queue. Note that this is a computer science log(n) when log(n) == log<sub>2</sub>(n) instead of math where log(n) == log<sub>10</sub>(n).

``` go
type key struct {
    max int
    r, c int
}

type RowAndCol struct {
    r, c int
}

type KeyHeap []key

func (h KeyHeap) Len() int           { return len(h) }
func (h KeyHeap) Less(i, j int) bool { return h[i].max < h[j].max }
func (h KeyHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *KeyHeap) Push(x interface{}) {
	*h = append(*h, x.(key))
}

func (h *KeyHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

func swimInWater(grid [][]int) int {
    h := &KeyHeap{}
	heap.Init(h)
    heap.Push(h, key{ grid[0][0], 0, 0 })
    
    visited := make(map[RowAndCol] bool)
    n := len(grid) // The grid is a square, so len(grid) == len(grid[0])
    
    addToHeap := func(r, c, max int) {
        if r >= 0 && r < n && c >= 0 && c < n && !visited[RowAndCol{ r, c }] {
            heap.Push(h, key{ int(math.Max(float64(grid[r][c]), float64(max))), r, c })
        }
    }
    
    for h.Len() != 0 {
        pop := heap.Pop(h).(key)
        r, c := pop.r, pop.c
        
        if r == n - 1 && c == n - 1 { // if the bottom right most square
            return pop.max
        }
        
        visited[ RowAndCol{ r, c } ] = true
        
        addToHeap(r - 1, c, pop.max)
        addToHeap(r + 1, c, pop.max)
        addToHeap(r, c - 1, pop.max)
        addToHeap(r, c + 1, pop.max)
    }
    return -1
}
```
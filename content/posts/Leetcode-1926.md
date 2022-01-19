---
title: "Leetcode 1926"
date: 2022-01-19T13:01:49-06:00
toc: false
images:
tags: [leetcode, golang, images, heap]
---

[1926. Nearest Exit from Entrance in Maze](https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/)

I decided to try a solution that is similar to Dijkstra's. Even though the positions are not weighted, we can make the distance the weight, so the nodes farther away from the start have a higher weight than the closer ones. All in all, we have to find the node on the edge with the smallest weight.

This can be shown using the following image:

![](https://i.imgur.com/P6DRDqC.jpg)

In the image above, the numbers represent the distance from the start (The weight of the node).

You might be thinking that we can get the manhattan distance to the nearest edge, but that won't work because we have walls in the middle. For example:

![](https://i.imgur.com/QId8tX0.jpg)

This is the reason that I decided to use Dijkstra's algorithum.

``` go
type KeyHeap []key

func (h KeyHeap) Len() int           { return len(h) }
func (h KeyHeap) Less(i, j int) bool { return h[i].dist < h[j].dist }
func (h KeyHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *KeyHeap) Push(x interface{}) { *h = append(*h, x.(key)) }

func (h *KeyHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

// Everything above is the Min Heap

type pos struct {
    i, j int
}

type key struct {
    p pos // position of current move
    dist int // distance from enterence
}

func nearestExit(maze [][]byte, entrance []int) int {
    visited := make(map[pos] bool)
    visited[pos{ entrance[0], entrance[1] }] = true
    h := &KeyHeap{ key{ pos{ entrance[0], entrance[1] }, 0 } }
    n, m := len(maze), len(maze[0])
    
    addToHeap := func(i, j, dist int) {
        if i >= 0 && j >= 0 && i < n && j < m && !visited[pos{ i, j }] && maze[i][j] != '+' {
            heap.Push(h, key{ pos{ i, j }, dist })
            visited[pos{ i, j }] = true
        }
    }
    
    for h.Len() > 0 {
        pop := heap.Pop(h).(key)
        i, j, dist := pop.p.i, pop.p.j, pop.dist
        
        if (i == 0 || j == 0 || i == n - 1 || j == m - 1) && dist != 0 {
            // if position is on the edge, and position is not where we started.
            return dist
        }
        
        // Calling addToHeap() so we can add each adjacent node to the Min Heap
        
        addToHeap(i + 1, j, dist + 1)
        addToHeap(i - 1, j, dist + 1)
        addToHeap(i, j + 1, dist + 1)
        addToHeap(i, j - 1, dist + 1)
    }
    
    return -1
}
```
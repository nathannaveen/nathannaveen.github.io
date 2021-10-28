---
title: "Leetcode 684"
date: 2021-10-28T15:57:56-05:00
toc: false
images:
tags: [leetcode, golang, union find]
---

[684. Redundant Connection](https://leetcode.com/problems/redundant-connection/)

The idea of this solution is to use union find to connect all the edges together, then in the `Union()` function if `edge[0]` parent equals `edge[1]` parent we have a redundant connection.

Note that I modified the average union find for this problem.

``` go
type unionFind struct {
    parent []int
    n      int
}

func (this *unionFind) Find(x int) int {
    if x != this.parent[x] {
        this.parent[x] = this.Find(this.parent[x])
        return this.parent[x]
    }

    return x
}

func (this *unionFind) Union(x int, y int) bool {
    temp1 := this.Find(x)
    temp2 := this.Find(y)

    if temp1 != temp2 {
        this.n--
        this.parent[temp1] = temp2
        return true
    } else {
        return false // This signifies there is a redundant connection
    }
}

func findRedundantConnection(edges [][]int) []int {
    res := []int{}
    
    u := unionFind{ make([]int, len(edges)), len(edges) }
    
    for i := 0; i < len(edges); i++ {
        u.parent[i] = i
    }
    
    for _, edge := range edges {
        if !u.Union(edge[0] - 1, edge[1] - 1) { // checking for connections
            res = edge
        }
    }
    
    return res
}
```
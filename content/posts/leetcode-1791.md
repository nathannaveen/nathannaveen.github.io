---
title: "Leetcode 1791"
date: 2021-03-24T12:35:49-04:00
toc: false
images:
tags: [leetcode, golang, array]
---

[1791. Find Center of Star Graph](https://leetcode.com/problems/find-center-of-star-graph/)

This solution is straightforward.

* We first make an array called `nodes` with `edges + 1` values. We need `edges + 1` values because `len(edges)` is the number of edge nodes, and the `+ 1` is for the center node. We only need `edges + 1` nodes because the nodes are from `1...n`.
* Then we loop through `edges` and get each `edge`. `edge[0]` and `edge[1]` are the two values given per edge. One of them is the center node, and the other one is the edge. We add one to `node[edge[0]]` and `node[edge[1]]`.
* Inside the loop we check whether `nodes[edge[0]]` and `nodes[edge[1]]` equals `2` because the only node that repeats twice is the center node. And if `nodes[edge[0]] == 2` or `nodes[edge[1]] == 2` we should return the center node.

*(Note: The problem says `3 <= n <= 10^5`, but if it didn't at the end the code returns `edge[0][0]` becuase of the test case `len(edges) == 1`)*

``` go
func findCenter(edges [][]int) int {
    nodes := make([]int, len(edges) + 2)

    for _, edge := range edges {
        nodes[edge[0]]++
        nodes[edge[1]]++
        if nodes[edge[0]] == 2 {
            return edge[0]
        }
        if nodes[edge[1]] == 2 {
            return edge[1]
        }
    }
    return edges[0][0]
}
```
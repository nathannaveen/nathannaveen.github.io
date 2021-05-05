---
title: "Leetcode 103"
date: 2021-05-03T10:26:05-05:00
toc: false
images:
tags: [tree, golang, leetcode, breath first search, queue]
---

[103. Binary Tree Zigzag Level Order Traversal
](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)

The idea of this solution is to use BFS and a variable called `fromRight`. The `fromRight` checks whether the current row needs to be traversed from the right. If it does, we prepend all the nodes to `temp`.

``` go
func zigzagLevelOrder(root *TreeNode) [][]int {
	var res [][]int
	queue := []*TreeNode{root}
	fromRight := false

	for len(queue) != 0 {
		temp := []int{}
		n := len(queue)

		for i := 0; i < n; i++ {
			node := queue[0]
			queue = queue[1:]
			if node != nil {
				if fromRight {
					temp = append([]int{node.Val}, temp...)
				} else {
					temp = append(temp, node.Val)
				}
				queue = append(queue, node.Left)
				queue = append(queue, node.Right)
			}
		}
		res = append(res, temp)
		fromRight = !fromRight
	}
	return res[:len(res)-1]
}
```
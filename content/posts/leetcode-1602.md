---
title: "Leetcode 1602"
date: 2021-05-03T10:17:00-05:00
toc: false
images:
tags: [leetcode, golang, queue, breath first search, tree]
---

[1602. Find Nearest Right Node in Binary Tree](https://leetcode.com/problems/find-nearest-right-node-in-binary-tree/)

The idea of this solution is to use a queue to loop through the tree, and then for every node we loop through, we check whether the `node.Val == u.Val`, if so, we go through the if statement `if i == n - 1`. Using this, we know whether the node is the last. If so, we return `nil`. Else we return the node after the current node.

``` go
func findNearestRightNode(root *TreeNode, u *TreeNode) *TreeNode {
	queue := []*TreeNode{root}

	for len(queue) != 0 {
		n := len(queue)
		for i := 0; i < n; i++ {
			node := queue[0]
			queue = queue[1:]
			if node.Val == u.Val {
				if i == n-1 {
					return nil
				} else {
					return queue[0]
				}
			}
			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}
	}

	return nil
}
```
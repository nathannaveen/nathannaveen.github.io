---
title: "Leetcode 958"
date: 2021-05-05T15:45:43-05:00
toc: false
images:
tags: [leetcode, golang, tree, queue, breath first search]
---

[958. Check Completeness of a Binary Tree](https://leetcode.com/problems/check-completeness-of-a-binary-tree/)

This solution uses the facts that:

* If there is a next row, we know that the whole row has to be full
* If there is no next row, all the nodes have to be to the left.

If you have already looked at the code, you might have seen that we check whether there is a next row by checking whether `queue[0].Left != nil`. You might think what if `queue[0].Right != nil` while `queue[0].Left == nil`. This will work because if `queue[0].Right != nil` and `queue[0].Left == nil` we know that the row is not full if there is a next row, and if there is no next row, we know that not all nodes are to the left.

``` go
func isCompleteTree(root *TreeNode) bool {
	queue := []*TreeNode{root}

	for len(queue) != 0 {
		isNextRow := false
		n := len(queue)

		if queue[0] != nil && queue[0].Left != nil {
			isNextRow = true
		}

		for i := 0; i < n; i++ {
			node := queue[0]
			queue = queue[1:]
			if isNextRow && node == nil {
				return false
			}
			if node == nil && len(queue) != 0 && queue[0] != nil {
				return false
			}
			if node != nil {
				queue = append(queue, node.Left, node.Right)
			}
		}
	}
	return true
}
```
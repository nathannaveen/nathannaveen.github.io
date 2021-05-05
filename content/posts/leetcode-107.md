---
title: "Leetcode 107"
date: 2021-05-03T10:17:25-05:00
toc: false
images:
tags: [leetcode, golang, breath first search, queue]
---

[107. Binary Tree Level Order Traversal II](https://leetcode.com/problems/binary-tree-level-order-traversal-ii/)

*First solution: faster than 100%*
*Second solution: faster than 100%*

I put in the edited for people who don't code in go because people who don't code in go won't understand `res = append(res[:0], append([][]int{temp}, res[0:]...)...)`. So if you don't understand the first solution look at the edited.

**First solution:**

``` go
func levelOrderBottom(root *TreeNode) [][]int {
	res := [][]int{}
	queue := []*TreeNode{root}

	for len(queue) != 0 {
		n := len(queue)
		temp := []int{}
		for i := 0; i < n; i++ {
			node := queue[0]
			queue = queue[1:]
			if node != nil {
				temp = append(temp, node.Val)
				queue = append(queue, node.Left)
				queue = append(queue, node.Right)
			}
		}
		if len(temp) != 0 {
			res = append(res[:0], append([][]int{temp}, res[0:]...)...)
		}
	}

	return res
}
```

**The edited solution:**

``` go
func levelOrderBottom(root *TreeNode) [][]int {
	res := [][]int{}
	queue := []*TreeNode{root}

	if root == nil {
		return make([][]int, 0)
	}

	for len(queue) != 0 {
		n := len(queue)
		h := []int{}
		for i := 0; i < n; i++ {
			node := queue[0]
			queue = queue[1:]
			h = append(h, node.Val)
			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}
		res = append(res, h)
	}
	left, right := 0, len(res)-1

	for left < right {
		res[left], res[right] = res[right], res[left]
		left++
		right--
	}

	return res
}
```

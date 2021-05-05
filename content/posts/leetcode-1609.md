---
title: "Leetcode 1609"
date: 2021-05-03T10:17:57-05:00
toc: false
images:
tags: [tree, golang, leetcode, breath first search, queue]
---

[1609. Even Odd Tree](https://leetcode.com/problems/even-odd-tree/)

The main idea of this solution is to use BFS, but the details are:

* We have a counter called `row` to count every row (We use this to check whether it is an even row or an odd row).
* Then we have a queue that has only the root to start.
* We loop while `len(queue) != 0`
* Then we make a variable `n` equal to the `len(queue)`. We need this because the length of `queue` changes.
* Then we loop from `0` to `n - 1`.
* Inside the loop, we find the current node and removed it from `queue`.
* The first `if` statement is for whether the row is even. If so, and the current node's value is even, we know we have to return `false`. Or if the node is not the last in the row and it is greater than or equal to the following node, we know that we have to return `false`.
* Then we can check `if row % 2 == 1 && (node.Val % 2 == 1 || (i2 != n - 1 && node.Val <= queue[0].Val))`. The `node.Val % 2 == 1` is for checking whether we are on an odd numbered row. Then `node.Val % 2 == 1` is for checking whether the current node is odd. The `i2 != n - 1 && node.Val <= queue[0].Val` is for checking whether the current node is not the last node in the row, and whether the current nodes value is smaller than or equal to the next nodes value. If any of these things happen the code returns `false`.
* Then we have to check whether the `node.Left`, and the `node.Right` are not equal to `nil`. If so, we can append them into the queue.
* Outside of this loop, we do `row++` to move onto the next row.
* And if the code hasn't returned `false` we can return `true`.

``` go
func isEvenOddTree(root *TreeNode) bool {
	row := 0
	queue := []*TreeNode{root}

	for len(queue) != 0 {
		n := len(queue)
		for i2 := 0; i2 < n; i2++ {
			node := queue[0]
			queue = queue[1:]
			if row % 2 == 0 && (node.Val % 2 == 0 ||
			(i2 != n - 1 && node.Val >= queue[0].Val)) {
			
				return false
			}
			if row % 2 == 1 && (node.Val % 2 == 1 ||
			(i2 != n - 1 && node.Val <= queue[0].Val)) {
			
				return false
			}
			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}
		row++
	}
	return true
}
```
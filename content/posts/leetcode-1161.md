---
title: "Leetcode 1161"
date: 2021-05-03T10:16:45-05:00
toc: false
images:
tags: [leetcode, golang, tree, breath first search, queue]
---

[1161. Maximum Level Sum of a Binary Tree](https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/)

**What the Problem is Asking Us:**

The problem is asking us to go through each level of the binary tree and find the maximum sum and make that the returned level, but if the maximum sum is on two levels, we get the minimum level of those two.

**The Code:**

``` go
func maxLevelSum(root *TreeNode) int {
    maximum, minLevel, level := root.Val, 1, 0
    queue := []*TreeNode{root}

    for len(queue) != 0 {
        sum, n := 0, len(queue)

        for i := 0; i < n; i++ {
            node := queue[0]
            queue = queue[1:]
            sum += node.Val

            if node.Left != nil {
                queue = append(queue, node.Left)
            }
            if node.Right != nil {
                queue = append(queue, node.Right)
            }
        }
        level++
        if sum > maximum {
            maximum, minLevel = sum, level
        }
    }
    return minLevel
}
```
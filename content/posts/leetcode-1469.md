---
title: "Leetcode 1469"
date: 2021-03-18T14:11:02-04:00
toc: false
images:
tags: [leetcode, golang, tree, array]
---

[1469. Find All The Lonely Nodes](https://leetcode.com/problems/find-all-the-lonely-nodes/)

The idea of this solution is pretty simple, there are just four conditions:

* if there is a left node but not a right node
* if there is a right node but not a left node
* if there is both a left and a right node
* if there are neither a left or a right node

We can ignore the part where there is neither a left or a right node.

If there is a left node but not a right node or a right node with no left node. we can add that node to the resulting array because it is a lonely node.

``` go
func getLonelyNodes(root *TreeNode) []int {
    stack := []*TreeNode{root}
    res := []int{}

    for len(stack) != 0 {
        pop := stack[len(stack)-1]
        stack = stack[:len(stack)-1]

        if pop.Left != nil && pop.Right == nil {
            res = append(res, pop.Left.Val)
            stack = append(stack, pop.Left)
        } else if pop.Left == nil && pop.Right != nil {
            res = append(res, pop.Right.Val)
            stack = append(stack, pop.Right)
        } else if pop.Left != nil && pop.Right != nil {
            stack = append(stack, pop.Left, pop.Right)
        }
    }
    return res
}
```
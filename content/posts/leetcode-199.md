---
title: "Leetcode 199"
date: 2021-07-25T18:33:21-05:00
toc: false
images:
tags: [leetcode, golang, tree]
---

[199. Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)

The idea of both solutions is pretty simple, we just use BFS to iterate through all the rows and append the last element in the row (The right most element).

**Iterative:**

``` go
func rightSideView(root *TreeNode) []int {
	res := []int{}
    if root != nil {
        queue := []*TreeNode{ root }

        for len(queue) != 0 {
            n := len(queue)
            res = append(res, queue[n - 1].Val)

            for i := 0; i < n; i++ {
                pop := queue[0]
                queue = queue[1:]

                if pop.Left != nil {
                    queue = append(queue, pop.Left)
                }
                if pop.Right != nil {
                    queue = append(queue, pop.Right)
                }
            }
        }
    }
    
	return res
}
```

**Recursive:**

``` go
func rightSideView(root *TreeNode) []int {
    return helper([]int{}, []*TreeNode{root})
}

func helper(res []int, queue []*TreeNode ) []int {
    
    if queue[len(queue) - 1] != nil {
        n := len(queue)
        res = append(res, queue[len(queue) - 1].Val)

        for i := 0; i < n; i++ {
            pop := queue[0]
            queue = queue[1:]
            
            if pop.Left != nil { queue = append(queue, pop.Left) }
            if pop.Right != nil { queue = append(queue, pop.Right) }
        }

        if len(queue) != 0 {
            res = helper(res, queue)
        }
    }
    
    return res
}
```
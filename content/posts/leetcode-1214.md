---
title: "Leetcode 1214"
date: 2021-03-21T11:36:17-04:00
toc: false
images:
tags: [leetcode, golang, tree, array]
---

This is a simple depth-first-search (dfs) solution. We first iterate through the first tree and then the second tree. We add all the values from the first tree to the array `arr1` and then add the second tree's values to the array `arr2`. After that, we find whether two values from `arr1, arr2` summed up equals `target` return `true`.

``` go
func twoSumBSTs(root1 *TreeNode, root2 *TreeNode, target int) bool {
    stack := []*TreeNode{root1}
    arr1 := []int{}
    arr2 := []int{}

    for len(stack) != 0 {
        pop := stack[len(stack)-1]
        stack = stack[:len(stack)-1]

        if pop != nil {
            stack = append(stack, pop.Left, pop.Right)
            arr1 = append(arr1, pop.Val)
        }
    }

    stack = append(stack, root2)

    for len(stack) != 0 {
        pop := stack[len(stack)-1]
        stack = stack[:len(stack)-1]

        if pop != nil {
            stack = append(stack, pop.Left, pop.Right)
            arr2 = append(arr2, pop.Val)
        }
    }

    for _, i2 := range arr1 {
        for _, i4 := range arr2 {
            if i2+i4 == target {
                return true
            }
        }
    }
    return false
}
```
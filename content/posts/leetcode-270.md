---
title: "Leetcode 270"
date: 2021-03-18T14:10:52-04:00
toc: false
images:
tags: [leetcode, tree, golang]
---

[270. Closest Binary Search Tree Value](https://leetcode.com/problems/closest-binary-search-tree-value/)

The idea of this solution is pretty simple. We have to iterate through the tree and then find the absolute minimum difference between the target and the value from the tree. *(Keep in mind that we want everything to be a float64, so then we get proper comparisons)*. This can be shown with the equation:

![](https://i.imgur.com/W0DvaCc.jpg)

**The Code:**

``` go
func closestValue(root *TreeNode, target float64) int {
    stack := []*TreeNode{root}
    minimum := float64(1000000000)
    number := 0

    for len(stack) != 0 {
        pop := stack[len(stack)-1]
        stack = stack[:len(stack)-1]

        if pop != nil {
            h := abs(target - float64(pop.Val))
            if h < minimum {
                number = pop.Val
                minimum = h
            }
            stack = append(stack, pop.Left, pop.Right)
        }
    }
    return number
}

func abs(a float64) float64 {
    if a > 0 {
        return a
    }
    return -a
}
```
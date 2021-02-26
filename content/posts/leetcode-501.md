---
title: "Leetcode 501"
date: 2021-02-25T15:48:23-05:00
toc: false
images:
tags: [tree, leetcode, map, golang]

---

[501. Find Mode in Binary Search Tree](https://leetcode.com/problems/find-mode-in-binary-search-tree)

The idea of this solution is to iterate through the tree, and add all the values to a map. Then get all the max values of the map and add them to the result array.

```
func findMode(root *TreeNode) []int {
    max := 0
    m := make(map[int]int)
    res := []int{}
    stack := []*TreeNode{}
    stack = append(stack, root)

    for len(stack) != 0 {
        pop := stack[len(stack)-1]
        stack = stack[:len(stack)-1]

        if pop != nil {
            m[pop.Val]++
            stack = append(stack, pop.Left, pop.Right)
        }
    }

    for i, i2 := range m {
        if i2 > max {
            res = []int{i}
            max = i2
        } else if i2 == max {
            res = append(res, i)
        }
    }
    return res
}
```

---
title: "Leetcode 272"
date: 2021-03-19T09:50:42-04:00
toc: false
images:
tags: [leetcode, golang, tree, array, sort]
---
[272. Closest Binary Search Tree Value II](https://leetcode.com/problems/closest-binary-search-tree-value-ii/)

The idea of this solution is pretty simple, we just iterate through the tree and append the absolute difference between the popped value and `target` to an array called `differences`, then we append the popped value to an array called `eachNumber`. After we have iterated through the whole array we can sort the difference array while sorting the `eachNumber` array. After that we return the first `k` numbers from `eachNumber`.

``` go
func closestKValues(root *TreeNode, target float64, k int) []int {
    eachNumber := []int{}
    differences := []float64{}
    stack := []*TreeNode{root}

    for len(stack) != 0 {
        pop := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        if pop != nil {
            differences = append(differences, abs(float64(pop.Val)-target))
            eachNumber = append(eachNumber, pop.Val)
            stack = append(stack, pop.Left, pop.Right)
        }
    }

    for i := 1; i < len(differences); i++ {
        if i >= 1 && differences[i-1] > differences[i] {
            eachNumber[i], eachNumber[i-1] = eachNumber[i-1], eachNumber[i]
            differences[i], differences[i-1] = differences[i-1], differences[i]
            i -= 2
        }
    }

    return eachNumber[:k]
}

func abs(a float64) float64 {
    if a > 0 {
        return a
    }
    return -a
}
```

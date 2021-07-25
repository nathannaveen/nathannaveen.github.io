---
title: "Leetcode 590"
date: 2021-07-25T18:32:55-05:00
toc: false
images:
tags: [leetcode, golang, tree]
---

[590. N-ary Tree Postorder Traversal](https://leetcode.com/problems/n-ary-tree-postorder-traversal/)

**The First Solution:**

This solution seems pretty self-explanatory.

``` go
func postorder(root *Node) []int {
    return helper(root, []int{})
}

func helper(r *Node, l []int)[]int{
    if r != nil{
        for _,item := range r.Children{
            l = helper(item,l)
        }
        l = append(l,r.Val)        
    }
    return l
}
```

**The Second Solution:**

If you look at the following code and don't understand, it is probably because of: `r.Children[len(r.Children) - i - 1]`, but if you look at it carefully, you will see that it is the same as reversing `r.Children` except cleaner.

``` go
func postorder(root *Node) []int {
    return helper(root, []int{})
}

func helper(r *Node, l []int) []int {
    if r != nil {
        l = append(l[:0], append([]int{r.Val}, l[0:]...)...)
        for i := range r.Children {
            l = helper(r.Children[len(r.Children) - i - 1], l)
        }
    }
    return l
}
```
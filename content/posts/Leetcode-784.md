---
title: "Leetcode 784"
date: 2022-03-03T15:29:05-06:00
toc: false
images:
tags: [leetcode, golang, string, tree, images]
---

[784. Letter Case Permutation](https://leetcode.com/problems/letter-case-permutation/)

The idea of this solution is pretty simple, we can basically construct a tree.

![](https://i.imgur.com/T1cx58n.gif)

``` go
func letterCasePermutation(s string) []string {
    return helper(s, "")
}

func helper(s string, a string) []string {
    if len(s) == 0 {
        return []string{ a }
    }
    
    res := []string{}
    letter := s[0] // first letter
    s = s[1:]
    
    if letter >= 'a' { // lowercase
        res = append(res, helper(s, a + string(letter - 32))...)
    } else if letter >= 'A' { // uppercase
        res = append(res, helper(s, a + string(letter + 32))...)
    }
    res = append(res, helper(s, a + string(letter))...)
    
    return res
}
```
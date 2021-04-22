---
title: "Leetcode 392"
date: 2021-04-19T10:48:01-04:00
toc: false
images:
tags: [leetcode, golang, string]
---

[392. Is Subsequence](https://leetcode.com/problems/is-subsequence/)

``` go
func isSubsequence(s string, t string) bool {
    sCounter, i := 0, 0

    for i < len(t) && sCounter < len(s) {
        if t[i] == s[sCounter] {
            sCounter++
        }
        i++
    }
    return sCounter == len(s)
}
```
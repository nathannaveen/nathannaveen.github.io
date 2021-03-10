---
title: "Leetcode 1750"
date: 2021-03-09T21:04:18-05:00
toc: false
images:
tags: [leetcode, golang, images, string, two pointer]
---

[1750. Minimum Length of String After Deleting Similar Ends](https://leetcode.com/problems/minimum-length-of-string-after-deleting-similar-ends/)

The idea of this solution is pretty simple, so it can be shown with this image:


![](https://i.imgur.com/QAmU64G.jpg)


``` go
func minimumLength(s string) int {

    for len(s) > 1 && s[0] == s[len(s)-1] {
        end := s[len(s)-1]
        lenS := len(s)

        for i := 0; i < lenS; i++ {
            if s[len(s)-1] != s[0] {
                s = s[:len(s)-i-1]
                break
            }
        }
        lenS = len(s)
        for i := 0; i < lenS; i++ {
            if s[0] != end {
                s = s[0+i+1:]
                break
            }
        }
    }

    return len(s)
}

```
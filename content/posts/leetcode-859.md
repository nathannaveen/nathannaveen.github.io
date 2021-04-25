---
title: "Leetcode 859"
date: 2021-04-22T09:14:13-04:00
toc: false
images:
tags: [leetcode, golang, string]
---


[859. Buddy Strings](https://leetcode.com/problems/buddy-strings/)

To check whether two strings are buddy strings we have to check whether:

* `len(a) == len(b)`
* if `a == b`, and there is a duplicate letter in `a`
* if there are `a[j] != b[j]` and `a[i] != b[i]` and `a[j] == b[i]` and `a[i] == b[j]` 

``` go
func buddyStrings(a string, b string) bool {
    if len(a) != len(b) {
        return false
    }

    m := make(map[uint8]int)
    temp := -1
    counter := 0

    for i := 0; i < len(a); i++ {
        m[a[i]]++
        if a == b && m[a[i]] == 2 {
            return true
        }
        if a[i] != b[i] {
            counter++
            if temp == -1 {
                temp = i
            } else if a[temp] != b[i] || a[i] != b[temp] {
                return false
            }
        }
    }

    return counter == 2
}
```
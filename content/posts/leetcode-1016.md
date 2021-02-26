---
title: "Leetcode 1016"
date: 2021-02-26T13:58:32-05:00
toc: false
images:
tags: [leetcode, golang, string, bit manipulation]
---

[1016. Binary String With Substrings Representing 1 To N](https://leetcode.com/problems/binary-string-with-substrings-representing-1-to-n/)

The idea of this solution is to loop through `1...N` and then make the string by adding the bytes to a string called `s`. Then check if `S` contains the reversed string of the bytes. The string `s` is reversed by a helper function.

```
func queryString(S string, N int) bool {
    for i := 1; i <= N; i++ {
        s := ""
        n := i

        for n > 0 {
            if n & 1 == 1 {
                s += "1"
            } else {
                s += "0"
            }
            n >>= 1
        }
        if !strings.Contains(S, reverse(s)) {
            return false
        }
    }
    return true
}

func reverse(s string) string {
    res := ""

    for _, i := range s {
        res = string(i) + res
    }
    return res
}
```

This solution is pretty much the same as the first solution but this solution doesn't use a outside function to reverse.

```
func queryString(S string, N int) bool {
    for i := 1; i <= N; i++ {
        s := ""
        n := i

        for n > 0 {
            if n&1 == 1 {
                s = "1" + s
            } else {
                s = "0" + s
            }
            n >>= 1
        }
        if !strings.Contains(S, s) {
            return false
        }
    }
    return true
}
```


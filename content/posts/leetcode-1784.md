---
title: "Leetcode 1784"
date: 2021-03-08T14:31:01-05:00
toc: false
images:
tags: [leetcode, golang, string, sliding window]
---

[1784. Check if Binary String Has at Most One Segment of Ones](https://leetcode.com/problems/check-if-binary-string-has-at-most-one-segment-of-ones/)

The problem description is:

> Given a binary string `s` without leading zeros, return `true` if `s` contains at most one contiguous segment of ones. Otherwise, return `false`.

This is kind of hard to understand, so I am going to explain it. A contiguous segment of ones looks like:

```
111000
100
10
1
11110000
```

And some of the ones that are not contiguous are:

```
101
1001
111001
10011
```

You should be able to see that the non-consecutive strings have a `"01"`. We have to check whether there is a `"01"` in the string. If so, return `false`.

*Note: We don't have to worry about strings with leading zeros. That is why we can check whether there is a `"01"` in a string and return `false` if so. If we had leading zeros, there would be `"01"`'s in the string even if there are consecutive ones, such as `"001110"`. We should return `true,` but there is a `"01"`.*

**First Solution:**

``` go 
func checkOnesSegment(s string) bool {

    for i := 0; i < len(s)-1; i++ {
        if s[i:i+2] == "01" { return false }
    }
    return true
}
```

**Second Solution:**

``` go
func checkOnesSegment(s string) bool {

    for i := 0; i < len(s)-1; i++ {
        if s[i] == '0' && s[i+1] == '1' { return false }
    }
    return true
}
```
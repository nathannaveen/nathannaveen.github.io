---
title: "Leetcode 2124"
date: 2022-01-19T13:01:42-06:00
toc: false
images:
tags: [leetcode, golang, string, sort]
---

[2124. Check if All A's Appears Before All B's](https://leetcode.com/problems/check-if-all-as-appears-before-all-bs/)

The idea of my solution is pretty simple. If the sorted version of `s` equals the non sorted version of `s` we know that every `"a"` comes before every `"b"`. Some examples could be:

* `s = "abab"`, `sortedS = "aabb"`, `"abab" != "aabb"` so return `false`.
* `s = "aabbb"`, `sortedS = "aabbb"`, `"aabbb" == "aabbb"` so return `true`.
* `s = "bba"`, `sortedS = "abb"`, `"bba" != "abb"` so return `false`.

``` go
func checkString(s string) bool {
    splitS := strings.Split(s, "")
    sort.Strings(splitS)
    return s == strings.Join(splitS, "")
}
```
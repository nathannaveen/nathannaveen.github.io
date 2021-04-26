---
title: "Leetcode 1374"
date: 2021-04-26T07:51:50-05:00
toc: false
images:
tags: [leetcode, golang, string]
---

[1374. Generate a String With Characters That Have Odd Counts](https://leetcode.com/problems/generate-a-string-with-characters-that-have-odd-counts/)

This solution is relatively straightforward. All it does is if `n` is odd, we can return `n` numbers of `'a'`, but if `n` is even, we can return a count of `n - 1`, `'a'`'s plus one `'b'`.

You might be wondering why we are doing `n` number of `a`'s for when `n` is odd and `n - 1` number of `a`'s and a `b` for when `n` is even. When `n` is odd, we can add an odd number of `a`'s and finish the string. If `n` is even, we can add an odd number of `a`'s, but the number of letters is `n - 1`, so we can add one more `b` to finish the job.

**The Code:**

``` go
func generateTheString(n int) string {
    if n % 2 == 1 {
        return strings.Repeat("a", n)
    }
    return strings.Repeat("a", n - 1) + "b"
}
```

**Edited for understanding** *(If you don't understand the first code because of the `strings.Repeat()` and all the following code has fixed that)*

``` go
func generateTheString(n int) string {
    res := ""
    if n % 2 == 1 {
        for i := 0; i < n; i++ {
            res += "a"
        }
    } else {
        for i := 0; i < n-1; i++ {
            res += "a"
        }
        res += "b"
    }
    return res
}
```
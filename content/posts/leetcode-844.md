---
title: "Leetcode 844"
date: 2021-04-28T21:33:02-05:00
toc: false
images:
tags: [leetcode, golang, images, string]
---

[844. Backspace String Compare](https://leetcode.com/problems/backspace-string-compare/)

To be truthful I am not sure whether this solution is an `O(n)` time or a `O(2n)` time because this code loops through `s` then `t`. Could someone tell me which it is?

So the idea of this solution is: *Note: I will be explaining only the loop for `s` because the loop for `s` is pretty much the same as the loop for `t`.

* So the code first loops from `0` to `len(s)`.
* The code checks whether `i > 0 && s[i] == '#'` because if `s[i] == '#'` we know that we have to remove the previous element, and `i > 0` is for whether there is a previous element to remove. So, if `i > 0 && s[i] == '#'` we can remove the `#` and the previous element, then we move `i` back by `2` because we have removed two characters from `s`.
* The else if checks whether `s[i] == '#'`. This is for if we have to remove the previous element but there is no previous element that we can remove. So if `s[i] == '#'` we can remove the `#` and move `i` back by `1` because we removed `1` character from `s`.

If you don't understand why we are moveing `i` back by `1` or `2` look at the following image:

`input = "Ta#co#s"`

![](https://i.imgur.com/yaJqbq8.jpg)

**The Code:**

``` go
func backspaceCompare(s string, t string) bool {
    for i := 0; i < len(s); i++ {
        if i > 0 && s[i] == '#' {
            s = s[:i-1] + s[i+1:]
            i -= 2
        } else if s[i] == '#' {
            s = s[1:]
            i -= 1
        }
    }
    for i := 0; i < len(t); i++ {
        if i > 0 && t[i] == '#' {
            t = t[:i-1] + t[i+1:]
            i -= 2
        } else if t[i] == '#' {
            t = t[1:]
            i -= 1
        }
    }
    return s == t
}
```
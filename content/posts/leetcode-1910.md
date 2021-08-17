---
title: "Leetcode 1910"
date: 2021-08-17T12:31:06-05:00
toc: false
images:
tags: [leetcode, golang, string]
---

[1910. Remove All Occurrences of a Substring](https://leetcode.com/problems/remove-all-occurrences-of-a-substring/)

**Solution One:** (*Iterative*)

The idea of this solution is pretty simple:

* We can loop through `s` using a counter `i`
* Then we check whether `s[i : i + len(part)] == part` (Is the part of `s` from `i` to `i + len(part)` equal to `part`).
    * If so, we can re-make `s` without that part
    * We can also move back the counter (`i`) by the length of `part`, so we can see whether removing the part from `s` makes another `part`.

``` go
func removeOccurrences(s string, part string) string {
    for i := 0; i < len(s); i++ {
        if i > -1 && i <= len(s) - len(part) && s[i : i + len(part)] == part {
            s = s[0 : i] + s[i + len(part) : len(s)]
            i -= len(part)
        }
    }
    return s
}
```

**Solution Two:**

Solution two and three and very similar, and they are also pretty similar to solution one. All three solutions have a pretty similar idea, so if you want to understand this solution, you could look at the explanation from solution one.

I think that the second and third solutions are better recursive solutions than the average recursive solution in time because most of them use some type of `indexOf`, and `indexOf` can be `O(n)`.

``` go
func removeOccurrences(s string, part string) string {
    return a(s, part, 0)
}

func a(s, part string, i int) string {
    if i > -1 && i <= len(s) - len(part) && s[i : i + len(part)] == part {
        s = a(s[0 : i] + s[i + len(part) : len(s)], part, i - len(part))
    } else if i > len(s) - len(part) {
        return s
    }
    s = a(s, part, i + 1)
    
    return s
}
```

**Solution Three:**

This solution should work, but you can't use global variables in Leetcode ([Look here if you don't know why](https://support.leetcode.com/hc/en-us/articles/360011834174-I-encountered-Wrong-Answer-Runtime-Error-for-a-specific-test-case-When-I-test-my-code-using-this-test-case-it-produced-the-correct-output-Why-)). So as far as I know, this code should pass all test cases, but it might just fail on a corner case.


``` go
var i int = 0

func removeOccurrences(s string, part string) string {
    i -= len(part)
    
    if i > -1 && i <= len(s) - len(part) && s[i : i + len(part)] == part {
        s = removeOccurrences(s[0 : i] + s[i + len(part) : len(s)], part)
        
    } else if i > len(s) - len(part) {
        return s
    }
    
    i += len(part) + 1
    s = removeOccurrences(s, part)
    
    return s
}
```
---
title: "Leetcode 1071"
date: 2021-04-09T10:56:57-05:00
toc: false
images:
tags: [leetcode, golang, string, substrings]
---

[1071. Greatest Common Divisor of Strings
](https://leetcode.com/problems/greatest-common-divisor-of-strings/)

The idea of this solution is actually pretty simple. But before we go into the problem, we have to know that a string with a common factor has a prefix (the definition of a prefix is the beginning characters of a string, a prefix can be any length) that is repeated throughout the string. This can be shown using some examples:

* `"abcdabcdabcd"` we know that the repeated substring is `"abcd"`, and we can see that `"abcd"` is a prefix.
* `"abcabcabcabc"` we can see that `"abc"` is the repeated substring, and we can see that `"abc"` is the prefix.

So the idea of this solution is:

* We loop through `str1` and `str2`.
* Then we get the substring of `str1` and `str2` from `0` to `i`.
* Then all we have to do is check whether the rest of the strings can be split up into prefixes. If it is, we can make the resulting string equal to the substring.


**The Code:**

``` go
func gcdOfStrings(str1 string, str2 string) string {
    res := ""

    for i := 1; i <= int(math.Min(float64(len(str1)),
    float64(len(str2)))); i++ {
    
        sub := str1[:i]
        sub2 := str2[:i]

        if sub == sub2 && len(str1)%i == 0 && len(str2)%i == 0 {
            h := true
            for j := 0; j < len(str1)-i+1; j += i {
                if str1[j:j+i] != sub {
                    h = false
                    break
                }
            }
            for j := 0; j < len(str2)-i+1; j += i {
                if str2[j:j+i] != sub {
                    h = false
                    break
                }
            }
            if h {
                res = sub
            }
        }
    }

    return res
}

```

**Edited Vertion:** *(Without the built in `math.Min()`)*

``` go
func gcdOfStrings(str1 string, str2 string) string {
    res := ""

    for i := 1; i <= min(len(str1), len(str2)); i++ {
        sub := str1[:i]
        sub2 := str2[:i]

        if sub == sub2 && len(str1)%i == 0 && len(str2)%i == 0 {
            h := true
            for j := 0; j < len(str1)-i+1; j += i {
                if str1[j:j+i] != sub {
                    h = false
                    break
                }
            }
            for j := 0; j < len(str2)-i+1; j += i {
                if str2[j:j+i] != sub {
                    h = false
                    break
                }
            }
            if h {
                res = sub
            }
        }
    }

    return res
}

func min(a, b int) int {
    if a > b {
        return b
    }
    return a
}
```
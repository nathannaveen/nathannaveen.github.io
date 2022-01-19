---
title: "Leetcode 2083"
date: 2022-01-19T13:01:07-06:00
toc: false
images:
tags: [golang, leetcode, images, substrings]
---

[2083. Substrings That Begin and End With the Same Letter](https://leetcode.com/problems/substrings-that-begin-and-end-with-the-same-letter/)

``` go
func numberOfSubstrings(s string) int64 {
    m := make(map[rune] int)
    res := int64(0)
    
    for _, letter := range s {
        m[letter]++
        res += int64(m[letter])
    }
    
    return res
}
```

The second solution is the fun solution. We can find the number of substrings, the beginning, and the end in the same letter. To show how this is done, we can take an example of `"aaaaaa"`:

![](https://i.imgur.com/H5jFMVU.jpg)

* Note that in this image, I am only pointing to the start and end letter of the substring.
* As you can see in the image, we can get a certain number of substrings in a string of 6 letters:
    * We can get `1` substring of length `6`
    * We can get `2` substrings of length `5`
    * We can get `3` substrings of length `4`
    * We can get `4` substrings of length `3`
    * We can get `5` substrings of length `2`
    * We can get `6` substrings of length `1`
* Now if we add all the substrings together we get `1 + 2 + 3 + 4 + 5 + 6 = 21`. This is equal to the sum of the first `6` numbers. The equation for the sum of the first `n` numbers is `(n * (n + 1)) / 2`, so if we make `n = 6` then `(6 * (6 + 1)) / 2 = (6 * 7) / 2 = 42 / 2 = 21`.

``` go
func numberOfSubstrings(s string) int64 {
    m := make(map[rune] int)
    res := int64(0)
    
    for _, letter := range s {
        m[letter]++
    }
    
    for _, val := range m {
        res += int64((val * (val + 1)) / 2)
    }
    
    return res
}
```
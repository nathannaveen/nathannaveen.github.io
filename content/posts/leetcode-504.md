---
title: "Leetcode 504"
date: 2021-07-06T18:25:01-05:00
toc: false
images:
tags: [golang, math, string, leetcode]
---

[504. Base 7](https://leetcode.com/problems/base-7/)

The main idea of both solutions is to convert the number to base seven. To convert a number to base `7` we can do something similar to converting to `base 2, 3, 4` and so on. So if you know how to convert a number to another base you can just scroll down to the code and skip the example image.

![](https://i.imgur.com/mEZHtJs.jpg)

**Using Math, and then returning `string(res)`:**

``` go
func convertToBase7(num int) string {
    res := 0
    counter := 1
    
    for num > 0 || num < 0 {
        res += (num % 7) * counter
        num /= 7
        counter *= 10
    }
    
    return strconv.Itoa(res)
}
```

**Using Strings for every action and returning `res`:**

``` go
func convertToBase7(num int) string {
    neg := false
    res := ""
    
    if num < 0 {
        neg = true
        num *= -1
    }
    
    for num > 0 {
        res = strconv.Itoa(num % 7) + res
        num /= 7
    }
    
    if res == "" {
        return "0"
    }
    
    if neg {
        res = "-" + res
    }
    
    return res
}
```
---
title: "Leetcode 1404"
date: 2021-08-17T12:30:51-05:00
toc: false
images:
tags: [leetcode, golang, images, string]
---

[1404. Number of Steps to Reduce a Number in Binary Representation to One](https://leetcode.com/problems/number-of-steps-to-reduce-a-number-in-binary-representation-to-one/)

The idea of this solution is:

* When we find a zero at the end of `s`, we know that `s` is divisible by `2`, so we can remove the end of the string and add one to the result.
* When we find a `1` at the end of `s`, we know that `s` is not divisible by `2`, so we can add `1` by keep making all values before the position equal to `0` if they are `1` and `1` if they are `0`.

If you don't understand the adding a `1` part, don't worry, I have drawn up an image for understanding:

![](https://i.imgur.com/WQTWxz4.png)

``` go
func numSteps(s string) int {
    counter := 0
    addedOne := false
    
    for i := len(s) - 1; i >= 1; i-- {
        if s[i] == '1' {
            newI := i
            
            for newI != -1 {
                if s[newI] == '1' {
                    s = s[0 : newI] + "0" + s[newI + 1 : len(s)]
                    newI--
                    continue
                } 
                s = s[0 : newI] + "1" + s[newI + 1 : len(s)]
                break
            }
            if newI == -1 {
                s = "1" + s
            }
            i ++
            addedOne = true
        } else {
            s = s[: len(s) - 1]
        }
        counter++
    }
    
    if addedOne {
        return counter + 1
    }
    
    return counter
}
```

**The Second Solution:**

The idea of this solution is pretty simple, so I am not going to explain this.

``` go
func numSteps(s string) int {
    counter := 0
    one := 0
    
    for i := len(s) - 1; i >= 1; i-- {
        if one + int(s[i]) == 49 { // 49 because ascii of '1' is 49
            counter++
            one = 1
        }
    }
    
    return len(s) - 1 + counter + one
}
```
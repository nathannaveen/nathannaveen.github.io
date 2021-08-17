---
title: "Leetcode 1903"
date: 2021-08-17T12:31:35-05:00
toc: false
images:
tags: [leetcode, golang, math, string]
---

[1903. Largest Odd Number in String](https://leetcode.com/problems/largest-odd-number-in-string/)

The idea of this solution is pretty simple, we find the last odd digit, and the number from the beginning of `num` to that odd digit is the greatest odd number we can get.

If you don't understand, think *"what makes an odd number?"* An odd number is a number with its last digit being odd (The last digit can be `1, 3, 5, 7`, or `9`).

Here is an example to explain this concept:

`input: num = "123456"`

The expected output would be `12345` because that is the biggest number that is odd.


``` go
func largestOddNumber(num string) string {
    for i := len(num) - 1; i >= 0; i-- {
        if int(num[i] - '0') % 2 == 1 {
            return num[: i + 1]
        }
    }
    
    return ""
}
```
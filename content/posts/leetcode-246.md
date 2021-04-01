---
title: "Leetcode 246"
date: 2021-04-01T10:34:39-05:00
draft: true
toc: false
images:
tags:
  - untagged
---

[246. Strobogrammatic Number](https://leetcode.com/problems/strobogrammatic-number/)

This solution is pretty simple and pretty similar to [Leetcode 163](https://nathannaveen.dev/posts/leetcode-163/).

The problem asks us to flip a number by 180 degrees and then return true if the fliped number is equal to the non-fliped number.

You might think that just flipping every digit and then check whether the following fliped number is equal to the non fliped number, but there is a problem with just flipping. Here is an example to show that just flipping doesn't work:

`input: "69"`
`expected output: true.`

If we flip every digit, we get `6` converts to `9` and `9` flips to `6`, so we get `96`. When we compare `96 == 69`, we have to return false even though we want it to output `true`.

But if we reverse the fliped string and then compare it with the original string, we get the proper output. This can be shown with some images:

![](https://i.imgur.com/YAXBBOI.jpg)

**The Code:**

``` go
func isStrobogrammatic(num string) bool {
    newNumber := ""
    for i := len(num) - 1; i >= 0; i-- {
        lastDigit := num[i]
        switch lastDigit {
        case '0':
            newNumber += "0"
        case '1':
            newNumber += "1"
        case '6':
            newNumber += "9"
        case '8':
            newNumber += "8"
        case '9':
            newNumber += "6"
        default:
            return false
        }
    }
    return newNumber == num
}
```
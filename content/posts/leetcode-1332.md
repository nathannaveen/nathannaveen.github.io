---
title: "Leetcode 1332"
date: 2021-03-08T09:42:56-05:00
toc: false
images:
tags: [string, substring, subsequence, golang, leetcode]
---

[1332. Remove Palindromic Subsequences](https://leetcode.com/problems/remove-palindromic-subsequences/)

This problem asks us to find all the subsequences in a string called `s`. `s` only contains the letters `a` and `b`.

When we are doing this problem, the main thing to look at is that it says "subsequences," not "substrings," and that there are only two letters `a` and `b`.

The difference between "substrings" and "subsequences" is substrings are consecutive letters, while subsequences doesn't have to be consecutive.

Since we have the letters `a` and `b`, we can remove all the `a`'s first and then remove all the `b`'s.

**How This Works:**

First, we can have an example of an empty string `""` and return `0` because the string is already empty.

Next, we can have the example of the input being a palindrome, `"ababa"`, we can return `1` because we get an empty string when we remove this palindrome.

Finally, we can return `2` because we first add all the `a`'s together and remove that palindrome, then add all the `b`'s together and remove that palindrome. This can be shown with the folowing example:

`input = "ababaab` `output = 2`

The output is `2` because we remove the palindromic subsequence of `"aaaa"`. We get the letters at the indexes `0, 2, 4, 5`, and they make `"aaaa"`. Then for the second part, we remove the palindrome `"bbb"`. We get the palindrome `"bbb"` by getting the indexes `1, 3, 6`.




``` go
func removePalindromeSub(s string) int {
    if s == "" {
        return 0
    }
    if palindromic(s) {
        return 1
    }
    return 2
}

func palindromic(s string) bool {
    left, right := 0, len(s)-1

    for left < right {
        if s[left] != s[right] {
            return false
        }

        left, right = left+1, right-1
    }

    return true
}
```
---
title: "Leetcode 5"
date: 2021-02-28T11:41:58-05:00
toc: false
images:
tags: [leetcode, string, substrings, golang]
---


[5. Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)

In this solution we dont have to check whether the palindrome substring is greater than the max length substring because the length of the substring will always be greater than or equal to the length of the current max substring. This can be show in an image:

![](https://i.imgur.com/k9YUTYG.jpg)



```
func longestPalindrome(s string) string {
	max := ""
	for i := 0; i < len(s); i++ {
		for j := 0; j <= len(s)-i; j++ {
			if isPalindromic(s[j : j + i]) {
				max = s[j : j + i] // getting the substring
			}
		}
	}
	if isPalindromic(s) {
		max = s
	}
	return max
}

func isPalindromic(s string) bool {
	left, right := 0, len(s) - 1

	for left < right {
		if s[left] != s[right] {
			return false
		}
		left++
		right--
	}
	return true
}
```


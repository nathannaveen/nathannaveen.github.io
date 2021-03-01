---
title: "Leetcode 459"
date: 2021-02-28T14:46:05-05:00
toc: false
images:
tags: [leetcode, string, substrings, golang, images]
---

[459. Repeated Substring Pattern](https://leetcode.com/problems/repeated-substring-pattern/)

The idea of this solution is any substring that is repeated throughout the string `s` has to start at the `0`'th index and end at another index, such as the `3`'ed. This can be shown by using a image.

![](https://i.imgur.com/JB4X253.jpg)



> In both the examples the substrings that are repeated are green.
>
> In the first example the substring `abc` starts at the `0`'th index and ends at the `2`'d index.
>
> In the next example the substring is `Tacos` it starts at the `0`'th index and ends at the `4`'th index

If you have noticed in both the examples the repeated substring has to start at the `0`'th index and has to end at a following index.

The way my code checks whether it is a substring that repeats through out is it adds that substring to a empty string as many times as it fits in the string. Then it checks whether the new string is equal to `s`. If it is then `return true`. If it is never equal then `return false`.


```
func repeatedSubstringPattern(s string) bool {
	for i := 0; i < len(s); i++ {
		end := len(s)
		str := ""
		if i != 0 {
			end = len(s) / i
		}
		for j := 0; j < end; j++ {
			str += s[0:i]
		}
		if str == s {
			return true
		}
	}
	return false
}
```
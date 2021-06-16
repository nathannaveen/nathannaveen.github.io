---
title: "Leetcode 1249"
date: 2021-06-16T11:22:30-05:00
toc: false
images:
tags: [leetcode, golang, stack, string]
---

[1249. Minimum Remove to Make Valid Parentheses](https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/)

The idea of this solution is:

* Loop through every character in `s`, and:
* If the current character is a `'('` add the index of the `'('` to a stack
* If the current character is a `')'`:
    * If the stack is not empty, we can pop off the stack
    * If the stack is empty, remove the character from the string
* After looping through every character, if the stack is not empty, we remove the characters at the values in the stack. We do this because the positions in the stack are there for the extra `'('`.
* Then we can return `s`.

``` go
func minRemoveToMakeValid(s string) string {
	stack := []int{}
	for i := 0; i < len(s); i++ {
		if s[i] == '(' {
			stack = append(stack, i)
		} else if s[i] == ')' {
			if len(stack) != 0 {
				stack = stack[:len(stack)-1]
			} else {
				s = s[:i] + s[i+1:]
				i--
			}
		}
	}

	for len(stack) != 0 {
		pop := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		s = s[:pop] + s[pop+1:]
	}
	return s
}
```
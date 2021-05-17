---
title: "Leetcode 1816"
date: 2021-05-17T09:50:53-05:00
toc: false
images:
tags: [leetcode, golang, string]
---

[1816. Truncate Sentence](https://leetcode.com/problems/truncate-sentence/)

Since the solution wants us to return the first `k` words

* We can split the words
* Then we can return the the first `k` words joined together seperated by spaces.

**The Solution**

``` go
func truncateSentence(s string, k int) string {
	return strings.Join(strings.Split(s, " ")[:k], " ")
}
```

**Edited Solution for readability**

``` go
func truncateSentence(s string, k int) string {
	arr := strings.Split(s, " ")
	return strings.Join(arr[:k], " ")
}
```
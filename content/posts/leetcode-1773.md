---
title: "Leetcode 1773"
date: 2021-03-06T19:06:10-05:00
toc: false
images:
tags: [leetcode, golang, array, string]
---

[1773. Count Items Matching a Rule](https://leetcode.com/problems/count-items-matching-a-rule/)

The idea of this solution is pretty simple. We know that the array `items` has only `3` items. The first one is the `ruleKey = "type"` the next one is `ruleKey = "color"`, and the next one is `ruleKey = "name"`. We just have to set a index of each item to either `0, 1` or `2`. Then just loop over each item and check whether the `item[index] == ruleValue`.

```
func countMatches(items [][]string, ruleKey string, ruleValue string) int {
	res := 0
	index := 0
	if ruleKey == "color" {
		index = 1
	} else if ruleKey == "name" {
		index = 2
	}

	for _, item := range items {
		if item[index] == ruleValue {
			res++
		}
	}
	
	return res
}
```
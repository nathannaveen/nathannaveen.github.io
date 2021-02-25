---
title: "Leetcode 1768"
date: 2021-02-25T15:48:01-05:00
toc: false
images:
tags: [leetcode, golang, string]
---
[1768. Merge Strings Alternately](https://leetcode.com/problems/merge-strings-alternately/)

The idea of this solution is pretty simple. First loop through the word with the greater length. Then check whether the length of the word is greater than the current characters index, if so then add the character to the result.

```
func mergeAlternately(word1 string, word2 string) string {
    res := ""

    for i := 0; i < int(math.Max(float64(len(word1)), float64(len(word2)))); i++ {
        if i < len(word1) {
            res += string(word1[i])
        }
        if i < len(word2) {
            res += string(word2[i])
        }
    }

    return res
}
```

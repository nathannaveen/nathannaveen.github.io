---
title: "Leetcode 734"
date: 2021-04-02T13:08:17-05:00
toc: false
images:
tags: [leetcode, golang, array, string]
---

[734. Sentence Similarity](https://leetcode.com/problems/sentence-similarity/)

The idea of this solution is to:

* We have to first check whether the lengths of the two sentences are the same. If they aren't, we return `false`.
* Then we have to make a map called `m`. The map is in a format of `string, []string` where `string` is the `key` and `[]string` is the value.
* We add all the values from the matrix array called `similarPairs` to `m`.
* After we have added all the values from `similarPairs` to `m`, we can loop through sentence 1 and 2 and check whether `m[sentence1[i]]` contains `sentence2[i]`, if it doesn't and the two words are not similar we have to return `false`.
* After we have looped through, we can return true because then we know that the sentences are similar.

**The Code:**

``` go
func areSentencesSimilar(sentence1 []string, sentence2 []string, similarPairs [][]string) bool {
    if len(sentence1) != len(sentence2) { return false }

    length, m := len(sentence1), make(map[string][]string)

    for _, pair := range similarPairs {
        m[pair[0]], m[pair[1]] = append(m[pair[0]], pair[1]), 
        append(m[pair[1]], pair[0])
    }

    for i := 0; i < length; i++ {
        if !arrayContains(m[sentence1[i]], sentence2[i]) &&
        sentence1[i] != sentence2[i] { return false }
    }

    return true
}

func arrayContains(h []string, n string) bool {
    for _, s := range h {
        if s == n { return true }
    }
    return false
}
```
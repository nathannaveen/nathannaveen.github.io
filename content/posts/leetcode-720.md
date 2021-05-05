---
title: "Leetcode 720"
date: 2021-04-28T21:30:47-05:00
toc: false
images:
tags: [leetcode, golang, array, map, string]
---

[720. Longest Word in Dictionary](https://leetcode.com/problems/longest-word-in-dictionary/)

The idea of this solution is pretty simple:

* The code will sort `words`, so the minor parts we use to build the biggest words are before the built-up words. Also, since `words` is sorted, we don't have to worry about the "longest word with the smallest lexicographical order"; we only have to care about the "longest word" part.
* After that, the code will loop through `words`.
    * Then, the code will check whether a map called `m` contains the word without the last letter. We know that the current word builds onto a previous word. If the length of the current word is `1`, we know that it is the beginning of a build.
        * Inside the if statement, we can check whether the length of `word` is greater than the length of the maximum length string. If so, we can make the maximum word equal to `word`.
        * Then, we can add `word` to the map with a value of `1`.
* Then we can return `max`.

``` go
func longestWord(words []string) string {
    sort.Strings(words)
    m := make(map[string]int)
    max := ""

    for _, word := range words {
        if m[word[:len(word)-1]] != 0 || len(word) == 1 {
            if len(word) > len(max) {
                max = word
            }
            m[word] = 1
        }
    }

    return max
}
```
---
title: "Leetcode 266"
date: 2021-03-18T14:10:37-04:00
toc: false
images:
tags: [leetcode, golang, string]
---

[266. Palindrome Permutation](https://leetcode.com/problems/palindrome-permutation/)

The idea of this solution is pretty simple. We add all the letters to a map, and then if there is a extra letter that does not have a partner for the other end of the palindrome add it to the `numberOfOnes` counter, if the counter is greater than `1` we know that it is not a palindrome. We can explain this with some examples:

There are three main examples that are going to be shown:

* `input: "aabbccd", expected output: true`, we can make a map `m := ['a' : 2, 'b' : 2, 'c' : 2, 'd' : 1]` if we iterate through `m` we can return `true` because `numberOfOnes = 1`. `numberOfOnes = 1` because `'d' : 1`. If you don't understand why we return `true` see that we can swap the letters around to get `"abcdcba"`.
* `input: "aabb", expected output: true`, we can also make a map `m := ['a' : 2, 'b' : 2]`. When we iterate through `m` we get `numberOfOnes = 0` so we retun true. When we swap around `"aabb"` we get `"abba"` which is a palindrome.
* `input: "aabbcd", expected output: false`. We can make a map `m := ['a' : 2, 'b' : 2, 'c' : 1, 'd' : 1]`. When we iterate through `m` we can see that `numberOfOnes = 2` and since `numberOfOnes > 1` we return `false`. We return `false` because however we swap around `"aabbcd"` we can never get a palindrome because there is an extra `c` and`d`.

``` go
func canPermutePalindrome(s string) bool {
    m := make(map[rune]int)
    numberOfOnes := 0
    for _, i := range s {
        m[i]++
    }

    for _, i := range m {
        numberOfOnes += i % 2
    }

    return numberOfOnes <= 1
}
```
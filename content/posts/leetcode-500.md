---
title: "Leetcode 500"
date: 2021-04-28T21:30:43-05:00
toc: false
images:
tags: [leetcode, golang, map, string]
---

[500. Keyboard Row](https://leetcode.com/problems/keyboard-row/)

I know that this code is not pretty, but the idea of the solution is pretty simple:

* We can first make a map of letters where the top rows letters are assigned to the number `0, 1, 2, 3, 4, 5, 6, 7, 8, 9`, the middle row's characters are assigned to the numbers `10, 11, 12, 13, 14, 15, 16, 17, 18`, and the last rows characters are assigned to the numbers `19, 20, 21, 22, 23, 24, 25`. We call this map `m`.
* The code loops through each word where each word in `words` is called `word`
    * Note the indented are saying that this is inside the loop
    * We make a string called `firstLetter` and make that store the first letter. Then we make it lowercase in the following if.
    * Then we make a variable called `row`, `row` is used to know which row our first key starts on, either `0` the top row, `1` the middle row, or `2` the bottom row. We start with `row = 0`, but then we check whether `m[firstLetter]` is in the range of `10 to 18`, or `19 to 25`, we can check whether the number value of the key letter is in those ranges because if it is in the range `10 to 18` we know that it is the middle row, and if it is in the range `19 to 25` it is in the last row.
    * Then we loop over each letter of `word`.
        * Inside that loop, we make a variable called `letter` equal to the current letter in `word`. We are then using the following if statement to make it lowercase.
        * Then we can check whether `row == 0`, if so and `letters[letter]` is not in the range of `0 to 9` we know that the word is not on all one keyboard row.
        * Then we can check whether `row == 1`, if so and `letters[letter]` is not in the range of `10 to 18` we know that the word is not on all one keyboard row.
        * Then we can check whether `row == 2`, if so and `letters[letter]` is not in the range of `19 to 25` we know that the word is not on all one keyboard row.


``` go
func findWords(words []string) []string {
    res := []string{}
    letters := make(map[string]int)
    letters["q"] = 0; letters["w"] = 1; letters["e"] = 2; letters["r"] = 3
    letters["t"] = 4; letters["y"] = 5; letters["u"] = 6; letters["i"] = 7
    letters["o"] = 8; letters["p"] = 9; letters["a"] = 10; letters["s"] = 11
    letters["d"] = 12; letters["f"] = 13; letters["g"] = 14; letters["h"] = 15
    letters["j"] = 16; letters["k"] = 17; letters["l"] = 18; letters["z"] = 19
    letters["x"] = 20; letters["c"] = 21; letters["v"] = 22; letters["b"] = 23
    letters["n"] = 24; letters["m"] = 25

    for _, word := range words {
        shouldAddWordToRes := true
        firstLetter := string(word[0])
        if word[0] <= 90 && word[0] >= 65 {
            firstLetter = string(word[0] + 32)
        }
        row := 0

        if letters[firstLetter] >= 10 && letters[firstLetter] <= 18 {
            row = 1
        } else if letters[firstLetter] >= 19 {
            row = 2
        }

        for i := 1; i < len(word); i++ {
            letter := string(word[i])
            if word[i] <= 90 && word[i] >= 65 {
                letter = string(word[i] + 32)
            }

            if row == 0 && letters[letter] > 9 {
                shouldAddWordToRes = false; break
            } else if row == 1 && (letters[letter] < 10 || letters[letter] > 18) {
                shouldAddWordToRes = false; break
            } else if row == 2 && letters[letter] < 19 {
                shouldAddWordToRes = false; break
            }
        }
        if shouldAddWordToRes {
            res = append(res, word)
        }
    }

    return res
}
```
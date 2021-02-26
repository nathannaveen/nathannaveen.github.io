---
title: "Leetcode 1704"
date: 2021-02-25T20:22:25-05:00
toc: false
images:
tags: [leetcode, string, array, golang, images]
---

The idea of this solution is to first make the input string lowercase, and then add `1` to an integer array at the index of every letter, `a = 0, b = 1, c = 2...`. First we add to the array called `first`, then starting at a certain index start adding it to `second`.

After that, add the number of vowel that have occured. The code does this by doing

```
firstCounter += first[0] + first[4] + first[8] + first[14] + first[20]
secondCounter += second[0] + second[4] + second[8] + second[14] + second[20]
```

You might be wondering why the code is adding from `first` and `second` at the indices `0, 4, 8, 14, 20`. It is because the ascii values of `'a', 'e', 'i', 'o', 'u'` are `97, 101, 105, 111, 117`, and when they get the indices of `a = 0, b = 1, c = 2...` it is bascily subtracting `97` from each of them, so `97 - 97 = 0, 101 - 97 = 4, 105 - 97 = 8, 111 - 97 = 14, 117 - 97 = 20`.

All of this can be show with a example:

```
input = "TacosAreCool"
output = true
```

First off we have to make the input lower case so it becomes `"tacosarecool"`.

Next we can add all the characters from to their appropriate arrays.

![](https://i.imgur.com/kYBK5as.jpg)

You might be wondering why it says `tacosa` and `recool`. The front part of the word is `tacosa` and the back part is `recool` when the length of the string is divided by two, `len(tacosa) == 6` and `len(recool) == 6`. combine they make `tacosarecool`.

Then we need to add all the vowels together.

![](https://i.imgur.com/DEf68sC.jpg)

The number of vowels for `tacosa` is `3` because there are two `a`'s and one `o`. The number of vowels for `recool` is `3` as well, because there is one `e` and two `o`'s.

Since both `tacosa` and `recool` both have the same amount of vowels we return `true`.

```
func halvesAreAlike(s string) bool {
    first, second := make([]int, 26), make([]int, 26)
    firstCounter, secondCounter := 0, 0
    s = strings.ToLower(s)
    for i, i2 := range s {
        if i < len(s)/2 {
            first[int(i2-'a')]++
        } else {
            second[int(i2-'a')]++
        }
    }

    firstCounter += first[0] + first[4] + first[8] + first[14] + first[20]
    secondCounter += second[0] + second[4] + second[8] + second[14] + second[20]

    return firstCounter == secondCounter
}
```
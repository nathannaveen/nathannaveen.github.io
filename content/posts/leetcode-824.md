---
title: "Leetcode 824"
date: 2021-04-14T09:58:25-04:00
toc: false
images:
tags: [leetcode, golang, string]
---

[824. Goat Latin](https://leetcode.com/problems/goat-latin/)

The idea of this solution is actualy pretty simple. We:

* First add all the vowels to a map. We make a `a` string where we keep on appending `"a"` to it per word. Then we split `S` by spaces so we get all the words in an array called `words`.
* Then we loop through `words`.
* Inside the iteration we check whether the first letter of the current word is not a vowel we can move the first letter to the end.
* After checking whether it is a consonant we can add `"ma" + a` because we are supposed to add `"ma" + a` to a word that begins with a vowel or a consonant.
* Then we add `"a"` to `a` because as the problem statment says "Add one letter 'a' to the end of each word per its word index in the sentence, starting with 1."

**The Code:**

``` go
func toGoatLatin(S string) string {
    words := strings.Split(S, " ")
    vowels := make(map[uint8]int)
    a := "a"
    
    vowels['a'] = 1; vowels['e'] = 1; vowels['i'] = 1;
    vowels['o'] = 1; vowels['u'] = 1
    
    vowels['A'] = 1; vowels['E'] = 1; vowels['I'] = 1; 
    vowels['O'] = 1; vowels['U'] = 1

    for i := 0; i < len(words); i++ {
        if vowels[words[i][0]] == 0 {
            words[i] = words[i][1:] + string(words[i][0])
        }
        words[i] += "ma" + a
        a += "a"
    }
    return strings.Join(words, " ")
}
```


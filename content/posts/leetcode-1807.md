---
title: "Leetcode 1807"
date: 2021-10-28T15:59:20-05:00
toc: false
images:
tags: [leetcode, golang, string]
---

[1807. Evaluate the Bracket Pairs of a String](https://leetcode.com/problems/evaluate-the-bracket-pairs-of-a-string/)

The idea of this solution is pretty simple:

* We can first add all the knowledge into a map which I called `storedKnowledge`
* Then we can loop through `s`
    * If `s[i] == '('` we can make `start = i + 1`, so we know where the bracket starts
    * Else if `s[i] == ')'` we can check whether `storedKnowledge` contains `s[start : i]` (For our non-Golang users `s[start : i]` is basically getting the substring from position `start` to the position `i`, if we think mathematically it could be shown as the inequality `[start, i)`), if it contains we can add the value to `res`, else add `"?"` to `res`. Then I make `start = -1`, I will explain this in the next bullet point.
    * Else if `start != -1`. The `start != -1` checks whether we are inside a bracket, and if so, we don't want to add the letter to `res`.

``` go
func evaluate(s string, knowledge [][]string) string {
    storedKnowledge := make(map[string] string)
    res := ""
    
    for _, know := range knowledge {
        storedKnowledge[know[0]] = know[1]
    }
    
    start := -1
    
    for i, i2 := range s {
        if i2 == '(' {
            start = i + 1
        } else if i2 == ')' {
            if _, ok := storedKnowledge[s[start : i]]; ok {
                res += storedKnowledge[s[start : i]]     
            } else {
                res += "?"
            }
            start = -1
        } else if start == -1 {
            // start == -1 is for if we are not inside a bracket
            res += string(i2)
        }
    }
    return res
}
```


I liked the way that @DBabichev did his solution, so I tried something similar (@DBabichev has a pretty good explanation to this solution, so I will link the [solution](https://leetcode.com/problems/evaluate-the-bracket-pairs-of-a-string/discuss/1130510/Python-Short-solution-using-split-explained)):

``` go
func evaluate(s string, knowledge [][]string) string {
    storedKnowledge := make(map[string] string)
    
    for _, know := range knowledge {
        storedKnowledge[know[0]] = know[1]
    }
    
    arr := strings.Split(s, "(")
    res := arr[0]
    
    for i := 1; i < len(arr); i++ {
        temp := strings.Split(arr[i], ")")
        if val, ok := storedKnowledge[temp[0]]; ok {
            res += val
        } else {
            res += "?"
        }
        res += temp[1]
    }
    return res
}
```
---
title: "Leetcode 1945"
date: 2021-08-17T12:31:21-05:00
toc: false
images:
tags: [leetcode, golang, string, math]
---

[1945. Sum of Digits of String After Convert](https://leetcode.com/problems/sum-of-digits-of-string-after-convert/)

**The Mathematical Solution:**

The idea of this solution uses the fact that `k` will always be `1 <= k <= 10`. Since `k` will always be greater than `1` we can add the first transformation and conversion together, so we don't add numbers that are greater than `9` to the result.

For an example let us use:

`input: s = "hvmhoasabayzzzzzd", k = 1`



``` go
func getLucky(s string, k int) int {
    res := 0
    for _, i := range s {
        temp := int(i - 'a' + 1)
        if temp >= 10 {
            res += temp % 10
            temp /= 10
            res += temp % 10
        } else {
            res += temp
        }
    }
    
    
    for i := 1; i < k; i++ {
        temp := 0
        
        for res > 0 {
            temp += res % 10
            res /= 10
        }
        res = temp
    }
    
    return res
}
```

**The Boring String Solution:**

``` go
func getLucky(s string, k int) int {
    s2 := ""
    res := 0
    for _, i := range s {
        s2 += strconv.Itoa(int(i - 'a' + 1))
    }
    
    
    for i := 0; i < k; i++ {
        temp := 0
        for j := 0; j < len(s2); j++ {
            a, _ := strconv.Atoi(string(s2[j]))
            temp += a
        }
        
        res = temp
        s2 = strconv.Itoa(temp)
    }
    
    return res
}
```
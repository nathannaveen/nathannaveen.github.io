---
title: "Leetcode 1461"
date: 2021-03-12T12:03:46-05:00
toc: false
images:
tags: [leetcode, golang, math, map]
---

[1461. Check If a String Contains All Binary Codes of Size K](https://leetcode.com/problems/check-if-a-string-contains-all-binary-codes-of-size-k/)

The idea of this solution is to make a sliding window and add all the substrings os size `k` to a map, if the maps length is equal to `2^k` return `true`.

We do `2^k` because we have to acount for all posibilitys of `0` and `1`.

``` go
func hasAllCodes(s string, k int) bool {
    m := make(map[string]int)

    for i := 0; i < len(s)-k+1; i++ {
        m[s[i:i+k]]++
    }

    return len(m) == twoPow(k) 
}

func twoPow(k int) int {
    res := 1
    for i := 0; i < k; i++ {
        res *= 2
    }
    return res
}
``` 

*By using bit maniplation we can simplify the code, left shifting is basicly multiplying by `2`. This can be shown using the following:*

```
2^0 = 1    1 << 0 = 1

2^1 = 2    1 << 1 = 2

2^2 = 4    1 << 2 = 4
```

**The simplifyed the code:**

``` go
func hasAllCodes(s string, k int) bool {
    m := make(map[string]int)

    for i := 0; i < len(s)-k+1; i++ {
        m[s[i:i+k]]++
    }

    return len(m) == 1 << k
}
```


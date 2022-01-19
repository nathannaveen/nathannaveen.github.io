---
title: "Leetcode 2103"
date: 2022-01-19T13:00:08-06:00
toc: false
images:
tags: [leetcode, golang]
---

[2103. Rings and Rods](https://leetcode.com/problems/rings-and-rods/)

The idea of this solution is to use the fact that prime numbers can not be divided by any number other than one and itself. So if we relatively multiply `2` , `3`, or `5` to each rods value accordingly to `'R'`, `'G'`, `'B'` we can check whether it is divisible by `2, 3`, and `5` to check whether we have all three colored rings on a rod.

``` go
func countPoints(rings string) int {
    rods := make([]int, 10)
    res := 0
    
    for i := 0; i < len(rings); i += 2 {
        pos, _ := strconv.Atoi(string(rings[i + 1]))
        
        if rods[pos] == 0 { rods[pos] = 1 }
        
        if rings[i] == 'R' {
            rods[pos] *= 2
        } else if rings[i] == 'G' {
            rods[pos] *= 3
        } else if rings[i] == 'B' {
            rods[pos] *= 5
        }
    }
    
    for _, rod := range rods {
        if rod % 2 == 0 && rod % 3 == 0 && rod % 5 == 0 && rod != 0 { res++ }
    }
    
    return res
}
```
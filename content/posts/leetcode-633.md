---
title: "Leetcode 633"
date: 2021-04-05T12:24:12-05:00
toc: false
images:
tags: [leetcode, golang, math]
---

[633. Sum of Square Numbers](https://leetcode.com/problems/sum-of-square-numbers/)

Both solutions use the simple knowledge of:

If `c = a^2 + b^2` then `b^2 = c - a^2` and `a^2 = c - b^2`.

**The Idea of the First Solution:**

The idea of this solution is pretty simple since we know that `a^2 = c - b^2` we can store `a^2` in a map called `m`, and then we check whether `m` contains `c - b^2`. If `m` contains `c - b^2`, we can return `true` because we know that two squared numbers add up to `c`.

**The Idea of the Second Solution:**

The idea of this solution is also straightforward and is based on `a^2 = c - b^2`. This solution iterates from `0` to the square root of `c`. We know that `i * i == a^2`, so we know that if `c - b^2` is a square, we can return true.

We can check whether it is a square by checking if the `int(sqrt(float64(n)))^2 == n`. This works because if when we do `sqrt(n)` we get a `float64`. If you don't understand look at the following two examples:

`sqrt(13) = 3.605551` and `sqrt(4) = 2.000000`.

When we make both integers we get `int(sqrt(13)) = 3` and `int(sqrt(4)) = 2`. `3^2 = 9`, `3^2 != 13` so we know that there is no integer square root of `13`, but when we do `2^2 = 4` we know that there is an integer square root of `4`.

**The First Solution:**

``` go
func judgeSquareSum(c int) bool {
    m := make(map[int]int)

    for i := 0; i*i <= c; i++ {
        squaredValue := i * i
        m[squaredValue] = 1

        if _, ok := m[c - squaredValue]; ok {
            return true
        }
    }
    return false
}
```

**The Second Solution:** *(The solution that is faster than 100%)*

``` go
func judgeSquareSum(c int) bool {
    for i := 0; i*i <= c; i++ {
        if isSquare(c - (i * i)) {
            return true
        }
    }
    return false
}

func isSquare(n int) bool {
    squareRooted := int(math.Sqrt(float64(n)))
    
    if squareRooted*squareRooted == n {
        return true
    }
    return false
}
```
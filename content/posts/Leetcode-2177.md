---
title: "Leetcode 2177"
date: 2022-03-03T15:29:20-06:00
toc: false
images:
tags: [golang, leetcode, math]
---

[2177. Find Three Consecutive Integers That Sum to a Given Number](https://leetcode.com/problems/find-three-consecutive-integers-that-sum-to-a-given-number/)

This solution is small but not the easiest to understand.

In Algebra 1, you might have learned how to sum up multiple consecutive numbers to make a result.

I came up with this solution because when writing this, I am 15, and I learned about summing up consecutive numbers 2 to 3 years ago.

## The Explanation of the Solution:

`x + (x + 1) + (x + 2) = num` &rarr; We know that we need 3 consecutive numbers, so if `x` is the first number, `x + 1` is the second number, and `x + 2` is the third number.

`3x + 3 = num` &rarr; We can combine all like terms.

`3x = num - 3` &rarr; Subtract `3` from both sides.

`x = (num - 3) / 3` &rarr; Divide both sides by `3` to isolate `x`.

Now that we know the value of `x`, we can find the remaining two numbers, `x + 1`, and `x + 2`.

---

Let us take an example from the problem statment:

`x + (x + 1) + (x + 2) = 33`

`3x + 3 = 33`

`3x = 30`

`x = 10`

The first element is `10` next element is `11`, and the last element is `12`.

---


``` go
func sumOfThree(num int64) []int64 {
    if (num - 3) % 3 != 0 {
        return []int64{}
    }
    
    x := (num - 3) / 3
    return []int64{ x, x + 1, x + 2 }
}
```
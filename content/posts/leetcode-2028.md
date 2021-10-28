---
title: "Leetcode 2028"
date: 2021-10-28T15:58:20-05:00
toc: false
images:
tags: [leetcode, golang, math, array]
---

[2028. Find Missing Observations](https://leetcode.com/problems/find-missing-observations/)

This solution aims to find the missing sum and then distribute it among `n` values.

***

The idea of the first part (Finding the missing sum) is first to find the sum of the `m` numbers given to us in `rolls`.

Then since the mean will always be `mean = sum / (n + m)` (the sum of elements divided by the number of elements), we know that the number of elements will always be `n + m`. So the total number of elements will be `(n + m) * mean`. And the sum of the missing elements will be `(n + m) * mean - sum` (Works because of PEMDAS).

***

Now the part in-between is for returning an empty array.

We return an empty array if `missing > n * 6`. This checks whether there is a greater missing sum than `n * 6`. `n * 6` because `6` is the max number on a dice, and `n` is the max number of unobserved rolls.

We also return an empty array if `missing < n`. This is because there are not enough in the missing sum to fill up `n` dices. This is because a dice can only have values from `1` to `6`, meaning we can't have dice with the value `0`.

***

Now to distribute `missing` between `n` values.

Since we want at least `1` in each dice value, we can find the value of each dice by doing:

```
res[i] = int(math.Min(float64(6), float64(missing - (n - 1 - i))))
missing -= res[i]
```

We find the min between `6`, and `missing - (n - 1 - i)`.

The `6` is because it is the maximum value of dice.

The `(n - 1 - i)` in `missing - (n - 1 - i)` is for finding the max value we can have at `res[i]` so that we have at least `1` for `res[i + 1], res[i + 2], res[i + 3] ... res[n - 1]`.

`i` is the current dice we are on. Since `i` is zero-indexed we can do `(n - (i + 1))`, but this simplifies to `n - i - 1` because of the distributive property. And since `n` is the number of total missing dice, if we do `n - i - 1`, we get the remaining number of dice, and with that a value of `1` per remaining dice.

And if we do `missing - (n - 1 - i)`, we get the maximum value we can give to a dice.

Then the `missing -= res[i]` part removes the missing value from `missing`.

***

``` go
func missingRolls(rolls []int, mean int, n int) []int {
    res := make([]int, n)
    sum := 0
    
    for _, roll := range rolls { 
        // finding sum
        sum += roll
    }
    
    missing := (len(rolls) + n) * mean - sum
    
    if missing > n * 6 || missing < n {
        // should return empty array
        return []int{}
    }
    
    for i := 0; i < n; i++ {
        // distribute the missing
        res[i] = int(math.Min(float64(6), float64(missing - (n - 1 - i))))
        missing -= res[i]
    }
    
    return res
}
```
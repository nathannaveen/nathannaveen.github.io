---
title: "Leetcode 1323"
date: 2021-04-19T10:48:16-04:00
toc: false
images:
tags: [golang, math, leetcode]
---


[1323. Maximum 69 Number](https://leetcode.com/problems/maximum-69-number/)

This solution is pretty simple once you understand it.

**The idea of this solution is** since `9 - 6 = 3`, so `6 + 3 = 9`. When we add `3 * the current place value` to `6 * the current place value` we get `9 * the current place value`. So if we do `60 + (3 * 10) = 90`, `600 + (3 * 100) = 900, 6000 + (3 * 1000) = 9000`. Now we can apply this for the current problem. We are given the number `num`, so all we have to do is find the `6` with the greatest place value and then multiply it by `3`, and add `num` to the result. This can be shown with the expretion `(6 with the greatest place value * 3) + num`.

**The walk through this solution is:**
* We first loop while `temp > 0`, `temp` is a temporary variable of `num`
* Then we check whether `temp % 10 == 6`, which checks whether the current digit starting from the `1`'s digit is equal to `6`. If it is, we can make the `last6Position` similar to `placeValue` (`placeValue` has the pattern of `1, 10, 100, 1000...`)
* Then we divide `temp` by `10` and multiply `placeValue` by `10`.
* Then we can return `num + last6Position * 3`.

**If you still don't understand look at the following example:**

`num = 96966969`
`expected output = 99966969`

What we can do:

* `temp = 96966969, placeValue = 1`, `temp % 10 == 9` so continue, `temp /= 10, placeValue *= 10`
* `temp = 9696696, placeValue = 10`, `temp % 10 == 6` so `last6Position = 10`, `temp /= 10, placeValue *= 10`
* `temp = 969669, placeValue = 100`, `temp % 10 == 9` so continue, `temp /= 10, placeValue *= 10`
* `temp = 96966, placeValue = 1000`, `temp % 10 == 6` so `last6Position = 1000`, `temp /= 10, placeValue *= 10`
* `temp = 9696, placeValue = 10000`, `temp % 10 == 6` so `last6Position = 10000`, `temp /= 10, placeValue *= 10`
* `temp = 969, placeValue = 100000`, `temp % 10 == 9` so continue, `temp /= 10, placeValue *= 10`
* `temp = 96, placeValue = 1000000`, `temp % 10 == 6` so `last6Position = 1000000`, `temp /= 10, placeValue *= 10`
* `temp = 9, placeValue = 10000000`, `temp % 10 == 9` so continue, `temp /= 10, placeValue *= 10`
* `temp <= 0` so break out of loop.
* `num + (3 * 1000000) = num + 3000000 = 96966969 + 3000000 = 99966969`, return `99966969`.
* our expected output equal our actual output so this works.


**The Code:**


``` go
func maximum69Number(num int) int {
    temp, placeValue, last6Position := num, 1, 0

    for temp > 0 {
        if temp % 10 == 6 {
            last6Position = placeValue
        }
        temp /= 10
        placeValue *= 10
    }
    return num + last6Position * 3
}
```
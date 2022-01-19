---
title: "Leetcode 2119"
date: 2022-01-19T13:01:31-06:00
toc: false
images:
tags: [leetcode, golang, math]
---

The idea of this solution is that any number that has a `0` at the end will result in a different number after reversed twice.

This is shown using the numbers:

* `3210` reversed equals `123` which reversed again equals `321`
* `31000` reversed equals `13` which reversed again equals `31`

The only exception for this rule in the number `0`. because `0` zero reversed any amount of times equals `0`.

``` go
func isSameAfterReversals(num int) bool {
    return num == 0 || num % 10 != 0
}
```
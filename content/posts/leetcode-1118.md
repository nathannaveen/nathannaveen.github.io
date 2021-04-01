---
title: "Leetcode 1118"
date: 2021-04-01T13:15:33-05:00
toc: false
images:
tags: [leetcode, golang, math]
---

[1118. Number of Days in a Month](https://leetcode.com/problems/number-of-days-in-a-month/)

To start, I wouldn't say that this is a good interview problem because it is not an algorithmic problem.

The months and the number of days in each month can be shown in the table below:

![](https://i.imgur.com/cBmSB5Y.jpg)

> In February, it can be either `28` days or `29` days. `28` days in a regular year and `29` days in a leap year.

We can see that if the month is `January, March, May, July, August, October, December`, we return `31` days.

Otherwise, if the month is not `February`, we can return `30` days.

Otherwise, if it is a leap year and it is `February`, we know that we can return `29`.

Else we know that it is not a leap year and it is `February we can return `28`.

**First Version:**

``` go
func numberOfDays(Y int, M int) int {
    if M == 1 || M == 3 || M == 5 || 
    M == 7 || M == 8 || M == 10 || M == 12 { return 31 }
    if M != 2 { return 30 }
    if Y % 4 == 0 && (Y % 100 != 0 || Y % 400 == 0) { return 29 }
    return 28
```

**Edited First Vertion:** *()*

``` go
func numberOfDays(Y int, M int) int {
    if (M <= 7 && M % 2 == 1) || (M >= 8 && M % 2 == 0) { return 31 }
    if M != 2 { return 30 }
    if Y % 4 == 0 && (Y % 100 != 0 || Y % 400 == 0) { return 29 }
    return 28
}
```
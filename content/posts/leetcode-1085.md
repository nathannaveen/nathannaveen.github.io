---
title: "Leetcode 1085"
date: 2021-03-18T17:43:55-04:00
toc: false
images:
tags: [leetcode, golang, array, math]
---

[1085. Sum of Digits in the Minimum Number](https://leetcode.com/problems/sum-of-digits-in-the-minimum-number/)

The idea of the first two solutions is pretty simple. We sort the array `A` and then we just find the sum of the digits of the smallest number.

The idea of the second solution is pretty simple as well. We loop through `A` and find the minimum value, and the find the sum of the digits of the smallest number.

**Solution:** *(Using a manual sort)*.

``` go
func sumOfDigits(A []int) int {
    for i := 1; i < len(A); i++ { // sorting A
        if i >= 1 && A[i] < A[i - 1] {
            A[i], A[i - 1] = A[i - 1], A[i]
            i -= 2
        }
    }
    sum := 0
    n := A[0]

    for n > 0 { // looping through n and then adding every digit to n
        sum += n % 10
        n /= 10
    }
    if sum%2 == 0 {
        return 1
    }
    return 0
}
```

**Edited Solution:** *(Using a built in sort)*.

``` go
func sumOfDigits(A []int) int {
    sort.Ints(A)
    sum := 0
    n := A[0]

    for n > 0 {
        sum += n % 10
        n /= 10
    }
    if sum%2 == 0 {
        return 1
    }
    return 0
}
```

**The Last Solution:**

``` go
func sumOfDigits(A []int) int {
    minimum := A[0]
    sum := 0

    for _, i := range A {
        if i < minimum {
            minimum = i
        }
    }

    for minimum > 0 {
        sum += minimum % 10
        minimum /= 10
    }
    if sum%2 == 0 {
        return 1
    }
    return 0
}
```
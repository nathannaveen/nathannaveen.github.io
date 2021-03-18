---
title: "Leetcode 1133"
date: 2021-03-18T17:43:48-04:00
toc: false
images:
tags: [leetcode, golang, map, array]
---

[1133. Largest Unique Number](https://leetcode.com/problems/largest-unique-number/)

Here are two ways to solve this solution:

One way is to use an array of size `1001` which we call `h` (`1001` because in the notes it says `0 <= A[i] <= 1000`) and add one to `h[A[i]]`. Now we can see that the array will be sorted because we add the number of numbers to `h`.  So all we have to do is iterate through `h` backward and check whether the value of `h[i] == 1`. If so, return `i`. If there are no unique numbers, we can return `-1`.

The other way is to use a map. We can first iterate through `A` and add one to the value of `A`. Then we can iterate through the map and look for all unique numbers. If the current number is greater than the max, we can re-assign the max to the number. After all of that, return the max value.

**Using an Array:**

``` go
func largestUniqueNumber(A []int) int {
    h := make([]int, 1001)

    for _, i := range A {
        h[i]++
    }
    for i := 1000; i >= 0; i-- {
        if h[i] == 1 {
            return i
        }
    }
    return -1
}
```

**Using a Map**

``` go
func largestUniqueNumber(A []int) int {
    h := make(map[int]int)
    number := -1

    for _, i := range A {
        h[i]++
    }

    for i, i2 := range h {
        if i2 == 1 && i > number {
            number = i
        }
    }

    return number
}
```
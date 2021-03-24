---
title: "Leetcode 1213"
date: 2021-03-24T10:44:39-04:00
toc: false
images:
tags: [leetcode, golang, array]
---

[1213. Intersection of Three Sorted Arrays](https://leetcode.com/problems/intersection-of-three-sorted-arrays/)

**What The Problem Asks:**

The problem statement is:

> Given three integer arrays `arr1`, `arr2` and `arr3` sorted in **strictly increasing** order, return a sorted array of **only** the integers that appeared in **all** three arrays.

They are giving us an input of three **strictly increasing** arrays, and we have to find all the numbers that repeat in all three arrays.

This problem statement's critical thing is **strictly increasing** because strictly increasing is different from **Non-decreasing**. Strictly increasing is every number is unique, and it increases, while non-decreasing is a sorted array that includes repeated values.

**The First Solutions idea:**

Since we know that all values in each array are unique, we can see that if there are `3` of the same digit, that digit is in all three arrays.

So this solution loops through all the arrays and adds all the values to a map called `m`. After that, we loop through `m` and add the key to a resulting array called `rea` if the value of `m` is equal to `3`.

**The Second Solutions idea:**

Since we know that all of the arrays are sorted, we can find the repeated numbers without an additional map or array. Basically we loop through all three arrays while :
* `arr1`'s counter is smaller than `len(arr1)`, the counter is called `a`.
* `arr2`'s counter is smaller than `len(arr2)`. The counter is called `b`.
* `arr3`'s counter is smaller than `len(arr3)`, the counter is called `c`.

Then we can find the maximum of `arr1[a], arr2[b], arr3[c]`. If `arr1[a], arr2[b]`, and `arr3[c]` are equal to `maximum`, we know that the number occurs in all three arrays, so we can append the number to the resulting array `res`.

If you don't understand, since the arrays are sorted, we can increase the positions of `a, b, c` to find the common values in all arrays.

If you still don't understand, look at the following example:

**Example:**

`input: arr1 = [1, 2, 5, 6, 9, 10], arr2 = [2, 3, 4, 5, 8, 10], arr3 = [1, 3, 4, 5, 6, 10]`

`expected output: res = [5, 10]`

First we start with `a = 0, b = 0, c = 0`, and `arr1[a] = 1, arr2[b] = 2, arr3[c] = 1`, and the maximum of them is `2`.

* Since `arr[a] < 2` we have to add one to `a` so `a = 1`.
* `arr2[b] == 2` so do noting to `b`.
* `arr3[c] < 2` so we have to add one to `c` and `c = 1`.

Now `a = 1, b = 0, c = 1`, and `arr1[a] = 2, arr2[b] = 2, arr3[c] = 3`. Now the maximum is `3` so:

* `arr1[a] < 3` so add one to `a`.
* `arr2[b] < 3` so add one to `b`.
* `arr3[c] == 3` so do nothing.

Next `a = 2, b = 1, c = 1`, and `arr1[a] = 5, arr2[b] = 3, arr3[c] = 3`. Now the `maximum = 5`.

* `arr1[a] == 5` so do nothing.
* `arr2[b] < 5` so add one to `b`.
* `arr3[c] < 5` so add one to `c`.

Now `a = 2, b = 2, c = 2`, and `arr1[a] = 5, arr2[b] = 4, arr3[c] = 4`. `maximum = 5`.

* `arr1[a] == 5` so still do nothing to `a`.
* `arr2[b] < 5` so add one to `b`.
* `arr3[c] < 5` so add one to `c`.

Now `a = 2, b = 3, c = 3`, and `arr1[a] = 5, arr2[b] = 5, arr3[c] = 5`, `maximum = 5`.

* `arr1[a] == 5`
* `arr2[b] == 5`
* `arr3[c] == 5`
* Since `arr1[a], arr2[b], arr3[c]` all equal `5` we know that `5` appears in all three arrays. So we can add `5` to our resulting array `res`. Now `res = [5]`. Also since they all equal `5` we can add one to `a, b` and `c`.

Now `a = 3, b = 4, c = 4`. `arr1[a] = 6, arr2[b] = 8, arr3[c] = 6`. `maximum = 8`.

* `arr1[a] < 8` so add one to `a`.
* `arr2[b] == 8` so do nothing.
* `arr3[c] < 8` so add one to `c`.

Next `a = 4, b = 4, c = 5`, and `arr1[a] = 9, arr2[b] = 8, arr3[c] = 10`. `maximum = 10`.

* `arr1[a] < 10` so add one to `a`.
* `arr2[b] < 10` so add one to `b`.
* `arr3[c] == 10` so do nothing to `c`.

Now `a = 5, b = 5, c = 5`, and `arr1[a] = 10, arr2[b] = 10, arr3[c] = 10`. `maximum = 10`.

* `arr1[a] == 10`, so do nothing.
* `arr2[b] == 10`, so do nothing.
* `arr3[c] == 10`, so do nothing.
* Since `arr1[a], arr2[b], arr3[c]` are all equal to `10` we can append `10` to `res`, so `res = [5, 10]`. Now we add one to `a, b` and `c`.

Now `a = 6, b = 6, c = 6`. But now `a == len(arr1), b == len(arr2), c == len(arr3)` so we have to break out of the loop. Now we also return `res`. `res = [5, 10]` and the expected output was `[5, 10]`. So it is correct.

You might be wondering what we are doing to sort the returning array because it wants the array to be sorted and then returned. Since we are iterating through the three arrays, and the arrays are sorted, the result will be sorted.


**Solution One:**

``` go
func arraysIntersection(arr1 []int, arr2 []int, arr3 []int) []int {
    m := make(map[int]int)
    res := []int{}

    for _, i := range arr1 {
        m[i]++
    }
    for _, i := range arr2 {
        m[i]++
    }
    for _, i := range arr3 {
        m[i]++
    }

    for i, i2 := range m {
        if i2 == 3 {
            res = append(res, i)
        }
    }
    sort.Ints(res)
    return res
}
```

**Solution Two:**

``` go
func arraysIntersection(arr1 []int, arr2 []int, arr3 []int) []int {
    res := []int{}
    a, b, c := 0, 0, 0

    for a < len(arr1) && b < len(arr2) && c < len(arr3) {
        maximum := max(arr1[a], max(arr2[b], arr3[c]))
        if arr1[a] == maximum && arr2[b] == maximum && arr3[c] == maximum {
            res = append(res, arr1[a])
            a, b, c = a+1, b+1, c+1
        } else {
            if arr1[a] != maximum {
                a++
            }
            if arr2[b] != maximum {
                b++
            }
            if arr3[c] != maximum {
                c++
            }
        }
    }

    return res
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```
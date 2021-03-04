---
title: "Leetcode 1636"
date: 2021-03-03T16:02:55-05:00
toc: false
images:
tags: [leetcode, array, golang, sort, images]
---

[1636. Sort Array by Increasing Frequency](https://leetcode.com/problems/sort-array-by-increasing-frequency/)

The main idea of both the solutions is to add all the numbers to a matrix of lengths `[len(nums)][2]` and then sort each frequency of numbers by the max frequency. Suppose two values have the same frequency sort them by the value in descending order. After they are sorted, add all the values back to `nums` and return `nums`.

**This is the sort:**

```
for i := 1; i < len(arr); i++ {
    if i >= 1 && ((arr[i-1][0] > arr[i][0]) || 
    (arr[i-1][0] == arr[i][0] && arr[i-1][1] < arr[i][1])) {
        arr[i], arr[i-1] = arr[i-1], arr[i]
        i -= 2
    }
}
```

The idea of it is to start at the second item (first if 0 indexed) and then check whether the frequency of the number before the current is greater than the frequency of the current number. This is show like this in the code: `((arr[i-1][0] > arr[i][0])`. Or it checks whether the frequency is the same and whether the current number is greater than the number before the current number, this is show in the code as this: `arr[i-1][0] == arr[i][0] && arr[i-1][1] < arr[i][1]`. If either of these things is true, then switch the current and number before the current element and subtracts `2` from `i`. We subtract `2` from `i` to move back if we have to switch the next current and number before the current numbers. And we subtract `2`, not `1` because the loops `i++` cancel out one of the subtracts. Since we have an `i -= 2`, we have to check whether `i >= 1` because if we don't and `i == 0`, we would have an out-of-bounds exception.

If you dont understand the explaination look at these images:

![](https://i.imgur.com/2zecuOJ.jpg)
![](https://i.imgur.com/ZoBc0N6.jpg)
![](https://i.imgur.com/FFnnfj8.jpg)


The second code has better space complexity because, in the first solution, we use a `map` of size `len(nums)` and an `array` of size `[len(nums)][2]`. In the second solution, we just use an `array` of size `[len(nums)][2]`.



**Code One:**

```
func frequencySort(nums []int) []int {
    m := make(map[int]int)
    arr := [][]int{}
    counter := 0

    for _, num := range nums {
        m[num]++
    }
    for i, i2 := range m {
        arr = append(arr, []int{i2, i})
    }

    for i := 1; i < len(arr); i++ {
        if i >= 1 && ((arr[i-1][0] > arr[i][0]) || 
        (arr[i-1][0] == arr[i][0] && arr[i-1][1] < arr[i][1])) {
            arr[i], arr[i-1] = arr[i-1], arr[i]
            i -= 2
        }
    }

    for i := 0; i < len(arr); i++ {
        for j := 0; j < arr[i][0]; j++ {
            nums[counter] = arr[i][1]
            counter++
        }
    }

    return nums
}
```

**Code Two:**

```
func frequencySort(nums []int) []int {
    arr := [][]int{}
    counter := 0

    for _, num := range nums {
        contains := false

        for _, ints := range arr {
            if ints[1] == num {
                ints[0]++
                contains = true
                break
            }
        }

        if !contains {
            arr = append(arr, []int{1, num})
        }
    }

    for i := 1; i < len(arr); i++ {
        if i >= 1 && ((arr[i-1][0] > arr[i][0]) ||
        (arr[i-1][0] == arr[i][0] && arr[i-1][1] < arr[i][1])) {
            arr[i], arr[i-1] = arr[i-1], arr[i]
            i -= 2
        }
    }

    for i := 0; i < len(arr); i++ {
        for j := 0; j < arr[i][0]; j++ {
            nums[counter] = arr[i][1]
            counter++
        }
    }

    return nums
}
```



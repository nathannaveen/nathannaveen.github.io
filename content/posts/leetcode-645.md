---
title: "Leetcode 645"
date: 2021-03-02T11:27:21-05:00
toc: false
images:
tags: [golang, array, leetcode, math]
---


[645. Set Mismatch](https://leetcode.com/problems/set-mismatch/)

The idea of this solution is to add every number in the array `nums` to another array called `temp`. Next we go through the array temp and check whether the number of a certain number is equal to `2`, if it is then we know that it is the repeated number. If it is not `2` but it is `0` we know that it is the skiped number. We know that there is always a duplicate number, so if we found the duplicate but not the value that is skiped we return the duplicate and the duplicate plus one, because if the skiped is not inside the array we have to return the next number.

`temp` has `10001` values because the constraints of the problem say `2 <= nums.length <= 10^4, 1 <= nums[i] <= 10^4`, since `10^4` equals `10000` and the constraints say `nums.length <= 10^4` we have to do `10^4 + 1 = 10000 + 1 = 10001`.

```
func findErrorNums(nums []int) []int {
    sort.Ints(nums)
    double, skip := 0, 0
    temp := make([]int, 10001)

    for _, num := range nums {
        temp[num]++
    }

    for i, value := range temp {
        if value == 2 {
            double = i
            if skip != 0 {return []int{double, skip}}
        } else if value == 0 {
            skip = i
            if double != 0 {return []int{double, skip}}
        }
    }

    return []int{double, double + 1}
}
```
---
title: "Leetcode 1991"
date: 2021-10-28T15:59:14-05:00
toc: false
images:
tags: [leetcode, golang, array]
---

[1991. Find the Middle Index in Array](https://leetcode.com/problems/find-the-middle-index-in-array/)

The idea of this solution is pretty simple:

* We find the sum of all the numbers in `nums` (In this solution, I am calling it `sum`)
* Then we check whether `sum - left - nums[i] == left` (I will get back to what `left` is and what this whole thing means in the following parts). If so, we can return `i` (The index).
* The variable called `left` keeps track of the left sum, so we do `left += nums[i]`.

So, if you don't understand what `sum - left - nums[i] == left` is doing, read the following:

There is a small part that I would assume someone would have missed, and that is in the following:

> `nums[0] + nums[1] + ... + nums[middleIndex-1] == nums[middleIndex+1] + nums[middleIndex+2] + ... + nums[nums.length-1]`

We are supposed to make the sum of all the numbers before `nums[i]` equal to the sum of all the numbers after `nums[i]`, not including `nums[i]`.

So doing `sum - left - nums[i] == left` is basically checking whether `right sum == left sum`:

* `sum - left` is for getting the sum of all the elements to the right of `nums[i - 1]` (Basically all the elements to the right of `nums[i]` plus `nums[i]`)
* Subtracting `nums[i]` from `sum - left` is for taking out the `nums[i]`.
* The two bullet points before this one were for finding the right sum, but since we know the left sum we can just check whether `right sum == left sum`.

``` go
func findMiddleIndex(nums []int) int {
    sum := 0
    left := 0
    
    for _, num := range nums { sum += num }
    
    for i := range nums {
        if sum - left - nums[i] == left {
            return i
        }
        
        left += nums[i]
    }
    
    return -1
}
```
---
title: "Leetcode 55"
date: 2021-07-06T18:24:47-05:00
toc: false
images:
tags: [golang, leetcode, images, array]
---

[55. Jump Game](https://leetcode.com/problems/jump-game/)

The idea of this solution is pretty simple once you understand it.

The idea of this solution is:

* We get the maximum index we can go up to by getting the maximum of `i + nums[i]` and `max`.
* Then, if `i` has surpassed the maximum index, we can return `false`.
* Otherwise return `true`.

If you don't understand why this works, look at the following example:

input: `[3, 2, 1, 0, 4]`
expected output: `false`

![](https://i.imgur.com/jgoKd6Q.jpg)

**The Code:**

``` go
func canJump(nums []int) bool {
    max := 0
    for i := 0; i < len(nums); i++ {
        if i > max {
            return false
        }
        if i + nums[i] > max {
            max = i + nums[i]
        }
    }
    return true
}
```
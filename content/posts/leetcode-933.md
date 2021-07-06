---
title: "Leetcode 933"
date: 2021-07-06T18:25:16-05:00
toc: false
images:
tags: [leetcode, golang, design]
---

[933. Number of Recent Calls](https://leetcode.com/problems/number-of-recent-calls/)

For this solution, we have got to look at something that is said in the problem description:

> It is ***guaranteed*** that every call to ping uses a strictly larger value of `t` than the previous call.

So using that, we can make a variable (Which I called `k`) and store the position of the last position of the value that is greater than or equal to `t - 3000`. Then when we add a `t` to an array, and we can keep adding to `k` so we find the number of recent calls/

``` go
type RecentCounter struct {
    k int
    arr []int
}


func Constructor() RecentCounter {
    return RecentCounter{0, []int{}}
}


func (this *RecentCounter) Ping(t int) int {
    this.arr = append(this.arr, t)
    
    for this.arr[this.k] < t - 3000 {
        this.k++
    }
    return len(this.arr) - this.k
}
```
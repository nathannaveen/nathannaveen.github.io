---
title: "Leetcode 1272"
date: 2021-04-07T12:36:27-05:00
toc: false
images:
tags: [leetcode, golang, array, images]
---

[1272. Remove Interval](https://leetcode.com/problems/remove-interval/)

**What This Code Is Doing:**

We make a new resulting array and then loop through `intervals`.

What we need to know for the following if and else statements is when the code loops through `intervals`, we get `interval` per iteration. `interval` is in the format `[start, end]`. Also, the constraints say `-10^9 <= start < end <= 10^9`, so we can see that `start` and `end` are never on the exact same location and the `start` is always lesser than `end`.

The if and else statments are as follows:

* When we do the if statment: `if interval[0] < toBeRemoved[0] && toBeRemoved[1] < interval[1] {` we are checking whether the `start` of `interval` is smaller than the `start` of `toBeRemoved` and the `end` of `interval` is greater than the `end` of `toBeRemoved`, like in the following image: ![](https://i.imgur.com/As6SkRK.jpg) *(Note: `interval` is green and `toBeRemoved` is red)* The `start` of `interval` is smaller than the `start` of `toBeRemoved`, and the `end` of `interval` is greater than the `end` of `toBeRemoved`.

* The first else if statment is `else if interval[0] < toBeRemoved[0] && interval[1] > toBeRemoved[0] && interval[1] <= toBeRemoved[1] {`. It is for if the interception of `interval` and `toBeRemoved` is on the right of `toBeRemoved`, this can be shown with an image: ![](https://i.imgur.com/r7HrHZa.jpg) This is for if `interval`'s `start` is smaller than `toBeRemoved`'s `start`, `intervals`'s `end` is smaller than `toBeRemoved`'s `end`, and `interval`'s `end` is greater than `toBeRemoved`'s `start`.

* The next else if is `else if interval[0] >= toBeRemoved[0] && interval[0] < toBeRemoved[1] && interval[1] > toBeRemoved[1] {`. Is for the same thing as the first else if except it is on the other side of `toBeRemoved`. This can be shown using an image: ![](https://i.imgur.com/YyTQdID.jpg)

* The next else if is `else if interval[0] >= toBeRemoved[0] && interval[0] < toBeRemoved[1] && interval[1] <= toBeRemoved[1] && interval[1] > toBeRemoved[0] {`. This is for if the `start` of `interval` is greater than the `start` of `toBeRemoved` and the `end` of `interval` is smaller than `end` of `toBeRemoved`. This can be shown using an image: ![](https://i.imgur.com/Jm3W1S8.jpg)

* And last but not least our else. This is for if there is no overlap of `interval` and `toBeRemoved`. This can be shown using an image: ![](https://i.imgur.com/2PsNVdQ.jpg)

That is all there is to the code, thank you for reading.

**The Code:**

``` go
func removeInterval(intervals [][]int, toBeRemoved []int) [][]int {
    res := [][]int{}
    for _, interval := range intervals {
        if interval[0] < toBeRemoved[0] && toBeRemoved[1] < interval[1] {
        
            res = append(res, []int{interval[0], toBeRemoved[0]}, 
            []int{toBeRemoved[1], interval[1]})
            
        } else if interval[0] < toBeRemoved[0] && interval[1] > toBeRemoved[0]
        && interval[1] <= toBeRemoved[1] {
        
            res = append(res, []int{interval[0], toBeRemoved[0]})
            
        } else if interval[0] >= toBeRemoved[0] && interval[0] < toBeRemoved[1]
        && interval[1] > toBeRemoved[1] {
        
            res = append(res, []int{toBeRemoved[1], interval[1]})
            
        } else if interval[0] >= toBeRemoved[0] && interval[0] < toBeRemoved[1]
        && interval[1] <= toBeRemoved[1] && interval[1] > toBeRemoved[0] {
        
            continue
            
        } else {
            res = append(res, interval)
        }
    }
    return res
}
```
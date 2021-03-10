---
title: "Leetcode 1752"
date: 2021-03-09T21:04:13-05:00
toc: false
images:
tags: [leetcode, golang, array, sort, images]
---

[1752. Check if Array Is Sorted and Rotated](https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/)

The idea of this solution is to loop through the array, and then check whether there is a `nums[i]` which is greater than `nums[(i+1) % len(nums)]` (By the way `(i+1) % len(nums)` is for getting the next number) if `nums[i] > nums[(i+1)%len(nums)]` then add one to a counter called `counter`. Then we check whether `counter` is greater than or equal to `2`.

We check whether `counter`is greater than or eqal to `2` because if there are more than one `nums[i] > nums[(i+1)%len(nums)]` we know that it is not sorted.

![](https://i.imgur.com/v2Qpuls.jpg)
> This is sorted, we know because there is only one `nums[i] > nums[(i+1)%len(nums)]`. The array is `[4, 5, 1, 2, 3]` and when we rotate it we get `[1, 2, 3, 4, 5]`.

![](https://i.imgur.com/SHE6tuZ.jpg)

> We we can see that the array `[2, 5, 1, 4, 3]` can never be rotated and be sorted:
> `[5, 1, 4, 3, 2]`
> `[1, 4, 3, 2, 5]`
> `[4, 3, 2, 5, 1]`
> `[3, 2, 5, 1, 4]`
> `[2, 5, 1, 4, 3]`
>
> As you can see there is two `nums[i] > nums[(i+1)%len(nums)]` so it will never be sorted.

![](https://i.imgur.com/1oHm0tT.jpg)

> The input is already sorted, but even without that we can see that there is only one `nums[i] > nums[(i+1)%len(nums)]`.

****


``` go
func check(nums []int) bool {
    counter := 0

    for i := 0; i < len(nums); i++ {
        if nums[i] > nums[(i+1)%len(nums)] {
            counter++
        }
        if counter >= 2 {
            return false
        }
    }

    return true
}
```

**We could make the first solution a little better by doing:** *(This is better because we are only checking the if when we add to counter and not every single time)*

``` go
func check(nums []int) bool {
    counter := 0

    for i := 0; i < len(nums); i++ {
        if nums[i] > nums[(i+1)%len(nums)] {
            counter++
            if counter >= 2 {
                return false
            }
        }

    }

    return true
}
```
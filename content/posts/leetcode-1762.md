---
title: "Leetcode 1762"
date: 2021-03-19T09:39:06-04:00
toc: false
images:
tags: [leetcode, golang, images, array]
---

[1762. Buildings With an Ocean View](https://leetcode.com/problems/buildings-with-an-ocean-view/)

**The idea of the solution:**

The idea of this solution is to loop through the array `heights` backwards. Then we just have to find if a height that is greater that the curent height. After that we can reverse the resulting array because the problem asks us to give us the sorted array of indexes that have an ocean view.

If you don't understand the explaination just look at the following images:

**The input:**

![](https://i.imgur.com/ihGpLUO.jpg)

![](https://i.imgur.com/2Vkgh4m.jpg)

> Since `max = 0` and `heights[6] = 1`. Since `1 > 0` we add the index `6` to the resulting array `arr`, right now `arr = []`, and if we add `6` to it we get `arr = [6]`. We also have to make `max = 1` because that is how we know that we can't see the ocean if it is smaller than or equal to `max`.

![](https://i.imgur.com/BXp37tQ.jpg)

> Now we are at index `5`. Right now we have `max = 1`, and as we can see `3` is greater than `max` so we can add the index `5` to `arr`, and make `arr = [6, 5]`.

![](https://i.imgur.com/ctd0pvR.jpg)

> Since `max = 3` and `heights[4] = 2`, so we don't add `4` to `arr`.

![](https://i.imgur.com/fTja9k5.jpg)

> At index `3` and we have `max = 3`. Since `heights[3] = 4` and `4 > 3` we can add the index `3` to `arr`. So now `arr = [6, 5, 3]`

![](https://i.imgur.com/4wPKKBo.jpg)

> We are at index `2` and we have `max = 4`. Since `heights[2] = 3` we don't add `2` to `arr` because `3 < 4`

![](https://i.imgur.com/rLwln9j.jpg)

> Now we are at index `1`, and `heights[1] = 5` while `max = 4`. Since `5 > 4` we add `1` to `arr`. Now `arr = [6, 5, 3, 1]`.

![](https://i.imgur.com/GuGA8dY.jpg)

> As we can see at index `0` `heights[0] = 2`, while `max = 5`. Since `2 < 5` we don't add to `arr`.


After all of this we get the array `arr = [6, 5, 3, 1]`. Now the problem asks us to return the array sorted in a increasing order, so all we have to do is reverse `arr` and we get `arr = [1, 3, 5, 6]`. Now we can return `arr`.


``` go
func findBuildings(heights []int) []int {
    maximum := 0
    arr := []int{}
    for i := len(heights) - 1; i >= 0; i-- {
        if heights[i] > maximum {
            maximum = heights[i]
            arr = append(arr, i)
        }
    }
    return reverseArr(arr)
}

func reverseArr(arr []int) []int {
    left, right := 0, len(arr)-1

    for left < right {
        arr[left], arr[right] = arr[right], arr[left]
        left, right = left+1, right-1
    }
    return arr
}
```
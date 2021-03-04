---
title: "Leetcode 347"
date: 2021-03-04T15:47:24-05:00
toc: false
images:
tags: [leetcode, golang, array, images, sort]
---


[347. Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)

The idea of this solution is pretty simple. First, add all the numbers to a matrix array with the size `[number of different elements][2]`. Then sort the array, and then add the values to a regular array of size `K`.

****

The matrix array has a size of `[number of different elemtnets][2]` because we need to add every element to its corresponding place in the array and then update the frequency by adding one to it. The array is put in the format `[frequency][number]`.

****

This array is sorted by frequency first and then the number. When we sort, we check whether the frequency of the last number is smaller than the frequency of the current number. If so, then switch the two items, and subtract `2` from the counter.

****

**The sort can be shown using these images:**

![](https://i.imgur.com/fcBnUG3.jpg)

![](https://i.imgur.com/GQeJ16L.jpg)

> [color=#0000ff] The frequency of the previous index is smaller than the current index, so switch them and subtract `2` from the index.

![](https://i.imgur.com/CyCoaX4.jpg)

> [color=#0000ff] Even though we subtract `2` from the index, we only go back `1` place because we add `1` to the index with the for loop.
>
> Since the index is at zero, which is smaller than `1`, we don't do anything. We can't check whether the current index's frequency is smaller than the previous index's frequency because there is no previous index.

![](https://i.imgur.com/KYCWTms.jpg)

> [color=#0000ff] We don't do anything because the frequency of the previous number is greater than the current frequency.

![](https://i.imgur.com/zRoioun.jpg)

> [color=#0000ff] We still don't do anything because the previous frequency is greater than the current frequency. Since this is the last index, we know that `arr = [[4, 1], [2, 3], [1, 2]]` with the greatest frequency at the beginning and the smallest frequencies at the end.

****

``` go
func topKFrequent(nums []int, k int) []int {
    arr := [][]int{}

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
        if i >= 1 && arr[i-1][0] < arr[i][0] {
            arr[i], arr[i-1] = arr[i-1], arr[i]
            i -= 2
        }
    }

    nums = []int{}
    for i := 0; i < k; i++ {
        nums = append(nums, arr[i][1])
    }

    return nums
}
```
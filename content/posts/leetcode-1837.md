---
title: "Leetcode 1837"
date: 2021-06-16T11:22:46-05:00
toc: false
images:
tags: [leetcode, golang, math]
---

[1837. Sum of Digits in Base K](https://leetcode.com/problems/sum-of-digits-in-base-k/)

Before I explain both solution I just want to say that *for me* the first solution is not as readable as the second solution but easyer to understand (Note: I wrote the first solution before the second solution so that might be why).

The first solution basicly uses the fact that `n` only goes up to `100` and that `k` has a range of `2` to `10`

``` go
func sumBase(n int, k int) int {
	arr := make([]int, 7)
	res := 0
	product := 1
	for i := 0; i < 7; i++ {
		arr[len(arr) - i - 1] = product
		product *= k
	}
	
	counter := 0
	for n > 0 {
		res += n / arr[counter]
		n = n % arr[counter]
		counter++
	}
	return res
}
```

``` go
func sumBase(n int, k int) int {
	res := 0
	for n > 0 {
		res += n % k
		n /= k
	}
	return res
}
```
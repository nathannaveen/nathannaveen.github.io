---
title: "Leetcode 1523"
date: 2021-02-24T17:03:24-05:00
draft: true
toc: false
images:
tags: [leetcode, golang, math]
---
[1523. Count Odd Numbers in an Interval Range](https://leetcode.com/problems/count-odd-numbers-in-an-interval-range/)

The idea of this solution is to get the number odd numbers from `0` to `high`, and then subtract the number of odd numbers from `0` to `low - 1`. The idea can be shown by an example:
* **
```
high: 7
low : 3
```

![image](https://assets.leetcode.com/users/images/2ca6929e-c01e-491f-9505-85dc303d779a_1614122599.638341.png)
* *The odd numbers from `0` to `high` (`7`).* There are `4` odd numbers from `0` to `7`.

![image](https://assets.leetcode.com/users/images/0b5c316a-d1ed-426a-889f-2741c8b861f4_1614122953.1401534.png)
* *The odd numbers from `0` to `low - 1` (`2`).* There is `1` odd numbers from `0` to `2`.

The number of odd numbers would be `4 - 1 = 3`. Three odd numbers.

* **
```
func countOdds(low int, high int) int {
	return (high + 1)/2 - low / 2
}
```


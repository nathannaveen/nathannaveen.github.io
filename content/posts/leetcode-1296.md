---
title: "Leetcode 1296"
date: 2021-02-25T15:47:35-05:00
toc: false
images:
tags: [array, leetcode, golang]
---
[Divide array in sets of k consecutive numbers](https://leetcode.com/problems/divide-array-in-sets-of-k-consecutive-numbers/)

The idea of this solution is to loop over the `nums` array until all the values are `-1`. The reason they all will become negative one is, whenever a item is used the value will become `-1` so the code knows to not use that number again.


**If you didn't understand the explanation this can be shown using the code on the bottom, an example and some pictures:**
*By the way sorry if my handwriting is messy*
```
input = [1, 2, 4, 3, 4, 5, 6, 3], k = 4
expected output = true
```

This is for getting the first consecutive sequence:
![image](https://assets.leetcode.com/users/images/cfc0f0b7-8ffc-4ab0-8b83-143691f75526_1614179878.874795.png)

And the second consecutive sequence:
![image](https://assets.leetcode.com/users/images/eb4d3251-f7a8-4fe4-a3d2-ee89a0cc4e42_1614180843.1899865.png)

Since we found two consecutive sequences we can return `true`.

* **

```
func isPossibleDivide(nums []int, k int) bool {
	if len(nums)%k != 0 {
		return false
	}
	sort.Ints(nums)
	onlyNegetiveOnes := false

	for !onlyNegetiveOnes {
		onlyNegetiveOnes = true
		n := -1
		counter := 0
		for i := 0; i < len(nums); i++ {
			if nums[i] != -1 {
				onlyNegetiveOnes = false
				if (n == -1) || (counter != k && nums[i] == n+1) {
					n = nums[i]
					nums[i] = -1
					counter++
				} else if counter == k {
					break
				}
			}
		}
		if counter != k && counter != 0 {
			return false
		}
	}
	return true
}
```
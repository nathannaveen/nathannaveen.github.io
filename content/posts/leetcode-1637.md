---
title: "Leetcode 1637"
date: 2021-02-24T16:52:08-05:00
toc: false
images:
tags: [leetcode, golang, math]
---
[1637. Widest Vertical Area Between Two Points Containing No Points](https://leetcode.com/problems/widest-vertical-area-between-two-points-containing-no-points/)

    points = {x, y}

The idea of this solution is to ignore the `y` part of `points` because the vertical area is the made of vertical lines. Vertical lines are made up off one `x` value for every `y` value. An example could be the line `x = 3`, this is a vertical line at the x value `3`.

The code first puts all the `x` points in the array `xPoints`. Then it sorts `xPoints` so all the `x`'s are ready to use a sliding window approche of size two to find the greatest distance between all the two points. This can be show with this picture:

```
input: [[8, 7], [9, 9], [7, 4], [9, 7]]
output: 1
```

![image](https://assets.leetcode.com/users/images/84ee2492-0703-4617-a38e-6691b4bcc3ea_1614125888.3422618.png)

* Find all the `x`'s and add them to a array
* Sort the `x`'s
* Use a sliding window to find the max difference each `x` value.
* **

```
func maxWidthOfVerticalArea(points [][]int) int {
	xPoints := []int{}
	for _, point := range points {
		xPoints = append(xPoints, point[0])
	}
	sort.Ints(xPoints)
	max := 0

	for i := 0; i < len(xPoints)-1; i++ {
		if xPoints[i+1]-xPoints[i] > max {
			max = xPoints[i+1] - xPoints[i]
		}
	}

	return max
}
```

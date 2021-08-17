---
title: "Leetcode 1893"
date: 2021-08-17T12:30:59-05:00
toc: false
images:
tags: [golang, leetcode, images, array]
---

[1893. Check if All the Integers in a Range Are Covered](https://leetcode.com/problems/check-if-all-the-integers-in-a-range-are-covered/)

First, a walk-through of the code, and then an explanation.

**A Walk Through Of the Solution:**

* We can sort `ranges` by the ranges left value (I think of `ranges` as `ranges = [][]int{ []int{left, right} }`).
* Then I loop through ranges and:
    * If the ranges left value is greater than `left`, we can return false.
    * If the ranges left value is smaller than or equal to `left` and the ranges right is smaller than `right`, we can re-make `left`.
    * If the ranges left value is smaller than or equal to `left` and the ranges right is greater than or equal to `right` we can return true.
* Otherwise, return `false`.

**How This Solution Works:**

I will show a couple of images to explain how this solution works.

![](https://i.imgur.com/rXnpIvS.png)

> This image shows the first part

	if r[0] > left {
		return false
	}

> as you can see, part **A** in this image has the smallest left value, but since it is greater than `left`, we know that there will always be a range that is not covered.

***

![](https://i.imgur.com/wF7dk7f.png)

> This image show the second part:

	if r[1] < right {
		left = r[1] + 1
	}

> We only have one range for this example .
> We can compare the ranges right and `left` to re-make `left` (The <span style="color:red">red</span>. is the new line from `left` to `right`)

***

![](https://i.imgur.com/Vt8dqFm.png)

> This image shows:

	else {
		return true
	}

> The ranges left is smaller than `left` and the ranges right is greater than `right`, so we can return `true`.

***

Then at the end, we can return `false` because if the code has gone that far, the ranges haven't fully covered `left` to `right`.

**The Code:**

``` go
func isCovered(ranges [][]int, left int, right int) bool {
    sort.Slice(ranges, func(i, j int) bool {
        return ranges[i][0] < ranges[j][0]
    })
    
    for _, r := range ranges {
        if r[0] > left {
            return false
        } else if r[1] + 1 > left {
            if r[1] < right {
                left = r[1] + 1
            } else {
                return true
            }
        }
        
    }
    
    return false
}
```
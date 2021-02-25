---
title: "Leetcode 976"
date: 2021-02-25T13:50:15-05:00
toc: false
images:
tags:
  - [math, golang, leetcode]
---

[976. Largest Perimeter Triangle](https://leetcode.com/problems/largest-perimeter-triangle)

The idea of this solution is to sort the array and then keep on checking the largest three side lengths.

In the problem it asks us to "return the largest perimeter of a triangle with non-zero area." Non-zero area means a triangle with the two smaller side lengths that add up to be greater than the greatest side length. This can be show in a couple images

![](https://i.imgur.com/YOk3LWq.jpg)
*The triangle above is a proper triangle with an area greater than zero and we know that because the two smaller lengths, `5` and `5` added together is `10 > 7`.*
![](https://i.imgur.com/HlspeLO.jpg)
*In the image above we can see that this is not a proper triangle because the area is zero. We know that this is not a proper triangle because the two smaller sides lengths are `4` and `3`. Four plus three is `7` and `7` is the length of the greatest triangle. So we don't have a triangle.*

![](https://i.imgur.com/LRxVW4L.jpg)
![](https://i.imgur.com/H1ySPp7.jpg)

*The two images above are not proper triangles because the length of the two smaller sides are smaller than `7` and won't be able to form a triangle.*

```
func largestPerimeter(A []int) int {
    sort.Ints(A)
    for i := len(A) - 1; i >= 2; i-- {
        if A[i] < A[i - 1] + A[i - 2] {
            return A[i] + A[i - 1] + A[i - 2]
        }
    }
    return 0
}
```
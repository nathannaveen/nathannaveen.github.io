---
title: "Leetcode 1954"
date: 2021-08-17T12:31:12-05:00
toc: false
images:
tags: [leetcode, golang, imagesm math]
---

[1954. Minimum Garden Perimeter to Collect Enough Apples](https://leetcode.com/problems/minimum-garden-perimeter-to-collect-enough-apples/)

For this solution, I will try to explain it with an image.

I have drawn a picture to explain how this solution works. I have drawn a `2 x 2` and a `4 x 4` square. I will explain the reason for this later. And I have given each position a letter instead of coordinate so I can give a map with each letter and coordinate.

![](https://i.imgur.com/zHEsL7v.png)

`a = (0, 0)`

`b = (1, -1)`

`c = (0, -1)`

`d = (-1, -1)`

`e = (-1, 0)`

`f = (-1, 1)`

`g = (0, 1)`

`h = (1, 1)`

`i = (1, 0)`

`j = (2, 0)`

`k = (2, -1)`

`l = (2, -2)`

`m = (1, -2)`

`n = (0, -2)`

`o = (-1, -2)`

`p = (-2, -2)`

`q = (-2, -1)`

`r = (-2, 0)`

`s = (-2, 1)`

`t = (-2, 2)`

`u = (-1, 2)`

`v = (0, 2)`

`w = (1, 2)`

`x = (2, 2)`

`y = (2, 1)`

I have drawn a `2 x 2` and a `4 x 4` square because drawing a `3 x 3` square with the center of `0 x 0` is hard. But you as a reader should know that we will use the `3 x 3` part in the following paragraph.

Using this we can see that the number of apples for the `2 x 2` square is `0 + 2 + 1 + 2 + 1 + 2 + 1 + 2 + 1 = 12`, so we have `12` apples in the first plot of land. Now for the `4 x 4` square we can do `0 + 2 + 1 + 2 + 1 + 2 + 1 + 2 + 1 + 2 + 3 + 4 + 3 + 2 + 3 + 4 + 3 + 2 + 3 + 4 + 3 + 2 + 3 + 4 + 3 = 60`, and `60 - 12 = 3 * 3 * 12`. We are doing `60 - 12` because `12` is the number of apples in the `2 x 2` and `60` is the number of apples in the `4 x 4`. We are doing `3 * 3` because to find the number of apples in a `4 x 4` we need to know the number of apples in a `3 x 3`. Since `60 - 12 = 48`, `3 * 3 * 12 = 48`. So to find the number of apples in a `4 x 4` we can do `12 + 48 = 60` (The `12` is the `2 x 2` and the `48` is the `3 x 3`).

Now some of you might be wondering where we get the `3 * 3 * 12`. It is basically `sideLength * sideLength * 12`. To understand how we get the `12`, we have to compare a square of `1 x 1` and a square of `2 x 2`. The square of `1 x 1` has `0` apples while the `2 x 2` square has `12`, so we can do `12 - 0 = 12`.

**The Code:**

``` go
func minimumPerimeter(neededApples int64) int64 {
    sideLength := 0
    
    for neededApples > int64(0) {
        sideLength++
        neededApples -= int64(sideLength * sideLength * 12)
    }
    
    return int64(sideLength * 8)
}
```

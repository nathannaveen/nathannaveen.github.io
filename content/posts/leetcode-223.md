---
title: "Leetcode 223"
date: 2021-03-05T11:04:23-05:00
toc: false
images:
tags: [leetcode, math, golang, images]
---

[223. Rectangle Area](https://leetcode.com/problems/rectangle-area/)


The main idea of this solution is to find the area of each indivigual rectangle and then add them together. After that subtract the overlap of both of them.

If you don't understand the `ABCDRectangle` and the `EFGHRectangle` then look at the following images:

**We can have the example:**

![](https://i.imgur.com/St26i3w.jpg)

Let us start of with the `ABCDRectangle`:

![](https://i.imgur.com/Td0G3vB.jpg)

When we do the equation `(D - B) * (C - A)` we are basicly doing `width * length`. The `width` is `(D - B)`. This can be show by using the image above where `A = -4, B = 2, C = 4, D = 5`. When we do `(D - B)` it equal `(5 - 2) = 3`. So we know that the rectangle has a width of `3`.

Now the `length` is going to be `(C - A)` which is equal to `(4 - (-4)) = (4 + 4) = 8`. Since we already know the width, and we know the height we can put them together. `width * height = 3 * 8 = 24`. The area of this rectangle is `24`.

Next let us do `EFGHRectangle`:

![](https://i.imgur.com/D1uXC5Q.jpg)

This is pretty much the same as the `ABCDRectangle`. The equation `(H - F) * (G - E) = width * length`. As you can see in the image `E = 3, F = -2, G = 7, H = 8`. When we input the numbers in for the variables we get `(H - F) = (8 - (-2)) = (8 + 2) = 10`, so our width is `10`.

We can do the same thing but with length, The part of the equation that is for length is `(G - E)` when we input the numbers in for the variables we get `(7 - 3) = 4`. So we have a length of `4`.

When we multiply our width and our length together we get `10 * 4 = 40` so we have an area of `40`.

When we put both rectangles together we get:


Since we have an area of `24` for `ABCDRectangle` and an area of `40` for `EFGHRectangle`, when we add them up we get an area of `64`. The only problem is we have some over lap (Which I have colored purple in the image). We need to subtract the overlap from the total area.

![](https://i.imgur.com/GBuwLLv.jpg)


The overlap is a rectangle as well so we know that it has two part, `length` and `width`. The idea of this part is the find the length and the width and then multiply them together and subtract that product from the total area.

I made four variables to find out where the overlap is, `left, right, up , down`. Left is the max of `A` and `E`. In this example the max is `E`, and it is the left side of the rectangle. The right is the min of `G` and `C`. In this example `C` is the minimum. Up is the minumum of `D` and `H`. `D` is smaller than `H` so up is `D`. Down is the max of `F` and `B`. `B` is greater than `F` so down is `B`.

Since we know that `left = E, right = C, up = D, down = B`, also we know that `A = -4, B = 2, C = 4, D = 5, E = 3, F = -2, G = 7, H = 8` so we can put those values in for their variables. `left = 3, right = 4, up = 5, down = 2`.

Before we even make the over lap rectangle we have to check whether there is a overlap rectangle. So we do `right > left` because that means the right pointer is greater than the left pointer, and that there is not a negative area. Next it checks whether `up > down` for the same reason that there is no negative area.

Now we can make a rectangle using these values and then subtract that rectangle from the total area. The length will be `(right - left) = (4 - 3) = 1`, and the width will be `(up - down) = (5 - 2) = 3`. Since we know that the area of a rectangle is `length * width` we can do `1 * 3 = 3`.

Now we can just subtract the area of the overlaping rectangle from the total area which is `64 - 3 = 61`. Now we know that our answer is 61.

``` go
func computeArea(A int, B int, C int, D int, E int, F int, G int, H int) int {
    ABCDRectangle := (D - B) * (C - A) // the first square
    EFGHRectangle := (H - F) * (G - E) // the second square
    sum := ABCDRectangle + EFGHRectangle

    left, right := max(A, E), min(G, C)
    up, down := min(D, H), max(F, B)

    if right > left && up > down {
        sum -= (right - left) * (up - down) // overlap
    }
    return sum
}

func max(a, b int) int {
    if a < b {return b}
    return a
}

func min(a, b int) int {
    if a < b {return a}
    return b
}
```
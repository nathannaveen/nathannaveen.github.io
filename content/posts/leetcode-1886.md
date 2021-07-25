---
title: "Leetcode 1886"
date: 2021-07-25T18:33:01-05:00
toc: false
images:
tags: [leetcode, golang, images, array]
---

[1886. Determine Whether Matrix Can Be Obtained By Rotation](https://leetcode.com/problems/determine-whether-matrix-can-be-obtained-by-rotation/)

The idea of this solution is to loop through every point in `mat` and check whether it has been rotated `0, 90, 180`, or `270` degrees.

We don't need to check whether `mat` has been rotated by `0` degrees the way we are doing the rest of the rotations. All we have to do is check whether `mat == target`.

***

I am going to explain how we do the rotations using some images. Usually, when using a grid in math, we will write a coordinate as `(x, y)` but in this grid, we go `(row, col)`, so it will be `(y, x)`, or since we are using `j` and `i` `(i, j)`.

***

In this image, I am writing each coordinate in each square, and the blue highlight is the position we will be using for all the examples:

![](https://i.imgur.com/V6vd3ok.png)

Let us start with `mat[i][j] != target[len(target) - 1 - j][i]` this is for checking whether `target` is `mat` rotated `90` degrees. So our example position, `(2, 1)` is green and the rotated version is yellow. `target[len(target) - 1 - j][i] = target[3 - 1 - 1][2] = target[1][2]`:

![](https://i.imgur.com/EtAMH4p.png)

Our next rotation can be `270` degrees, because `mat[i][j] != target[j][len(target) - 1 - i] = mat[i][j] != target[1][3 - 1 - 2] = target[1][0]`. Just like in the previous image the start is the green and the rotated part is yellow:

![](https://i.imgur.com/rpHRc2C.png)

And for the final rotation, `180` degrees. This image works because `target[3 - 1 - 2][3 - 1 - 1] = target[0][1]`. And just like in the previous image `mat[i][j]` is green and the rotated part is yellow:

![](https://i.imgur.com/nsbFMWm.png)

**The Code:**

``` go
func findRotation(mat [][]int, target [][]int) bool {
    rotateOne, rotateTwo, rotateThree := true, true, true
    
    for i := 0; i < len(mat); i++ {
        for j := 0; j < len(mat); j++ {
            if mat[i][j] != target[len(target) - 1 - j][i] {
                rotateOne = false
            }
            if mat[i][j] != target[j][len(target) - 1 - i] {
                rotateTwo = false
            }
            if mat[i][j] != target[len(target) - 1 - i][len(target) - 1 - j] {
                rotateThree = false
            }
        }
    }
    
    return rotateOne || rotateTwo || rotateThree || reflect.DeepEqual(mat, target)
}
```
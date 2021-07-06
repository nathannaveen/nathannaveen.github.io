---
title: "Leetcode 1559"
date: 2021-07-06T18:32:45-05:00
toc: false
images:
tags: [leetcode, golang, array, images]
---

[1559. Detect Cycles in 2D Grid](https://leetcode.com/problems/detect-cycles-in-2d-grid/)

The idea for this solution is to:

* Find a backward L shape in the matrix. (Don't worry if you don't understand I will come back to it later)
* Then check whether the cycle all starts from one position. (I will also come back to this later)

For this solution, I am going to explain how it works using an example:

![](https://i.imgur.com/8rU2sDU.jpg)

If you look at the problem, you might see this example already there, I picked this example because we know the answer:

![](https://i.imgur.com/4cGMdrb.jpg)

Now we will start from position `(0, 0)` and introduce a new matrix array called `arr` to store whether the previous elements in `grid` are the same as the current element and the start position.

![](https://i.imgur.com/ADbh5cQ.jpg)

> Since there is no value on the top or left of our current position we can make `arr[0][0] = 1`, and the start position equal to `(0, 0)`.

![](https://i.imgur.com/mIhjSM2.png)

> In `grid` the letter on the left of `grid[0][1]` is `"c"` as well so we can make `arr[0][1] = int(grid[i - 1][j] - 'a') + 2 = 5`. We do the `+ 2` at the end because we want to avoid `0`'s and `1`'s for the values. Our start position stays the same because we the cycle still starts at `(0, 0)`.

![](https://i.imgur.com/ndR2TMu.png)

> The image above is just like the previous one.

![](https://i.imgur.com/QVQljOl.png)

> The letter at `grid[0][2]` is the letter to the left of `grid[0][3]`, but `grid[0][2] != grid[0][3]`, and since there is no element above `grid[0][3]`. So we have to make a new start position because this is the start of a new cycle.

![](https://i.imgur.com/2z8R8fm.png)

> Since there is a `"c"` above in `grid[1][0]` we can make `arr[1][0] = 5` and the start position equal `(0, 0)` again.

![](https://i.imgur.com/mvjqE99.png)

> Since the top and left letters of `grid[1][1]` are not equal to `"d"`, we know that we have to make a new cycle.

![](https://i.imgur.com/zjIQOLR.png)

> The element on top of `grid[1][2]` is equal to `"c"` so we can continue with `arr[1][2] = int(grid[i - 1][j] - 'a') + 2 = 5`, and the start position will be `(0, 0)` just like the elements on tops.


***I just realized that I have been writing `3` instead of `1` for `arr[0][3]` for all the previous images. Sorry!***


This keeps on going on, and we get:

![](https://i.imgur.com/9CrPVVt.png)

> We get the `25` in `arr` by doing `arr[3][2]` by `arr[2][3]` just like in the image below.
>
> Then we know that this is a cycle because we found a backward `L` (shown in the image below), and we know that `arr[3][2]`'s, and `arr[2][3]`'s start position equals each other.


![](https://i.imgur.com/QhtYmU1.png)

* Note: The backward `L` I was talking about is the blue part in the picture.




``` go
type points struct {
	x, y int
}

type key struct {
	val int
	p   []points
}

func containsCycle(grid [][]byte) bool {
	arr := [][]key{}

	for i := 0; i < len(grid); i++ {
		arr = append(arr, make([]key, len(grid[0])))
		for j := 0; j < len(grid[0]); j++ {
			arr[i][j].val = 1
			if i > 0 && grid[i - 1][j] == grid[i][j] {
				arr[i][j].val *= int(grid[i - 1][j] - 'a') + 1 + 2
				arr[i][j].p = append(arr[i][j].p, arr[i - 1][j].p...)
			}
			if j > 0 && grid[i][j - 1] == grid[i][j] {
				arr[i][j].val *= int(grid[i][j - 1] - 'a') + 1 + 2
				arr[i][j].p = append(arr[i][j].p, arr[i][j - 1].p...)
			}
			if len(arr[i][j].p) == 0 {
				a := points{j, i}
				arr[i][j].p = []points{ a }
			}

			if arr[i][j].val != 1 && arr[i][j].val != int(grid[i][j] - 'a') + 1 + 2 {

				b, done := ifStartIsSame(arr, i, j)
				if done {
					return b
				}
			}
		}
	}

	return false
}

func ifStartIsSame(arr [][]key, i int, j int) (bool, bool) {
	for k := 0; k < len(arr[i - 1][j].p); k++ {
		for l := 0; l < len(arr[i][j - 1].p); l++ {
			if arr[i - 1][j].p[k].x == arr[i][j - 1].p[l].x &&
			arr[i - 1][j].p[k].y == arr[i][j - 1].p[l].y {
				return true, true
			}
		}
	}
	return false, false
}
```
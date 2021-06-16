---
title: "Leetcode 1318"
date: 2021-06-16T11:19:38-05:00
toc: false
images:
tags: [golang, leetcode, bit manipulation]
---

[1318. Minimum Flips to Make a OR b Equal to c](https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/)

The idea of this solution is pretty simple because getting `a || b == c` means that:

* If the last bit of `c` is `1`:
    * `a` can be either `1` if `b` is `1` or `b` is `0`, or `0` if `b` is `1`
* Else if the last bit of `c` is `0`:
    * `a` and `b` have to be `0` because `0 || 0 == 0` is the only case which `== 0`.

Here is an example of what we do in the code:

`input: a = 19, b = 6, and c = 27`

If we show the numbers in a binary representation we get:

```
a = 1 0 0 1 1
b = 0 0 1 1 0
-------------
c = 1 1 0 1 1
```

And if we do the first bit of `a` or the first bit of `b`, we get `1 || 0 = 1`, which we want to get for the first bit of `c`.

Then if we do the second bit of `a` or the second bit of `b`, we get `1 || 1 = 1`, which is also what we want for `c`.

After that, if we do the third bit of `a` or the third bit of `b` we get `0 || 1 = 1`. The problem with this is the third bit of `c` is `0`, and `0 || 1 != 0`, we can change the third bit of `b` to `0`, so we get `0 || 0 = 0`, which is what we want.

Then in the fourth bit of `a` or the fourth bit of `b` we get `0 || 0 = 0`, but we want it to be equal to `1` because the fourth bit of `c` is `1`. So what we have to do is make either the fourth bit of `a` or `b` equal to `1`, so `0 || 1 = 1` or `1 || 0 = 1`.

And the final bit of `a` or the fifth bit of `b` is `1 || 0 = 1`, which we want to get for the final bit of `c` is `1`.

**The Code:**

``` go
func minFlips(a int, b int, c int) int {
	res := 0
	for a > 0 || b > 0 || c > 0 {
		if c & 1 == 0 {
			if a & 1 == 1 {
				res++
			}
			if b & 1 == 1 { 
				res++ 
			}
		} else if a & 1 == 0 && b & 1 == 0 {
			res++
		}
		
		a, b, c = a >> 1, b >> 1, c >> 1
	}
	return res
}
```
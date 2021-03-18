---
title: "Leetcode 292"
date: 2021-03-18T12:19:52-04:00
toc: false
images:
tags: [leetcode, golang, math, images]
---

[292. Nim Game](https://leetcode.com/problems/nim-game/)

``` go
func canWinNim(n int) bool {
	return n%4 != 0
}
```

This is all the code we need to solve this problem.

We have to return `n % 4 != 0` because we are asked to pick from `1` to `3` stones, and if we pick;

* If we pick one stone, the other player can choose three stones
* If we pick two stones, the other player can select two stones
* If we pick three stones, the other player can choose one stone

As you can see, when we add the stones together in the examples above, they all equal `4` stones.

We can see that any number that is a multiple of `4` will return false with these pictures:

![image](https://assets.leetcode.com/users/images/1d18be62-568e-408b-bdc0-e0b2c8025357_1616084116.2890737.jpeg)

The next example:

![image](https://assets.leetcode.com/users/images/ed5060f8-e074-4ceb-b646-5c3286ed087e_1616084166.6079986.jpeg)
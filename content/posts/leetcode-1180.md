---
title: "Leetcode 1180"
date: 2021-05-17T09:50:40-05:00
toc: false
images:
tags: [leetcode, golang, string]
---

[1180. Count Substrings with Only One Distinct Letter](https://leetcode.com/problems/count-substrings-with-only-one-distinct-letter/)

***

The idea of this solution is to use the number of consecutive letters. And to use the formula `n * (n + 1) / 2` to find the number of valid substrings. We can use the example below to explain:

*Before the example: `n * (n + 1) / 2` is the equation for finding the sum of the first `n` consecutive elements. The sum of the first `3` consecutive elments is `1 + 2 + 3 = 6`, and `3 * (3 + 1) / 2 = 3 * 4 / 2 = 12/ 2 = 6`, Note: Use PEMDAS when calculating `n * (n + 1) / 2`.*

* `input := "aaaabbbcccccca"`
* The first substring is `aaaa`. We have one `aaaa`, two `aaa`, three `aa`, and four `a`'s. `1 + 2 + 3 + 4 = 10` which equals `4 * (4 + 1) / 2 = 10`. So `res = 10`
* Right now, you might be thinking that there aren't two `aaa`'s and there aren't three `aa`'s. If we look at it with just `4` random letters, you can see it is true. Let us say that we have `abcd`, there are two substrings of size three, `abc`, and `bcd`, and there are three substrings of size two `ab`, `bc`, and `cd`. This can be shown in the equation as `4 * (4 + 1) / 2`
* Now, we can continue with our example. Our next substring would be `"bbb"`, and there is one `"bbb"`, two `"bb"`, and three `"b"`'s. This can be shown in the equation as `3 * (3 + 1) / 2`
* Next we can get `cccccc`. And we can get one `"cccccc"`, two `"ccccc"`, three `"cccc"`, four `"ccc"`, five `"cc"`, and six `"c"`'s. This can be shown in the equation as `6 * (6 + 1) / 2`
* After that, we have the substring `"a"`, and we have only one `"a"`. This can be shown in the equation as `1 * (1 + 1) / 2`

***

**The Code:**

``` go
func countLetters(S string) int {
	res := 0
	letter := ""
	counter := 0

	for _, i := range S {
		if letter != string(i) {
			res += (counter * (counter + 1)) / 2
			counter = 0
			letter = string(i)
		}
		counter++
	}
	res += (counter * (counter + 1)) / 2
	return res
}
```
---
title: "Leetcode 1880"
date: 2021-06-16T11:19:46-05:00
toc: false
images:
tags: [leetcode, golang, string]
---

[1880. Check if Word Equals Summation of Two Words](https://leetcode.com/problems/check-if-word-equals-summation-of-two-words/)

**The idea of the first solution is:**

* We loop through every word and add the `string(letter - '1')` (basically add the string of the letter made into a number).
* Then we make that string into a number and check whether `temp + temp2 == tempRes`.

**The First Code:**

``` go
func isSumEqual(firstWord string, secondWord string, targetWord string) bool {
	first, second, res := "", "", ""

	for _, letter := range firstWord { first += string(letter - '0') }
	for _, letter := range secondWord { second += string(letter - '0') }
	for _, letter := range targetWord { res += string(letter - '0') }
	
	temp, _ := strconv.Atoi(first)
	temp2, _ := strconv.Atoi(second)
	tempRes, _ := strconv.Atoi(res)

	return temp + temp2 == tempRes
}
```

**The idea of the second solution is:**

* Just like in the first solution, we loop through each word, but this time we keep of making `sum, sum2, or res` equal `int(letter - 'a') + sum * 10` (In the previous we say `sum * 10`, but `sum` can be substituted for `sum2, or res`). The fundamental idea of this is getting each number and then adding it to the `sum * 10`. This is basically:

```
sum += int(letter - 'a')
sum *= 10
```

**The Second Code:**

``` go
func isSumEqual(firstWord string, secondWord string, targetWord string) bool {
	sum, sum2, res := 0, 0, 0

	for _, letter := range firstWord { sum = int(letter - 'a') + sum * 10 }
	for _, letter := range secondWord { sum2 = int(letter - 'a') + sum2 * 10 }
	for _, letter := range targetWord { res = int(letter - 'a') + res * 10 }

	return (sum + sum2) == res
}
```
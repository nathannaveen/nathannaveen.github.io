---
title: "Leetcode 1422"
date: 2021-04-25T11:08:11-05:00
toc: false
images:
tags: [leetcode, string, golang]
---

[1422. Maximum Score After Splitting a String](https://leetcode.com/problems/maximum-score-after-splitting-a-string/)

The idea of the first solution is pretty simple, and the second solution is based on the first solution.

The idea of the first solution is:

* We loop through `s` and add all the numbers to a counter called `numberOfOnes` to count the number of ones. We do this by using ASCII. The ASCII of `0` is `48`, and the ASCII of `1` is `49`, so we can get the `int` of `s[i]` and then subtract `48` from it to get `0` or `1`. If it is `0` `s[i] = '0'` and if it is `1` `s[i] = '1'`.
* If the first element is a `'0'` we add one to `numberOfZeros` and if it is a `'1'` we can subtract one from `numberOfOnes` because the split string starts with a substring of length `1` on the left and a substring of length `(len(s) - 1) - 1`.
* Then we can loop through `1` to `len(s) - 1` and add one to `numberOfZeros` or subtract one from the `numberOfOnes`, and then check whether the `numberOfZeros + numberOfOnes` is greater than `maximum`, if so make `maximum` equal to `numberOfZeros + numberOfOnes`.

The idea of the second solution is: We do the same thing as the first solution, but we combine `numberOfZeros` and `numberOfOnes` into a variable called `sum`.

**The First Code:**

``` go
func maxScore(s string) int {
    numberOfOnes := 0
    numberOfZeros := 0
    maximum := 0

    for _, i := range s {
        numberOfOnes += int(i) - 48
    }
    
    numberOfZeros, numberOfOnes = 
    addAndSubtractFromOnesAndZeros(s, numberOfZeros, numberOfOnes, 0)
    
    maximum = numberOfOnes + numberOfZeros

    for i := 1; i < len(s)-1; i++ {
        numberOfZeros, numberOfOnes = 
        addAndSubtractFromOnesAndZeros(s, numberOfZeros, numberOfOnes, i)
        
        if numberOfOnes + numberOfZeros > maximum {
            maximum = numberOfOnes + numberOfZeros
        }
    }

    return maximum
}

func addAndSubtractFromOnesAndZeros(s string, 
numberOfZeros, numberOfOnes, i int) (int, int) {

    if s[i] == '0' {
        return numberOfZeros + 1, numberOfOnes
    }
    return numberOfZeros, numberOfOnes - 1
}
```

**The Second Code:**

``` go
func maxScore(s string) int {
    maximum := 0
    sum := 0

    for _, i := range s {
        sum += int(i) - 48
    }

    sum = addAndSubtractFromOnesAndZeros2(s, sum, 0)
    maximum = sum

    for i := 1; i < len(s)-1; i++ {
        sum = addAndSubtractFromOnesAndZeros2(s, sum, i)
        if sum > maximum {
            maximum = sum
        }
    }

    return maximum
}

func addAndSubtractFromOnesAndZeros2(s string, sum, i int) int {
    if s[i] == '0' {
        return sum + 1
    }
    return sum - 1
}
```
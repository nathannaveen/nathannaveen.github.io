---
title: "Leetcode 1551"
date: 2021-04-10T20:14:34-05:00
toc: false
images:
tags: [leetcode, golang, array, math]
---

[1551. Minimum Operations to Make Array Equal](https://leetcode.com/problems/minimum-operations-to-make-array-equal/)

This is a pretty simple solution once you understand the concept.

**What the Problem Is Asking:**

The problem gives us an array where `arr[i] = (2 * i) + 1`, you could make an array where every `arr[i] = (2 * i) + 1` but I am just going to tell you that this plots a sequence of odd integers. Bascily `arr[1, 3, 5 ... nth odd number]`.

Then the problem is telling us that we can pick two indexes, `x` and `y`. It is telling us that at every turn, we can add one to `arr[x]` and subtract one from `arr[y]` until all the elements in `arr` are equal.

The problem asks us to return the number of operations.

**The Idea Of This Solution:**

One thing that is key to this solution is all the numbers are odd and are sorted.

Since `arr` is sorted and all the values are odd, we can make `x` equal to a left pointer and `y` equal to a right pointer, and we can find the number that can make all the numbers matching.

We can take a couple examples of `[1, 3, 5, 7, 9]`, `[1, 3, 5, 7, 9, 11]`, and `[1, 3, 5]`:

* `[1, 3, 5, 7, 9]`
    * `1 + 1 = 2`, `9 - 1 = 8`, so our new numbers are `2, 8`
      `2 + 1 = 3`, `8 - 1 = 7`, so our new numbers are `3, 7`
      `3 + 1 = 4`, `7 - 1 = 6`, so our new numbers are `4, 6`
      `4 + 1 = 5`, `6 - 1 = 5`, so our new numbers are `5, 5`. Since `5 == 5` we can continue to the next two numbers, basicly `x += 1` and `y -= 1`.


    * `3 + 1 = 4`, `7 - 1 = 6`, so our new numbers are `4, 6`
        `4 + 1 = 5`, `6 - 1 = 5`, so our new numbers are `5, 5`.
        
    **Foreshadowing:** Remember that there have been `6` changes.

* `[1, 3, 5, 7, 9, 11]`
    * `1 + 1 = 2`, `11 - 1 = 10`, so our new numbers are `2, 10`
      `2 + 1 = 3`, `10 - 1 = 9`, so our new numbers are `3, 9`
      `3 + 1 = 4`, `9 - 1 = 8`, so our new numbers are `4, 8`
      `4 + 1 = 5`, `8 - 1 = 7`, so our new numbers are `5, 7`
      `5 + 1 = 6`, `7 - 1 = 6`, so our new numbers are `6, 6`. Since `6 == 6` we can continue to the next two numbers, basicly `x += 1` and `y -= 1`.

    * `3 + 1 = 4`, `9 - 1 = 8`, so our new numbers are `4, 8`
      `4 + 1 = 5`, `8 - 1 = 7`, so our new numbers are `5, 7`
      `5 + 1 = 6`, `7 - 1 = 6`, so our new numbers are `6, 6`

    * `5 + 1 = 6`, `7 - 1 = 6`, so our new numbers are `6, 6`

  **Foreshadowing again:** Remember that there have been `9` operations.

* `[1, 3, 5]`
    * `1 + 1 = 2`, `5 - 1 = 4`, so our new numbers are `2, 4`
      `2 + 1 = 3`, `4 - 1 = 3`, so our new numbers are `3, 3`.

  **Foreshadowing again:** Remember that there have been `2` operations.

When we were looking at `arr = [1, 3, 5, 7, 9, 11]` we saw that there were `9` operations, first `5` operations, then `3` operations, and then the last `1`. So if we line them up we can see that `5, 3, 1` is a sequence of consecutive odd numbers. Consecutive odd numbers can be summed up by using the expretion `n^2` where `n = the number of odd numbers`. Let us look at a couple examples:

* `n = 3`, `3^2 = 9`, `9 = 1 + 3 + 5`
* `n = 5`, `5^2 = 25`, `25 = 1 + 3 + 5 + 7 + 9`
* `n = 1`, `1^2 = 1`, `1 = 1`

But if we try this out a couple more times, we can see that this only works with `n` being even.

So if `n` is odd what do we do? Well as we saw in the previous two examples: `arr = [1, 3, 5, 7, 9]` and `arr = [1, 3, 5]`. We saw that `arr = [1, 3, 5, 7, 9]` had `6` operations, first `4` operations and then `2` opperations. Next `arr = [1, 3, 5]` had `2` operations. When we put the operations for the first test case together we get `4, 2` and then when we put the second test case we see that we get `2`. Now we can see that `4, 2`, and `2` are consecutive even numbers. The way to sum up consecutive even numbers is to do `n(n + 1)` where `n = number of even numbers`. Here are some examples:

* `n = 2`, `2(2 + 1) = 2(3) = 6`, `2 + 4 = 6`
* `n = 3`, `3(3 + 1) = 3(4) = 12`, `2 + 4 + 6 = 12`
* `n = 4`, `4(4 + 1) = 4(5) = 20`, `2 + 4 + 6 + 8 = 20`

Since we add one to `x` and subtract one from `y` we can do `n` where `n = len(arr) / 2`.

``` go
func minOperations(n int) int {
    if n % 2 == 1 {
        return (n / 2) * ((n / 2) + 1)
    } else {
        return (n / 2) * (n / 2)
    }
}
```

**Using a little bit of bit manipulation:** *I used [archit91's solution](https://leetcode.com/problems/minimum-operations-to-make-array-equal/discuss/1145082/Simple-O(1)-1-Liner-or-Easy-Solution-w-Explanation-or-Beats-100) to get the idea of using bit manipulation*

``` go
func minOperations(n int) int {
    if n % 2 == 1 {
        return (n >> 1) * ((n >> 1) + 1)
    } else {
        return (n >> 1) * (n >> 1)
    }
}
```
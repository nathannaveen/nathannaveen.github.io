---
title: "Leetcode 8"
date: 2022-01-19T13:00:00-06:00
toc: false
images:
tags: [leetcode, golang, string, math]
---

[8. String to Integer (atoi)](https://leetcode.com/problems/string-to-integer-atoi/)

I am going to explain this solution while walking through the code:

* We can first remove the starting spaces because the problem says to "Read in and ignore any leading whitespace".
* Then, my code checks whether the length of `s` equals `0`. If it is, we can return `0`, because some of the following code is hardcoded to `s` having a minimum length of `1`.
* Then, if the first character is negative or positive, we can account for the sign:
    * We can check for a positive or negative sign once throughout this whole code right before the digits because a positive/negative sign should only be there.
    * If it is a negative sign, we can make a variable called `neg` equal to negative 1, so we can multiply the result by `neg` to get the result negative. We can't multiply `res` (`res` is the result) by `-1` right when we find the negative sign because `res` starts at `0`, and `0 * -1 = 0` (No difference).
    * Then, if it is a positive or negative sign, we can move the start position up by one because we don't want to count a `'+'`, or `'-'` as a digit.
* After that, we have to loop throught the remains at the string, starting at our start position.
* Let us call the character we are on `char` to be consistent.
* We also check whether `res > 2147483647`, I will come back to the reason for this later.
* Next, we can check whether `char` is a digit using ASCII, and if it is a digit, we can do:
```
res = res * 10 + int(char - '0')
```
This can be expanded into:

```
res *= 10
res += int(char - '0')
```

I can explain this by using the example `15461`, and we are adding the digit `1` to the end to get `154611`.

If we add `1` to `15461`, we get `15462`, instead of the expected `154611`. But let us say that we multiply `15461` by `10`, we get `154610`, and then we add `1` we get `154611`.

* Continuing with the walkthrough, if the character is not a digit, we know that we can break out of the loop.
* After the loop has finished, we can multiply `res` by `neg` (`neg = 1` if it is a positive sign or no sign and `neg = -1` if there is a negative sign).
* Then, if res is out of 32-bit signed integer range, we can clamp it down.

Now we can get back to the `res > 2147483647` part inside the loop. On one of the test cases, the string `s` was `"9223372036854775808"`, and when I looped through `s` and made it into an integer, I hit the 31'st bit and turned res into a negative number, so I output `-2147483648`. To fix this, I decided to `break` if `res` has passed over the boundary of `2147483647`, so this never happens. I don't check `if res > 2147483647 || res < -2147483648` because `res` will never be negative (This is because we haven't made `res` negative yet).

**The Code:**

``` go
func myAtoi(s string) int {
    s = strings.TrimLeft(s, " ")
    res := 0
    neg := 1
    i := 0
    
    if len(s) == 0 {
        return 0
    }
    
    if s[0] == '-' {
        neg = -1
        i++
    } else if s[0] == '+' {
        i++
    }
    
    for i < len(s) {
        char := s[i]
        i++
        
        if res > 2147483647 {
            break
        }
        
        if int(char - '0') > -1 && int(char - '0') < 10 {
            res = res * 10 + int(char - '0')
            continue
        }
        break
    }
    
    res *= neg
    
    if res < -2147483648 {return -2147483648} // -2^31
    if res > 2147483647 {return 2147483647} // 2^31 - 1
    
    return res
}
```
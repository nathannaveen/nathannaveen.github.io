---
title: "Leetcode 1119"
date: 2021-03-18T11:32:48-04:00
toc: false
images:
tags: [leetcode, golang, string]
---

[1119. Remove Vowels from a String](https://leetcode.com/problems/remove-vowels-from-a-string/)

The first approach is pretty simple. If the letter is not a vowel, add it to a resulting string.

The second approach is better because we keep on using the same string. We remake the string every time there is a vowel by going around the vowel.

This can be shown with some images:

We can have:

```
input: "leetcode"
expected output: "ltcd"
```

> We can fast forward to our first vowel, `'e'`.

![image](https://assets.leetcode.com/users/images/18d37f14-9f11-44bb-aeaa-380a78ed8e79_1616078946.4208002.jpeg)

> Now we re-assign our string `s` to `"leetcode"` without the `'e'` and we get:

![image](https://assets.leetcode.com/users/images/84537cdb-336d-45c1-9c74-3d2963e8d74f_1616079116.1516426.jpeg)
> We have circled the letter `'t'` because `i == 2` but we forgot about the second `'e'` so we subtract `1` from `i` and we get:

![image](https://assets.leetcode.com/users/images/d7f8958f-e111-44b7-b0e0-49715e6033e9_1616079273.371251.jpeg)

> As we can see, `'e'` is a vowel, so we have to remake the string to:

![image](https://assets.leetcode.com/users/images/ade21b1b-388e-420e-ad0b-606b55326c13_1616079425.8852704.jpeg)

> *Note: As you can see, we skipped a lot of the letter because it would take a lot longer if we didn't ignore them*
>
> You can see that the `'o'` is a vowel, so we can remake the string to:

![image](https://assets.leetcode.com/users/images/785dcddd-63ab-403f-9e31-e77ee37ed4fc_1616079718.1413827.jpeg)

> We skipped some more letters again because the other letters were not needed.
>
> The `'e'` is a vowel, so we can remake the string to:

![image](https://assets.leetcode.com/users/images/c437f9a8-4422-4153-bd63-616a7e11c0f5_1616079950.2055788.jpeg)

As we can see, `ltdc` is equal to our expected output.

**The First Code:**

``` go
func removeVowels(s string) string {
    res := ""
    for _, i2 := range s {
        if i2 != 'a' && i2 != 'e' && i2 != 'i' && i2 != 'o' && i2 != 'u' {
            res += string(i2)
        }
    }
    return res
}
```

``` go
func removeVowels(s string) string {
    for i := 0; i < len(s); i++ {
        if s[i] == 'a' || s[i] == 'e' || s[i] == 'i' || s[i] == 'o' || s[i] == 'u' {
            s = s[:i] + s[i+1:]
            i -= 1
        }
    }
    return s
}
```
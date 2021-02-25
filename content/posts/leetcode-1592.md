---
title: "Leetcode 1592"
date: 2021-02-25T15:48:58-05:00
toc: false
images:
tags: [leetcode, string, golang]
---



[1592. Rearrange Spaces Between Words](https://leetcode.com/problems/rearrange-spaces-between-words/)

The idea of this solution is pretty simple, first split `text` by space. We have to split it manualy and not use a inbuild function because the text can contain multiple spaces inbetween words, and we have to count spaces. This can be show in an example:

```
input = "  this   is  a sentence "

inbuiltSplit = ["", "", "this", "", "", "is", "", "a", "sentence", ""]
```

**The Code:**

```
func reorderSpaces(text string) string {
    spaceCounter := 0
    arr := []string{}
    str := ""
    res := ""
    for _, i := range text {
        if i == ' ' {
            if str != "" {
                arr = append(arr, str)
            }
            spaceCounter++
            str = ""
        } else {
            str += string(i)
        }
    }
    if str != "" {
        arr = append(arr, str)
    }
    space := ""

    if len(arr)-1 > 0 {
        for i := 0; i < spaceCounter/(len(arr)-1); i++ {
            space += " "
        }
        for i := 0; i < len(arr)-1; i++ {
            res += arr[i] + space
        }
        res += arr[len(arr)-1]
        for i := 0; i < spaceCounter%(len(arr)-1); i++ {
            res += " "
        }
    } else {
        for i := 0; i < spaceCounter; i++ {
            space += " "
        }
        res = strings.Trim(text, space) + space
    }
    return res
}
```


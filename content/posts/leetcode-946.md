---
title: "Leetcode 946"
date: 2021-02-26T10:59:38-05:00
toc: false
images:
tags: [leetcode, array, images, golang]
---

The idea of this solution is to append the pushed value to the stack. If peeked value is equal to the poped value then pop it off the stack, keep poping off the peeked value if it is equal to the poped value. This can be show in an image

![](https://i.imgur.com/ovNR5Oy.jpg)


```
func validateStackSequences(pushed []int, popped []int) bool {
    stack := []int{}
    popCounter := 0
    for i := 0; i < len(pushed); i++ {
        stack = append(stack, pushed[i])
        for len(stack) != 0 && popped[popCounter] == stack[len(stack)-1] {
            stack = stack[:len(stack)-1]
            popCounter++
            if popCounter == len(popped) {
                break
            }
        }
    }

    return len(stack) == 0
}
```
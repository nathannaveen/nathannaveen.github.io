---
title: "How the Manual Sort Works"
date: 2021-04-04T16:40:14-05:00
toc: false
images:
tags: [golang, array, sort]
---

The idea of this is pretty simple:

We check whether the previous number is greater than the current number. If it is switch the two values in the array around and subtract two from `i` (`i = The current position`). After that we subtract `2` from `i` because we want to go back by one position. We subtract `2` to go back `1` because we add one to `i` in the for loop. We keep on doing this and we get `arr` sorted.

``` go
for i := 1; i < len(arr); i++ {
    if i >= 1 && arr[i-1] > arr[i] {
        arr[i-1], arr[i] = arr[i], arr[i-1]
        i -= 2
    }
}
```

**An Edited Vertion:** *(If you don't understand the `i -= 2` part look at the following vertion)*

``` go
i := 1

for i < len(arr) {
    if i >= 1 && arr[i-1] > arr[i] {
        arr[i-1], arr[i] = arr[i], arr[i-1]
        i--
    }
}
```
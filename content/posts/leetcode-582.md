---
title: "Leetcode 582"
date: 2021-08-17T12:30:39-05:00
toc: false
images:
tags: [leetcode, golang, tree]
---

[582. Kill Process](https://leetcode.com/problems/kill-process/)

Both of these solutions operate on the same idea:

* We add all the parents and children to a map in the format of `map[parent] []children` (map of a parent then an array of children)
* Then we add the `kill` value to the result and the `kills` children (From the map), and then the `kill`'s children's children, and so on (`kill`, `kill children`, `kills children's children`).

**Iterative**

*If you don't understand `stack = append(stack, m[pop]...)`, it is basically doing:*

```
for _, i := range m[pop] {
    stack = append(stack, i)
}
```

``` go
func killProcess(pid []int, ppid []int, kill int) []int {
	res := []int{}
    stack := []int{kill}
    m := make(map[int] []int )
	
    for i := 0; i < len(pid); i++ {
        m[ppid[i]] = append(m[ppid[i]], pid[i])
    }
    
    for len(stack) != 0 {
        pop := stack[len(stack) - 1]
        stack = stack[:len(stack) - 1]
        res = append(res, pop)
        stack = append(stack, m[pop]...)
    }
    
	return res
}
```

**Recursive**

``` go
func killProcess(pid []int, ppid []int, kill int) []int {
    m := make(map[int] []int )
	
    for i := 0; i < len(pid); i++ {
        m[ppid[i]] = append(m[ppid[i]], pid[i])
    }
    
    return helper(kill, m, []int{})
}

func helper(kill int, m map[int] []int, res []int) []int {
    res = append(res, kill)
    
    for _, n := range m[kill] {
        res = helper(n, m, res)
    }
    
    return res
}
```
---
title: "Leetcode 1214"
date: 2021-03-21T11:36:17-04:00
toc: false
images:
tags: [leetcode, golang, tree, array, map]
---

[1214. Two Sum BSTs](https://leetcode.com/problems/two-sum-bsts/)


**Quick Run-Down On The Solutions**
* The first solution is the easiest of the three solutions and the worst-time complexity solution.
* The second solution has a different approach from the first solution and a little better time but still not that great.
* The third solution has a lot better time than the first two solutions and has a similar approach to the second solution.

**The Ideas of These Solutions:**

The first solution is a simple mundane depth-first-search (dfs) solution. We first iterate through the first tree and then the second tree. We add all the values from the first tree to the array `arr1` and then add the second tree's values to the array `arr2`. After that, we find whether two values from `arr1, arr2` summed up equals `target` return `true`.

The second solution iterates through the first tree and finds the difference of `target - pop.Val`, and add it to an array called `secondTreeExpectedValues`. All we have to do is iterate through the second tree and check whether `secondTreeExpectedValues` contains the `pop.Val`. If it does, we know that the trees have two numbers that add up to `target`.

The third solution does the same thing as the second solution but uses a map called `m` instead of `secondTreeExpectedValues`. The key difference between the two is when you check whether an array contains, you have to iterate through an array, and iterating through an array is `O(n)` where `n = len(array)`. But checking whether a map contains is `O(1)`. So using a map instead of an array cuts down on a lot of time.

If you don't understand the idea of the second and third solutions, look at the following images *(I am doing this with the third solutions idea)*:

#### Input:

![](https://i.imgur.com/Fw7hBM1.jpg)

![](https://i.imgur.com/ZsmP7Qm.jpg)

![](https://i.imgur.com/IyZCA6K.jpg)


Now we have finished iterating through the first tree and added all the differences to the map.

Now iterating through tree2:

![](https://i.imgur.com/cC3HsMC.jpg)

> There is no key of `8`, so we continue.

![](https://i.imgur.com/4J1AYm6.jpg)

> There is no key of `11` as well.

![](https://i.imgur.com/TEP4FpV.jpg)

> There is no key of `12`.

![](https://i.imgur.com/y1khnaO.jpg)

> There is no key of `9` in `m`.

![](https://i.imgur.com/3ZvKBVR.jpg)

> There is a key of `6` in `m`, and the value is `7`. When we add `6` and `7` together, we get `13`. So you see when we did `target - pop.Val` we were getting the second value from `tree2`.
**The First Solution:**

``` go
func twoSumBSTs(root1 *TreeNode, root2 *TreeNode, target int) bool {
    stack := []*TreeNode{root1}
    arr1 := []int{}
    arr2 := []int{}

    for len(stack) != 0 {
        pop := stack[len(stack)-1]
        stack = stack[:len(stack)-1]

        if pop != nil {
            stack = append(stack, pop.Left, pop.Right)
            arr1 = append(arr1, pop.Val)
        }
    }

    stack = append(stack, root2)

    for len(stack) != 0 {
        pop := stack[len(stack)-1]
        stack = stack[:len(stack)-1]

        if pop != nil {
            stack = append(stack, pop.Left, pop.Right)
            arr2 = append(arr2, pop.Val)
        }
    }

    for _, i2 := range arr1 {
        for _, i4 := range arr2 {
            if i2+i4 == target {
                return true
            }
        }
    }
    return false
}
```

**The Second Solution:**



``` go
func twoSumBSTs(root1 *TreeNode, root2 *TreeNode, target int) bool {
    stack := []*TreeNode{root1}
    secondTreeExpectedValues := []int{}

    for len(stack) != 0 {
        pop := stack[len(stack)-1]
        stack = stack[:len(stack)-1]

        if pop != nil {
            stack = append(stack, pop.Left, pop.Right)
            secondTreeExpectedValues =
                append(secondTreeExpectedValues, target-pop.Val)
        }
    }

    stack = append(stack, root2)

    for len(stack) != 0 {
        pop := stack[len(stack)-1]
        stack = stack[:len(stack)-1]

        if pop != nil {
            stack = append(stack, pop.Left, pop.Right)
            if arrayContains(secondTreeExpectedValues, pop.Val) {
                return true
            }
        }
    }

    return false
}

func arrayContains(arr []int, val int) bool {
    for _, i := range arr {
        if i == val {
            return true
        }
    }
    return false
}
```

**The Third Solution:**

``` go
func twoSumBSTs(root1 *TreeNode, root2 *TreeNode, target int) bool {
    stack := []*TreeNode{root1}
    m := make(map[int]int)

    for len(stack) != 0 {
        pop := stack[len(stack)-1]
        stack = stack[:len(stack)-1]

        if pop != nil {
            stack = append(stack, pop.Left, pop.Right)
            m[target-pop.Val] = pop.Val
        }
    }

    stack = append(stack, root2)

    for len(stack) != 0 {
        pop := stack[len(stack)-1]
        stack = stack[:len(stack)-1]

        if pop != nil {
            stack = append(stack, pop.Left, pop.Right)
            if _, ok := m[pop.Val]; ok {
                return true
            }
        }
    }

    return false
}
```
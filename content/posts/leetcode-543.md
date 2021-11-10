---
title: "Leetcode 543"
date: 2021-11-10T09:57:49-06:00
toc: false
images:
tags: [images, golang, leetcode, tree]
---

I feel that enough people have explained the first type of solution, so I will not explain this.

**Most People Do This:**

``` go
var maximum = 0

func diameterOfBinaryTree(root *TreeNode) int {
    maximum = 0
    helper(root)
    return maximum
}

func helper(root *TreeNode) int {
    if root == nil { return 0 }
    
    leftHeight, rightHeight := helper(root.Left), helper(root.Right)
    
    maximum = max(leftHeight + rightHeight, maximum)
    
    return 1 + max(leftHeight, rightHeight)
}

func max(a, b int) int {
    if a > b { return a }
    return b
}
```

**The Second Solution Explanation:**

I would say that the hardest part to understand in the second solution is `maximum = max(leftHeight + rightHeight + 2, maximum)`.
I think simplifying would help with the explanation, so:

``` go
maximum = max(leftHeight + rightHeight + 2, maximum)

which equals:

maximum = max((leftHeight + 1) + (rightHeight + 1), maximum)
```

I think that the easiest way to explain this is to use an image (Something to remember as we return `-1` when we find a `nil` node):

![](https://i.imgur.com/1yCUqng.jpg)

* We can start with the simple input, `[1, nil, 2]`
* Since this is a recursive solution, we can start from the bottom up.
* In the image, the orange boxes are `nil` nodes, and the dotted line represents the edge to the `nil` node.
* In the second image, we can see that we add `1` because of the edge and subtract `1` because the edge is pointing to `nil`, so the height is `0`.
* Then, in the third image, we can see that the left node is `nil`, so we can add `1` for the edge and subtract `1` for the `nil`. Then on the right child, we can add `1` for the edge and add `0` because the right child's height is `0`.

As you can see we are doing `(leftHeight + 1) + (rightHeight + 1)`. The plus `1` is for adding the edge. I didn't do the `maximum = max(, maximum)` part because I feel it is pretty easy to understand.

**This is the Code I Prefer:** *(The only things that are different from the first solution are we return `-1` instead of `0` if `root == nil`, and we add `2` to `leftHeight + rightHeight` when calculating `maximum`)*

``` go
var maximum = 0

func diameterOfBinaryTree(root *TreeNode) int {
    maximum = 0
    helper(root)
    return maximum
}

func helper(root *TreeNode) int {
    if root == nil { return -1 }
    
    leftHeight, rightHeight := helper(root.Left), helper(root.Right)
    
    maximum = max(leftHeight + rightHeight + 2, maximum)
    
    return 1 + max(leftHeight, rightHeight)
}

func max(a, b int) int {
    if a > b { return a }
    return b
}
```
---
title: "Leetcode 2144"
date: 2022-02-04T12:12:21-06:00
toc: false
images:
tags: [leetcode, golang]
---

[2144. Minimum Cost of Buying Candies With Discount](https://leetcode.com/problems/minimum-cost-of-buying-candies-with-discount/)

We have to get the items with a maximum discount to get the minimum cost we have to pay.

***

For example if we have:

`input: cost = [3, 7, 1, 5, 9, 11, 15]`

We know that the maximum discount we can get is `9` because we can buy two candies with costs `11` and `15`.

Now let us sort `cost` in non-increasing order. Using this, we can get the maximum discounts we can get throughout:

`cost = [15, 11, 9, 7, 5, 3, 1]`

We can start with the first elements `15, 11, 9`. We can buy candies `15` and `11`, and get a discount of `9`.

Then we have elements `7, 5, 3`. We can buy elements `7`, and `5` to get a discount of `3`.

Then we have to buy `1`.

***

So basically, if we sort `nums` in non-increasing order and then if an element is the third element, we know it is the discount element.

``` go
func minimumCost(cost []int) int {
    sort.Slice(cost, func(i, j int) bool { return cost[i] > cost[j] })
    res := 0
    
    for i := 0; i < len(cost); i++ {
        if (i + 1) % 3 == 0 {
            continue
        }
        res += cost[i]
    }
    
    return res
}
```
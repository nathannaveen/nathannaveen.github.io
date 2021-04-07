---
title: "Leetcode 1475"
date: 2021-04-06T09:57:29-05:00
toc: false
images:
tags: [leetcode, golang, array]
---

[1475. Final Prices With a Special Discount in a Shop](https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop/)

This solution is pretty simple just loop through `prices` and then find the first price smaller than the current one. After that, remake `prices[i]` the current price minus the minimum.

**The Code:**

``` go
func finalPrices(prices []int) []int {
    for i, price := range prices {
        minimum := 1001

        for j := i + 1; j < len(prices); j++ {
            if prices[j] <= price {
                minimum = prices[j]
                break
            }
        }
        if minimum != 1001 {
            prices[i] = price - minimum
        }
    }
    return prices
}
```

**Solution With A Little Better Time:**

``` go
func finalPrices(prices []int) []int {
    minimumIndex := 0
    minimum := 1001

    for i, price := range prices {
        hasMinimum := true
        if minimumIndex <= i {
            hasMinimum = false
            for j := i + 1; j < len(prices); j++ {
                if prices[j] <= price {
                    hasMinimum = true
                    minimum = prices[j]
                    break
                }
            }
        }

        if hasMinimum {
            prices[i] = price - minimum
        }
    }
    return prices
}
```
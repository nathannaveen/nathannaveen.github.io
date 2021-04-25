---
title: "Leetcode 748"
date: 2021-04-25T11:08:04-05:00
toc: false
images:
tags: [leetcode, golang, string, math]
---

[Shortest Completing Word](https://leetcode.com/problems/shortest-completing-word/)

Here is how I got to this solution. I couldn't think of any way to solve this problem without doing a naive solution, so I looked at the discussion and saw [jmcelvenny's solution](https://leetcode.com/problems/shortest-completing-word/discuss/158110/Java-6ms-beats-100-PRIME-NUMBERS).

The idea of this solution is:

* we get all the letters in `licensePlate` and multiply each letter's prime number to a variable called `product`. We have an array of `26` prime numbers, so each letter has its own prime number (upper case and lower case of the same letter share a prime number), such as `a : primes[0], b : primes[1], c : primes[2]`, and `A : primes[0], B : primes[1], C : primes[2]`.
* After we have multiplied all the `licensePlate` letters prime numbers together, we multiply each word letters prime numbers together into another product.
* Then check whether the `newProduct % originalProduct == 0`, and the length of the current word is smaller than the length of the shortest word. If so, make the shortest word equal to the present word.

You might be wondering why we are doing `newProduct % originalProduct == 0`, it is because if there is a product of only prime numbers, the only divisors are the same prime numbers. So since the `originalProduct` is the product of the primes, and `newProduct` is also the product of primes. Since we know that prime products can only be divided by the primes the were multiplied to get the outcome, we can do `newProduct % originalProduct == 0` because if `newProduct % originalProduct` equals `0` we know that `newProduct` has all the primes of `originalProduct`, which intern means that the current word has the letters of the license plate.

If you still don't understand but understand one-way encryption, this solution is similar to one-way encryption.

``` go
func shortestCompletingWord(licensePlate string, words []string) string {
    primes := []int{2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43,
        47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101}
    product := 1
    product = productOfWord(licensePlate, product, primes)
    shortest, length := "", 16

    for _, word := range words {
        if productOfWord(word, 1, primes ) % product == 0 && len(word) < length {
            shortest, length = word, len(word)
        }
    }
    return shortest
}

func productOfWord(s string, product int, primes []int) int {
    for _, i := range s {
        lowerIndex, higherIndex := i - 'a', i - 'A'
        if lowerIndex >= 0 && lowerIndex < 26 {
            product *= primes[lowerIndex]
        } else if higherIndex >= 0 && higherIndex < 26 {
            product *= primes[higherIndex]
        }
    }
    return product
}
```
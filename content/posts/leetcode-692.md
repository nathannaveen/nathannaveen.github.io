---
title: "Leetcode 692"
date: 2021-03-15T11:52:46-04:00
toc: false
images:
tags: [leetcode, golang, array, sort, images]
---

[692. Top K Frequent Words](https://leetcode.com/problems/top-k-frequent-words/)

**The Main Idea:**

This solution first adds the words to an array called `frequency` and sorts `frequency` after that, return the `k` most frequency words.

**Adding to the array `Frequency`:**

You might be confused when we do this part:

```
for _, ints := range frequency {
    if words[ints[0]] == word {
        contains = true
        ints[1]++
        break
    }
}
```

We can simplify the `if` statement into `if words[frequency[i][0]] = word`. This looks a little weird. We have to do this to get the word for each frequency because the array `words` is an array of strings, while a frequency is integers. So `frequency` is an matrix array of `[int][int]` because we can't do `[string][int]`, basically `frequency` is `[the index of the first word with this word][frequency]`. This might still be a little confusing, so I drew up some pictures I describe it:

The input:

![](https://i.imgur.com/DDnSxUW.jpg)

Next:

![](https://i.imgur.com/4urAoah.jpg)

> As you can see, our word is `taco`. Since it is at the `0th` index and there is only one of it, we can add the array `[0, 1]` to `frequency`.

Then:

![](https://i.imgur.com/I7OztWX.jpg)

> The new current word is `sunny`, and since it is at the `1st` index and there is only `1` sunny so far, we can add the array `[1, 1]` to the array.

![](https://i.imgur.com/csUnLCw.jpg)

> This is just like the previous two parts since there is only `1` word `day` so far and the index is `2` we can add the array `[2, 1]`

![](https://i.imgur.com/S8WjhpX.jpg)

> Now we have something different, we can do `if words[ints[0]] == word` and it outcomes as `true` (Remember that `if words[ints[0]] == word` equals `if words[frequency[i][0]] == word`). We can put the index of the word which is in `ints [0]` and then put it back into `words`, and we get the word, then we check whether that word is equal to the current word. If it is, we can add one to the frequency because they are both the same word.

We can continue to do this until the end:

![](https://i.imgur.com/v1oWouh.jpg)

> When we just continue doing this we get the matrix array `[[0, 2][1, 2], [2, 2]]` for `frequency`.

**The Sort:**

The sorted array can be shown using another post of mine [Leetcode: 973](https://nathannaveen.dev/posts/leetcode-973/) about the middle of the page, and it will say `The Idea Of This Solution:`, that is where it starts. That post is pretty similar but not the same, so you can look at that to get the main idea of the sort.

**Getting the K most Frequent:**

We get the `k` most frequent elements from the matrix array `frequency`. Since the matrix is sorted from smallest to greatest, we have to loop from the index of the last element to the last element's index minus `k`.

**The Code:**
``` go
func topKFrequent(words []string, k int) []string {
    frequency := [][]int{}
    res := []string{}

    frequency = addWordsToFrequency(words, frequency)

    sortFrequency(words, frequency)

    for i := len(frequency) - 1; i >= len(frequency)-k; i-- {
        res = append(res, words[frequency[i][0]])
    }
    return res
}

func addWordsToFrequency(words []string, frequency [][]int) [][]int {
    /*
       adding all the words to the matrix called frequency

           * first check whether frequency has the word in it, if it does
           add one to the frequency, if it doesn't add another word to the
           array with a frequency of 1
    */
    for i, word := range words {
        contains := false

        for _, ints := range frequency {
            if words[ints[0]] == word {
                contains = true
                ints[1]++
                break
            }
        }
        if !contains {
            frequency = append(frequency, []int{i, 1})
        }
    }
    return frequency
}

func sortFrequency(words []string, frequency [][]int) {
    
    /*
    This fuction sorts the matrix called frequency.
    */
    
    for i := 0; i < len(frequency); i++ {
        if i >= 1 && (frequency[i][1] < frequency[i-1][1] ||
            (frequency[i][1] == frequency[i-1][1] && 
            words[frequency[i][0]] > words[frequency[i-1][0]])) {

            frequency[i], frequency[i-1] = frequency[i-1], frequency[i]
            i -= 2
        }
    }
}
```
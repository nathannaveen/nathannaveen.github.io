---
title: "Leetcode 1138"
date: 2021-03-18T11:32:42-04:00
toc: false
images:
tags: [leetcode, array, golang, images]
---

[1138. Alphabet Board Path](https://leetcode.com/problems/alphabet-board-path/submissions/)

*I have to admit the code might look daunting but it is actualy not that complicated after I explain it to you.*

**What the Problem is asking:**

The problem asks us to make a board of letters:

```
[
[a, b, c, d, e]
[f, g, h, i, j]
[k, l, m, n, o]
[p, q, r, s, t]
[u, v, w, x, y]
[z]
]
```

Then it gives us a word `target`. We start at the position `(0, 0)` which is the letter `a` on the board.

We are asked to split `target` into letters and then go from the current position to the letter, and then from the new position to the next letter, and so on.

If we:

* go right then add a `R` to the result
* go left then add a `L` to the result
* go up then add a `U` to the result
* go down then add a `D` to the result
* reach the letter we add a `!` to the result

We can show this with the following example:

```
input: 

    target = "leet"

output:

    "DDR!UURRR!!DDD!"
```

![](https://i.imgur.com/ZxVnZJZ.jpg)

![](https://i.imgur.com/6f4mbqt.jpg)

> The first letter is `l` so we have to go to the letter `l` from `a`. So we go `2` down and `1` right. So we add `DDR!` to the result.

![](https://i.imgur.com/5Ox3cCZ.jpg)


> The second letter is `e` so we we have to first go up `2` and right `3`. Doing this we add `UURRR!` to the result.

![](https://i.imgur.com/2aqk8sw.jpg)

> The third letter is an `e` as well, so we just have to add a `!` to the result.

![](https://i.imgur.com/jJjDdUL.jpg)

> Since the last letter is `t` we just go down `3` from our current possition, so we just add `DDD!` to the result.

After we have finished we can see that our result is `"DDR! + UURRR! + ! + DDD!" = "DDR!UURRR!!DDD!"` and our expected output is `"DDR!UURRR!!DDD!"`, and we can also see that our expected output is equal to our output.




``` go
func alphabetBoardPath(target string) string {

    board := []string{"abcde", "fghij", "klmno", "pqrst", "uvwxy", "z"}
    res := ""
    row, col := 0, 0

    for i := 0; i < len(target); i++ {
        for newCol := 0; newCol < 6; newCol++ {
            newRow := containsPosition(board[newCol], int32(target[i]))
            if newRow != -1 { // this says that the row contains the letter
                amountOfRowsLeft := abs(newCol - col)

                if newCol > col {
                    for k := col; k < newCol; k++ {
                        if k > len(board)-3 {
                            i--
                            break
                        }
                        res += "D"
                        amountOfRowsLeft--
                    }
                } else if newCol < col {
                    for k := 0; k < col-newCol; k++ {
                        res += "U"
                        amountOfRowsLeft--
                    }
                }

                if newRow > row {
                    for k := 0; k < newRow-row; k++ {
                        res += "R"
                    }
                } else if newRow < row {
                    for k := 0; k < row-newRow; k++ {
                        res += "L"
                    }
                }

                if amountOfRowsLeft != 0 {
                    res += "D"
                }
                if amountOfRowsLeft == 0 {
                    res += "!"
                }
                row, col = newRow, newCol
                break
            }
        }
    }

    return res
}

func containsPosition(theRow string, letter int32) int {
    /*
        This checks whether theRow contains the letter
    */

    for i, i2 := range theRow {
        if i2 == letter {
            return i
        }
    }
    return -1
}

func abs(a int) int {
    if a > 0 {
        return a
    }
    return -a
}

```
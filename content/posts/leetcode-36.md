---
title: "Leetcode 36"
date: 2021-05-17T09:32:30-05:00
toc: false
images:
tags: [leetcode, golang, array, math]
---

[36. Valid Sudoku](https://leetcode.com/problems/valid-sudoku/)

The main idea of this solution is to find the rows, columns, and squares of the numbers. By squares, I mean the nine squares in the board:

![](https://i.imgur.com/E4LLg2d.jpg)

The code goes through every position, and if the value is not a `"."`, we check whether the row, column, or square contains the number. If so, we can return false.

**How to Calculate The Rows And Columns**

We check whether the row or column contains the number by using primes. We assign every row and column a prime number:

![](https://i.imgur.com/v4GM5hG.jpg)

Multiple prime numbers multiplyed together can only be divide by those same prime numbers, If we find a `5` in row `1` we multiply `row[5]` by `primes[1]`, and `primes[1] = 3`, and if we find another `5` in row `1` we can check whether `row[5] % primes[1] == 0` which equals `3 % 3 = 0`. But let us say that we have one `5` in row `1` and another `5` in row `2`, the code wont return false because `row[5] = primes[1] = 3`, and `row[5] % primes[2] == 0 = 3 % 5 != 0` .

**How to Calculate The Squares:**

We calculate the numbers in the squares by also using primes, but they are used differently. We us the primes for the values of sudoko, `"1" : 2, "2" : 3, "3" : 5, "4" : 7, "5" : 11, "6" : 13, "7" : 17, "8" : 19, "9" : 23`.

And we find which square each position goes into by doing `squares[i / 3][j / 3]`. `squares` is a jagged array of size 3 by 3, each position in `squares` represents a blue square in the first image. When we do `i / 3` and round it down to the nearest integer and `j / 3` rounded down to the nearest integer, we get:

![](https://i.imgur.com/04RpB8s.jpg)

**The Code:**

``` go
func isValidSudoku(board [][]byte) bool {
	primes := []int{2, 3, 5, 7, 11, 13, 17, 19, 23}

	rows := make(map[int]int)
	cols := make(map[int]int)

	squares := make([][]int, 3)
	squares[0] = []int{1, 1, 1}; squares[1] = []int{1, 1, 1}; squares[2] = []int{1, 1, 1}

	for i := 0; i < len(board); i++ {
		for j := 0; j < len(board[0]); j++ {

			if board[i][j] != '.' {

				boardPosition, _ := strconv.Atoi(string(board[i][j]))

				if rows[boardPosition] == 0 {
					rows[boardPosition] = 1
				}
				if cols[boardPosition] == 0 {
					cols[boardPosition] = 1
				}

				if rows[boardPosition] % primes[i] == 0 || 
				cols[boardPosition] % primes[j] == 0 ||
				squares[i / 3][j / 3] % primes[boardPosition - 1] == 0 {
					return false
				}

				cols[boardPosition] *= primes[j]
				rows[boardPosition] *= primes[i]
				squares[i / 3][j / 3] *= primes[boardPosition - 1]
			}
		}
	}
	return true
}
```
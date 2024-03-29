---
title: "2021 Advent of code day 11"
date: { .Date }
toc: false
images:
tags: [Advent Of Code, golang]
---

[Day 11 puzzle](https://adventofcode.com/2021/day/11)

For day 11, part 1 was pretty easy. For part two I tried all types of different solutions, but all I could get working is the brute force approach.

I by mistake wrote my part 2 code over my part one code, so here it is:

``` go
type p struct {
    i, j int
}

var arr = [][]int{}

func twoDay11() int {
    input, _ := ioutil.ReadFile("input11.txt")

    var arr2 = strings.Split(string(input), "\n")
    arr = make([][]int, len(arr2))

    for i, line := range arr2 {
        arr[i] = make([]int, len(line))
        for j, letter := range line {
            n, _ := strconv.Atoi(string(letter))
            arr[i][j] = n
        }
    }

    flashes := 0
    totalFlashes := 0
    steps := 0

    for flashes < 100 {
        flashes = 0
        steps++

        if steps == 99 {
            fmt.Println(totalFlashes)
        }

        for i := 0; i < len(arr); i++ {
            for j := 0; j < len(arr[0]); j++ {
                stack := []p{{i, j}}

                for len(stack) > 0 {
                    pop := stack[len(stack)-1]
                    stack = stack[:len(stack)-1]
                    if pop.i >= 0 && pop.j >= 0 && pop.i < len(arr) && pop.j < len(arr[0]) {
                        arr[pop.i][pop.j]++
                        if arr[pop.i][pop.j] == 10 {
                            flashes++

                            stack = append(stack, p{pop.i + 1, pop.j}, p{pop.i - 1, pop.j}, p{pop.i, pop.j + 1}, p{pop.i, pop.j - 1},
                                p{pop.i + 1, pop.j + 1}, p{pop.i - 1, pop.j - 1}, p{pop.i + 1, pop.j - 1}, p{pop.i - 1, pop.j + 1})
                        }
                    }
                }
            }
        }

        for i := 0; i < len(arr); i++ {
            for j := 0; j < len(arr[0]); j++ {
                if arr[i][j] > 9 {
                    arr[i][j] = 0
                }
            }
        }
        totalFlashes += flashes
    }

    return steps
}
```
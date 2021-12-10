---
title: "2021 Advent of Code Day 10"
date: { .Date }
toc: false
images: https://beny23.github.io/images/advent_of_code_title.jpg
tags: [Advent Of Code, golang]
---

[Day 10 puzzle](https://adventofcode.com/2021/day/10)

The idea of both solutions is to just use a stack.

For the first part we just have to detect whether we have an incorrect line.

``` go
func oneDay10() int {
    input, _ := ioutil.ReadFile("input10.txt")
    var arr = strings.Split(string(input), "\n")
    res := 0

    for _, line := range arr {
        stack := []string{}
        for i := 0; i < len(line); i++ {
            char := string(line[i])
            if char == "(" || char == "[" || char == "{" || char == "<" {
                stack = append(stack, char)
            } else {
                pop := stack[len(stack)-1]
                stack = stack[:len(stack)-1]
                if char == ")" && pop != "(" {
                    res += 3
                    break
                } else if char == "]" && pop != "[" {
                    res += 57
                    break
                } else if char == "}" && pop != "{" {
                    res += 1197
                    break
                } else if char == ">" && pop != "<" {
                    res += 25137
                    break
                }
            }
        }
    }

    return res
}
```

For the second solution we use a stack to find what lines are wrong and what values we should add to complete the line.

``` go
func twoDay10() int {
    input, _ := ioutil.ReadFile("input10.txt")
    var arr = strings.Split(string(input), "\n")
    res := []int{}

    for _, line := range arr {
        stack := []string{}
        shouldBreak := false
        for i := 0; i < len(line); i++ { // checking if the line is incorrect
            char := string(line[i])
            if char == "(" || char == "[" || char == "{" || char == "<" {
                stack = append(stack, char)
            } else {
                pop := stack[len(stack)-1]
                stack = stack[:len(stack)-1]
                if char == ")" && pop != "(" {
                    shouldBreak = true
                } else if char == "]" && pop != "[" {
                    shouldBreak = true
                } else if char == "}" && pop != "{" {
                    shouldBreak = true
                } else if char == ">" && pop != "<" {
                    shouldBreak = true
                }
            }
            if shouldBreak {
                break
            }
        }

        if !shouldBreak { // if the line is correct but incomplete
            res = append(res, 0)

            for len(stack) != 0 {
                res[len(res)-1] *= 5
                pop := stack[len(stack)-1]
                stack = stack[:len(stack)-1]

                if pop == "(" {
                    res[len(res)-1] += 1
                } else if pop == "[" {
                    res[len(res)-1] += 2
                } else if pop == "{" {
                    res[len(res)-1] += 3
                } else {
                    res[len(res)-1] += 4
                }
            }
        }
    }

    sort.Ints(res)

    return res[len(res)/2]
}
```

I also did both solutions using switch cases:

``` go
func oneDay10() int {
    input, _ := ioutil.ReadFile("input10.txt")
    var arr = strings.Split(string(input), "\n")
    res := 0

    for _, line := range arr {
        stack := []string{}
        shouldBreak := false
        for i := 0; i < len(line); i++ {
            char := string(line[i])
            if char == "(" || char == "[" || char == "{" || char == "<" {
                stack = append(stack, char)
            } else {
                pop := stack[len(stack)-1]
                stack = stack[:len(stack)-1]
                switch {
                case char == ")" && pop != "(":
                    res += 3
                    shouldBreak = true
                case char == "]" && pop != "[":
                    res += 57
                    shouldBreak = true
                case char == "}" && pop != "{":
                    res += 1197
                    shouldBreak = true
                case char == ">" && pop != "<":
                    res += 25137
                    shouldBreak = true
                }
                if shouldBreak {
                    break
                }
            }
        }
    }

    return res
}

func twoDay10() int {
    input, _ := ioutil.ReadFile("input10.txt")
    var arr = strings.Split(string(input), "\n")
    res := []int{}

    for _, line := range arr {
        stack := []string{}
        shouldBreak := false
        for i := 0; i < len(line); i++ {
            char := string(line[i])
            if char == "(" || char == "[" || char == "{" || char == "<" {
                stack = append(stack, char)
            } else {
                pop := stack[len(stack)-1]
                stack = stack[:len(stack)-1]
                switch {
                case char == ")" && pop != "(":
                    shouldBreak = true
                case char == "]" && pop != "[":
                    shouldBreak = true
                case char == "}" && pop != "{":
                    shouldBreak = true
                case char == ">" && pop != "<":
                    shouldBreak = true
                }
                if shouldBreak {
                    break
                }
            }
        }

        if !shouldBreak { // if the line is correct but incomplete
            res = append(res, 0)

            for len(stack) != 0 {
                res[len(res)-1] *= 5
                pop := stack[len(stack)-1]
                stack = stack[:len(stack)-1]

                if pop == "(" {
                    res[len(res)-1] += 1
                } else if pop == "[" {
                    res[len(res)-1] += 2
                } else if pop == "{" {
                    res[len(res)-1] += 3
                } else {
                    res[len(res)-1] += 4
                }
            }
        }
    }

    sort.Ints(res)

    return res[len(res)/2]
}
```
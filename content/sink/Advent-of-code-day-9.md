---
title: "2021 Advent of code day 9"
date: { .Date }
toc: false
images:
tags: [Advent Of Code, golang]
---

[Day 9 puzzle](https://adventofcode.com/2021/day/9)

## Part One

I think that the first part of day 9 was pretty easy, just check every values and whether it is smaller than all the adjacent values. If so add that value plus `1` to `res`.

``` go
func oneDay9() {
    input, _ := ioutil.ReadFile("input9.txt")
    var arr = strings.Split(string(input), "\n")

    res := 0
    i, j := 0, 0

    isLow := func(y, x int) bool {
        // I put this function inside twoDay9()
        // because then I wouldn't have to parse i, j, and arr which would make it really messy.
        if y >= 0 && x >= 0 && y < len(arr) && x < len(arr[0]) {
            return arr[i][j] < arr[y][x]
        }
        return true
    }

    for i = 0; i < len(arr); i++ {
        for j = 0; j < len(arr[0]); j++ {
            if isLow(i+1, j) && isLow(i-1, j) && isLow(i, j+1) && isLow(i, j-1) {
                res += int(arr[i][j]-'0') + 1
            }
        }
    }

    fmt.Println(res)
}
```

## Part Two

The idea of this solution is to use DFS (depth first search) to solve this problem.

* First we find all the low points and add their positions to a stack
* Then we start searching the adjacent positions for which values smoke can flow through.
* Now we can keep doing step two until we can't.

This can be shown using the following image:

![](https://i.imgur.com/qpYAskg.jpg)

* In the image above the first part shows the DFS, and the second part shows the places that smoke can't cross because they are the highest.
* In the first part of the image:
    * Reds shows the lowest point
    * Oranges is the points that flow into red
    * Greens are the parts that flow into orange
    * Blues are the parts that flow into green
    * Yellows are the parts that flow into blue

Note that this can also BFS (breath first search) by changing the stack into a queue.


``` go
type lowPos struct {
	actual pos
	start  pos // the low position that we started at
}

type pos struct {
	i, j int
}

func twoDay9() {
	input, _ := ioutil.ReadFile("input9.txt")
	var arr = strings.Split(string(input), "\n")

	stack := []lowPos{}
	m := make(map[pos]int) // position : index in res
	res := []int{}         // size of basin
	visited := make(map[pos]bool)
	i, j := 0, 0

	isLow := func(y, x int) bool {
		// I put this function inside twoDay9()
		// because then I wouldn't have to parse i, j, and arr which would make it really messy.
		if y >= 0 && x >= 0 && y < len(arr) && x < len(arr[0]) {
			return arr[i][j] < arr[y][x]
		}
		return true
	}

	for i = 0; i < len(arr); i++ {
		for j = 0; j < len(arr[0]); j++ {
			if isLow(i+1, j) && isLow(i-1, j) && isLow(i, j+1) && isLow(i, j-1) {
				stack = append(stack, lowPos{pos{i, j}, pos{i, j}})
				res = append(res, 1)
				m[pos{i, j}] = len(res) - 1
			}
		}
	}

	canFlow := func(i, j, val int, start pos) {
		// This is for finding whether smoke can flow from one place to another.
		if i >= 0 && j >= 0 && i < len(arr) && j < len(arr[0]) &&
			!visited[pos{i, j}] && arr[i][j] != '9' && int(arr[i][j]-'0') > val {
			visited[pos{i, j}] = true
			res[m[start]]++
			stack = append(stack, lowPos{pos{i, j}, start})
		}
	}

	for len(stack) != 0 {
		pop := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		y, x, start := pop.actual.i, pop.actual.j, pop.start

		canFlow(y+1, x, int(arr[i][j]-'0'), start)
		canFlow(y-1, x, int(arr[i][j]-'0'), start)
		canFlow(y, x+1, int(arr[i][j]-'0'), start)
		canFlow(y, x-1, int(arr[i][j]-'0'), start)
	}

	sort.Ints(res)

	fmt.Println(res[len(res)-1] * res[len(res)-2] * res[len(res)-3]) // Last
}
```
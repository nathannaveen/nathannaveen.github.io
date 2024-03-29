---
title: "2021 Advent of code day 3"
date: { .Date }
toc: false
images:
tags: [Advent Of Code, golang]
---

[Advent Of Code Day 3 2021](https://adventofcode.com/2021/day/3)

## Part One

The first solution is pretty simple, so I just brute forced it.

``` go
func oneDay3() {
	file, err := os.Open("input3.txt")

	if err != nil {
		panic(err)

	}
	defer file.Close()
	scanner := bufio.NewScanner(file)
	arr := make([]int, 12)
	gamma := 0
	epsilon := 0
	pos := 1

	for scanner.Scan() {
		temp := scanner.Text()
		for i := 0; i < len(temp); i++ {
			if temp[i] == '1' {
				arr[i]++
			} else {
				arr[i]--
			}
		}
	}

	for i := len(arr) - 1; i >= 0; i-- {
		if arr[i] > 0 {
			gamma += pos
		} else {
			epsilon += pos
		}
		pos *= 2

	}

	fmt.Println(gamma*epsilon, gamma, epsilon)

	if err := scanner.Err(); err != nil {
		fmt.Println(err)
	}
}

```

## Part Two

The idea of the second solution is to also brute force it. The problem statment wasn't very clear, and required some re-reading on my part.

``` go
func twoDay3() {
	b, _ := ioutil.ReadFile("input3.txt")

	var oxygen = strings.Split(string(b),"\n")
	var co2 = strings.Split(string(b),"\n")

	for i := 0; i < 12; i++ {
		zeros, ones := []string{}, []string{}
		if len(oxygen) > 1 {
			for _, o := range oxygen {
				if o[i] == '1' {
					ones = append(ones, o)
				} else {
					zeros = append(zeros, o)
				}
			}
			if len(ones) >= len(zeros) {
				oxygen = zeros
			} else {
				oxygen = ones
			}
		}

		zeros, ones = []string{}, []string{}

		if len(co2) > 1 {
			for _, c := range co2 {
				if c[i] == '1' {
					ones = append(ones, c)
				} else {
					zeros = append(zeros, c)
				}
			}
			if len(ones) < len(zeros) {
				co2 = zeros
			} else {
				co2 = ones
			}
		}
	}

	x, _ := strconv.ParseInt(oxygen[0], 2, 64)
	y , _ := strconv.ParseInt(co2[0], 2, 64)
	fmt.Println(x * y)
}
```
---
title: "Advent of Code Day 8 2021"
date: 2050-12-08T19:09:29-06:00
toc: false
images:
tags: [Advent Of Code, golang]
---

[Day 8 Puzzle](https://adventofcode.com/2021/day/8)

``` go
func oneDay8() {
    file, err := os.Open("input8.txt") // opening the file

    if err != nil {
        panic(err)
    }
    defer file.Close()

    scanner := bufio.NewScanner(file)
    res := 0

    for scanner.Scan() {
        temp := scanner.Text() // getting the line
        arr := strings.Split(temp, " | ")
        words := strings.Split(arr[1], " ")

        for _, s := range words {
            if len(s) == 2 || len(s) == 4 || len(s) == 3 || len(s) == 7 {
                res++
            }
        }
    }
    fmt.Println(res)
}
```

The idea of the second solution is to use the numbers `1`, `4`, `7`, and `8` to find the other numbers.

First we can find out how many LED strips are used to make each number (Note that the number of LED strips is the length of the mixed up number):

`0` &rarr; `6` led strips

`1` &rarr; `2` led strips

`2` &rarr; `5` led strips

`3` &rarr; `5` led strips

`4` &rarr; `4` led strips

`5` &rarr; `5` led strips

`6` &rarr; `6` led strips

`7` &rarr; `3` led strips

`8` &rarr; `7` led strips

`9` &rarr; `6` led strips


Now we can group them together:

`1`, `4`, `7`, and `8` all have a unique number of LED strips, so we can easily identify them.

`2`, `3`, and `5` all have `5` led strips.

`0`, `6`, and `9` all have `6` led strips.

We don't know which LED's are which, so we have to use `1`, `4`, `7`, and `8` to find out which are which.

We can start off with `0`, `6`, and `9`:

![](https://i.imgur.com/oYi2dw8.jpg)

* Step one shows which numbers we are going to be overlapping.
* The first line of step two shows the overlapped numbers.
* And the second line of step two shows which lines the 4 is not overlapping.
* Since the last set of LED's is the only number with a unique number of non-overlapping lines we know that that set of LED's is a `9`.
* Next we can overlap the remaining two sets of LED's with two ones.
* We can see that both of the new sets have unique number of overlaps, so we can find out their numbers.

The same can be done for `2`, `3`, and `5`:

![](https://i.imgur.com/fkVOnbl.jpg)

That was the idea of the solution, the actual solution is very similar, but has its differences.

The main difference is we temporarily skip numbers while we have not found the `1` and the `4` because we only know what number it is by using them.

``` go
func twoDay8() {
    b, _ := ioutil.ReadFile("input8.txt")
    var h = strings.Split(string(b), "\n")

    res := 0

    for _, temp := range h {
        after := strings.Split(strings.Split(temp, " | ")[1], " ")
        before := strings.Split(strings.Split(temp, " | ")[0], " ")
        jumbledNumber := make(map[int] string)
        properNumber := make(map[string] int)
        // jumbledNumber = number : mixed up numbers (used to find the number in O(1) time)
        // properNumber = mixed up number : number (used for finding the mixed up number in O(1) time)
        num := 0
        arr := []string{}

        lengthFiveOrSix := func(a string) {
            fourCounter, oneCounter := 0, 0
            four, one := jumbledNumber[4], jumbledNumber[1]
            newA := strings.Split(a, "")
            sort.Strings(newA)
            a = strings.Join(newA, "")

            for i := 0; i < len(a); i++ {
                if !strings.Contains(four, string(a[i])) {
                    fourCounter++
                }
                if !strings.Contains(one, string(a[i])) {
                    oneCounter++
                }
            }

            if len(a) == 5 {
                if fourCounter == 3 {
                    jumbledNumber[2] = a; properNumber[a] = 2
                } else if oneCounter == 3 {
                    jumbledNumber[3] = a; properNumber[a] = 3
                } else {
                    jumbledNumber[5] = a; properNumber[a] = 5
                }
            } else { // len(a) == 6
                if fourCounter == 2 {
                    jumbledNumber[9] = a; properNumber[a] = 9
                } else if oneCounter == 5 {
                    jumbledNumber[6] = a; properNumber[a] = 6
                } else {
                    jumbledNumber[0] = a; properNumber[a] = 0
                }
            }
        }

        for _, a := range before {
            newA := strings.Split(a, "")
            sort.Strings(newA)
            a = strings.Join(newA, "")
            switch len(a) {
            case 2:
                jumbledNumber[1] = a; properNumber[a] = 1
            case 3:
                jumbledNumber[7] = a; properNumber[a] = 7
            case 4:
                jumbledNumber[4] = a; properNumber[a] = 4
            case 7:
                jumbledNumber[8] = a; properNumber[a] = 8
            default: // if the length is 5 or 6
                if jumbledNumber[4] != "" && jumbledNumber[1] != "" {
                    lengthFiveOrSix(a)
                } else {
                    // we need the 1 and 4 to find out the actual number,
                    // so skip for now
                    arr = append(arr, a)
                }
            }
        }

        for _, a := range arr { // Do all the skipped numbers
            lengthFiveOrSix(a)
        }

        for _, a := range after {
            newA := strings.Split(a, "")
            sort.Strings(newA)
            a = strings.Join(newA, "")

            num = (num * 10) + properNumber[a]
        }
        res += num
    }

    fmt.Println(res)
}
```

We can do it another way without skipping, though this way might take a little longer. If we sort the sets of LED's by the number of LED's we can find the `1` and `4` first, because they both have the smallest number of LED's.

``` go
func twoDay8() {
    b, _ := ioutil.ReadFile("input8.txt")
    var h = strings.Split(string(b), "\n")

    res := 0

    for _, temp := range h {
        after := strings.Split(strings.Split(temp, " | ")[1], " ")
        before := strings.Split(strings.Split(temp, " | ")[0], " ")
        jumbledNumber := make(map[int]string)
        properNumber := make(map[string]int)
        // jumbledNumber = number : mixed up numbers (used to find the number in O(1) time)
        // properNumber = mixed up number : number (used for finding the mixed up number in O(1) time)
        num := 0

        lengthFiveOrSix := func(a string) {
            fourCounter, oneCounter := 0, 0
            four, one := jumbledNumber[4], jumbledNumber[1]
            newA := strings.Split(a, "")
            sort.Strings(newA)
            a = strings.Join(newA, "")

            for i := 0; i < len(a); i++ {
                if !strings.Contains(four, string(a[i])) {
                    fourCounter++
                }
                if !strings.Contains(one, string(a[i])) {
                    oneCounter++
                }
            }

            if len(a) == 5 {
                if fourCounter == 3 {
                    jumbledNumber[2] = a
                    properNumber[a] = 2
                } else if oneCounter == 3 {
                    jumbledNumber[3] = a
                    properNumber[a] = 3
                } else {
                    jumbledNumber[5] = a
                    properNumber[a] = 5
                }
            } else { // len(a) == 6
                if fourCounter == 2 {
                    jumbledNumber[9] = a
                    properNumber[a] = 9
                } else if oneCounter == 5 {
                    jumbledNumber[6] = a
                    properNumber[a] = 6
                } else {
                    jumbledNumber[0] = a
                    properNumber[a] = 0
                }
            }
        }

        sort.Slice(before, func(i, j int) bool { // sort by number of LED's to get rid of the skipping
            return len(before[i]) < len(before[j])
        })

        for _, a := range before {
            newA := strings.Split(a, "")
            sort.Strings(newA)
            a = strings.Join(newA, "")
            switch len(a) {
            case 2:
                jumbledNumber[1] = a
                properNumber[a] = 1
            case 3:
                jumbledNumber[7] = a
                properNumber[a] = 7
            case 4:
                jumbledNumber[4] = a
                properNumber[a] = 4
            case 7:
                jumbledNumber[8] = a
                properNumber[a] = 8
            default: // if the length is 5 or 6
                if jumbledNumber[4] != "" && jumbledNumber[1] != "" {
                    lengthFiveOrSix(a)
                }
            }
        }

        for _, a := range after {
            newA := strings.Split(a, "")
            sort.Strings(newA)
            a = strings.Join(newA, "")

            num = (num * 10) + properNumber[a]
        }
        res += num
    }

    fmt.Println(res)
}

```
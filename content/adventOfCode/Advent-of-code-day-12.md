---
title: "2021 Advent of code day 12"
date: { .Date }
toc: false
images:
tags: [Advent Of Code, golang]
---

[Day 12 puzzle](https://adventofcode.com/2021/day/12)

I got to both of my solutions by thing of them as a tree.

For part one we can use a DFS approach. Basically find every path from `"start"` to `"end"`. And if we find a lowercase word we can add it to a map, so we know we have visited that position.

Part two is pretty similar, we can pretty much the same thing, but we have to check if only one of the lowercase letters has been looped over twice, so I made a variable called `hasDoneTwice`.

``` go
var res = 0

func Day12() {
    input, _ := ioutil.ReadFile("input12.txt")

    var arr2 = strings.Split(string(input), "\n")
    connections := map[string] []string {}

    for _, line := range arr2 { //  get everything from input
        s := strings.Split(line, "-")
        connections[s[0]] = append(connections[s[0]], s[1])
        connections[s[1]] = append(connections[s[1]], s[0])
    }

    res = 0
    one(make(map[string] bool), connections, "start")
    fmt.Println("Part ones answer:", res)

    res = 0
    two(make(map[string] bool), connections, "start", false)
    fmt.Println("Part twos answer:", res)
}

func one(visited map[string] bool, connections map[string] []string, cur string) {
    for _, connect := range connections[cur] {
        if connect == "end" {
            res++
        } else if connect == "start" {
            continue
        } else if !visited[connect] {
            newMap := make(map[string] bool)
            for k,v := range visited { // remake visited
                newMap[k] = v
            }
            if connect[0] >= 97 { // if lowercase add to visited
                newMap[connect] = true
            }
            one(newMap, connections, connect)
        }
    }
}

func two(visited map[string] bool, connections map[string] []string, cur string, hasDoneTwice bool) {
    for _, connect := range connections[cur] {
        if connect == "end" {
            res++
            continue
        } else if connect == "start" {
            continue
        }

        newMap := make(map[string] bool)
        for k,v := range visited { // remake visited
            newMap[k] = v
        }
        if connect[0] >= 97 { // if lowercase add to visited
            newMap[connect] = true
        }

        if (!visited[connect] && hasDoneTwice) || (visited[connect] && !hasDoneTwice) {
            two(newMap, connections, connect, true)
        } else if !visited[connect] {
            two(newMap, connections, connect, false)
        }
    }
}
```
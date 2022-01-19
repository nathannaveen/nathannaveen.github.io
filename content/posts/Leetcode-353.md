---
title: "Leetcode 353"
date: 2022-01-19T13:00:19-06:00
toc: false
images:
tags: [leetcode, golang, design]
---

[353. Design Snake Game](https://leetcode.com/problems/design-snake-game/)

For `SnakeGame` I have a lot of pramaters, and it might be hard to understand this solution is you don't understand them. So:

* `counter int` &rarr; The amount of food that the snake has eaten.
* `height int` &rarr; The height of the matrix.
* `width int` &rarr; The width of the matrix.
* `food [][]int` &rarr; The positions of the food.
* `foodCounter int` &rarr; What food we are on (i.e. `food[foodCounter] = [1, 2]`)
* `m map[point] bool` &rarr; What positions the snake is on. We have this so we can check whether the snake is occuping a space where its body should be in `O(1)` time.
* `previous []point` &rarr; This is all the positions of the snake.

``` go
type SnakeGame struct {
    counter int
    height int
    width int
    food [][]int
    foodCounter int
    m map[point] bool
    previous []point
}

type point struct {
    i, j int
}


func Constructor(width int, height int, food [][]int) SnakeGame {
    m := make(map[point] bool)
    m[point{ 0, 0 }] = true
    return SnakeGame{ 0, height, width, food, 0, m, []point{ point{0, 0} } }
}


func (this *SnakeGame) Move(direction string) int {
    newPoint := this.previous[len(this.previous) - 1]
    
    switch direction {
        case "R":
            newPoint.j++
        case "L":
            newPoint.j--
        case "U":
            newPoint.i--
        case "D":
            newPoint.i++
    }
    
    if newPoint.i < 0 || newPoint.j < 0 || newPoint.i >= this.height || newPoint.j >= this.width { 
        // If we run into walls
        return -1 
    }
    
    if this.foodCounter < len(this.food) && this.food[this.foodCounter][0] == newPoint.i && this.food[this.foodCounter][1] == newPoint.j {
        // If on a piece of food
        this.foodCounter++
        this.counter++
        
    } else {
        // If not on food we can remove the end of the tail
        pop := this.previous[0]
        this.previous = this.previous[1:]
        delete(this.m, pop)
        
    }
    
    if this.m[newPoint] { 
        // Running into itself
        return -1 
    }
    
    this.previous = append(this.previous, newPoint)
    
    this.m[newPoint] = true
    
    return this.counter
}
```
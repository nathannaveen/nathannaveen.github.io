---
title: "Leetcode 874"
date: 2021-04-07T12:36:17-05:00
toc: false
images:
tags: [leetcode, golang, array, math]
---

[874. Walking Robot Simulation](https://leetcode.com/problems/walking-robot-simulation/)

Warning: This solution is pretty annoying.

**What The Problem is Telling Us:**

The problem description says that they will give an array called `commands` that tell you to turn right, left, or move forward, and they will also give you a matrix array called `obstacles`. `obstacles` is pretty self-explanatory. It is points where an obstacle is at. The points are in the format of `(x, y)`.

There are three types of commands in `commands`:

* -1 is to turn right 90 degrees
* -2 is to turn left 90 degrees (Or just -90 degrees)
* And numbers from 1 to 9. This is how many units to move by.

If the robot hits an obstacle while in mid-journey, the robot stops at the step before the barrier and continues on with the rest of the commands.

**The Idea of This Code:**

The idea of this code is pretty simple:

1. First, we make some variables called:
    * `maximum` is for the maximum Euclidean distance squared
    * `direction` is for what direction we are going such as `0 = north, 1 = east, 2 = south, 3 = west, 4 = north, 5 = east, 6 = south, 7 = west ...`
    * `x, y` are for storing the current x value and the current y value
2. Then, we loop through `commands`.
3. We check whether the current command, which we call `command` (save `command` for future reference) is `-1`. If so, we need to add one to `direction` so in example if we are pointing north, we will now be pointing east.
4. Else if `command` is `-2` we add `3` to `direction`. You might be wondering why we add `3` instead of subtracting `1`, it is because `4 - 1 = 3` and since when `direction = 0` it is `north`, when `direction = 4` it is when `north`, `direction = 8` it is `north`, and so on. Since `direction` just keeps on going on and is never negative, we add `3` to solve some problems.
5. Now else, if it is not `-1` or `-2`, we can loop through all the obstacles to see whether our robot has hit any.
    * First, we can start we are facing north, and there is an obstacle in the way
    * Next, we can do where the robot is facing east, and there is an obstacle in its path
    * Next, we can do the test case where the robot is facing south, and there is an obstacle in its path
    * Next, if we are facing west and there is an obstacle in its path
    * Last but not least, if the robot does not hit any obstacles.

**The Code:**

``` go
func abs(a int) int {
    if a > 0 {
        return a
    }
    return -a
}

func max(a, b int) int {
    if a < b {
        return b
    }
    return a
}

func robotSim(commands []int, obstacles [][]int) int {
    maximum := 0
    direction := 0
    x, y := 0, 0

    for _, command := range commands {
        if command == -1 { // Turn right
            direction += 1
        } else if command == -2 { // Turn left
            direction += 3
        } else {
            hitObsticle := false
            for _, obstacle := range obstacles {
                if direction%4 == 0 && x == obstacle[0] &&
                y < obstacle[1] && y+command >= obstacle[1] { 
                
                    // North
                    hitObsticle = true
                    y = obstacle[1] - 1
                    
                } else if direction%4 == 1 && x < obstacle[0] &&
                y == obstacle[1] && x+command >= obstacle[0] { 
                    
                    // East
                    hitObsticle = true
                    x = obstacle[0] - 1
                    
                } else if direction%4 == 2 && x == obstacle[0] &&
                y > obstacle[1] && y-command <= obstacle[1] { 
                
                    // South
                    hitObsticle = true
                    y = obstacle[1] + 1
                    
                } else if direction%4 == 3 && x > obstacle[0] &&
                y == obstacle[1] && x-command <= obstacle[0] { 
                    
                    // West
                    hitObsticle = true
                    x = obstacle[0] + 1
                }
            }

            if !hitObsticle {
                if direction%4 == 0 {
                    y += command
                } else if direction%4 == 1 {
                    x += command
                } else if direction%4 == 2 {
                    y -= command
                } else {
                    x -= command
                }
            }
            maximum = max(maximum, abs(x)*abs(x)+abs(y)*abs(y))

        }

    }
    return maximum
}
```
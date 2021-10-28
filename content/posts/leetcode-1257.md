---
title: "Leetcode 1257"
date: 2021-10-28T15:58:40-05:00
toc: false
images:
tags: [leetcode, golang, map]
---

[1257. Smallest Common Region](https://leetcode.com/problems/smallest-common-region/)

A quick idea of this solution is *(Note: This solution is not very good if you want a solution that is easy to understand, look after this)*:

* To use a map to store every region as the key and the value as the region in which the original region is contained.
* Then loop through all the regions in the food chain of `region1` (I am calling a food chain whenever we start with `region1`, and then find the region that contains it) and store all the values into another map.
* Then we loop through the food chain of `region2`, and check whether the `region1` food chain map contains any values. If so, return the value.

***

I know that the whole explanation before is very vague and confusing, so I am going to explain this whole thing using an example:

So, to start off, we can have a map called `m` to store all the regions and their direct ancestor (I am calling the region that contains the region a direct ancestor)

``` go
input:

regions = [["Earth","North America","South America"],
["North America","United States","Canada"],
["United States","New York","Boston"],
["Canada","Ontario","Quebec"],
["South America","Brazil"]],
region1 = "Quebec",
region2 = "New York"
```

We can now add the region and its direct ancestor to `m`. For example, the first region:

`["Earth","North America","South America"]`

Since `"Earth"` contains `"North America"`, and `"South America"` we can add them to `m`:

`m = [ "North America" : "Earth", "South America" : "Earth" ]`

If we do this to all the regions we get:

`m = [ "North America" : "Earth", "South America" : "Earth", "United States" : "North America", "Canada" : "North America", "New York" : "United States", "Boston" : "United States", "Ontario" : "Canada", "Quebec" : "Canada", "Brazil" : "South America" ]`

Note that this wouldn't work if the problem statement didn't say:

> If you are given regions `r1`, `r2`, and `r3` such that `r1` includes `r3`, it is guaranteed there is no `r2` such that `r2` includes `r3`.

You might not understand what this means. If so, it says that one region can't exist in two regions, and that one region will only be there in one or no regions.

Continuing with our example, we get to the following two parts of the input `region1`, and `region2`.

We also have to make another map (I am using this map as a set because Golang doesn't have sets) to store all the ancestors of `region1`. We call this `m2`.

Now we can add `region1` to `m2`. Then we can make `region1` equal `m[region1]` to find our next ancestor. And keep doing this until we don't have an ancestor for `region1`.

And the last thing that we have to do is loop through the ancestors of `region2`, and check whether `m2` contains any of `region2`s ancestors. If so, return the ancestor.

``` go
func findSmallestRegion(regions [][]string, region1 string, region2 string) string {
    m := make(map[string] string)
    m2 := make(map[string] bool)
    
    for _, region := range regions {
        for i := 1; i < len(region); i++ {
            m[region[i]] = region[0]
        }
    }
    
    for m[region1] != "" {
        m2[region1] = true
        region1 = m[region1]
    }
    m2[region1] = true
    
    for m[region2] != "" {
        if m2[region2] { 
            return region2 
        }
        region2 = m[region2]
    }
    
    return region2
}
```



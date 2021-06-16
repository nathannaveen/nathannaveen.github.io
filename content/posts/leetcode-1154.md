---
title: "Leetcode 1154"
date: 2021-06-16T11:20:54-05:00
toc: false
images:
tags: [golang, leetcode, string]
---

*Note: I know that the second solution is pretty un-orthidoxed because we would have to change a lot of stuff if the input changed.*

[1154. Day of the Year](https://leetcode.com/problems/day-of-the-year/)

**How the first solution works:**

The first solution is pretty simple:

* We find the year month and day *(Note: We call the day `res` because the day is only used for adding to the result)*
* We also have an array of the number of days per month
* Then we check whether it is a leep year, if so add `1` day to the result.
* Then we loop through every month that has passed (From Jan to `month`) and add their days to `res`.
* Then we can return `res`.

**The First solution** *O(n), O(12)*

``` go
func dayOfYear(date string) int {
	days := []int{31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31} 
	
	year, _ := strconv.Atoi(date[: 4])
	month, _ := strconv.Atoi(date[5 : 7])
	res, _ := strconv.Atoi(date[8 :])
	
	if month > 2 && year % 4 == 0 && (year % 100 != 0 || year % 400 == 0) {
		res++
	}
	for month - 1 > 0 {
		res += days[month - 2]
		month--
	}
	return res
}
```

**How the second solution works:**

* In this solution we also find the `year`, `month`, and `res` *(`res ==` current day of the month)*.
* Then we check whether it is a leep year, if so add `1` day to the result.
* Then we do `res += 30 * (month - 1)`. We do this because all the days in every month (Not including leap years for we have handeled leep years before we do `res += 30 * (month - 1)`) are either `30, 31`, or `28`, so for all months that have `31` days we can add `1` to `res`, and for Feburary we can subtract `2` from `res`.
* Next we have `if month > 2 { res -= 2 }` we know that feburary has passed so we can subtract `2` from `res`.
* Now you might be confused by: `if month < 9 { res += month / 2 } else { res += (month - 7) / 2 + 1 }` because when adding `1` per month you would think that we would do `month`

**The second solution** *O(1), O(1)*

``` go
func dayOfYear(date string) int {
	year, _ := strconv.Atoi(date[: 4])
	month, _ := strconv.Atoi(date[5 : 7])
	res, _ := strconv.Atoi(date[8 :])
	if month > 2 && year % 4 == 0 && (year % 100 != 0 || year % 400 == 0) {
		res++
	}
	res += 30 * (month - 1)
	if month > 2 { 
		res -= 2 
	}
	if month < 9 {
		res += month / 2
	} else {
		res += (month - 7) / 2 + 1
	}

	return res
}
```


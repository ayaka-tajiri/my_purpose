package domain

import (
	"time"
)

type Calendar struct {
	User User
	Title string
	Start string
}

type CalenderSetting struct {
	Description string
	Period string
	Date   time.Time
}

type Calendars []Calendar
type CalenderSettings []CalenderSetting


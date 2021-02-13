package domain

import "time"

type Action struct {
	Id string
	PurposeId string
	Description string
	Period string
	Date time.Time
	OrderNumber int
}

type Actions []Action

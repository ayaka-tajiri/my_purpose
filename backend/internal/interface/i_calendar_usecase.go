package _interface

import "github.com/ayaka-tajiri/my_purpose/backend/internal/data"

type CalendarUseCase interface {
	Index(*data.RequestCalendar) (data.ResponseCalenders, error)
}

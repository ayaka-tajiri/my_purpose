package _interface

import "github.com/ayaka-tajiri/my_purpose/backend/internal/domain"

type CalendarRepository interface {
	FindAll(domain.Calendar) (domain.CalenderSettings, error)
}

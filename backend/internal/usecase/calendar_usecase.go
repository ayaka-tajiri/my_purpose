package usecase

import (
	"github.com/ayaka-tajiri/my_purpose/backend/internal/data"
	"github.com/ayaka-tajiri/my_purpose/backend/internal/domain"
	_interface "github.com/ayaka-tajiri/my_purpose/backend/internal/interface"
	"log"
	"time"
)

type calendarUseCase struct {
	calendarRepository _interface.CalendarRepository
}

func NewCalendarUseCase(repository _interface.CalendarRepository) _interface.CalendarUseCase {
	return &calendarUseCase {
		calendarRepository: repository,
	}
}

func (useCase *calendarUseCase) Index(requestCalendar *data.RequestCalendar) (responseCalendars data.ResponseCalenders, err error) {
	calender := domain.Calendar{User: domain.User{UserId: requestCalendar.UserId}}
	calendarSettings, err := useCase.calendarRepository.FindAll(calender)
	if err != nil {
		log.Fatal(err)
	}

	start, err := time.Parse("2006-01", requestCalendar.Month)
	if err != nil {
		log.Fatal(err)
	}
	startWeekDay := int(start.Weekday())
	firstSunDay := start.AddDate(0, 0, 7 - startWeekDay)
	last := start.AddDate(0, 1, -1)

	var calendars data.ResponseCalenders
	for _, calenderSetting := range calendarSettings {
		switch calenderSetting.Period {
		case "every week":
			for d := firstSunDay; d.Month() == firstSunDay.Month(); d = d.AddDate(0,0,7) {
				newCalendar := data.ResponseCalender{Title: calenderSetting.Description, Start: d.Format(layout)}
				calendars = append(calendars, newCalendar)
			}
			break
		case "every month":
			newCalendar := data.ResponseCalender{Title: calenderSetting.Description, Start: last.Format(layout)}
			calendars = append(calendars, newCalendar)
			break
		case "day":
			newCalendar := data.ResponseCalender{Title: calenderSetting.Description, Start: calenderSetting.Date.Format(layout)}
			calendars = append(calendars, newCalendar)
			break
		}
	}

	return calendars, err
}

package controller

import (
	"github.com/ayaka-tajiri/my_purpose/backend/cmd/database"
	_interface "github.com/ayaka-tajiri/my_purpose/backend/internal/interface"
	"github.com/ayaka-tajiri/my_purpose/backend/internal/usecase"
	my_purpose "github.com/ayaka-tajiri/my_purpose/backend/protocBuffer"
)

type MyPurposeServer struct {
	PurposeRepository  _interface.PurposeRepository
	PurposeUseCase     _interface.PurposeUseCase
	ActionRepository   _interface.ActionRepository
	ActionUseCase      _interface.ActionUseCase
	CalendarRepository _interface.CalendarRepository
	CalendarUseCase    _interface.CalendarUseCase
	my_purpose.UnimplementedMyPurposeServer
}

func NewMyPurposeServer() *MyPurposeServer {
	purposeRepository := database.NewPostgresPurposeRepository()
	purposeUseCase := usecase.NewPurposeUseCase(purposeRepository)
	actionRepository := database.NewPostgresActionRepository()
	actionUseCase := usecase.NewActionUseCase(actionRepository)
	calendarRepository := database.NewPostgresCalendarRepository()
	calendarUseCase := usecase.NewCalendarUseCase(calendarRepository)
	return &MyPurposeServer{
		PurposeRepository:  purposeRepository,
		PurposeUseCase:     purposeUseCase,
		ActionRepository:   actionRepository,
		ActionUseCase:      actionUseCase,
		CalendarRepository: calendarRepository,
		CalendarUseCase:    calendarUseCase,
	}
}

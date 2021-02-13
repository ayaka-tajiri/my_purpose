package usecase

import (
	"github.com/ayaka-tajiri/my_purpose/backend/internal/data"
	"github.com/ayaka-tajiri/my_purpose/backend/internal/domain"
	_interface "github.com/ayaka-tajiri/my_purpose/backend/internal/interface"
	"time"
)

const (
	layout = "2006-01-02"
)

type actionUseCase struct {
	actionRepository _interface.ActionRepository
}

func NewActionUseCase(repository _interface.ActionRepository) _interface.ActionUseCase {
	return &actionUseCase{
		actionRepository: repository,
	}
}

func (useCase *actionUseCase) Index(requestAction *data.RequestAction) (responseActions data.ResponseActions, err error) {
	actions, err := useCase.actionRepository.FindAll(requestAction.PurposeId)
	if len(actions) == 0 {
		responseActions := data.ResponseActions{}
		return responseActions, err
	}
	for _, value := range actions {
		responseAction := data.ResponseAction{
			Id: value.Id,
			PurposeId: value.PurposeId,
			Description: value.Description,
			Period: value.Period,
			Date: value.Date.String(),
			OrderNumber: value.OrderNumber,
		}
		responseActions = append(responseActions, responseAction)
	}
	return responseActions, err
}

func (useCase *actionUseCase) Edit(requestAction *data.RequestAction) (responseAction data.ResponseAction, err error)  {
	action := domain.Action{
		Id: requestAction.Id,
		PurposeId: requestAction.PurposeId,
		Description: requestAction.Description,
		Period: requestAction.Period,
		Date: stringToTime(requestAction.Date),
		OrderNumber: requestAction.OrderNumber,
	}
	action, err = useCase.actionRepository.Update(action)
	responseAction = data.ResponseAction{
		Id: action.Id,
		PurposeId: action.PurposeId,
		Description: action.Description,
		Period: action.Period,
		Date: timeToString(action.Date),
		OrderNumber: action.OrderNumber,
	}
	return responseAction, err
}

func (useCase *actionUseCase) Create(requestAction *data.RequestAction) (responseAction data.ResponseAction, err error) {
	action := domain.Action{
		Id: requestAction.Id,
		PurposeId: requestAction.PurposeId,
		Description: requestAction.Description,
		Period: requestAction.Period,
		Date: stringToTime(requestAction.Date),
		OrderNumber: requestAction.OrderNumber,
	}
	action, err = useCase.actionRepository.Add(action)
	responseAction = data.ResponseAction{
		Id: action.Id,
		PurposeId: action.PurposeId,
		Description: action.Description,
		Period: action.Period,
		Date: timeToString(action.Date),
		OrderNumber: action.OrderNumber,
	}
	return responseAction, err
}

func (useCase *actionUseCase) Delete(requestAction *data.RequestAction) (responseAction data.ResponseAction, err error) {
	result, err := useCase.actionRepository.Delete(requestAction.Id)
	if result {
		responseAction = data.ResponseAction{
			Id: requestAction.Id,
			PurposeId: requestAction.PurposeId,
			Description: requestAction.Description,
			Period: requestAction.Period,
			Date: requestAction.Date,
			OrderNumber: requestAction.OrderNumber,
		}
	} else {
		responseAction = data.ResponseAction{}
	}
	return responseAction, err
}

func timeToString(t time.Time) string {
	str := t.Format(layout)
	return str
}

func stringToTime(str string) time.Time {
	timeValue, _ := time.Parse(layout, str)
	return timeValue
}

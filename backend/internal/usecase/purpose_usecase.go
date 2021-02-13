package usecase

import (
	"github.com/ayaka-tajiri/my_purpose/backend/internal/data"
	"github.com/ayaka-tajiri/my_purpose/backend/internal/domain"
	"github.com/ayaka-tajiri/my_purpose/backend/internal/interface"
)

type purposeUseCase struct {
	purposeRepository _interface.PurposeRepository
}

func NewPurposeUseCase(repository _interface.PurposeRepository) _interface.PurposeUseCase {
	return &purposeUseCase{
		purposeRepository: repository,
	}
}

func (useCase *purposeUseCase) Index(requestPurpose *data.RequestPurpose) (responsePurposes data.ResponsePurposes, err error) {
	purpose := domain.Purpose{User: domain.User{UserId: requestPurpose.UserId}}
	purposes, err := useCase.purposeRepository.FindAll(purpose)
	if len(purposes) == 0 {
		responsePurposes := data.ResponsePurposes{}
		return responsePurposes, err
	}
	for _, value := range purposes {
		responsePurpose := data.ResponsePurpose{
			Id:          value.Id,
			Description: value.Description,
		}
		responsePurposes = append(responsePurposes, responsePurpose)
	}
	return responsePurposes, err
}

func (useCase *purposeUseCase) Show(requestPurpose *data.RequestPurpose) (responsePurpose data.ResponsePurpose, err error) {
	purpose, err := useCase.purposeRepository.FindById(requestPurpose.Id)
	responsePurpose = data.ResponsePurpose{Id: purpose.Id, Description: purpose.Description}
	return responsePurpose, err
}

func (useCase *purposeUseCase) Create(requestPurpose *data.RequestPurpose) (responsePurpose data.ResponsePurpose, err error) {
	purpose := domain.Purpose{User: domain.User{UserId: requestPurpose.UserId}, Description: requestPurpose.Description}
	purpose, err = useCase.purposeRepository.Add(purpose)
	responsePurpose = data.ResponsePurpose{Id: purpose.Id, Description: purpose.Description}
	return responsePurpose, err
}

func (useCase *purposeUseCase) Edit(requestPurpose *data.RequestPurpose) (responsePurpose data.ResponsePurpose, err error) {
	purpose := domain.Purpose{Id: requestPurpose.Id, Description: requestPurpose.Description}
	purpose, err = useCase.purposeRepository.Update(purpose)
	responsePurpose = data.ResponsePurpose{Id: purpose.Id, Description: purpose.Description}
	return responsePurpose, err
}

func (useCase *purposeUseCase) Delete(requestPurpose *data.RequestPurpose) (responsePurpose data.ResponsePurpose, err error) {
	result, err := useCase.purposeRepository.Delete(requestPurpose.Id)
	if result {
		responsePurpose = data.ResponsePurpose{
			Id:          requestPurpose.Id,
			Description: requestPurpose.Description,
		}
	} else {
		responsePurpose = data.ResponsePurpose{}
	}
	return responsePurpose, err
}

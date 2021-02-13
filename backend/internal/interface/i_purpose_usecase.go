package _interface

import "github.com/ayaka-tajiri/my_purpose/backend/internal/data"

type PurposeUseCase interface {
	Index(requestPurpose *data.RequestPurpose) (responsePurposes data.ResponsePurposes, err error)
	Show(requestPurpose *data.RequestPurpose) (responsePurpose data.ResponsePurpose, err error)
	Create(requestPurpose *data.RequestPurpose) (responsePurpose data.ResponsePurpose, err error)
	Edit(requestPurpose *data.RequestPurpose) (responsePurpose data.ResponsePurpose, err error)
	Delete(requestPurpose *data.RequestPurpose) (responsePurpose data.ResponsePurpose, err error)
}

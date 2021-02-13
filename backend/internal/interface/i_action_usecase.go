package _interface

import "github.com/ayaka-tajiri/my_purpose/backend/internal/data"

type ActionUseCase interface {
	Index(*data.RequestAction) (data.ResponseActions, error)
	Edit(*data.RequestAction) (data.ResponseAction, error)
	Create(*data.RequestAction) (data.ResponseAction, error)
	Delete(*data.RequestAction) (data.ResponseAction, error)
}

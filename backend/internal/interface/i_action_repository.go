package _interface

import "github.com/ayaka-tajiri/my_purpose/backend/internal/domain"

type ActionRepository interface {
	FindAll(string) (domain.Actions, error)
	Update(domain.Action) (domain.Action, error)
	Add(domain.Action) (domain.Action, error)
	Delete(string) (bool, error)
}

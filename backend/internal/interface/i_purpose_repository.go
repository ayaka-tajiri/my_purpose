package _interface

import "github.com/ayaka-tajiri/my_purpose/backend/internal/domain"

type PurposeRepository interface {
	Add(domain.Purpose) (domain.Purpose, error)
	Update(domain.Purpose) (domain.Purpose, error)
	FindById(string) (domain.Purpose, error)
	FindAll(domain.Purpose) (domain.Purposes, error)
	Delete(string) (bool, error)
}

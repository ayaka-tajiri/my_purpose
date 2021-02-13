package inmemory

import (
	"github.com/ayaka-tajiri/my_purpose/backend/internal/domain"
	"github.com/ayaka-tajiri/my_purpose/backend/internal/interface"
)

type purposeRepository struct {}

func NewInMemoryPurposeRepository() _interface.PurposeRepository {
	return &purposeRepository{}
}

func (repo *purposeRepository) FindById(identifier int) (purpose domain.Purpose, err error) {
	purpose.Description = "目標の説明"
	return
}

func (repo *purposeRepository) Update(purpose domain.Purpose) (responsePurpose domain.Purpose, err error) {
	responsePurpose.Description = "更新"
	return
}

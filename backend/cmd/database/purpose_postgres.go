package database

import (
	"database/sql"
	"fmt"
	"github.com/ayaka-tajiri/my_purpose/backend/internal/domain"
	"github.com/ayaka-tajiri/my_purpose/backend/internal/interface"
	"github.com/google/uuid"
	"log"

	_ "github.com/lib/pq"
)

type purposeRepository struct {
	id string
	description string
	db *sql.DB
}

func NewPostgresPurposeRepository() _interface.PurposeRepository {
	connStr := "host=localhost user=postgres password=postgres_pass dbname=purpose sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	return &purposeRepository{
		db: db,
	}
}

func (repo *purposeRepository) FindAll(purpose domain.Purpose) (purposes domain.Purposes, err error) {
	rows, err := repo.db.Query("SELECT id, description FROM purposes WHERE user_id = $1", purpose.User.UserId)
	if err != nil {
		return purposes, err
	}
	defer rows.Close()

	for rows.Next() {
		if err := rows.Scan(&repo.id, &repo.description); err != nil {
			return purposes, err
		}
		var purpose domain.Purpose
		purpose.Id = repo.id
		purpose.Description = repo.description
		purposes = append(purposes, purpose)
	}

	if purposes == nil {
		purposes = domain.Purposes{}
	}
	return purposes, err
}

func (repo *purposeRepository) FindById(identifier string) (purpose domain.Purpose, err error) {
	err = repo.db.QueryRow("SELECT id, description FROM purposes WHERE id = $1 LIMIT 1", identifier).
		Scan(&repo.id, &repo.description)
	if err != nil {
		return purpose, err
	}
	purpose.Id = repo.id
	purpose.Description = repo.description
	return purpose, err
}

func (repo *purposeRepository) Add(purpose domain.Purpose) (responsePurpose domain.Purpose, err error) {
	newUuid, err := uuid.NewUUID()
	if err != nil {
		return responsePurpose, err
	}
	_, err = repo.db.Exec("INSERT INTO purposes (id, user_id, description, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW())",
		newUuid, purpose.User.UserId, purpose.Description)
	if err != nil {
		return responsePurpose, err
	}
	responsePurpose.Id = newUuid.String()
	responsePurpose.User.UserId = purpose.User.UserId
	responsePurpose.Description = purpose.Description
	return responsePurpose, err
}

func (repo *purposeRepository) Update(purpose domain.Purpose) (responsePurpose domain.Purpose, err error) {
	_, err = repo.db.Exec("UPDATE purposes SET description = $1 WHERE id = $2 RETURNING id, description",
		purpose.Description, purpose.Id)
	if err != nil {
		return purpose, err
	}
	responsePurpose.Id = purpose.Id
	responsePurpose.Description = purpose.Description
	return responsePurpose, err
}

func (repo *purposeRepository) Delete(purposeId string) (result bool, err error) {
	execDelete, err := repo.db.Exec("DELETE FROM purposes WHERE id = $1", purposeId)
	if err != nil {
		result = false
		return result, err
	}
	rows, err := execDelete.RowsAffected()
	if err != nil {
		result = false
		return result, err
	}
	if rows != 1 {
		result = false
		fmt.Errorf("expected to affect 1 row, affected %d", rows)
		return result, err
	} else {
		result = true
	}
	return result, err
}

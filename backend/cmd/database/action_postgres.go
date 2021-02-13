package database

import (
	"database/sql"
	"github.com/ayaka-tajiri/my_purpose/backend/internal/domain"
	_interface "github.com/ayaka-tajiri/my_purpose/backend/internal/interface"
	"log"
)

type actionRepository struct {
	id string
	purposeId string
	description string
	period string
	date sql.NullTime
	orderNumber int
	db *sql.DB
}

func NewPostgresActionRepository() _interface.ActionRepository {
	connStr := "host=localhost user=postgres password=postgres_pass dbname=purpose sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	return &actionRepository{
		db: db,
	}
}

func (repo *actionRepository) FindAll(purposeId string) (actions domain.Actions, err error) {
	rows, err := repo.db.Query("SELECT id, purpose_id, description, period, date, order_number FROM actions WHERE purpose_id = $1 ORDER BY order_number", purposeId)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		if err := rows.Scan(&repo.id, &repo.purposeId, &repo.description, &repo.period, &repo.date, &repo.orderNumber); err != nil {
			log.Fatal(err)
		}
		var action domain.Action
		action.Id = repo.id
		action.PurposeId = repo.purposeId
		action.Description = repo.description
		action.Period = repo.period
		action.Date = repo.date.Time
		action.OrderNumber = repo.orderNumber
		actions = append(actions, action)
	}

	if actions == nil {
		actions = domain.Actions{}
	}
	return actions, err
}

func (repo *actionRepository) Update(action domain.Action) (responseAction domain.Action, err error) {
	if checkPeriodAndDate(action) {
		_, err = repo.db.Exec("UPDATE actions SET description = $1, period = $2, date = $3, order_number = $4 WHERE id = $5 RETURNING id, purpose_id, description, period, date, order_number",
			action.Description, action.Period, action.Date, action.OrderNumber, action.Id)
	} else {
		_, err = repo.db.Exec("UPDATE actions SET description = $1, period = $2, date = $3, order_number = $4 WHERE id = $5 RETURNING id, purpose_id, description, period, date, order_number",
			action.Description, action.Period, nil, action.OrderNumber, action.Id)
	}

	if err != nil {
		log.Fatal(err)
	}
	responseAction.Id = action.Id
	responseAction.PurposeId = action.PurposeId
	responseAction.Description = action.Description
	responseAction.Period = action.Period
	responseAction.Date = action.Date
	responseAction.OrderNumber = action.OrderNumber
	return responseAction, err
}

func (repo *actionRepository) Add(action domain.Action) (responseAction domain.Action, err error) {
	if checkPeriodAndDate(action) {
		_, err = repo.db.Exec("INSERT INTO actions (id, purpose_id, description, period, date, order_number, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())",
			action.Id, action.PurposeId, action.Description, action.Period, action.Date, action.OrderNumber)
	} else {
		_, err = repo.db.Exec("INSERT INTO actions (id, purpose_id, description, period, date, order_number, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())",
			action.Id, action.PurposeId, action.Description, action.Period, nil, action.OrderNumber)
	}

	if err != nil {
		log.Fatal(err)
	}
	responseAction.Id = action.Id
	responseAction.PurposeId = action.PurposeId
	responseAction.Description = action.Description
	responseAction.Period = action.Period
	responseAction.Date = action.Date
	responseAction.OrderNumber = action.OrderNumber
	return responseAction, err
}

func (repo *actionRepository) Delete(actionId string) (result bool, err error) {
	execDelete, err := repo.db.Exec("DELETE FROM actions WHERE id = $1", actionId)
	if err != nil {
		result = false
		log.Fatal(err)
	}
	rows, err := execDelete.RowsAffected()
	if err != nil {
		result = false
		log.Fatal(err)
	}
	if rows != 1 {
		result = false
		log.Fatalf("expected to affect 1 row, affected %d", rows)
	} else {
		result = true
	}
	return result, err
}

func checkPeriodAndDate(action domain.Action) bool {
	return action.Date.String() != "" && action.Period == "day"
}

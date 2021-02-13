package database

import (
	"database/sql"
	"github.com/ayaka-tajiri/my_purpose/backend/internal/domain"
	_interface "github.com/ayaka-tajiri/my_purpose/backend/internal/interface"
	"log"
)

type calendarRepository struct {
	description string
	period string
	date sql.NullTime
	db *sql.DB
}

func NewPostgresCalendarRepository() _interface.CalendarRepository {
	connStr := "host=localhost user=postgres password=postgres_pass dbname=purpose sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	return &calendarRepository{
		db: db,
	}
}

func (repo *calendarRepository) FindAll(calendar domain.Calendar) (calendarSettings domain.CalenderSettings, err error) {
	rows, err := repo.db.Query("SELECT a.description, a.period, a.date FROM actions as a JOIN purposes as p on a.purpose_id = p.id WHERE p.user_id = $1",
		calendar.User.UserId)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		if err := rows.Scan(&repo.description, &repo.period, &repo.date); err != nil {
			log.Fatal(err)
		}
		var calendarSetting domain.CalenderSetting
		calendarSetting.Description = repo.description
		calendarSetting.Period = repo.period
		calendarSetting.Date = repo.date.Time
		calendarSettings = append(calendarSettings, calendarSetting)
	}

	if calendarSettings == nil {
		calendarSettings = domain.CalenderSettings{}
	}
	return
}

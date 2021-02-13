package domain

type Purpose struct {
	Id string
	User User
	Description string
}

type Purposes []Purpose

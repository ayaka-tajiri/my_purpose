package data

type ResponsePurpose struct {
	Id string `json:"id"`
	UserId string `json:"user_id"`
	Description string `json:"description"`
}

type ResponsePurposes []ResponsePurpose

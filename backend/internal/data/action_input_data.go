package data

type RequestAction struct {
	Id string `json:"id"`
	PurposeId string `json:"purpose_id"`
	Description string `json:"description"`
	Period string `json:"period"`
	Date string `json:"date"`
	OrderNumber int `json:"order_number"`
}

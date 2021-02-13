package data

type ResponseCalender struct {
	Title string `json:"title"`
	Start string `json:"start"`
}

type ResponseCalenders []ResponseCalender

package controller

import (
	"github.com/ayaka-tajiri/my_purpose/backend/internal/data"
	pb "github.com/ayaka-tajiri/my_purpose/backend/protocBuffer"
)

func (server *MyPurposeServer) IndexCalendars(request *pb.CalendarRequest, stream pb.MyPurpose_IndexCalendarsServer) error {
	requestCalendar := &data.RequestCalendar{UserId: request.UserId, Month: request.Month}
	responseCalendars, _ := server.CalendarUseCase.Index(requestCalendar)
	for _, calendar := range responseCalendars {
		if err := stream.Send(&pb.CalendarResponse{
			Title: calendar.Title,
			Start: calendar.Start,
		}); err != nil { return err }
	}
	return nil
}

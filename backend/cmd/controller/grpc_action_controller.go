package controller

import (
	"context"
	"github.com/ayaka-tajiri/my_purpose/backend/internal/data"
	pb "github.com/ayaka-tajiri/my_purpose/backend/protocBuffer"
)

func (server *MyPurposeServer) IndexActions(request *pb.ActionRequest, stream pb.MyPurpose_IndexActionsServer) error {
	requestAction := &data.RequestAction{PurposeId: request.PurposeId}
	responseAction, _ := server.ActionUseCase.Index(requestAction)
	for _, action := range responseAction {
		if err := stream.Send(&pb.ActionResponse{
			Id: action.Id,
			PurposeId: action.PurposeId,
			Description: action.Description,
			Period: action.Period,
			Date: action.Date,
			OrderNumber: int32(action.OrderNumber),
		}); err != nil {
				return err
			}
	}
	return nil
}

func (server *MyPurposeServer) EditAction(ctx context.Context, request *pb.ActionRequest) (*pb.ActionResponse, error) {
	requestAction := &data.RequestAction{
		Id: request.Id,
		PurposeId: request.PurposeId,
		Description: request.Description,
		Period: request.Period,
		Date: request.Date,
		OrderNumber: int(request.OrderNumber),
	}
	responseAction, _  := server.ActionUseCase.Edit(requestAction)
	return &pb.ActionResponse{
		Id: responseAction.Id,
		PurposeId: responseAction.PurposeId,
		Description: responseAction.Description,
		Period: responseAction.Period,
		Date: responseAction.Date,
		OrderNumber: int32(responseAction.OrderNumber),
	}, nil
}

func (server *MyPurposeServer) CreateAction(ctx context.Context, request *pb.ActionRequest) (*pb.ActionResponse, error) {
	requestAction := &data.RequestAction{
		Id: request.Id,
		PurposeId: request.PurposeId,
		Description: request.Description,
		Period: request.Period,
		Date: request.Date,
		OrderNumber: int(request.OrderNumber),
	}
	responseAction, _  := server.ActionUseCase.Create(requestAction)
	return &pb.ActionResponse{
		Id: responseAction.Id,
		PurposeId: responseAction.PurposeId,
		Description: responseAction.Description,
		Period: responseAction.Period,
		Date: responseAction.Date,
		OrderNumber: int32(responseAction.OrderNumber),
	}, nil
}

func (server *MyPurposeServer) DeleteAction(ctx context.Context, request *pb.ActionRequest) (*pb.ActionResponse, error) {
	requestAction := &data.RequestAction{
		Id: request.Id,
		PurposeId: request.PurposeId,
		Description: request.Description,
		Period: request.Period,
		Date: request.Date,
		OrderNumber: int(request.OrderNumber),
	}
	responseAction, _  := server.ActionUseCase.Delete(requestAction)
	return &pb.ActionResponse{
		Id: responseAction.Id,
		PurposeId: responseAction.PurposeId,
		Description: responseAction.Description,
		Period: responseAction.Period,
		Date: responseAction.Date,
		OrderNumber: int32(responseAction.OrderNumber),
	}, nil
}

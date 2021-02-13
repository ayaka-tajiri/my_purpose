package controller

import (
	"context"
	"github.com/ayaka-tajiri/my_purpose/backend/internal/data"
	pb "github.com/ayaka-tajiri/my_purpose/backend/protocBuffer"
)

func (server *MyPurposeServer) IndexPurposes(request *pb.PurposeRequest, stream pb.MyPurpose_IndexPurposesServer) error {
	requestPurpose := &data.RequestPurpose{
		Id:          request.Id,
		UserId:      request.UserId,
		Description: request.Description,
	}
	responsePurpose, _ := server.PurposeUseCase.Index(requestPurpose)
	for _, purpose := range responsePurpose {
		if err := stream.Send(&pb.PurposeResponse{
			Id:          purpose.Id,
			Description: purpose.Description,
		}); err != nil {
			return err
		}
	}
	return nil
}

func (server *MyPurposeServer) ShowPurpose(ctx context.Context, request *pb.PurposeRequest) (*pb.PurposeResponse, error) {
	requestPurpose := &data.RequestPurpose{Id: request.Id}
	responsePurpose, _ := server.PurposeUseCase.Show(requestPurpose)
	return &pb.PurposeResponse{Id: responsePurpose.Id, Description: responsePurpose.Description}, nil
}

func (server *MyPurposeServer) CreatePurpose(ctx context.Context, request *pb.PurposeRequest) (*pb.PurposeResponse, error) {
	requestPurpose := &data.RequestPurpose{UserId: request.UserId, Description: request.Description}
	responsePuepose, _ := server.PurposeUseCase.Create(requestPurpose)
	return &pb.PurposeResponse{Id: responsePuepose.Id, Description: responsePuepose.Description}, nil
}

func (server *MyPurposeServer) EditPurpose(ctx context.Context, request *pb.PurposeRequest) (*pb.PurposeResponse, error) {
	requestPurpose := &data.RequestPurpose{Id: request.Id, Description: request.Description}
	responsePurpose, _ := server.PurposeUseCase.Edit(requestPurpose)
	return &pb.PurposeResponse{Id: responsePurpose.Id, Description: responsePurpose.Description}, nil
}

func (server *MyPurposeServer) DeletePurpose(ctx context.Context, request *pb.PurposeRequest) (*pb.PurposeResponse, error) {
	requestPurpose := &data.RequestPurpose{Id: request.Id}
	responsePurpose, _ := server.PurposeUseCase.Delete(requestPurpose)
	return &pb.PurposeResponse{Id: responsePurpose.Id, Description: responsePurpose.Description}, nil
}

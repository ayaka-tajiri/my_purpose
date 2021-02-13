package main

import (
	"context"
	"flag"
	pb "github.com/ayaka-tajiri/my_purpose/backend/protocBuffer"
	"io"
	"log"
	"time"

	"github.com/google/uuid"
	"google.golang.org/grpc"
)

var (
	serverAddr = flag.String("server_addr", "localhost:9090", "The server address in the format of host:port")
)

func printPurpose(client pb.MyPurposeClient, request *pb.PurposeRequest) {
	log.Printf("Getting purpose")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	response, err := client.ShowPurpose(ctx, request)
	if err != nil {
		log.Fatalf("%v.printPurpose(_) = _, %v: ", client, err)
	}
	log.Println(response)
}

func printAction(client pb.MyPurposeClient, request *pb.ActionRequest) {
	log.Printf("Getting action")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	stream, err := client.IndexActions(ctx, request)
	if err != nil {
		log.Fatalf("%v.printAction(_) = _, %v: ", client, err)
	}
	for {
		action, err := stream.Recv()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatalf("%v.printActions(_) = _, %v", client, err)
		}
		log.Println(action)
	}
}

func updatePurpose(client pb.MyPurposeClient, request *pb.PurposeRequest) {
	log.Printf("updating purpose")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	response, err := client.EditPurpose(ctx, request)
	if err != nil {
		log.Fatalf("%v.updatePurpose(_) = _, %v: ", client, err)
	}
	log.Println(response)
}

func updateAction(client pb.MyPurposeClient, request *pb.ActionRequest) {
	log.Printf("updating action")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	response, err := client.EditAction(ctx, request)
	if err != nil {
		log.Fatalf("%v.updateAction(_) = _, %v: ", client, err)
	}
	log.Println(response)
}

func createAction(client pb.MyPurposeClient, request *pb.ActionRequest) {
	log.Printf("creating action")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	response, err := client.CreateAction(ctx, request)
	if err != nil {
		log.Fatalf("%v.createAction(_) = _, %v: ", client, err)
	}
	log.Println(response)
}

func deleteAction(client pb.MyPurposeClient, request *pb.ActionRequest) {
	log.Printf("deleting action")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	response, err := client.DeleteAction(ctx, request)
	if err != nil {
		log.Fatalf("%v.createAction(_) = _, %v: ", client, err)
	}
	log.Println(response)
}

func printCalendars(client pb.MyPurposeClient, request *pb.CalendarRequest) {
	log.Printf("Getting calendars")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	stream, err := client.IndexCalendars(ctx, request)
	if err != nil {
		log.Fatalf("%v.printCalendars(_) = _, %v: ", client, err)
	}
	for {
		calendar, err := stream.Recv()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatalf("%v.printCalendars(_) = _, %v", client, err)
		}
		log.Println(calendar)
	}
}

func main() {
	var opts []grpc.DialOption
	opts = append(opts, grpc.WithInsecure())
	opts = append(opts, grpc.WithBlock())
	conn, err := grpc.Dial(*serverAddr, opts...)
	if err != nil {
		log.Fatalf("fail to dial: %v", err)
	}
	defer conn.Close()

	client := pb.NewMyPurposeClient(conn)

	// Looking for a valid feature
	printPurpose(client, &pb.PurposeRequest{Id: "6ae37258-1b55-4db0-82f2-b4467204ff3f"})
	printAction(client, &pb.ActionRequest{PurposeId: "6ae37258-1b55-4db0-82f2-b4467204ff3f"})
	updatePurpose(client, &pb.PurposeRequest{Id: "6ae37258-1b55-4db0-82f2-b4467204ff3f", Description: "ワーホリに行く"})
	updateAction(client, &pb.ActionRequest{Id: "a747c292-ef92-49fa-a5d3-661f9d9611a3", PurposeId: "6ae37258-1b55-4db0-82f2-b4467204ff3f", Description: "毎日単語を覚える", Period: "everyday", Date: "", OrderNumber: 1})
	uuid, _ := uuid.NewRandom()
	createAction(client, &pb.ActionRequest{Id: uuid.String(), PurposeId: "6ae37258-1b55-4db0-82f2-b4467204ff3f", Description: "頑張る", Period: "everyday", Date: "", OrderNumber: 100})
	deleteAction(client, &pb.ActionRequest{Id: uuid.String(), PurposeId: "6ae37258-1b55-4db0-82f2-b4467204ff3f", Description: "頑張る", Period: "everyday", Date: "", OrderNumber: 100})
	printCalendars(client, &pb.CalendarRequest{Month: "2021-01"})
}

package main

import (
	"flag"
	"fmt"
	"github.com/ayaka-tajiri/my_purpose/backend/cmd/controller"
	pb "github.com/ayaka-tajiri/my_purpose/backend/protocBuffer"
	"google.golang.org/grpc"
	"log"
	"net"
)

var (
	port = flag.Int("port", 9090, "The server port")
)

func main() {
	flag.Parse()
	// "localhost:%d"にすると、localhostからのアクセスのみになってしまう
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	grpcServer := grpc.NewServer()

	pb.RegisterMyPurposeServer(grpcServer, controller.NewMyPurposeServer())
	grpcServer.Serve(lis)
}

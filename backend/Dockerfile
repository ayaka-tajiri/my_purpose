FROM golang:1.15.8

ENV GO111MODULE=on

WORKDIR /go/src/github.com/ayaka-tajiri/my_purpose/backend

COPY . .
RUN pwd

RUN CGO_ENABLED=0 GOOS=linux go build -o my_purpose server/grpc_server.go

FROM alpine:3.13
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=0 /go/src/github.com/ayaka-tajiri/my_purpose/backend/my_purpose my_purpose
CMD ["./my_purpose"]
EXPOSE 9090

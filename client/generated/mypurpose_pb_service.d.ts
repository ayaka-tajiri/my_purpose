// package: my_purpose
// file: mypurpose.proto

import * as mypurpose_pb from "./mypurpose_pb";
import {grpc} from "@improbable-eng/grpc-web";

type MyPurposeIndexPurposes = {
  readonly methodName: string;
  readonly service: typeof MyPurpose;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof mypurpose_pb.PurposeRequest;
  readonly responseType: typeof mypurpose_pb.PurposeResponse;
};

type MyPurposeShowPurpose = {
  readonly methodName: string;
  readonly service: typeof MyPurpose;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof mypurpose_pb.PurposeRequest;
  readonly responseType: typeof mypurpose_pb.PurposeResponse;
};

type MyPurposeCreatePurpose = {
  readonly methodName: string;
  readonly service: typeof MyPurpose;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof mypurpose_pb.PurposeRequest;
  readonly responseType: typeof mypurpose_pb.PurposeResponse;
};

type MyPurposeEditPurpose = {
  readonly methodName: string;
  readonly service: typeof MyPurpose;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof mypurpose_pb.PurposeRequest;
  readonly responseType: typeof mypurpose_pb.PurposeResponse;
};

type MyPurposeDeletePurpose = {
  readonly methodName: string;
  readonly service: typeof MyPurpose;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof mypurpose_pb.PurposeRequest;
  readonly responseType: typeof mypurpose_pb.PurposeResponse;
};

type MyPurposeIndexActions = {
  readonly methodName: string;
  readonly service: typeof MyPurpose;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof mypurpose_pb.ActionRequest;
  readonly responseType: typeof mypurpose_pb.ActionResponse;
};

type MyPurposeEditAction = {
  readonly methodName: string;
  readonly service: typeof MyPurpose;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof mypurpose_pb.ActionRequest;
  readonly responseType: typeof mypurpose_pb.ActionResponse;
};

type MyPurposeCreateAction = {
  readonly methodName: string;
  readonly service: typeof MyPurpose;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof mypurpose_pb.ActionRequest;
  readonly responseType: typeof mypurpose_pb.ActionResponse;
};

type MyPurposeDeleteAction = {
  readonly methodName: string;
  readonly service: typeof MyPurpose;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof mypurpose_pb.ActionRequest;
  readonly responseType: typeof mypurpose_pb.ActionResponse;
};

type MyPurposeIndexCalendars = {
  readonly methodName: string;
  readonly service: typeof MyPurpose;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof mypurpose_pb.CalendarRequest;
  readonly responseType: typeof mypurpose_pb.CalendarResponse;
};

export class MyPurpose {
  static readonly serviceName: string;
  static readonly IndexPurposes: MyPurposeIndexPurposes;
  static readonly ShowPurpose: MyPurposeShowPurpose;
  static readonly CreatePurpose: MyPurposeCreatePurpose;
  static readonly EditPurpose: MyPurposeEditPurpose;
  static readonly DeletePurpose: MyPurposeDeletePurpose;
  static readonly IndexActions: MyPurposeIndexActions;
  static readonly EditAction: MyPurposeEditAction;
  static readonly CreateAction: MyPurposeCreateAction;
  static readonly DeleteAction: MyPurposeDeleteAction;
  static readonly IndexCalendars: MyPurposeIndexCalendars;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class MyPurposeClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  indexPurposes(requestMessage: mypurpose_pb.PurposeRequest, metadata?: grpc.Metadata): ResponseStream<mypurpose_pb.PurposeResponse>;
  showPurpose(
    requestMessage: mypurpose_pb.PurposeRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: mypurpose_pb.PurposeResponse|null) => void
  ): UnaryResponse;
  showPurpose(
    requestMessage: mypurpose_pb.PurposeRequest,
    callback: (error: ServiceError|null, responseMessage: mypurpose_pb.PurposeResponse|null) => void
  ): UnaryResponse;
  createPurpose(
    requestMessage: mypurpose_pb.PurposeRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: mypurpose_pb.PurposeResponse|null) => void
  ): UnaryResponse;
  createPurpose(
    requestMessage: mypurpose_pb.PurposeRequest,
    callback: (error: ServiceError|null, responseMessage: mypurpose_pb.PurposeResponse|null) => void
  ): UnaryResponse;
  editPurpose(
    requestMessage: mypurpose_pb.PurposeRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: mypurpose_pb.PurposeResponse|null) => void
  ): UnaryResponse;
  editPurpose(
    requestMessage: mypurpose_pb.PurposeRequest,
    callback: (error: ServiceError|null, responseMessage: mypurpose_pb.PurposeResponse|null) => void
  ): UnaryResponse;
  deletePurpose(
    requestMessage: mypurpose_pb.PurposeRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: mypurpose_pb.PurposeResponse|null) => void
  ): UnaryResponse;
  deletePurpose(
    requestMessage: mypurpose_pb.PurposeRequest,
    callback: (error: ServiceError|null, responseMessage: mypurpose_pb.PurposeResponse|null) => void
  ): UnaryResponse;
  indexActions(requestMessage: mypurpose_pb.ActionRequest, metadata?: grpc.Metadata): ResponseStream<mypurpose_pb.ActionResponse>;
  editAction(
    requestMessage: mypurpose_pb.ActionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: mypurpose_pb.ActionResponse|null) => void
  ): UnaryResponse;
  editAction(
    requestMessage: mypurpose_pb.ActionRequest,
    callback: (error: ServiceError|null, responseMessage: mypurpose_pb.ActionResponse|null) => void
  ): UnaryResponse;
  createAction(
    requestMessage: mypurpose_pb.ActionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: mypurpose_pb.ActionResponse|null) => void
  ): UnaryResponse;
  createAction(
    requestMessage: mypurpose_pb.ActionRequest,
    callback: (error: ServiceError|null, responseMessage: mypurpose_pb.ActionResponse|null) => void
  ): UnaryResponse;
  deleteAction(
    requestMessage: mypurpose_pb.ActionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: mypurpose_pb.ActionResponse|null) => void
  ): UnaryResponse;
  deleteAction(
    requestMessage: mypurpose_pb.ActionRequest,
    callback: (error: ServiceError|null, responseMessage: mypurpose_pb.ActionResponse|null) => void
  ): UnaryResponse;
  indexCalendars(requestMessage: mypurpose_pb.CalendarRequest, metadata?: grpc.Metadata): ResponseStream<mypurpose_pb.CalendarResponse>;
}


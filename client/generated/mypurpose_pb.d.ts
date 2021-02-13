// package: my_purpose
// file: mypurpose.proto

import * as jspb from "google-protobuf";

export class PurposeRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PurposeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PurposeRequest): PurposeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PurposeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PurposeRequest;
  static deserializeBinaryFromReader(message: PurposeRequest, reader: jspb.BinaryReader): PurposeRequest;
}

export namespace PurposeRequest {
  export type AsObject = {
    id: string,
    userId: string,
    description: string,
  }
}

export class PurposeResponse extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PurposeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PurposeResponse): PurposeResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PurposeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PurposeResponse;
  static deserializeBinaryFromReader(message: PurposeResponse, reader: jspb.BinaryReader): PurposeResponse;
}

export namespace PurposeResponse {
  export type AsObject = {
    id: string,
    userId: string,
    description: string,
  }
}

export class ActionRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getPurposeid(): string;
  setPurposeid(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getPeriod(): string;
  setPeriod(value: string): void;

  getDate(): string;
  setDate(value: string): void;

  getOrdernumber(): number;
  setOrdernumber(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ActionRequest): ActionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ActionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionRequest;
  static deserializeBinaryFromReader(message: ActionRequest, reader: jspb.BinaryReader): ActionRequest;
}

export namespace ActionRequest {
  export type AsObject = {
    id: string,
    purposeid: string,
    description: string,
    period: string,
    date: string,
    ordernumber: number,
  }
}

export class ActionResponse extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getPurposeid(): string;
  setPurposeid(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getPeriod(): string;
  setPeriod(value: string): void;

  getDate(): string;
  setDate(value: string): void;

  getOrdernumber(): number;
  setOrdernumber(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ActionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ActionResponse): ActionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ActionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ActionResponse;
  static deserializeBinaryFromReader(message: ActionResponse, reader: jspb.BinaryReader): ActionResponse;
}

export namespace ActionResponse {
  export type AsObject = {
    id: string,
    purposeid: string,
    description: string,
    period: string,
    date: string,
    ordernumber: number,
  }
}

export class CalendarRequest extends jspb.Message {
  getMonth(): string;
  setMonth(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CalendarRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CalendarRequest): CalendarRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CalendarRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CalendarRequest;
  static deserializeBinaryFromReader(message: CalendarRequest, reader: jspb.BinaryReader): CalendarRequest;
}

export namespace CalendarRequest {
  export type AsObject = {
    month: string,
    userId: string,
  }
}

export class CalendarResponse extends jspb.Message {
  getTitle(): string;
  setTitle(value: string): void;

  getStart(): string;
  setStart(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CalendarResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CalendarResponse): CalendarResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CalendarResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CalendarResponse;
  static deserializeBinaryFromReader(message: CalendarResponse, reader: jspb.BinaryReader): CalendarResponse;
}

export namespace CalendarResponse {
  export type AsObject = {
    title: string,
    start: string,
  }
}


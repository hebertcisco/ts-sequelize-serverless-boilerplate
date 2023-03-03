import { ISayHelloDTO } from "../dtos/ISayHelloDTO";

export interface SayHelloPayloadInterface {
  message: string;
}
export interface IResponseSayHello extends ISayHelloDTO {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface SayHelloExternalResponseInterface
  extends SayHelloPayloadInterface {}

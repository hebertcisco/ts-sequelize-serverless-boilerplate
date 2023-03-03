import { SayHelloPayloadInterface } from "../interfaces/say-hello-payload.interface";

export abstract class ISayHelloDTO implements SayHelloPayloadInterface {
  abstract message: string;
}

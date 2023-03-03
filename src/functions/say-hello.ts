import type { APIGatewayEvent, Handler } from "aws-lambda";

import SayHelloController from "../modules/say-hello/infra/http/controllers/SayHelloController";

export const handler: Handler = async (event: APIGatewayEvent) => {
  const sayHelloController = new SayHelloController();
  return sayHelloController.sayHello(event);
};

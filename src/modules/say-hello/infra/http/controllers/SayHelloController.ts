import type { APIGatewayEvent } from "aws-lambda";

import { Logger } from "../../../../../shared/utils/Logger";

import { SayHelloService } from "../../../services/SayHelloService";

import responseHandler from "../../../../../shared/helpers/responseHandler";

import type { IResponseHandlerReturn } from "../../../../../shared/helpers/responseHandler";
import { SayHelloPayloadInterface } from "../../../interfaces/say-hello-payload.interface";

export default class SayHelloController {
  private logger: Logger = new Logger({ context: SayHelloController.name });

  private sayHelloService: SayHelloService = new SayHelloService();

  public async sayHello(
    event: APIGatewayEvent
  ): Promise<IResponseHandlerReturn> {
    if (!event.body) {
      let message = "Invalid body request";
      this.logger.error(message);
      return responseHandler.createResponse({
        statusCode: 400,
        body: JSON.stringify({
          message,
        }),
      });
    }
    const record = event.body;

    const payload = JSON.parse(record) as SayHelloPayloadInterface;
    if (!payload.message) {
      let message = "Missing required fields";

      this.logger.error(message);
      return responseHandler.createResponse({
        statusCode: 400,
        body: JSON.stringify({
          message,
        }),
      });
    }

    const say_hello = await this.sayHelloService.execute(payload);

    this.logger.info(say_hello.message);

    return responseHandler.createResponse({
      statusCode: 200,
      body: JSON.stringify(say_hello),
    });
  }
}

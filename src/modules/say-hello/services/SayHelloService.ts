import * as crypto from "node:crypto";

import type { AxiosResponse } from "axios";

import sequelize from "../../../infra/database/sequelize";
import ApiBase from "../../../shared/base/ApiBase";

import type { ISayHelloDTO } from "../dtos/ISayHelloDTO";
import type {
  IResponseSayHello,
  SayHelloExternalResponseInterface,
} from "../interfaces/say-hello-payload.interface";

export class SayHelloService extends ApiBase {
  constructor() {
    super(process.env.EXTERNAL_API_BASE_URL, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.EXTERNAL_API_KEY,
      },
    });
  }

  private isSuccessfulResponse(response: AxiosResponse): boolean {
    return response.status >= 200 && response.status < 300;
  }

  public async execute({
    message,
  }: ISayHelloDTO): Promise<SayHelloExternalResponseInterface> {
    const nowRaw = await sequelize.query(`SELECT NOW();`);
    const now = String(nowRaw[0]);

    const responseSayHello: IResponseSayHello = {
      message,
      id: crypto.randomUUID(),
      createdAt: new Date(now),
      updatedAt: new Date(now),
    };
    const response: AxiosResponse<SayHelloExternalResponseInterface, any> =
      await this.post("/hello", responseSayHello);
    if (!response.data || !this.isSuccessfulResponse(response)) {
      throw new Error("Error on saying hello!");
    }
    return response.data;
  }
}

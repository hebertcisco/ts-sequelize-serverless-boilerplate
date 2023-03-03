import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

export class ApiBase {
  private api: AxiosInstance;
  constructor(
    private baseUrl: string,
    private config: AxiosRequestConfig<any> = {
      headers: {
        "Content-Type": "application/json",
      },
    }
  ) {
    this.api = axios.create({
      baseURL: this.baseUrl,
      headers: this.config.headers,
    });
  }
  public get<TypeConfig>(url: string, config?: AxiosRequestConfig<TypeConfig>) {
    return this.api.get(url, config);
  }

  public post(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<AxiosRequestConfig<any>>
  ) {
    return this.api.post(url, data, config);
  }
}
export default ApiBase;

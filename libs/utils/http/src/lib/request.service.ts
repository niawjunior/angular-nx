import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { APP_ENV_CONFIG } from '@recruit-supplier/app-config';

type RestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(
    @Inject(APP_ENV_CONFIG) private environment,
    private http: HttpClient
  ) {}
  async send<T>(
    method: RestMethod,
    path: string,
    body: any = null,
    params: any = {},
    { headers = {} as { [key: string]: string } } = {}
  ): Promise<T> {
    try {
      const serverUrl = this.environment.backendUrl;

      Object.keys(params).forEach(
        (key) =>
          (params[key] === undefined || params[key] === '') &&
          delete params[key]
      );

      const response = await this.http
        .request<T>(method, `${serverUrl}/${path}`, {
          body,
          headers,
          params,
        })
        .toPromise();
      return response;
    } catch (e) {
      throw new HttpErrorResponse(e);
    }
  }
}

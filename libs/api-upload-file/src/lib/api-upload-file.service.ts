import { Injectable } from '@angular/core';

import { RequestService } from '@recruit-supplier/utils/http';
import { IUploadFileResponse } from './api-upload-file.model';

@Injectable({
  providedIn: 'root',
})
export class ApiUploadFileService {
  constructor(private http: RequestService) {}

  async uploadFile(params: FormData) {
    return await this.http.send<IUploadFileResponse>(
      `POST`,
      `api/upload`,
      params
    );
  }
}

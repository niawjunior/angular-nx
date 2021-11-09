export interface IUploadFileResponse {
  data: {
    name: string;
    size: string;
    mimeType: string;
    path: string;
    url: string;
  };
}

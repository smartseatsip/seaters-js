import { ServerResponse } from './request-driver';

export enum ERROR_TYPE {
  CLIENT, SERVER, LIBRARY
}

export interface ApiError {
  rawResponse: ServerResponse;
  type: ERROR_TYPE;
  error: string;
  errorMsg: string;
  fields?: [{
    field: string,
    error: string,
    errorMsg: string
  }];
}

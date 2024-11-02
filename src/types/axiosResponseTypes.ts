export interface IErrorAxiosResponse {
  response: null;
  meta: IMeta;
}

export interface IMeta {
  error: IError | string | null;
  datetime: number;
}

export interface IError {
  message: string;
  code: number;
}

export type ResponseError = {
  message: string;
  code?: string;
};

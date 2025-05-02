export interface IResponseBase {
    statusCode: number;
    message: string;
    payload: any;
    error: boolean;
    timestamp?: string;
    path?: string;
  }
  
  export interface IErrorResponseBase extends Omit<IResponseBase, 'payload'> {}
  
class ErrorResponse {
  private _error: IErrorResponseBase | undefined;

  constructor(error: IErrorResponseBase) {
    this._error = error;
  }

  public toJSON() {
    let eMessage = '';
    if (this._error?.message && typeof this._error.message === 'string') {
      eMessage = this._error?.message ?? '';
    } else {
      // @ts-ignore
      eMessage = this._error.message.message.join();
    }

    return { error: { ...this._error, message: eMessage }, ok: false };
  }
}

class SuccessResponse<T = IResponseBase> {
  private _data: T;
  constructor(data: T) {
    this._data = data;
  }

  public toJSON() {
    return { data: { ...this._data }, ok: true };
  }
}

export default class ResponseBuilder {
  public static success<T>(data: T) {
    if (typeof data === 'string')
      return new SuccessResponse({
        error: false,
        message: 'Data Fetch Successful',
        payload: data,
        statusCode: 200
      });

    return new SuccessResponse(data);
  }

  public static error(err: IErrorResponseBase) {
    return new ErrorResponse(err);
  }
}

export interface IMeta {
  pageCount: number;
  total: number;
  page: number;
  limit: number;
}

export interface IResponseBase {
  error: boolean;
  message: string | string[];
  statusCode: number;
  timestamp?: number;
  path?: string | string[] | Record<string, unknown>;
  meta?: IMeta;
}

export interface IErrorResponse extends Omit<IResponseBase, "meta"> {
  stack?: string;
}

export interface IResponse<T = unknown> extends IResponseBase {
  payload: T;
}

export interface IErrorResponseJSON
  extends Omit<IResponse<undefined>, "meta">,
    IErrorResponse {
  error: true;
}

export interface ISuccessResponseJSON<T> extends IResponse<T> {
  error: false;
}

type TOptionBase = Partial<Omit<IResponseBase, "error" | "timestamp">>;
type TErrorOptionBase = Partial<Omit<IErrorResponse, "error" | "timestamp">>;

export class SuccessResponse<T = unknown> {
  private _options: IResponseBase = {
    error: false,
    message: "Data retrieved successfully!",
    statusCode: 200,
    timestamp: Date.now(),
    path: "",
  };

  private _payload: T;

  constructor(payload: T, options?: TOptionBase) {
    this._payload = payload;
    this._options = {
      error: false,
      message: options?.message ?? "Data retrieved successfully!",
      path: options?.path ?? "",
      statusCode: options?.statusCode ?? 200,
      timestamp: Date.now(),
      meta: options?.meta,
    };
  }

  toJSON(): ISuccessResponseJSON<T> {
    return {
      payload: this._payload,
      error: false,
      message: this._options.message,
      path: this._options.path,
      statusCode: this._options.statusCode,
      timestamp: this._options.timestamp,
      meta: this._options.meta,
    };
  }

  static fromJSON<T = unknown>(json: IResponse<T>) {
    return new SuccessResponse<T>(json.payload, json);
  }
}

export class ErrorResponse {
  private _options: IErrorResponse = {
    error: true,
    message: "Failed to process your request!",
    path: "",
    statusCode: 500,
    timestamp: Date.now(),
    stack: "",
  };
  constructor(options?: TErrorOptionBase) {
    // code
    this._options = {
      error: true,
      message: options?.message ?? "Failed to process your request!",
      path: options?.path ?? "",
      statusCode: options?.statusCode ?? 500,
      timestamp: Date.now(),
      stack: options?.stack ?? "",
    };
  }

  toJSON(): IErrorResponseJSON {
    return {
      payload: undefined,
      error: true,
      message: this._options.message,
      path: this._options.path,
      statusCode: this._options.statusCode,
      timestamp: this._options.timestamp,
      stack: this._options.stack,
    };
  }

  static fromJSON(json: IResponse<undefined>) {
    return new ErrorResponse(json);
  }
}

export class ResponseBuilder {
  static success<T = unknown>(json: IResponse<T>) {
    const data = SuccessResponse.fromJSON(json);
    return data.toJSON();
  }

  static error(json: IResponse<undefined>) {
    const data = ErrorResponse.fromJSON(json);
    return data.toJSON();
  }
}

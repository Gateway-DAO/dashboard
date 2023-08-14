export interface ErrorResponse<T = any> {
  response: {
    errors?: ErrorsEntity[] | null;
    status: number;
    headers: {
      map: Record<string, any>;
    };
  };
  request: {
    query: string;
    variables: T;
  };
}

export interface ErrorsEntity {
  extensions: {
    path: string;
    code: string | number;
  };
  message: string;
}

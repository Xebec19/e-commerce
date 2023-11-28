export interface INullableString {
  String: string;
  Valid: boolean;
}

export interface INullableInt32 {
  Int32: number;
  Valid: boolean;
}

export interface INullableTimestamp {
  Time: string;
  Valid: boolean;
}

export interface IResponse {
  message: string;
  status: boolean;
}

export type ListResponse<T> = T[];

export interface ApiError {
  erro?: string;
  error?: string;
  erros?: Array<{
    path: Array<string | number>;
    message: string;
  }>;
}

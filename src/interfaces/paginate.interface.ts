export interface PaginatedResponse<TypeEntity> extends ErrorResponse {
  items: TypeEntity[];
  meta: Meta;
}

export interface ErrorResponse {
  error?: {
    message: string;
    code: string;
  };
}

interface Meta {
  quantityItems: number;
}

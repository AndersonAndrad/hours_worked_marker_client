export interface PaginatedRequest {
  page: number;
  itemsPerPage: number;
}

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
export interface Meta {
  quantityItems: number;
  totalPages: number;
}
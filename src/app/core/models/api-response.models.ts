export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  errors?: string[];
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiError {
  message: string;
  code: number;
  details?: any;
}
export interface IPageAbleConfig {
  PageSize: number;
  PageNumber: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  keyword?: string;
}

export interface ITableParams {
  isLoading: boolean;
  total?: number;
  pageSize?: number;
  currentPage?: number;
}

export interface IPageAbleResponse<T> {
  data: T[];
  succeeded: true;
  errors?: string[];
  message: string;
  pageNumber: number;
  pageSize: number;
  firstPage: string;
  lastPage: string;
  totalPages: number;
  totalRecords: number;
  nextPage: string;
  previousPage: string;
}

export interface IResponseData<T> {
  data: T;
}

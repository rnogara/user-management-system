export interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export interface UpdateUserRequest {
  name?: string;
  password?: string;
  currentPassword?: string;
  role?: 'admin' | 'user';
}

export interface UpdateProfileRequest {
  name?: string;
  password?: string;
  currentPassword?: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface QueryParams {
  page: number;
  limit: number;
  search?: string;
  role?: 'admin' | 'user';
  sortBy?: 'name' | 'createdAt';
  order?: 'asc' | 'desc';
}

export interface UserListResponse {
  data: User[];
  total: number;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
  expiresAt: Date;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  acceptTerms: boolean;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileImage?: string;
  roles: string[];
  isActive: boolean;
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface TokenClaims {
  sub: string;
  email: string;
  roles: string[];
  exp: number;
  iat: number;
}
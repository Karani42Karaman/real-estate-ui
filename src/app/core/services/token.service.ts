import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';
import { TokenClaims } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private getStorage(): Storage | null {
    return typeof localStorage !== 'undefined' ? localStorage : null;
  }

  setToken(token: string): void {
    const storage = this.getStorage();
    if (!storage) return;
    storage.setItem(environment.tokenKey, token);
  }

  getToken(): string | null {
    const storage = this.getStorage();
    return storage ? storage.getItem(environment.tokenKey) : null;
  }

  setRefreshToken(refreshToken: string): void {
    const storage = this.getStorage();
    if (!storage) return;
    storage.setItem(environment.refreshTokenKey, refreshToken);
  }

  getRefreshToken(): string | null {
    const storage = this.getStorage();
    return storage ? storage.getItem(environment.refreshTokenKey) : null;
  }

  removeTokens(): void {
    const storage = this.getStorage();
    if (!storage) return;
    storage.removeItem(environment.tokenKey);
    storage.removeItem(environment.refreshTokenKey);
  }

  decodeToken(): TokenClaims | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<TokenClaims>(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  isTokenExpired(): boolean {
    const tokenClaims = this.decodeToken();
    if (!tokenClaims) return true;

    const currentTime = Date.now() / 1000;
    return tokenClaims.exp < currentTime;
  }

  getTokenExpirationDate(): Date | null {
    const tokenClaims = this.decodeToken();
    if (!tokenClaims) return null;

    return new Date(tokenClaims.exp * 1000);
  }

  getUserRoles(): string[] {
    const tokenClaims = this.decodeToken();
    return tokenClaims?.roles || [];
  }

  hasRole(role: string): boolean {
    const roles = this.getUserRoles();
    return roles.includes(role);
  }

  getUserId(): string | null {
    const tokenClaims = this.decodeToken();
    return tokenClaims?.sub || null;
  }

  getUserEmail(): string | null {
    const tokenClaims = this.decodeToken();
    return tokenClaims?.email || null;
  }
}
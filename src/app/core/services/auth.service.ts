import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';
import { NotificationService } from './notification.service';
import { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  User
} from '../models/auth.models';
import { ApiResponse } from '../models/api-response.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.initializeUser();
  }

  private initializeUser(): void {
    const token = this.tokenService.getToken();
    if (token && !this.tokenService.isTokenExpired()) {
      this.getUserProfile().subscribe({
        next: (user) => this.currentUserSubject.next(user),
        error: () => this.logout()
      });
    }
  }

  login(loginData: LoginRequest): Observable<LoginResponse> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.apiUrl}/login`, loginData)
      .pipe(
        map(response => response.data),
        tap(loginResponse => {
          this.tokenService.setToken(loginResponse.token);
          this.tokenService.setRefreshToken(loginResponse.refreshToken);
          this.currentUserSubject.next(loginResponse.user);
          this.notificationService.showSuccess('Başarıyla giriş yapıldı!');
        }),
        catchError(this.handleError)
      );
  }

  register(registerData: RegisterRequest): Observable<User> {
    return this.http.post<ApiResponse<User>>(`${this.apiUrl}/register`, registerData)
      .pipe(
        map(response => response.data),
        tap(() => {
          this.notificationService.showSuccess('Kayıt başarıyla tamamlandı! Lütfen giriş yapın.');
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    this.tokenService.removeTokens();
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
    this.notificationService.showInfo('Başarıyla çıkış yapıldı.');
  }

  refreshToken(): Observable<LoginResponse> {
    const refreshToken = this.tokenService.getRefreshToken();
    
    return this.http.post<ApiResponse<LoginResponse>>(`${this.apiUrl}/refresh-token`, 
      { refreshToken })
      .pipe(
        map(response => response.data),
        tap(loginResponse => {
          this.tokenService.setToken(loginResponse.token);
          this.tokenService.setRefreshToken(loginResponse.refreshToken);
        }),
        catchError(() => {
          this.logout();
          return throwError(() => new Error('Token refresh failed'));
        })
      );
  }

  forgotPassword(email: string): Observable<void> {
    return this.http.post<ApiResponse<void>>(`${this.apiUrl}/forgot-password`, { email })
      .pipe(
        map(response => response.data),
        tap(() => {
          this.notificationService.showSuccess('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.');
        }),
        catchError(this.handleError)
      );
  }

  resetPassword(token: string, newPassword: string): Observable<void> {
    return this.http.post<ApiResponse<void>>(`${this.apiUrl}/reset-password`, 
      { token, newPassword })
      .pipe(
        map(response => response.data),
        tap(() => {
          this.notificationService.showSuccess('Şifreniz başarıyla değiştirildi.');
        }),
        catchError(this.handleError)
      );
  }

  getUserProfile(): Observable<User> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/profile`)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  updateProfile(profileData: Partial<User>): Observable<User> {
    return this.http.put<ApiResponse<User>>(`${this.apiUrl}/profile`, profileData)
      .pipe(
        map(response => response.data),
        tap(updatedUser => {
          this.currentUserSubject.next(updatedUser);
          this.notificationService.showSuccess('Profil başarıyla güncellendi.');
        }),
        catchError(this.handleError)
      );
  }

  changePassword(currentPassword: string, newPassword: string): Observable<void> {
    return this.http.post<ApiResponse<void>>(`${this.apiUrl}/change-password`, 
      { currentPassword, newPassword })
      .pipe(
        map(response => response.data),
        tap(() => {
          this.notificationService.showSuccess('Şifreniz başarıyla değiştirildi.');
        }),
        catchError(this.handleError)
      );
  }

  // Utility methods
  isAuthenticated(): boolean {
    const token = this.tokenService.getToken();
    return token !== null && !this.tokenService.isTokenExpired();
  }

  hasRole(role: string): boolean {
    return this.tokenService.hasRole(role);
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some(role => this.hasRole(role));
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private handleError = (error: any) => {
    console.error('Auth Service Error:', error);
    let errorMessage = 'Bir hata oluştu. Lütfen tekrar deneyin.';
    
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    this.notificationService.showError(errorMessage);
    return throwError(() => new Error(errorMessage));
  };
}
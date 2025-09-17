import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();

    if (token && !this.isAuthRequest(req)) {
      req = this.addTokenToRequest(req, token);
    }

    return next.handle(req).pipe(
      catchError(error => {
        if (error.status === 401 && !this.isAuthRequest(req) && !this.isRefreshing) {
          return this.handleUnauthorized(req, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addTokenToRequest(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private isAuthRequest(req: HttpRequest<any>): boolean {
    return req.url.includes('/auth/login') || 
           req.url.includes('/auth/register') || 
           req.url.includes('/auth/refresh-token');
  }

  private handleUnauthorized(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      return this.authService.refreshToken().pipe(
        switchMap(() => {
          this.isRefreshing = false;
          const newToken = this.tokenService.getToken();
          if (newToken) {
            const newReq = this.addTokenToRequest(req, newToken);
            return next.handle(newReq);
          }
          this.authService.logout();
          return throwError(() => new Error('Token refresh failed'));
        }),
        catchError(() => {
          this.isRefreshing = false;
          this.authService.logout();
          return throwError(() => new Error('Token refresh failed'));
        })
      );
    }

    return throwError(() => new Error('Request failed due to authentication'));
  }
}
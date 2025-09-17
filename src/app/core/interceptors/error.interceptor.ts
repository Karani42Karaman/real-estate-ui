import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(() => error);
      })
    );
  }

  private handleError(error: HttpErrorResponse): void {
    let errorMessage = 'Bir hata oluştu';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Hata: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = 'Geçersiz istek';
          break;
        case 401:
          errorMessage = 'Yetkilendirme hatası';
          break;
        case 403:
          errorMessage = 'Erişim reddedildi';
          break;
        case 404:
          errorMessage = 'Kaynak bulunamadı';
          break;
        case 500:
          errorMessage = 'Sunucu hatası';
          break;
        default:
          errorMessage = `Hata kodu: ${error.status}`;
      }

      if (error.error?.message) {
        errorMessage = error.error.message;
      }
    }

    if (error.status !== 401) { // 401 errors are handled by AuthInterceptor
      this.notificationService.showError(errorMessage);
    }
  }
}
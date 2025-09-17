import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.checkAuth(route);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): boolean {
    return this.checkAuth(childRoute);
  }

  private checkAuth(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      // Check if route requires specific roles
      const requiredRoles = route.data?.['roles'] as string[];
      
      if (requiredRoles && requiredRoles.length > 0) {
        if (!this.authService.hasAnyRole(requiredRoles)) {
          this.notificationService.showError('Bu sayfaya erişim yetkiniz yok.');
          this.router.navigate(['/']);
          return false;
        }
      }
      
      return true;
    }

    this.notificationService.showWarning('Lütfen giriş yapın.');
    this.router.navigate(['/auth/login'], {
      queryParams: { returnUrl: route.url.join('/') }
    });
    return false;
  }
}

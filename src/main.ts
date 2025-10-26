import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
 // Routes import
import { routes } from './app/app.routes'; // Routes import edildi
import 'zone.js';  // ← BU SATIRLA BAŞLAMALI (en üstte)

// Diğer import'lar...
import { AuthInterceptor } from './app/core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './app/core/interceptors/error.interceptor';
import { LoadingInterceptor } from './app/core/interceptors/loading.interceptor';
import { AuthService } from './app/core/services/auth.service';
import { TokenService } from './app/core/services/token.service';
import { NotificationService } from './app/core/services/notification.service';
import { LoadingService } from './app/core/services/loading.service';
import { PropertyService } from './app/features/property/services/property.service';
import { AuthGuard } from './app/core/guards/auth.guard';
import { RoleGuard } from './app/core/guards/role.guard';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule,
      HttpClientModule,
      ReactiveFormsModule,
      FormsModule,
      RouterModule.forRoot(routes) // Import edilen routes kullanıldı
    ),
    
    // Services
    AuthService,
    TokenService,
    NotificationService,
    LoadingService,
    PropertyService,
    
    // Guards
    AuthGuard,
    RoleGuard,
    
    // HTTP Interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ]
}).catch(err => console.error(err));
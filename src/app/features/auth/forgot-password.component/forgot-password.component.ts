import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  isLoading = false;
  isEmailSent = false;
  emailSentTo = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.forgotPasswordForm = this.createForgotPasswordForm();
  }

  ngOnInit(): void {
    // Eğer kullanıcı zaten giriş yapmışsa ana sayfaya yönlendir
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  private createForgotPasswordForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      this.markFormGroupTouched(this.forgotPasswordForm);
      return;
    }

    this.isLoading = true;
    const email = this.forgotPasswordForm.value.email;

    this.authService.forgotPassword(email).subscribe({
      next: () => {
        this.isLoading = false;
        this.isEmailSent = true;
        this.emailSentTo = email;
        this.notificationService.showSuccess('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi!');
      },
      error: (error) => {
        this.isLoading = false;
        this.notificationService.showError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
    });
  }

  onResendEmail(): void {
    if (this.emailSentTo) {
      this.isLoading = true;
      
      this.authService.forgotPassword(this.emailSentTo).subscribe({
        next: () => {
          this.isLoading = false;
          this.notificationService.showSuccess('E-posta yeniden gönderildi!');
        },
        error: () => {
          this.isLoading = false;
          this.notificationService.showError('E-posta gönderilemedi. Lütfen tekrar deneyin.');
        }
      });
    }
  }

  onBackToForm(): void {
    this.isEmailSent = false;
    this.emailSentTo = '';
    this.forgotPasswordForm.reset();
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.forgotPasswordForm.get(fieldName);
    
    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return 'E-posta adresi zorunludur';
    }

    if (control.errors['email']) {
      return 'Geçerli bir e-posta adresi giriniz';
    }

    return '';
  }

  // Demo için e-posta önerileri
  onDemoEmail(email: string): void {
    this.forgotPasswordForm.patchValue({ email });
    this.notificationService.showInfo('Demo e-posta adresi yüklendi.');
  }
}
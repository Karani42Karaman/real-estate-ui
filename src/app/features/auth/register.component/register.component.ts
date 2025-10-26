import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  currentStep = 1;
  totalSteps = 2;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private loadingService: LoadingService,
    private router: Router
  ) {
    this.registerForm = this.createRegisterForm();
  }

  ngOnInit(): void {
    // Eğer kullanıcı zaten giriş yapmışsa ana sayfaya yönlendir
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  private createRegisterForm(): FormGroup {
    return this.formBuilder.group({
      // Step 1 - Kişisel Bilgiler
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
      
      // Step 2 - Güvenlik
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]],
      acceptMarketing: [false]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Custom validator - şifre eşleşmesi kontrolü
  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get email() { return this.registerForm.get('email'); }
  get phoneNumber() { return this.registerForm.get('phoneNumber'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get acceptTerms() { return this.registerForm.get('acceptTerms'); }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  nextStep(): void {
    // Step 1 alanlarını kontrol et
    const step1Fields = ['firstName', 'lastName', 'email', 'phoneNumber'];
    let isStep1Valid = true;

    step1Fields.forEach(fieldName => {
      const field = this.registerForm.get(fieldName);
      field?.markAsTouched();
      if (field?.invalid) {
        isStep1Valid = false;
      }
    });

    if (isStep1Valid) {
      this.currentStep = 2;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.notificationService.showWarning('Lütfen tüm zorunlu alanları doldurun.');
    }
  }

  previousStep(): void {
    this.currentStep = 1;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.markFormGroupTouched(this.registerForm);
      return;
    }

    this.isLoading = true;
    const registerData = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      phoneNumber: this.registerForm.value.phoneNumber,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
      acceptTerms: this.registerForm.value.acceptTerms
    };

    this.authService.register(registerData).subscribe({
      next: () => {
        this.isLoading = false;
        this.notificationService.showSuccess('Kayıt başarıyla tamamlandı! Giriş yapabilirsiniz.');
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        this.isLoading = false;
        this.notificationService.showError('Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      }
    });
  }

  onDemoFill(): void {
    this.registerForm.patchValue({
      firstName: 'Demo',
      lastName: 'Kullanıcı',
      email: 'demo' + Date.now() + '@emlaknet.com',
      phoneNumber: '05551234567',
      password: 'demo123456',
      confirmPassword: 'demo123456',
      acceptTerms: true,
      acceptMarketing: false
    });
    this.notificationService.showInfo('Demo veriler yüklendi.');
  }

  formatPhoneNumber(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    
    // 0 ile başlamıyorsa ekle
    if (value.length > 0 && !value.startsWith('0')) {
      value = '0' + value;
    }
    
    // Maksimum 11 karakter (05XXXXXXXXX)
    if (value.length > 11) {
      value = value.substring(0, 11);
    }
    
    // Format: 0555 123 45 67
    if (value.length > 4) {
      value = value.substring(0, 4) + ' ' + value.substring(4);
    }
    if (value.length > 8) {
      value = value.substring(0, 8) + ' ' + value.substring(8);
    }
    if (value.length > 11) {
      value = value.substring(0, 11) + ' ' + value.substring(11);
    }
    
    this.registerForm.patchValue({ phoneNumber: value.replace(/\s/g, '') });
    event.target.value = value;
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
    const control = this.registerForm.get(fieldName);
    
    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return 'Bu alan zorunludur';
    }

    if (control.errors['email']) {
      return 'Geçerli bir e-posta adresi giriniz';
    }

    if (control.errors['minlength']) {
      const minLength = control.errors['minlength'].requiredLength;
      return `En az ${minLength} karakter olmalıdır`;
    }

    if (control.errors['pattern']) {
      if (fieldName === 'phoneNumber') {
        return 'Geçerli bir telefon numarası giriniz (örn: 05551234567)';
      }
    }

    if (fieldName === 'confirmPassword' && this.registerForm.errors?.['passwordMismatch']) {
      return 'Şifreler eşleşmiyor';
    }

    return '';
  }

  getPasswordStrength(): { strength: string; color: string; width: string } {
    const password = this.password?.value || '';
    let strength = 0;

    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;

    if (strength <= 1) {
      return { strength: 'Zayıf', color: '#ff6b6b', width: '20%' };
    } else if (strength <= 3) {
      return { strength: 'Orta', color: '#ffd93d', width: '60%' };
    } else {
      return { strength: 'Güçlü', color: '#6bcf7f', width: '100%' };
    }
  }
}
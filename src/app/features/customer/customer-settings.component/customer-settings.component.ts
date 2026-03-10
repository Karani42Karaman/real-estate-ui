import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

function passwordMatchValidator(control: AbstractControl) {
  const parent = control.parent;
  if (!parent) return null;
  const password = parent.get('newPassword')?.value;
  return control.value === password ? null : { mismatch: true };
}

@Component({
  selector: 'app-customer-settings',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './customer-settings.component.html',
  styleUrls: ['./customer-settings.component.scss']
})
export class CustomerSettingsComponent implements OnInit {

  isMobileSidebarOpen = false;
  activeSection: 'security' | 'notifications' | 'subscription' | 'danger' = 'security';

  // Password form
  passwordForm!: FormGroup;
  showCurrentPw = false;
  showNewPw = false;
  showConfirmPw = false;
  isSavingPw = false;
  pwSuccess = false;
  pwError = '';

  // Notification settings
  notifications = {
    emailNewMessage: true,
    emailFavorite: true,
    emailPromotion: false,
    emailWeeklyReport: true,
    smsNewMessage: false,
    smsAdStatus: true,
    pushNewMessage: true,
    pushFavorite: false,
    pushAdStatus: true
  };
  isSavingNotif = false;
  notifSuccess = false;

  // Subscription
  currentPlan = 'Ücretsiz';
  planExpiry: Date | null = null;
  adCredits = 3;

  plans = [
    {
      id: 'free',
      name: 'Ücretsiz',
      price: '0 ₺',
      period: '',
      isCurrent: true,
      features: ['3 ilan hakkı', 'Standart listeleme', 'Temel destek'],
      color: '#64748b'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '299 ₺',
      period: '/ay',
      isCurrent: false,
      features: ['20 ilan hakkı', 'Öne çıkan ilanlar', 'Öncelikli destek', 'Detaylı istatistikler'],
      color: '#5B4FE8',
      badge: 'Popüler'
    },
    {
      id: 'business',
      name: 'İşletme',
      price: '799 ₺',
      period: '/ay',
      isCurrent: false,
      features: ['Sınırsız ilan', 'VIP listeleme', '7/24 destek', 'API erişimi', 'Marka sayfası'],
      color: '#f59e0b',
      badge: 'En İyi Değer'
    }
  ];

  // Danger zone
  showDeactivateModal = false;
  showDeleteModal = false;
  deleteConfirmText = '';
  isDeleting = false;

  currentUser = {
    name: 'Kullanıcı Adı',
    email: 'kullanici@emlaknet.com',
    initials: 'KA'
  };

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      ]],
      confirmPassword: ['', [Validators.required, passwordMatchValidator]]
    });

    this.passwordForm.get('newPassword')?.valueChanges.subscribe(() => {
      this.passwordForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  get passwordStrength(): { level: number; label: string; color: string } {
    const val = this.passwordForm.get('newPassword')?.value || '';
    let level = 0;
    if (val.length >= 8) level++;
    if (/[A-Z]/.test(val)) level++;
    if (/[0-9]/.test(val)) level++;
    if (/[^a-zA-Z0-9]/.test(val)) level++;

    if (level <= 1) return { level, label: 'Zayıf', color: '#ef4444' };
    if (level === 2) return { level, label: 'Orta', color: '#f59e0b' };
    if (level === 3) return { level, label: 'Güçlü', color: '#3b82f6' };
    return { level, label: 'Çok Güçlü', color: '#10b981' };
  }

  savePassword(): void {
    this.pwError = '';
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }
    this.isSavingPw = true;
    setTimeout(() => {
      this.isSavingPw = false;
      this.pwSuccess = true;
      this.passwordForm.reset();
      setTimeout(() => this.pwSuccess = false, 3000);
    }, 1200);
  }

  saveNotifications(): void {
    this.isSavingNotif = true;
    setTimeout(() => {
      this.isSavingNotif = false;
      this.notifSuccess = true;
      setTimeout(() => this.notifSuccess = false, 2500);
    }, 800);
  }

  selectPlan(planId: string): void {
    console.log('Plan seçildi:', planId);
    // Ödeme sayfasına yönlendir
  }

  deactivateAccount(): void {
    this.showDeactivateModal = false;
    // API call
  }

  deleteAccount(): void {
    if (this.deleteConfirmText !== 'HESABIMI SİL') return;
    this.isDeleting = true;
    setTimeout(() => {
      this.router.navigate(['/auth/login']);
    }, 1500);
  }

  get canDelete(): boolean {
    return this.deleteConfirmText === 'HESABIMI SİL';
  }

  toggleMobileSidebar(): void { this.isMobileSidebarOpen = !this.isMobileSidebarOpen; }
  closeMobileSidebar(): void { this.isMobileSidebarOpen = false; }
  logout(): void { this.router.navigate(['/auth/login']); }
}
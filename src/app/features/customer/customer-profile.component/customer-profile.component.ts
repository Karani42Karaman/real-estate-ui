import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {

  isMobileSidebarOpen = false;
  activeTab: 'info' | 'stats' | 'reviews' = 'info';
  isSaving = false;
  saveSuccess = false;
  avatarPreview: string | null = null;

  profileForm!: FormGroup;

  stats = {
    totalAds: 12,
    activeAds: 8,
    soldRented: 4,
    totalViews: 3240,
    favoriteCount: 87,
    avgResponseTime: '2 saat',
    memberSince: 'Mart 2023',
    responseRate: 94
  };

  reviews = [
    { id: 1, name: 'Mehmet Y.', initials: 'MY', rating: 5, comment: 'Çok ilgili ve dürüst bir satıcı, dairenin durumu ilanla birebir aynıydı. Kesinlikle tavsiye ederim.', date: new Date('2025-01-10'), propertyTitle: 'Kadıköy 3+1 Daire' },
    { id: 2, name: 'Ayşe K.', initials: 'AK', rating: 5, comment: 'Hızlı iletişim, soruları eksiksiz yanıtladı. Süreç çok sorunsuz ilerledi.', date: new Date('2024-12-20'), propertyTitle: 'Beşiktaş 2+1 Kiralık' },
    { id: 3, name: 'Can D.', initials: 'CD', rating: 4, comment: 'Genel olarak memnunum. Küçük eksiklikler vardı ama satıcı hemen çözdü.', date: new Date('2024-11-15'), propertyTitle: 'Çankaya Villa' },
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['Karim', [Validators.required, Validators.minLength(2)]],
      lastName: ['Abdo', [Validators.required, Validators.minLength(2)]],
      email: ['kullanici@emlaknet.com', [Validators.required, Validators.email]],
      phone: ['0532 123 45 67', [Validators.pattern(/^[0-9\s\+\-\(\)]{10,15}$/)]],
      city: ['İstanbul'],
      district: ['Kadıköy'],
      bio: ['Gayrimenkul sektöründe 5 yıldır aktif olarak yer alıyorum. Konut ve ticari mülk konularında deneyimliyim.'],
      whatsapp: [true],
      showPhone: [true],
      showEmail: [false]
    });
  }

  get avgRating(): number {
    if (this.reviews.length === 0) return 0;
    return this.reviews.reduce((s, r) => s + r.rating, 0) / this.reviews.length;
  }

  get fullName(): string {
    const f = this.profileForm.get('firstName')?.value || '';
    const l = this.profileForm.get('lastName')?.value || '';
    return `${f} ${l}`.trim();
  }

  get initials(): string {
    const f = this.profileForm.get('firstName')?.value || '';
    const l = this.profileForm.get('lastName')?.value || '';
    return `${f.charAt(0)}${l.charAt(0)}`.toUpperCase();
  }

  onFileSelect(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => { this.avatarPreview = e.target?.result as string; };
    reader.readAsDataURL(file);
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    this.isSaving = true;
    setTimeout(() => {
      this.isSaving = false;
      this.saveSuccess = true;
      setTimeout(() => this.saveSuccess = false, 3000);
    }, 1200);
  }

  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  toggleMobileSidebar(): void { this.isMobileSidebarOpen = !this.isMobileSidebarOpen; }
  closeMobileSidebar(): void { this.isMobileSidebarOpen = false; }
  logout(): void { this.router.navigate(['/auth/login']); }
}
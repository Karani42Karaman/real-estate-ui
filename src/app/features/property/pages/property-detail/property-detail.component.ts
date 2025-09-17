import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Property, PropertyPriceType } from '../../models/property.models';
import { PropertyService } from '../../services/property.service';
import { AuthService } from '../../../../core/services/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { PropertyMapComponent } from '../../components/property-map/property-map.component';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule, PropertyMapComponent],
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
  property$: Observable<Property | null>;
  loading = true;
  error = false;

  PropertyPriceType = PropertyPriceType;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.property$ = of(null);
  }

  ngOnInit(): void {
    const propertyId = this.route.snapshot.paramMap.get('id');
    if (propertyId) {
      this.loadProperty(+propertyId);
    } else {
      this.error = true;
      this.loading = false;
    }
  }

  private loadProperty(id: number): void {
    this.loading = true;
    this.error = false;

    this.property$ = this.propertyService.getProperty(id).pipe(
      map(property => {
        this.loading = false;
        return property;
      }),
      catchError(error => {
        console.error('Error loading property:', error);
        this.loading = false;
        this.error = true;
        this.notificationService.showError('İlan yüklenirken hata oluştu.');
        return of(null);
      })
    );
  }

  formatPrice(price: number, type: PropertyPriceType): string {
    const formatted = new Intl.NumberFormat('tr-TR').format(price);
    switch (type) {
      case PropertyPriceType.Rent:
        return `${formatted} ₺/ay`;
      case PropertyPriceType.DailyRent:
        return `${formatted} ₺/gün`;
      default:
        return `${formatted} ₺`;
    }
  }

  formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getPropertyTypeLabel(type: string): string {
    const typeLabels: Record<string, string> = {
      'apartment': 'Daire',
      'house': 'Müstakil Ev',
      'villa': 'Villa',
      'office': 'Ofis',
      'shop': 'Dükkan',
      'land': 'Arsa',
      'warehouse': 'Depo'
    };
    return typeLabels[type] || type;
  }

  getHeatingTypeLabel(type: string): string {
    const heatingLabels: Record<string, string> = {
      'central': 'Merkezi',
      'natural': 'Doğalgaz',
      'electric': 'Elektrik',
      'coal': 'Kömür',
      'solar': 'Güneş Enerjisi'
    };
    return heatingLabels[type] || type;
  }

  onContactOwner(property: Property): void {
    if (!this.authService.isAuthenticated()) {
      this.notificationService.showWarning('İletişim bilgilerini görmek için giriş yapmalısınız.');
      return;
    }

    // Show contact information
    const contactInfo = `
      İletişim Bilgileri:
      Ad: ${property.owner.firstName} ${property.owner.lastName}
      Telefon: ${property.owner.phoneNumber}
      E-posta: ${property.owner.email}
    `;
    
    this.notificationService.showInfo(contactInfo);
  }

  onAddToFavorites(property: Property): void {
    if (!this.authService.isAuthenticated()) {
      this.notificationService.showWarning('Favorilere eklemek için giriş yapmalısınız.');
      return;
    }

    this.propertyService.addToFavorites(property.id).subscribe({
      next: () => {
        this.notificationService.showSuccess('İlan favorilere eklendi!');
      },
      error: () => {
        this.notificationService.showError('Favorilere eklenirken hata oluştu.');
      }
    });
  }

  onShareProperty(property: Property): void {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: property.description,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        this.notificationService.showSuccess('Link panoya kopyalandı!');
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}

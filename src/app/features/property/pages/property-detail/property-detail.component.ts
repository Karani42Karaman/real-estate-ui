import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Property, PropertyPriceType, PropertyType } from '../../models/property.models';
import { PropertyService } from '../../services/property.service';
import { AuthService } from '../../../../core/services/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { PropertyMapComponent } from '../../components/property-map/property-map.component';
import { FooterComponent } from '../../../../shared/components/footer-component/footer-component';
@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule, PropertyMapComponent, FooterComponent],
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit, OnDestroy {
  property$: Observable<Property | null>;
  property: Property | null = null;
  loading = true;
  error = false;
  private subscription: Subscription = new Subscription();

  PropertyPriceType = PropertyPriceType;
  PropertyType = PropertyType;

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
    // Route parametrelerini dinle
    this.subscription.add(
      this.route.paramMap.subscribe(params => {
        const propertyId = params.get('id');
        console.log('Property detail component loaded with ID:', propertyId);
        if (propertyId) {
          // Doğrudan mock veri yükle
          this.loadMockProperty(+propertyId);
        } else {
          this.error = true;
          this.loading = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
        // Mock veri yükle
        this.loadMockProperty(id);
        return of(null);
      })
    );
  }

  private loadMockProperty(id: number): void {
    console.log('Loading mock property with ID:', id);
    const now = new Date();
    const mockProperties = [
      {
        id: 1,
        title: 'Lüks 3+1 Daire',
        description: 'Merkezi konumda, modern tasarım. Bağdat Caddesi üzerinde, deniz manzaralı, asansörlü, güvenlikli site içerisinde. Bu daire, şehrin en prestijli bölgelerinden birinde yer almakta olup, deniz manzarası ve şehir manzarasını bir arada sunmaktadır. Modern mimari anlayışla tasarlanmış olan bu daire, konforlu yaşam için gerekli tüm detayları içermektedir.',
        price: 850000,
        priceType: PropertyPriceType.Sale,
        propertyType: PropertyType.Apartment,
        status: 'active' as any,
        address: {
          street: 'Bağdat Caddesi No:123',
          district: 'Kadıköy',
          city: 'İstanbul',
          country: 'Türkiye',
          postalCode: '34710',
          coordinates: { latitude: 40.9923, longitude: 29.0244 }
        },
        details: { rooms: 3, bedrooms: 3, bathrooms: 2, area: 120, floor: 5, totalFloors: 10, buildYear: 2015, balconyCount: 2, parkingSpaces: 1, furnished: false, heating: 'central' as any, elevator: true },
        features: [
          { id: 1, name: 'Asansör', category: 'comfort' as any },
          { id: 2, name: 'Güvenlik', category: 'security' as any },
          { id: 3, name: 'Deniz Manzarası', category: 'location' as any },
          { id: 4, name: 'Balkon', category: 'comfort' as any },
          { id: 5, name: 'Otopark', category: 'comfort' as any }
        ],
        images: [
          { id: 1, url: '/assets/images/property1-1.jpg', thumbnailUrl: '/assets/images/property1-1-thumb.jpg', caption: 'Salon', isPrimary: true, order: 1 },
          { id: 2, url: '/assets/images/property1-2.jpg', thumbnailUrl: '/assets/images/property1-2-thumb.jpg', caption: 'Yatak Odası', isPrimary: false, order: 2 },
          { id: 3, url: '/assets/images/property1-3.jpg', thumbnailUrl: '/assets/images/property1-3-thumb.jpg', caption: 'Mutfak', isPrimary: false, order: 3 }
        ],
        owner: { id: 1, firstName: 'Ali', lastName: 'Yılmaz', phoneNumber: '0555 000 00 00', email: 'ali@example.com' },
        agent: undefined,
        statistics: { viewCount: 245, favoriteCount: 12, contactCount: 8 },
        isActive: true,
        isFeatured: true,
        isVip: true,
        createdAt: new Date(now.getTime() - 2 * 86400000),
        updatedAt: now
      },
      {
        id: 2,
        title: 'Deniz Manzaralı Villa',
        description: 'Geniş bahçeli, özel havuzlu, deniz manzaralı lüks villa. Çırağan Sarayı yakınında, prestijli konumda. Bu villa, Boğaz manzarasına sahip olup, özel havuzu ve geniş bahçesi ile lüks yaşamın tüm gereksinimlerini karşılamaktadır.',
        price: 1250000,
        priceType: PropertyPriceType.Sale,
        propertyType: PropertyType.Villa,
        status: 'active' as any,
        address: {
          street: 'Çırağan Caddesi No:45',
          district: 'Beşiktaş',
          city: 'İstanbul',
          country: 'Türkiye',
          postalCode: '34349',
          coordinates: { latitude: 41.0439, longitude: 29.0084 }
        },
        details: { rooms: 4, bedrooms: 4, bathrooms: 3, area: 200, floor: 2, totalFloors: 2, buildYear: 2018, balconyCount: 3, parkingSpaces: 2, furnished: true, heating: 'central' as any, elevator: false },
        features: [
          { id: 4, name: 'Özel Havuz', category: 'comfort' as any },
          { id: 5, name: 'Bahçe', category: 'comfort' as any },
          { id: 6, name: 'Deniz Manzarası', category: 'location' as any },
          { id: 7, name: 'Güvenlik', category: 'security' as any }
        ],
        images: [
          { id: 4, url: '/assets/images/property2-1.jpg', thumbnailUrl: '/assets/images/property2-1-thumb.jpg', caption: 'Villa Dış Görünüm', isPrimary: true, order: 1 },
          { id: 5, url: '/assets/images/property2-2.jpg', thumbnailUrl: '/assets/images/property2-2-thumb.jpg', caption: 'Havuz', isPrimary: false, order: 2 },
          { id: 6, url: '/assets/images/property2-3.jpg', thumbnailUrl: '/assets/images/property2-3-thumb.jpg', caption: 'Salon', isPrimary: false, order: 3 }
        ],
        owner: { id: 2, firstName: 'Ayşe', lastName: 'Demir', phoneNumber: '0555 111 11 11', email: 'ayse@example.com' },
        agent: undefined,
        statistics: { viewCount: 189, favoriteCount: 23, contactCount: 15 },
        isActive: true,
        isFeatured: true,
        isVip: false,
        createdAt: new Date(now.getTime() - 1 * 86400000),
        updatedAt: now
      },
      {
        id: 3,
        title: 'Modern 2+1 Daire',
        description: 'Toplu ulaşıma yakın, modern tasarım, temiz ve bakımlı daire. Metro ve otobüs duraklarına 5 dakika yürüme mesafesi. Bu daire, şehrin merkezinde yer almakta olup, ulaşım imkanları açısından oldukça avantajlıdır.',
        price: 625000,
        priceType: PropertyPriceType.Sale,
        propertyType: PropertyType.Apartment,
        status: 'active' as any,
        address: {
          street: 'Halaskargazi Caddesi No:78',
          district: 'Şişli',
          city: 'İstanbul',
          country: 'Türkiye',
          postalCode: '34371',
          coordinates: { latitude: 41.0603, longitude: 28.9877 }
        },
        details: { rooms: 2, bedrooms: 2, bathrooms: 1, area: 95, floor: 7, totalFloors: 12, buildYear: 2012, balconyCount: 1, parkingSpaces: 1, furnished: false, heating: 'central' as any, elevator: true },
        features: [
          { id: 8, name: 'Asansör', category: 'comfort' as any },
          { id: 9, name: 'Toplu Ulaşım', category: 'location' as any },
          { id: 10, name: 'Güvenlik', category: 'security' as any }
        ],
        images: [
          { id: 7, url: '/assets/images/property3-1.jpg', thumbnailUrl: '/assets/images/property3-1-thumb.jpg', caption: 'Salon', isPrimary: true, order: 1 },
          { id: 8, url: '/assets/images/property3-2.jpg', thumbnailUrl: '/assets/images/property3-2-thumb.jpg', caption: 'Yatak Odası', isPrimary: false, order: 2 }
        ],
        owner: { id: 3, firstName: 'Mehmet', lastName: 'Kaya', phoneNumber: '0555 222 22 22', email: 'mehmet@example.com' },
        agent: undefined,
        statistics: { viewCount: 156, favoriteCount: 8, contactCount: 5 },
        isActive: true,
        isFeatured: false,
        isVip: false,
        createdAt: new Date(now.getTime() - 3 * 86400000),
        updatedAt: now
      },
      {
        id: 4,
        title: 'Merkezi Konum Ofis',
        description: 'İş yaşamının kalbinde, Levent finans merkezinde, modern ofis. Toplu ulaşıma çok yakın, prestijli adres. Bu ofis, İstanbul\'un finans merkezinde yer almakta olup, iş dünyasının kalbinde konumlanmıştır.',
        price: 8500,
        priceType: PropertyPriceType.Rent,
        propertyType: PropertyType.Office,
        status: 'active' as any,
        address: {
          street: 'Büyükdere Caddesi No:156',
          district: 'Levent',
          city: 'İstanbul',
          country: 'Türkiye',
          postalCode: '34394',
          coordinates: { latitude: 41.0779, longitude: 29.0064 }
        },
        details: { rooms: 0, bedrooms: 0, bathrooms: 2, area: 150, floor: 10, totalFloors: 20, buildYear: 2010, balconyCount: 0, parkingSpaces: 2, furnished: true, heating: 'central' as any, elevator: true },
        features: [
          { id: 11, name: 'Merkezi Konum', category: 'location' as any },
          { id: 12, name: 'Eşyalı', category: 'comfort' as any },
          { id: 13, name: 'Otopark', category: 'comfort' as any }
        ],
        images: [
          { id: 9, url: '/assets/images/property4-1.jpg', thumbnailUrl: '/assets/images/property4-1-thumb.jpg', caption: 'Ofis Görünümü', isPrimary: true, order: 1 },
          { id: 10, url: '/assets/images/property4-2.jpg', thumbnailUrl: '/assets/images/property4-2-thumb.jpg', caption: 'Toplantı Odası', isPrimary: false, order: 2 }
        ],
        owner: { id: 4, firstName: 'Selin', lastName: 'Aksoy', phoneNumber: '0555 333 33 33', email: 'selin@example.com' },
        agent: undefined,
        statistics: { viewCount: 98, favoriteCount: 5, contactCount: 3 },
        isActive: true,
        isFeatured: false,
        isVip: false,
        createdAt: new Date(now.getTime() - 5 * 86400000),
        updatedAt: now
      }
    ];

    const property = mockProperties.find(p => p.id === id);
    if (property) {
      console.log('Mock property found:', property.title);
      this.property = property;
      this.property$ = of(property);
      this.loading = false;
      this.error = false;
    } else {
      console.log('Mock property not found for ID:', id);
      this.loading = false;
      this.error = true;
      this.notificationService.showError('İlan bulunamadı.');
    }
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
  karani(): void {
    console.log('Karanı button clicked');
    alert('Karanı button clicked');
  }
  goBack(): void {
    console.log('Navigating back to home page');
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}

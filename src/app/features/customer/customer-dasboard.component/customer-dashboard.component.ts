import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { PropertyService } from '../../property/services/property.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Property, PropertyStatus } from '../../property/models/property.models';
import { User } from '../../../core/models/auth.models';
import { Observable } from 'rxjs';

interface DashboardStats {
  totalProperties: number;
  activeProperties: number;
  soldProperties: number;
  totalViews: number;
  totalFavorites: number;
  totalContacts: number;
}

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnInit {
  currentUser$: Observable<User | null>;
  currentUser: User | null = null;
  myProperties: Property[] = [];
  filteredProperties: Property[] = [];
  loading = false;
  
  stats: DashboardStats = {
    totalProperties: 0,
    activeProperties: 0,
    soldProperties: 0,
    totalViews: 0,
    totalFavorites: 0,
    totalContacts: 0
  };

  activeTab: 'all' | 'active' | 'sold' | 'inactive' = 'all';
  selectedProperty: Property | null = null;
  showDeleteModal = false;
  isMobileSidebarOpen = false;

  constructor(
    private authService: AuthService,
    private propertyService: PropertyService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadMyProperties();
      }
    });
  }

  loadMyProperties(): void {
    this.loading = true;
    
    // Mock data - gerçek uygulamada propertyService.getMyProperties() kullanılacak
    this.loadMockProperties();
    
    /* Gerçek API çağrısı:
    this.propertyService.getMyProperties().subscribe({
      next: (properties) => {
        this.myProperties = properties;
        this.filteredProperties = properties;
        this.calculateStats();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notificationService.showError('İlanlar yüklenirken hata oluştu.');
      }
    });
    */
  }

  private loadMockProperties(): void {
    const now = new Date();
    this.myProperties = [
      {
        id: 1,
        title: 'Lüks 3+1 Daire',
        description: 'Merkezi konumda, modern tasarım',
        price: 850000,
        priceType: 'sale' as any,
        propertyType: 'apartment' as any,
        status: 'active' as any,
        address: {
          street: 'Bağdat Caddesi No:123',
          district: 'Kadıköy',
          city: 'İstanbul',
          country: 'Türkiye',
          postalCode: '34710',
          coordinates: { latitude: 40.9923, longitude: 29.0244 }
        },
        details: { 
          rooms: 3, bedrooms: 3, bathrooms: 2, area: 120, 
          floor: 5, totalFloors: 10, buildYear: 2015, 
          balconyCount: 2, parkingSpaces: 1, furnished: false, 
          heating: 'central' as any, elevator: true 
        },
        features: [],
        images: [],
        owner: { id: 1, firstName: 'Ali', lastName: 'Yılmaz', phoneNumber: '0555 000 00 00', email: 'ali@example.com' },
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
        description: 'Geniş bahçeli, özel havuzlu',
        price: 1250000,
        priceType: 'sale' as any,
        propertyType: 'villa' as any,
        status: 'active' as any,
        address: {
          street: 'Çırağan Caddesi No:45',
          district: 'Beşiktaş',
          city: 'İstanbul',
          country: 'Türkiye',
          postalCode: '34349',
          coordinates: { latitude: 41.0439, longitude: 29.0084 }
        },
        details: { 
          rooms: 4, bedrooms: 4, bathrooms: 3, area: 200, 
          floor: 2, totalFloors: 2, buildYear: 2018, 
          balconyCount: 3, parkingSpaces: 2, furnished: true, 
          heating: 'central' as any, elevator: false 
        },
        features: [],
        images: [],
        owner: { id: 1, firstName: 'Ali', lastName: 'Yılmaz', phoneNumber: '0555 000 00 00', email: 'ali@example.com' },
        statistics: { viewCount: 189, favoriteCount: 23, contactCount: 15 },
        isActive: true,
        isFeatured: false,
        isVip: false,
        createdAt: new Date(now.getTime() - 5 * 86400000),
        updatedAt: now
      },
      {
        id: 3,
        title: 'Merkezi Konum Ofis',
        description: 'İş yaşamının kalbinde',
        price: 8500,
        priceType: 'rent' as any,
        propertyType: 'office' as any,
        status: 'sold' as any,
        address: {
          street: 'Büyükdere Caddesi No:156',
          district: 'Levent',
          city: 'İstanbul',
          country: 'Türkiye',
          postalCode: '34394',
          coordinates: { latitude: 41.0779, longitude: 29.0064 }
        },
        details: { 
          rooms: 0, bedrooms: 0, bathrooms: 2, area: 150, 
          floor: 10, totalFloors: 20, buildYear: 2010, 
          balconyCount: 0, parkingSpaces: 2, furnished: true, 
          heating: 'central' as any, elevator: true 
        },
        features: [],
        images: [],
        owner: { id: 1, firstName: 'Ali', lastName: 'Yılmaz', phoneNumber: '0555 000 00 00', email: 'ali@example.com' },
        statistics: { viewCount: 98, favoriteCount: 5, contactCount: 3 },
        isActive: false,
        isFeatured: false,
        isVip: false,
        createdAt: new Date(now.getTime() - 10 * 86400000),
        updatedAt: new Date(now.getTime() - 3 * 86400000)
      }
    ];
    
    this.filteredProperties = this.myProperties;
    this.calculateStats();
    this.loading = false;
  }

  private calculateStats(): void {
    this.stats.totalProperties = this.myProperties.length;
    this.stats.activeProperties = this.myProperties.filter(p => p.status === 'active').length;
    this.stats.soldProperties = this.myProperties.filter(p => p.status === 'sold' || p.status === 'rented').length;
    this.stats.totalViews = this.myProperties.reduce((sum, p) => sum + p.statistics.viewCount, 0);
    this.stats.totalFavorites = this.myProperties.reduce((sum, p) => sum + p.statistics.favoriteCount, 0);
    this.stats.totalContacts = this.myProperties.reduce((sum, p) => sum + p.statistics.contactCount, 0);
  }

  filterProperties(status: 'all' | 'active' | 'sold' | 'inactive'): void {
    this.activeTab = status;
    
    if (status === 'all') {
      this.filteredProperties = this.myProperties;
    } else if (status === 'active') {
      this.filteredProperties = this.myProperties.filter(p => p.status === 'active');
    } else if (status === 'sold') {
      this.filteredProperties = this.myProperties.filter(p => p.status === 'sold' || p.status === 'rented');
    } else if (status === 'inactive') {
      this.filteredProperties = this.myProperties.filter(p => p.status === 'inactive');
    }
  }

  editProperty(property: Property): void {
    this.router.navigate(['/customer/properties/edit', property.id]);
  }

  viewProperty(property: Property): void {
    this.router.navigate(['/property', property.id]);
  }

  confirmDelete(property: Property): void {
    this.selectedProperty = property;
    this.showDeleteModal = true;
  }

  deleteProperty(): void {
    if (!this.selectedProperty) return;
    
    this.propertyService.deleteProperty(this.selectedProperty.id).subscribe({
      next: () => {
        this.notificationService.showSuccess('İlan başarıyla silindi.');
        this.myProperties = this.myProperties.filter(p => p.id !== this.selectedProperty!.id);
        this.filterProperties(this.activeTab);
        this.calculateStats();
        this.closeDeleteModal();
      },
      error: () => {
        this.notificationService.showError('İlan silinirken hata oluştu.');
      }
    });
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.selectedProperty = null;
  }

  togglePropertyStatus(property: Property): void {
    const newStatus = property.isActive ? 'inactive' : 'active';
    
    // Mock implementation
    property.isActive = !property.isActive;
    property.status = newStatus as any;
    this.notificationService.showSuccess(
      property.isActive ? 'İlan aktif edildi.' : 'İlan pasif edildi.'
    );
    this.calculateStats();
    
    /* Gerçek API çağrısı:
    this.propertyService.updateProperty(property.id, { status: newStatus }).subscribe({
      next: () => {
        property.isActive = !property.isActive;
        property.status = newStatus;
        this.notificationService.showSuccess(
          property.isActive ? 'İlan aktif edildi.' : 'İlan pasif edildi.'
        );
        this.calculateStats();
      },
      error: () => {
        this.notificationService.showError('Durum değiştirilirken hata oluştu.');
      }
    });
    */
  }

  createNewProperty(): void {
    this.router.navigate(['/customer/properties/create']);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('tr-TR').format(price) + ' ₺';
  }

  formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'active': 'Aktif',
      'sold': 'Satıldı',
      'rented': 'Kiralandı',
      'pending': 'Beklemede',
      'inactive': 'Pasif'
    };
    return labels[status] || status;
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      'active': 'status-active',
      'sold': 'status-sold',
      'rented': 'status-rented',
      'pending': 'status-pending',
      'inactive': 'status-inactive'
    };
    return classes[status] || '';
  }

  logout(): void {
    this.authService.logout();
  }

  toggleMobileSidebar(): void {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }

  closeMobileSidebar(): void {
    this.isMobileSidebarOpen = false;
  }
}
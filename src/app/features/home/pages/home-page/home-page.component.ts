import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../../../../core/services/auth.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { NotificationService, Notification } from '../../../../core/services/notification.service';
import { PropertyService } from '../../../property/services/property.service';
import {
  Property,
  PropertySearchFilter,
  PropertyPriceType,
  PropertyType,
  PropertySortBy,
  SortOrder
} from '../../../property/models/property.models';
import { User } from '../../../../core/models/auth.models';
import { FeaturedPropertiesComponent } from '../../components/featured-properties/featured-properties.component';

interface City {
  id: string;
  name: string;
  districts: District[];
}

interface District {
  id: string;
  name: string;
}

interface PropertyTypeOption {
  id: string;
  name: string;
}

interface Stats {
  activeListings: number;
  happyCustomers: number;
  cities: number;
  support: string;
}

type PriceOption = { value: number | ''; label: string };

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FeaturedPropertiesComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  currentUser$: Observable<User | null>;
  loading$: Observable<boolean>;
  notifications$: Observable<Notification[]>;

  searchForm: FormGroup;
  activeTab: PropertyPriceType = PropertyPriceType.Sale;
  isMobileMenuOpen = false;

  properties: Property[] = [];
  filteredProperties: Property[] = [];
  cities: City[] = [];
  propertyTypes: PropertyTypeOption[] = [];

  priceRanges: Record<PropertyPriceType, PriceOption[]> = {
    [PropertyPriceType.Sale]: [
      { value: '', label: 'Min Fiyat' },
      { value: 100000, label: '100.000 ₺' },
      { value: 250000, label: '250.000 ₺' },
      { value: 500000, label: '500.000 ₺' },
      { value: 750000, label: '750.000 ₺' },
      { value: 1000000, label: '1.000.000 ₺' },
      { value: 2000000, label: '2.000.000 ₺' },
      { value: 5000000, label: '5.000.000 ₺' }
    ],
    [PropertyPriceType.Rent]: [
      { value: '', label: 'Min Fiyat' },
      { value: 2000, label: '2.000 ₺' },
      { value: 5000, label: '5.000 ₺' },
      { value: 8000, label: '8.000 ₺' },
      { value: 12000, label: '12.000 ₺' },
      { value: 20000, label: '20.000 ₺' },
      { value: 30000, label: '30.000 ₺' }
    ],
    [PropertyPriceType.DailyRent]: [
      { value: '', label: 'Min Fiyat' },
      { value: 100, label: '100 ₺' },
      { value: 200, label: '200 ₺' },
      { value: 300, label: '300 ₺' },
      { value: 500, label: '500 ₺' },
      { value: 1000, label: '1.000 ₺' }
    ]
  };

  stats: Stats = {
    activeListings: 12543,
    happyCustomers: 8421,
    cities: 156,
    support: '24/7'
  };

  currentPage = 1;
  pageSize = 12;
  totalPages = 0;
  hasNextPage = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private propertyService: PropertyService,
    private loadingService: LoadingService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.searchForm = this.createSearchForm();
    this.currentUser$ = this.authService.currentUser$;
    this.loading$ = this.loadingService.loading$;
    this.notifications$ = this.notificationService.notifications$;
  }

  ngOnInit(): void {
    this.initializeData();
    this.loadMockProperties(); // Doğrudan mock verileri yükle
  }

  private createSearchForm(): FormGroup {
    return this.formBuilder.group({
      city: [''],
      district: [''],
      propertyType: [''],
      minPrice: [''],
      maxPrice: [''],
      minArea: [''],
      maxArea: [''],
      rooms: ['']
    });
  }

  private initializeData(): void {
    this.cities = [
      {
        id: 'istanbul',
        name: 'İstanbul',
        districts: [
          { id: 'kadikoy', name: 'Kadıköy' },
          { id: 'besiktas', name: 'Beşiktaş' },
          { id: 'sisli', name: 'Şişli' },
          { id: 'levent', name: 'Levent' },
          { id: 'uskudar', name: 'Üsküdar' },
          { id: 'beyoglu', name: 'Beyoğlu' },
          { id: 'fatih', name: 'Fatih' },
          { id: 'bakirkoy', name: 'Bakırköy' }
        ]
      },
      {
        id: 'ankara',
        name: 'Ankara',
        districts: [
          { id: 'cankaya', name: 'Çankaya' },
          { id: 'kizilay', name: 'Kızılay' },
          { id: 'ulus', name: 'Ulus' },
          { id: 'bahcelievler', name: 'Bahçelievler' }
        ]
      },
      {
        id: 'izmir',
        name: 'İzmir',
        districts: [
          { id: 'alsancak', name: 'Alsancak' },
          { id: 'konak', name: 'Konak' },
          { id: 'bornova', name: 'Bornova' },
          { id: 'karsiyaka', name: 'Karşıyaka' }
        ]
      },
      {
        id: 'bursa',
        name: 'Bursa',
        districts: [
          { id: 'nilufer', name: 'Nilüfer' },
          { id: 'osmangazi', name: 'Osmangazi' },
          { id: 'yildirim', name: 'Yıldırım' }
        ]
      },
      {
        id: 'antalya',
        name: 'Antalya',
        districts: [
          { id: 'muratpasa', name: 'Muratpaşa' },
          { id: 'konyaalti', name: 'Konyaaltı' },
          { id: 'kepez', name: 'Kepez' }
        ]
      }
    ];

    this.propertyTypes = [
      { id: PropertyType.Apartment, name: 'Daire' },
      { id: PropertyType.House, name: 'Müstakil Ev' },
      { id: PropertyType.Villa, name: 'Villa' },
      { id: PropertyType.Office, name: 'Ofis' },
      { id: PropertyType.Shop, name: 'Dükkan' },
      { id: PropertyType.Land, name: 'Arsa' },
      { id: PropertyType.Warehouse, name: 'Depo' }
    ];
  }

  private loadProperties(): void {
    const filter: PropertySearchFilter = this.buildSearchFilter();

    this.propertyService.getProperties(filter).subscribe({
      next: (response) => {
        this.properties = response.data;
        this.filteredProperties = [...this.properties];
        this.totalPages = response.totalPages;
        this.hasNextPage = response.hasNextPage;
        this.updateStats();
      },
      error: () => {
        // Mock verileri yükle
        this.loadMockProperties();
        this.notificationService.showInfo('Demo veriler gösteriliyor.');
      }
    });
  }

  private loadMockProperties(): void {
    const now = new Date();
    this.properties = [
      {
        id: 1,
        title: 'Lüks 3+1 Daire',
        description: 'Merkezi konumda, modern tasarım. Bağdat Caddesi üzerinde, deniz manzaralı, asansörlü, güvenlikli site içerisinde.',
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
          { id: 3, name: 'Deniz Manzarası', category: 'location' as any }
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
        description: 'Geniş bahçeli, özel havuzlu, deniz manzaralı lüks villa. Çırağan Sarayı yakınında, prestijli konumda.',
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
        description: 'Toplu ulaşıma yakın, modern tasarım, temiz ve bakımlı daire. Metro ve otobüs duraklarına 5 dakika yürüme mesafesi.',
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
        description: 'İş yaşamının kalbinde, Levent finans merkezinde, modern ofis. Toplu ulaşıma çok yakın, prestijli adres.',
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
    
    this.filteredProperties = [...this.properties];
    this.totalPages = 1;
    this.hasNextPage = false;
    this.updateStats();
  }

  private buildSearchFilter(): PropertySearchFilter {
    const formValues = this.searchForm.value;
    return {
      priceType: this.activeTab,
      city: formValues.city || undefined,
      district: formValues.district || undefined,
      propertyType: formValues.propertyType ? [formValues.propertyType] : undefined,
      minPrice: formValues.minPrice || undefined,
      maxPrice: formValues.maxPrice || undefined,
      minArea: formValues.minArea || undefined,
      maxArea: formValues.maxArea || undefined,
      rooms: formValues.rooms ? [formValues.rooms] : undefined,
      page: this.currentPage,
      pageSize: this.pageSize,
      sortBy: PropertySortBy.Date,
      sortOrder: SortOrder.Desc
    };
  }

  setActiveTab(tabName: PropertyPriceType): void {
    this.activeTab = tabName;
    this.currentPage = 1;
    this.resetSearchForm();
    this.loadMockProperties(); // Mock verileri yükle
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      this.currentPage = 1;
      this.loadMockProperties(); // Mock verileri yükle
    }
  }

  openProperty(property: Property): void {
    console.log('Navigating to property:', property.id);
    console.log('Property object:', property);
    debugger;
    this.router.navigate(['/property', property.id]).then(success => {
      console.log('Navigation success:', success);
    }).catch(error => {
      console.error('Navigation error:', error);
    });
  }

  contactProperty(property: Property): void {
    if (!this.authService.isAuthenticated()) {
      this.notificationService.showWarning('İletişim bilgilerini görmek için giriş yapmalısınız.');
      return;
    }
    this.notificationService.showSuccess('İletişim bilgileri gösterilecek.');
  }

  toggleFavorite(property: Property): void {
    if (!this.authService.isAuthenticated()) {
      this.notificationService.showWarning('Favorilere eklemek için giriş yapmalısınız.');
      return;
    }
    this.notificationService.showSuccess('Favorilere eklendi/çıkarıldı.');
  }

  loadMoreProperties(): void {
    if (this.hasNextPage) {
      this.currentPage++;
      this.loadMockProperties(); // Mock verileri yükle
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
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - dateObj.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 1) return '1 gün önce';
    if (diffDays < 30) return `${diffDays} gün önce`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} ay önce`;
    return `${Math.ceil(diffDays / 365)} yıl önce`;
  }

  getDistrictsByCity(cityId: string): District[] {
    const city = this.cities.find(c => c.id === cityId);
    return city ? city.districts : [];
  }

  getCurrentPriceRanges() {
    return this.priceRanges[this.activeTab] || [];
  }

  private resetSearchForm(): void {
    this.searchForm.reset();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  onCityChange(): void {
    const cityId = this.searchForm.get('city')?.value;
    if (cityId) {
      this.searchForm.patchValue({ district: '' });
    }
  }

  navigateToSection(section: string): void {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  login(): void { }
  logout(): void { this.authService.logout(); }

  trackByPropertyId(index: number, item: Property): number { return item.id; }

  private updateStats(): void { this.stats.activeListings = this.properties.length; }

  getPropertyTypeLabel(type: PropertyType): string {
    const typeOption = this.propertyTypes.find(pt => pt.id === type);
    return typeOption?.name || (type as string);
  }

  public PropertyPriceTypeEnum = PropertyPriceType;

  getBadge(p: Property): string | null {
    if (p.isVip) return 'VIP';
    if (p.isFeatured) return 'YENİ';
    if (p.priceType === PropertyPriceType.Rent) return 'KİRALIK';
    return null;
  }
}



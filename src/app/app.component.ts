import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './core/services/auth.service';
import { LoadingService } from './core/services/loading.service';
import { NotificationService, Notification } from './core/services/notification.service';
import { PropertyService } from './features/property/services/property.service';
import { 
  Property, 
  PropertySearchFilter, 
  PropertyPriceType, 
  PropertyType,
  PropertySortBy,
  SortOrder
} from './features/property/models/property.models';
import { User } from './core/models/auth.models';

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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  // Observables
  currentUser$: Observable<User | null>;
  loading$: Observable<boolean>;
  notifications$: Observable<Notification[]>;

  // Form Groups
  searchForm: FormGroup;
  
  // Component State
  activeTab: PropertyPriceType = PropertyPriceType.Sale;
  isLoading = false;
  isMobileMenuOpen = false;
  
  // Data Arrays
  properties: Property[] = [];
  filteredProperties: Property[] = [];
  cities: City[] = [];
  propertyTypes: PropertyTypeOption[] = [];
  
  // Price ranges for different property types
  priceRanges = {
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
  
  // Statistics
  stats: Stats = {
    activeListings: 12543,
    happyCustomers: 8421,
    cities: 156,
    support: '24/7'
  };

  // Pagination
  currentPage = 1;
  pageSize = 12;
  totalPages = 0;
  hasNextPage = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private propertyService: PropertyService,
    private loadingService: LoadingService,
    private notificationService: NotificationService
  ) {
    this.searchForm = this.createSearchForm();
    this.currentUser$ = this.authService.currentUser$;
    this.loading$ = this.loadingService.loading$;
    this.notifications$ = this.notificationService.notifications$;
  }

  ngOnInit(): void {
    this.initializeData();
    this.loadProperties();
  }

  // Form Creation
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

  // Data Initialization
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

  // Property Loading
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
      error: (error) => {
        console.error('Error loading properties:', error);
        this.notificationService.showError('İlanlar yüklenirken hata oluştu.');
      }
    });
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

  // Tab Management
  setActiveTab(tabName: PropertyPriceType): void {
    this.activeTab = tabName;
    this.currentPage = 1;
    this.resetSearchForm();
    this.loadProperties();
  }

  // Search Functionality
  onSearch(): void {
    if (this.searchForm.valid) {
      this.currentPage = 1;
      this.loadProperties();
    }
  }

  // Property Actions
  openProperty(propertyId: number): void {
    const property = this.properties.find(p => p.id === propertyId);
    if (property) {
      console.log('Opening property:', property);
      // Navigate to property detail page
      // this.router.navigate(['/property', propertyId]);
      this.notificationService.showInfo(`${property.title} detayına yönlendiriliyorsunuz...`);
    }
  }

  contactProperty(propertyId: number, event: Event): void {
    event.stopPropagation();
    const property = this.properties.find(p => p.id === propertyId);
    if (property) {
      console.log('Contacting for property:', property);
      this.notificationService.showSuccess('İletişim bilgileri gösterilecek.');
    }
  }

  toggleFavorite(propertyId: number, event: Event): void {
    event.stopPropagation();
    
    if (!this.authService.isAuthenticated()) {
      this.notificationService.showWarning('Favorilere eklemek için giriş yapmalısınız.');
      return;
    }

    const property = this.properties.find(p => p.id === propertyId);
    if (property) {
      // Toggle favorite logic here
      this.notificationService.showSuccess('Favorilere eklendi/çıkarıldı.');
    }
  }

  // Pagination
  loadMoreProperties(): void {
    if (this.hasNextPage) {
      this.currentPage++;
      this.loadProperties();
    }
  }

  // Utility Methods
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

  // Form Management
  private resetSearchForm(): void {
    this.searchForm.reset();
  }

  onCityChange(): void {
    const cityId = this.searchForm.get('city')?.value;
    if (cityId) {
      this.searchForm.patchValue({ district: '' });
    }
  }

  // Mobile Menu
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Navigation
  navigateToSection(section: string): void {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Authentication Actions
  login(): void {
    // Navigate to login page
    console.log('Navigate to login');
  }

  logout(): void {
    this.authService.logout();
  }

  // Notification Management
  dismissNotification(id: string): void {
    this.notificationService.remove(id);
  }

  // Track by function for ngFor performance
  trackByPropertyId(index: number, item: Property): number {
    return item.id;
  }

  private updateStats(): void {
    // Update stats based on loaded data
    this.stats.activeListings = this.properties.length;
  }

  // Property Type Helpers
  getPropertyTypeLabel(type: PropertyType): string {
    const typeOption = this.propertyTypes.find(pt => pt.id === type);
    return typeOption?.name || type;
  }

  getBadgeClass(badge: string): string {
    return `badge-${badge.toLowerCase().replace(/\s+/g, '-')}`;
  }

  // Authentication helpers
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PropertyService } from '../../property/services/property.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Property, PropertyPriceType, PropertyType } from '../../property/models/property.models';

interface FilterOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-home-with-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home-with-filter.component.html',
  styleUrls: ['./home-with-filter.component.scss']
})
export class HomeWithFilterComponent implements OnInit {
  filterForm: FormGroup;
  properties: Property[] = [];
  filteredProperties: Property[] = [];
  loading = false;
  isMobileFilterOpen = false;

  // Filter collapse states
  collapseStates = {
    priceType: true,
    propertyType: true,
    location: true,
    price: true,
    area: true,
    rooms: true,
    age: true,
    features: false
  };

  // Options
  priceTypes = [
    { label: 'Satılık', value: PropertyPriceType.Sale },
    { label: 'Kiralık', value: PropertyPriceType.Rent },
    { label: 'Günlük Kiralık', value: PropertyPriceType.DailyRent }
  ];

  propertyTypes = [
    { label: 'Daire', value: PropertyType.Apartment },
    { label: 'Müstakil Ev', value: PropertyType.House },
    { label: 'Villa', value: PropertyType.Villa },
    { label: 'Ofis', value: PropertyType.Office },
    { label: 'Dükkan', value: PropertyType.Shop },
    { label: 'Arsa', value: PropertyType.Land }
  ];

  cities = [
    { id: 'istanbul', name: 'İstanbul' },
    { id: 'ankara', name: 'Ankara' },
    { id: 'izmir', name: 'İzmir' },
    { id: 'bursa', name: 'Bursa' },
    { id: 'antalya', name: 'Antalya' }
  ];

  districts: Record<string, string[]> = {
    'istanbul': ['Kadıköy', 'Beşiktaş', 'Şişli', 'Üsküdar', 'Maltepe'],
    'ankara': ['Çankaya', 'Keçiören', 'Yenimahalle'],
    'izmir': ['Konak', 'Bornova', 'Karşıyaka']
  };

  roomOptions = [
    { label: '1+0', value: '1' },
    { label: '1+1', value: '1.5' },
    { label: '2+1', value: '2' },
    { label: '3+1', value: '3' },
    { label: '4+1', value: '4' },
    { label: '5+1', value: '5' }
  ];

  buildingAges = [
    { label: '0-5 Yaş', value: '0-5' },
    { label: '6-10 Yaş', value: '6-10' },
    { label: '11-15 Yaş', value: '11-15' },
    { label: '16-20 Yaş', value: '16-20' },
    { label: '21+ Yaş', value: '21+' }
  ];

  features = [
    { label: 'Asansör', value: 'elevator' },
    { label: 'Otopark', value: 'parking' },
    { label: 'Güvenlik', value: 'security' },
    { label: 'Havuz', value: 'pool' },
    { label: 'Spor Salonu', value: 'gym' },
    { label: 'Balkon', value: 'balcony' },
    { label: 'Eşyalı', value: 'furnished' },
    { label: 'Bahçe', value: 'garden' }
  ];

  selectedCity = '';
  availableDistricts: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private propertyService: PropertyService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.filterForm = this.createFilterForm();
  }

  ngOnInit(): void {
    this.loadProperties();
    this.setupFilterListeners();
  }

  private createFilterForm(): FormGroup {
    return this.formBuilder.group({
      priceType: [PropertyPriceType.Sale],
      propertyType: [''],
      city: [''],
      district: [''],
      minPrice: [''],
      maxPrice: [''],
      minArea: [''],
      maxArea: [''],
      rooms: [''],
      buildingAge: [''],
      features: [[]]
    });
  }

  private setupFilterListeners(): void {
    // City değiştiğinde districts'i güncelle
    this.filterForm.get('city')?.valueChanges.subscribe(city => {
      this.selectedCity = city;
      this.availableDistricts = this.districts[city] || [];
      this.filterForm.patchValue({ district: '' });
    });

    // Form değişikliklerinde filtreleme yap
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  private loadProperties(): void {
    this.loading = true;
    
    // Mock data
    const now = new Date();
    this.properties = [
      {
        id: 1,
        title: 'Lüks 3+1 Daire',
        description: 'Merkezi konumda, modern tasarım',
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
        details: { 
          rooms: 4, bedrooms: 4, bathrooms: 3, area: 200, 
          floor: 2, totalFloors: 2, buildYear: 2018, 
          balconyCount: 3, parkingSpaces: 2, furnished: true, 
          heating: 'central' as any, elevator: false 
        },
        features: [],
        images: [],
        owner: { id: 1, firstName: 'Ayşe', lastName: 'Demir', phoneNumber: '0555 111 11 11', email: 'ayse@example.com' },
        statistics: { viewCount: 189, favoriteCount: 23, contactCount: 15 },
        isActive: true,
        isFeatured: false,
        isVip: false,
        createdAt: new Date(now.getTime() - 5 * 86400000),
        updatedAt: now
      },
      {
        id: 3,
        title: 'Modern 2+1 Daire',
        description: 'Toplu ulaşıma yakın',
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
        details: { 
          rooms: 2, bedrooms: 2, bathrooms: 1, area: 95, 
          floor: 7, totalFloors: 12, buildYear: 2012, 
          balconyCount: 1, parkingSpaces: 1, furnished: false, 
          heating: 'central' as any, elevator: true 
        },
        features: [],
        images: [],
        owner: { id: 3, firstName: 'Mehmet', lastName: 'Kaya', phoneNumber: '0555 222 22 22', email: 'mehmet@example.com' },
        statistics: { viewCount: 156, favoriteCount: 8, contactCount: 5 },
        isActive: true,
        isFeatured: false,
        isVip: false,
        createdAt: new Date(now.getTime() - 3 * 86400000),
        updatedAt: now
      }
    ];
    
    this.filteredProperties = [...this.properties];
    this.loading = false;
  }

  private applyFilters(): void {
    const filters = this.filterForm.value;
    
    this.filteredProperties = this.properties.filter(property => {
      // Price Type
      if (filters.priceType && property.priceType !== filters.priceType) {
        return false;
      }

      // Property Type
      if (filters.propertyType && property.propertyType !== filters.propertyType) {
        return false;
      }

      // City
      if (filters.city && property.address.city !== this.cities.find(c => c.id === filters.city)?.name) {
        return false;
      }

      // District
      if (filters.district && property.address.district !== filters.district) {
        return false;
      }

      // Price Range
      if (filters.minPrice && property.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && property.price > filters.maxPrice) {
        return false;
      }

      // Area Range
      if (filters.minArea && property.details.area < filters.minArea) {
        return false;
      }
      if (filters.maxArea && property.details.area > filters.maxArea) {
        return false;
      }

      // Rooms
      if (filters.rooms && property.details.rooms !== parseInt(filters.rooms)) {
        return false;
      }

      return true;
    });
  }

  toggleCollapse(section: keyof typeof this.collapseStates): void {
    this.collapseStates[section] = !this.collapseStates[section];
  }

  resetFilters(): void {
    this.filterForm.reset({
      priceType: PropertyPriceType.Sale
    });
    this.filteredProperties = [...this.properties];
  }

  toggleMobileFilter(): void {
    this.isMobileFilterOpen = !this.isMobileFilterOpen;
  }

  closeMobileFilter(): void {
    this.isMobileFilterOpen = false;
  }

  viewProperty(property: Property): void {
    this.router.navigate(['/property', property.id]);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('tr-TR').format(price) + ' ₺';
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

  getPropertyTypeLabel(type: string): string {
    const typeLabels: Record<string, string> = {
      'apartment': 'Daire',
      'house': 'Müstakil Ev',
      'villa': 'Villa',
      'office': 'Ofis',
      'shop': 'Dükkan',
      'land': 'Arsa'
    };
    return typeLabels[type] || type;
  }
}
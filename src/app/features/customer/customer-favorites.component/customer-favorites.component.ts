import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface FavoriteProperty {
  id: number;
  title: string;
  location: string;
  district: string;
  city: string;
  price: number;
  priceType: 'sale' | 'rent';
  propertyType: string;
  rooms: string;
  area: number;
  floor: string;
  imageGradient: string;
  addedDate: Date;
  isActive: boolean;
  viewCount: number;
  isFeatured: boolean;
  badge?: string;
}

@Component({
  selector: 'app-customer-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './customer-favorites.component.html',
  styleUrls: ['./customer-favorites.component.scss']
})
export class CustomerFavoritesComponent implements OnInit {
  isMobileSidebarOpen = false;
  activeFilter: 'all' | 'sale' | 'rent' = 'all';
  sortBy: 'date' | 'price-asc' | 'price-desc' = 'date';
  searchQuery = '';
  showRemoveModal = false;
  selectedProperty: FavoriteProperty | null = null;
  viewMode: 'grid' | 'list' = 'grid';

  currentUser = {
    name: 'Kullanıcı Adı',
    email: 'kullanici@emlaknet.com',
    initials: 'KA'
  };

  favorites: FavoriteProperty[] = [
    {
      id: 1,
      title: 'Kadıköy\'de Deniz Manzaralı 3+1 Daire',
      location: 'Kadıköy, İstanbul',
      district: 'Kadıköy',
      city: 'İstanbul',
      price: 8500000,
      priceType: 'sale',
      propertyType: 'Daire',
      rooms: '3+1',
      area: 145,
      floor: '8. Kat',
      imageGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      addedDate: new Date('2025-01-15'),
      isActive: true,
      viewCount: 234,
      isFeatured: true,
      badge: 'Öne Çıkan'
    },
    {
      id: 2,
      title: 'Beşiktaş Merkez 2+1 Kiralık Daire',
      location: 'Beşiktaş, İstanbul',
      district: 'Beşiktaş',
      city: 'İstanbul',
      price: 18000,
      priceType: 'rent',
      propertyType: 'Daire',
      rooms: '2+1',
      area: 95,
      floor: '4. Kat',
      imageGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      addedDate: new Date('2025-01-20'),
      isActive: true,
      viewCount: 189,
      isFeatured: false
    },
    {
      id: 3,
      title: 'Çankaya\'da Bahçeli Villa',
      location: 'Çankaya, Ankara',
      district: 'Çankaya',
      city: 'Ankara',
      price: 12000000,
      priceType: 'sale',
      propertyType: 'Villa',
      rooms: '5+2',
      area: 320,
      floor: 'Müstakil',
      imageGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      addedDate: new Date('2025-02-01'),
      isActive: true,
      viewCount: 512,
      isFeatured: true,
      badge: 'VIP'
    },
    {
      id: 4,
      title: 'Konak Merkez Satılık Ofis',
      location: 'Konak, İzmir',
      district: 'Konak',
      city: 'İzmir',
      price: 3200000,
      priceType: 'sale',
      propertyType: 'Ofis',
      rooms: 'Açık Plan',
      area: 210,
      floor: '12. Kat',
      imageGradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      addedDate: new Date('2025-02-10'),
      isActive: false,
      viewCount: 67,
      isFeatured: false
    },
    {
      id: 5,
      title: 'Nilüfer\'de Sıfır Lüks Daire',
      location: 'Nilüfer, Bursa',
      district: 'Nilüfer',
      city: 'Bursa',
      price: 4750000,
      priceType: 'sale',
      propertyType: 'Daire',
      rooms: '4+1',
      area: 180,
      floor: '6. Kat',
      imageGradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      addedDate: new Date('2025-02-14'),
      isActive: true,
      viewCount: 345,
      isFeatured: false
    },
    {
      id: 6,
      title: 'Muratpaşa Kiralık Dükkan',
      location: 'Muratpaşa, Antalya',
      district: 'Muratpaşa',
      city: 'Antalya',
      price: 25000,
      priceType: 'rent',
      propertyType: 'Dükkan',
      rooms: 'Açık Alan',
      area: 85,
      floor: 'Zemin Kat',
      imageGradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
      addedDate: new Date('2025-02-20'),
      isActive: true,
      viewCount: 156,
      isFeatured: false
    }
  ];

  get filteredFavorites(): FavoriteProperty[] {
    let result = [...this.favorites];

    if (this.activeFilter !== 'all') {
      result = result.filter(f => f.priceType === this.activeFilter);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(f =>
        f.title.toLowerCase().includes(q) ||
        f.location.toLowerCase().includes(q) ||
        f.city.toLowerCase().includes(q)
      );
    }

    if (this.sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else {
      result.sort((a, b) => b.addedDate.getTime() - a.addedDate.getTime());
    }

    return result;
  }

  get saleCount(): number {
    return this.favorites.filter(f => f.priceType === 'sale').length;
  }

  get rentCount(): number {
    return this.favorites.filter(f => f.priceType === 'rent').length;
  }

  ngOnInit(): void {}

  constructor(private router: Router) {}

  setFilter(filter: 'all' | 'sale' | 'rent'): void {
    this.activeFilter = filter;
  }

  confirmRemove(property: FavoriteProperty): void {
    this.selectedProperty = property;
    this.showRemoveModal = true;
  }

  removeFavorite(): void {
    if (this.selectedProperty) {
      this.favorites = this.favorites.filter(f => f.id !== this.selectedProperty!.id);
    }
    this.showRemoveModal = false;
    this.selectedProperty = null;
  }

  closeModal(): void {
    this.showRemoveModal = false;
    this.selectedProperty = null;
  }

  viewProperty(id: number): void {
    this.router.navigate(['/property', id]);
  }

  contactOwner(id: number): void {
    this.router.navigate(['/customer/messages'], { queryParams: { propertyId: id } });
  }

  formatPrice(price: number, type: 'sale' | 'rent'): string {
    if (price >= 1000000) {
      return (price / 1000000).toFixed(1).replace('.', ',') + ' Milyon ₺';
    }
    if (price >= 1000) {
      return (price / 1000).toFixed(0) + ' Bin ₺';
    }
    return price.toLocaleString('tr-TR') + ' ₺' + (type === 'rent' ? '/ay' : '');
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  toggleMobileSidebar(): void {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }

  closeMobileSidebar(): void {
    this.isMobileSidebarOpen = false;
  }

  logout(): void {
    this.router.navigate(['/auth/login']);
  }
}
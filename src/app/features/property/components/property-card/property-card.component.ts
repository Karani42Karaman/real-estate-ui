// property-card.component.ts
import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Property, PropertyPriceType } from '../../models/property.models';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyCardComponent implements OnInit {
  @Input() property!: Property;
  @Input() showContactButton = true;
  @Input() showFavoriteButton = true;
  @Output() propertyClick = new EventEmitter<Property>();
  @Output() contactClick = new EventEmitter<Property>();
  @Output() favoriteClick = new EventEmitter<Property>();

  PropertyPriceType = PropertyPriceType;

  constructor() {
    console.log('PropertyCardComponent constructor çalıştı');
  }

  ngOnInit(): void {
    console.log('PropertyCardComponent ngOnInit - property:', this.property.title);
    if (!this.property) {
      console.error('Property card component: property bilgisi eksik!');
    }
  }

  onPropertyClick(event?: Event): void {
    console.log('🔥 Property card clicked:', this.property.title, 'ID:', this.property.id);
    
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    if (this.property) {
      console.log('🔥 Emitting property click event for ID:', this.property.id);
      this.propertyClick.emit(this.property);
    } else {
      console.error('❌ Property bilgisi bulunamadı!');
    }
  }

  onMouseDown(): void {
    console.log('🖱️ MouseDown event tetiklendi');
    if (typeof window !== 'undefined') {
      (window as any).console.log('🖱️ BROWSER: MouseDown tetiklendi');
    }
  }

  onMouseUp(): void {
    console.log('🖱️ MouseUp event tetiklendi');
    if (typeof window !== 'undefined') {
      (window as any).console.log('🖱️ BROWSER: MouseUp tetiklendi');
    }
  }

  onFavoriteClick(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.favoriteClick.emit(this.property);
  }

  onContactClick(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.contactClick.emit(this.property);
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

  getBadge(): string | null {
    if (!this.property) return null;
    if (this.property.isVip) return 'VIP';
    if (this.property.isFeatured) return 'YENİ';
    if (this.property.priceType === PropertyPriceType.Rent) return 'KİRALIK';
    return null;
  }

  getBadgeClass(): string {
    const badge = this.getBadge();
    if (!badge) return '';
    return `badge-${badge.toLowerCase().replace(/\s+/g, '-')}`;
  }

  getImageGradientClass(): string {
    if (!this.property) return 'gradient-1';
    const gradients = ['gradient-1', 'gradient-2', 'gradient-3', 'gradient-4'];
    return gradients[(this.property.id - 1) % gradients.length];
  }
}
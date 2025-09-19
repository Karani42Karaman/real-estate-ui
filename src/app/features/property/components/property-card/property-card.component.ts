import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Property, PropertyPriceType } from '../../models/property.models';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
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
    console.log('PropertyCardComponent created');
  }

  ngOnInit(): void {
    console.log('PropertyCardComponent ngOnInit - property:', this.property);
  }

  onPropertyClick(): void {
    console.log('CLICKED! Property card clicked:', this.property?.title, this.property?.id);
    alert('Kart tıklandı: ' + this.property?.title);
    this.propertyClick.emit(this.property);
  }

  onContactClick(event: Event): void {
    event.stopPropagation();
    this.contactClick.emit(this.property);
  }

  onFavoriteClick(event: Event): void {
    event.stopPropagation();
    this.favoriteClick.emit(this.property);
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
    // Her property için farklı gradient renkleri
    const gradients = ['gradient-1', 'gradient-2', 'gradient-3', 'gradient-4'];
    return gradients[(this.property.id - 1) % gradients.length];
  }
}

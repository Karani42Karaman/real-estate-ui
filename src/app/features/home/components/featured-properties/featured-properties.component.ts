import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Property } from '../../../property/models/property.models';
import { PropertyCardComponent } from '../../../property/components/property-card/property-card.component';

@Component({
  selector: 'app-featured-properties',
  standalone: true,
  imports: [CommonModule, PropertyCardComponent],
  templateUrl: './featured-properties.component.html',
  styleUrls: ['./featured-properties.component.scss']
})
export class FeaturedPropertiesComponent implements OnInit {
  @Input() properties: Property[] = [];
  @Input() title = 'Öne Çıkan İlanlar';
  @Input() showLoadMore = false;
  @Input() maxItems?: number;
  @Output() propertyClick = new EventEmitter<Property>();
  @Output() contactClick = new EventEmitter<Property>();
  @Output() favoriteClick = new EventEmitter<Property>();
  @Output() loadMoreClick = new EventEmitter<void>();

  displayedProperties: Property[] = [];

  ngOnInit(): void {
    this.updateDisplayedProperties();
  }

  ngOnChanges(): void {
    this.updateDisplayedProperties();
  }

  private updateDisplayedProperties(): void {
    if (this.maxItems && this.maxItems > 0) {
      this.displayedProperties = this.properties.slice(0, this.maxItems);
    } else {
      this.displayedProperties = [...this.properties];
    }
  }

  onPropertyClick(property: Property): void {
    this.propertyClick.emit(property);
  }

  onContactClick(property: Property): void {
    this.contactClick.emit(property);
  }

  onFavoriteClick(property: Property): void {
    this.favoriteClick.emit(property);
  }

  onLoadMore(): void {
    this.loadMoreClick.emit();
  }

  trackByPropertyId(index: number, item: Property): number {
    return item.id;
  }
}

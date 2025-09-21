// featured-properties.component.ts
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Property } from '../../../property/models/property.models';
import { PropertyCardComponent } from '../../../property/components/property-card/property-card.component';

@Component({
  selector: 'app-featured-properties',
  standalone: true,
  imports: [CommonModule, PropertyCardComponent],
  templateUrl: './featured-properties.component.html',
  styleUrls: ['./featured-properties.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturedPropertiesComponent implements OnInit, OnChanges {
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
    console.log('FeaturedPropertiesComponent ngOnInit - properties count:', this.properties.length);
    this.updateDisplayedProperties();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('FeaturedPropertiesComponent ngOnChanges:', changes);
    if (changes['properties'] || changes['maxItems']) {
      this.updateDisplayedProperties();
    }
  }

  private updateDisplayedProperties(): void {
    console.log('updateDisplayedProperties çalıştı - input properties:', this.properties.length);
    
    if (!this.properties || this.properties.length === 0) {
      this.displayedProperties = [];
      return;
    }

    if (this.maxItems && this.maxItems > 0) {
      this.displayedProperties = this.properties.slice(0, this.maxItems);
    } else {
      this.displayedProperties = [...this.properties];
    }
    
    console.log('Displayed properties count:', this.displayedProperties.length);
  }

  onPropertyClick(property: Property): void {
    console.log("Test Karaniiiii")

    console.log('Test FeaturedPropertiesComponent - onPropertyClick:', property.title, property.id);
    
    if (!property) {
      console.error('Property bilgisi bulunamadı!');
      return;
    }
    
    console.log('Property click event parent\'a emit ediliyor:', property.id);
    this.propertyClick.emit(property);
  }

  onContactClick(property: Property): void {
    console.log('FeaturedPropertiesComponent - onContactClick:', property.title);
    this.contactClick.emit(property);
  }

  onFavoriteClick(property: Property): void {
    console.log('FeaturedPropertiesComponent - onFavoriteClick:', property.title);
    this.favoriteClick.emit(property);
  }

  onLoadMore(): void {
    console.log('FeaturedPropertiesComponent - onLoadMore');
    this.loadMoreClick.emit();
  }

  trackByPropertyId(index: number, item: Property): number {
    return item.id || index;
  }
}
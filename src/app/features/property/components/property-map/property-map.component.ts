import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapService, MapLocation } from '../../../../core/services/map.service';
import { Property } from '../../models/property.models';

@Component({
  selector: 'app-property-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-map.component.html',
  styleUrls: ['./property-map.component.scss']
})
export class PropertyMapComponent implements OnInit {
  @Input() property!: Property;
  
  mapData: any = null;
  loading = true;
  mapUrl = '';

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    if (this.property) {
      this.loadMapData();
    }
  }

  private loadMapData(): void {
    const location: MapLocation = {
      latitude: this.property.address.coordinates.latitude,
      longitude: this.property.address.coordinates.longitude,
      address: this.property.address.street,
      city: this.property.address.city,
      district: this.property.address.district
    };

    this.mapService.getMapData(location).subscribe({
      next: (data) => {
        this.mapData = data;
        this.mapUrl = this.mapService.getMapUrl(location);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  openInGoogleMaps(): void {
    window.open(this.mapUrl, '_blank');
  }

  getDistanceText(distance: string): string {
    return `${distance} uzaklıkta`;
  }
}

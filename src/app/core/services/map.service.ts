import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface MapLocation {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  district: string;
}

export interface MapMarker {
  id: number;
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  description: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapService {
  
  constructor() { }

  // Mock harita verileri - gerçek uygulamada Google Maps, OpenStreetMap vs. kullanılır
  getMapData(location: MapLocation): Observable<{
    center: { lat: number; lng: number };
    zoom: number;
    markers: MapMarker[];
    nearbyPlaces: Array<{
      name: string;
      type: string;
      distance: string;
      position: { lat: number; lng: number };
    }>;
  }> {
    // Mock veri döndür
    const mockData = {
      center: {
        lat: location.latitude,
        lng: location.longitude
      },
      zoom: 15,
      markers: [
        {
          id: 1,
          position: {
            lat: location.latitude,
            lng: location.longitude
          },
          title: location.address,
          description: `${location.district}, ${location.city}`,
          icon: 'property-marker'
        }
      ],
      nearbyPlaces: [
        {
          name: 'Metro İstasyonu',
          type: 'Ulaşım',
          distance: '200m',
          position: {
            lat: location.latitude + 0.001,
            lng: location.longitude + 0.001
          }
        },
        {
          name: 'Market',
          type: 'Alışveriş',
          distance: '150m',
          position: {
            lat: location.latitude - 0.0008,
            lng: location.longitude + 0.0005
          }
        },
        {
          name: 'Okul',
          type: 'Eğitim',
          distance: '300m',
          position: {
            lat: location.latitude + 0.0005,
            lng: location.longitude - 0.001
          }
        },
        {
          name: 'Hastane',
          type: 'Sağlık',
          distance: '500m',
          position: {
            lat: location.latitude - 0.001,
            lng: location.longitude - 0.0008
          }
        }
      ]
    };

    return of(mockData).pipe(delay(300));
  }

  // Harita URL'si oluştur (Google Maps için)
  getMapUrl(location: MapLocation, zoom: number = 15): string {
    return `https://www.google.com/maps?q=${location.latitude},${location.longitude}&z=${zoom}`;
  }

  // Harita embed URL'si
  getMapEmbedUrl(location: MapLocation, width: number = 600, height: number = 450): string {
    return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${location.latitude},${location.longitude}&zoom=15`;
  }

  // İki nokta arası mesafe hesapla (basit hesaplama)
  calculateDistance(
    lat1: number, 
    lng1: number, 
    lat2: number, 
    lng2: number
  ): number {
    const R = 6371; // Dünya'nın yarıçapı (km)
    const dLat = this.deg2rad(lat2 - lat1);
    const dLng = this.deg2rad(lng2 - lng1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }
}

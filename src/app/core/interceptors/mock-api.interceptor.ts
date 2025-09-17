import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse, PaginatedResponse } from '../models/api-response.models';
import { Property, PropertyPriceType, PropertyType } from '../../features/property/models/property.models';

@Injectable()
export class MockApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.startsWith(environment.apiUrl)) {
      return next.handle(req);
    }

    // Properties list
    if (req.method === 'GET' && req.url.endsWith('/properties')) {
      const payload: PaginatedResponse<Property> = {
        data: this.mockProperties(),
        totalCount: 4,
        pageNumber: 1,
        pageSize: 12,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false
      };
      const response: ApiResponse<PaginatedResponse<Property>> = {
        success: true,
        data: payload,
        message: 'OK',
        errors: [],
        timestamp: new Date()
      };
      return of(new HttpResponse({ status: 200, body: response })).pipe(delay(300));
    }

    // Property detail
    if (req.method === 'GET' && /\/properties\/(\d+)$/.test(req.url)) {
      const id = Number(req.url.split('/').pop());
      const prop = this.mockProperties().find(p => p.id === id);
      if (!prop) {
        const errorResponse: ApiResponse<null> = {
          success: false,
          data: null,
          message: 'Property not found',
          errors: ['Property not found'],
          timestamp: new Date()
        };
        return of(new HttpResponse({ status: 404, body: errorResponse })).pipe(delay(200));
      }
      const response: ApiResponse<Property> = {
        success: true,
        data: prop,
        message: 'OK',
        errors: [],
        timestamp: new Date()
      };
      return of(new HttpResponse({ status: 200, body: response })).pipe(delay(200));
    }

    return next.handle(req);
  }

  private mockProperties(): Property[] {
    const now = new Date();
    return [
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
  }
}



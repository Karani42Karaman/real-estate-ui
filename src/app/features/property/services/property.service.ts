import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { 
  Property, 
  PropertySearchFilter
} from '../models/property.models';
import { ApiResponse, PaginatedResponse } from '../../../core/models/api-response.models';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private readonly apiUrl = `${environment.apiUrl}/properties`;

  constructor(private http: HttpClient) {}

  getProperties(filter?: PropertySearchFilter): Observable<PaginatedResponse<Property>> {
    let params = new HttpParams();

    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          if (Array.isArray(value)) {
            value.forEach(item => params = params.append(key, item.toString()));
          } else {
            params = params.set(key, value.toString());
          }
        }
      });
    }

    return this.http.get<ApiResponse<PaginatedResponse<Property>>>(this.apiUrl, { params })
      .pipe(map(response => response.data));
  }

  getProperty(id: number): Observable<Property> {
    return this.http.get<ApiResponse<Property>>(`${this.apiUrl}/${id}`)
      .pipe(map(response => response.data));
  }

  createProperty(property: Partial<Property>): Observable<Property> {
    return this.http.post<ApiResponse<Property>>(this.apiUrl, property)
      .pipe(map(response => response.data));
  }

  updateProperty(id: number, property: Partial<Property>): Observable<Property> {
    return this.http.put<ApiResponse<Property>>(`${this.apiUrl}/${id}`, property)
      .pipe(map(response => response.data));
  }

  deleteProperty(id: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`)
      .pipe(map(response => response.data));
  }

  getFeaturedProperties(): Observable<Property[]> {
    return this.http.get<ApiResponse<Property[]>>(`${this.apiUrl}/featured`)
      .pipe(map(response => response.data));
  }

  getMyProperties(): Observable<Property[]> {
    return this.http.get<ApiResponse<Property[]>>(`${this.apiUrl}/my-properties`)
      .pipe(map(response => response.data));
  }

  addToFavorites(propertyId: number): Observable<void> {
    return this.http.post<ApiResponse<void>>(`${this.apiUrl}/${propertyId}/favorite`, {})
      .pipe(map(response => response.data));
  }

  removeFromFavorites(propertyId: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${propertyId}/favorite`)
      .pipe(map(response => response.data));
  }

  getFavoriteProperties(): Observable<Property[]> {
    return this.http.get<ApiResponse<Property[]>>(`${this.apiUrl}/favorites`)
      .pipe(map(response => response.data));
  }

  uploadPropertyImages(propertyId: number, files: FileList): Observable<string[]> {
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('images', file);
    });

    return this.http.post<ApiResponse<string[]>>(`${this.apiUrl}/${propertyId}/images`, formData)
      .pipe(map(response => response.data));
  }
}
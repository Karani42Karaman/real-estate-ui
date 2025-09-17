export interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  priceType: PropertyPriceType;
  propertyType: PropertyType;
  status: PropertyStatus;
  address: PropertyAddress;
  details: PropertyDetails;
  features: PropertyFeature[];
  images: PropertyImage[];
  owner: PropertyOwner;
  agent?: PropertyAgent;
  statistics: PropertyStatistics;
  isActive: boolean;
  isFeatured: boolean;
  isVip: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum PropertyPriceType {
  Sale = 'sale',
  Rent = 'rent',
  DailyRent = 'daily_rent'
}

export enum PropertyType {
  Apartment = 'apartment',
  House = 'house',
  Villa = 'villa',
  Office = 'office',
  Shop = 'shop',
  Land = 'land',
  Warehouse = 'warehouse'
}

export enum PropertyStatus {
  Active = 'active',
  Sold = 'sold',
  Rented = 'rented',
  Pending = 'pending',
  Inactive = 'inactive'
}

export interface PropertyAddress {
  street: string;
  district: string;
  city: string;
  country: string;
  postalCode: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface PropertyDetails {
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  floor: number;
  totalFloors: number;
  buildYear: number;
  balconyCount: number;
  parkingSpaces: number;
  furnished: boolean;
  heating: HeatingType;
  elevator: boolean;
}

export enum HeatingType {
  Central = 'central',
  Natural = 'natural',
  Electric = 'electric',
  Coal = 'coal',
  Solar = 'solar'
}

export interface PropertyFeature {
  id: number;
  name: string;
  category: FeatureCategory;
}

export enum FeatureCategory {
  Security = 'security',
  Comfort = 'comfort',
  Location = 'location',
  Building = 'building'
}

export interface PropertyImage {
  id: number;
  url: string;
  thumbnailUrl: string;
  caption?: string;
  isPrimary: boolean;
  order: number;
}

export interface PropertyOwner {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export interface PropertyAgent {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  company: string;
  profileImage?: string;
}

export interface PropertyStatistics {
  viewCount: number;
  favoriteCount: number;
  contactCount: number;
  lastViewedAt?: Date;
}

export interface PropertySearchFilter {
  priceType?: PropertyPriceType;
  propertyType?: PropertyType[];
  city?: string;
  district?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  rooms?: number[];
  features?: number[];
  page: number;
  pageSize: number;
  sortBy?: PropertySortBy;
  sortOrder?: SortOrder;
}

export enum PropertySortBy {
  Price = 'price',
  Date = 'date',
  Area = 'area',
  Views = 'views'
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}
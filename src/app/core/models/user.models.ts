export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileImage?: string;
  address?: UserAddress;
  preferences?: UserPreferences;
}

export interface UserAddress {
  street: string;
  city: string;
  district: string;
  postalCode: string;
  country: string;
}

export interface UserPreferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  language: string;
  currency: string;
}
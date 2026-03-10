import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';
import { PropertyDetailComponent } from './features/property/pages/property-detail/property-detail.component';
import { LoginComponent } from './features/auth/login.component/login.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password.component/forgot-password.component';
import { RegisterComponent } from './features/auth/register.component/register.component';
import { TermsOfServiceComponent } from './features/contracts/terms-of-service.component/terms-of-service.component';
import { PrivacyPolicyComponent } from './features/contracts/privacy-policy.component/privacy-policy.component';
import { KvkkComponent } from './features/contracts/kvkk.component/kvkk.component';
import { CustomerDashboardComponent } from './features/customer/customer-dasboard.component/customer-dashboard.component';
import { HomeWithFilterComponent } from './features/home/home-with-filter.component/home-with-filter.component';
import { CustomerAdvertCreateComponent } from './features/customer/customer-advert-create/customer-advert-create';
import { CustomerFavoritesComponent } from './features/customer/customer-favorites.component/customer-favorites.component';
import { CustomerMessagesComponent } from './features/customer/customer-messages.component/customer-messages.component';
import { CustomerProfileComponent } from './features/customer/customer-profile.component/customer-profile.component';
import { CustomerSettingsComponent } from './features/customer/customer-settings.component/customer-settings.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'EmlakNet - Ana Sayfa'
  },
  {
    path: 'emlak-arama',
    component: HomeWithFilterComponent,
    title: 'Emlak Arama - EmlakNet'
  },
  {
    path: 'property/:id',
    component: PropertyDetailComponent,
    title: 'Emlak Detayı - EmlakNet'
  },
  {
    path: 'auth/login',
    component: LoginComponent,
    title: 'Giriş Yap - EmlakNet'
  },
  {
    path: 'auth/forgot-password',
    component: ForgotPasswordComponent,
    title: 'Şifremi Unuttum - EmlakNet'
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
    title: 'Kayıt Ol - EmlakNet'
  },
  {
    path: 'contracts/terms-of-service',
    component: TermsOfServiceComponent,
    title: 'Kullanım Şartları - EmlakNet'
  },
  {
    path: 'contracts/privacy-policy',
    component: PrivacyPolicyComponent,
    title: 'Gizlilik Politikası - EmlakNet'
  },
  {
    path: 'contracts/kvkk',
    component: KvkkComponent,
    title: 'KVKK Aydınlatma Metni - EmlakNet'
  },
  {
    path: 'customer/dashboard',
    component: CustomerDashboardComponent,
    title: 'Müşteri Paneli - EmlakNet'
  },
  {
    path: 'customer/properties/create',
    component: CustomerAdvertCreateComponent,
    title: 'Yeni İlan Oluştur - EmlakNet'
  },
  {
    path: 'customer/properties/edit/:id',
    component: CustomerAdvertCreateComponent,
    title: 'İlan Düzenle - EmlakNet'
  },

  { path: 'customer/favorites',          component: CustomerFavoritesComponent },
  { path: 'customer/messages',           component: CustomerMessagesComponent },
  { path: 'customer/profile',            component: CustomerProfileComponent },
  { path: 'customer/settings',           component: CustomerSettingsComponent },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
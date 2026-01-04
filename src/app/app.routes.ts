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




export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'EmlakNet - Ana Sayfa'
  },
  {
    path:'emlak-arama',
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
  path:'customer/dashboard',
  component: CustomerDashboardComponent,
  title: 'Müşteri Paneli - EmlakNet'
},
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

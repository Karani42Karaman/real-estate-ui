import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';
import { PropertyDetailComponent } from './features/property/pages/property-detail/property-detail.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'property/:id', component: PropertyDetailComponent },
  { path: '**', redirectTo: '' }
];

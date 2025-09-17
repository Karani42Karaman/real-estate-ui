import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

interface City {
  id: string;
  name: string;
  districts: District[];
}

interface District {
  id: string;
  name: string;
}

interface PropertyTypeOption {
  id: string;
  name: string;
}

interface Stats {
  activeListings: number;
  happyCustomers: number;
  cities: number;
  support: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NotificationService } from '../../../core/services/notification.service';
import { PropertyPriceType, PropertyType, HeatingType } from '../../property/models/property.models';

interface StepConfig {
  id: number;
  title: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-customer-advert-create',
  imports:  [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './customer-advert-create.html',
  styleUrl: './customer-advert-create.scss',
})
export class CustomerAdvertCreateComponent implements OnInit {
 
  Math = Math;
  currentStep = 1;
  totalSteps = 5;
  isSubmitting = false;
  uploadedImages: { file: File; preview: string; name: string }[] = [];
  dragOver = false;

  steps: StepConfig[] = [
    { id: 1, title: 'Temel Bilgiler', icon: '📋', description: 'İlan türü ve açıklama' },
    { id: 2, title: 'Konum', icon: '📍', description: 'Adres ve bölge' },
    { id: 3, title: 'Detaylar', icon: '🏠', description: 'Özellikler ve detaylar' },
    { id: 4, title: 'Fotoğraflar', icon: '📸', description: 'Görsel ekle' },
    { id: 5, title: 'Yayınla', icon: '🚀', description: 'Önizleme ve yayın' },
  ];

  propertyForm: FormGroup;

  priceTypes = [
    { value: PropertyPriceType.Sale, label: 'Satılık', icon: '🏷️', desc: 'Mülkü satmak istiyorum' },
    { value: PropertyPriceType.Rent, label: 'Kiralık', icon: '🔑', desc: 'Aylık kira geliri istiyorum' },
    { value: PropertyPriceType.DailyRent, label: 'Günlük Kiralık', icon: '📅', desc: 'Günlük/haftalık kiralama' },
  ];

  propertyTypes = [
    { value: PropertyType.Apartment, label: 'Daire', icon: '🏢' },
    { value: PropertyType.House, label: 'Müstakil Ev', icon: '🏡' },
    { value: PropertyType.Villa, label: 'Villa', icon: '🏰' },
    { value: PropertyType.Office, label: 'Ofis', icon: '🏬' },
    { value: PropertyType.Shop, label: 'Dükkan', icon: '🏪' },
    { value: PropertyType.Land, label: 'Arsa', icon: '🌿' },
    { value: PropertyType.Warehouse, label: 'Depo', icon: '🏭' },
  ];

  cities = [
    { id: 'istanbul', name: 'İstanbul', districts: ['Kadıköy','Beşiktaş','Şişli','Üsküdar','Maltepe','Ataşehir','Bakırköy','Fatih','Beyoğlu','Sarıyer','Zeytinburnu','Levent'] },
    { id: 'ankara', name: 'Ankara', districts: ['Çankaya','Keçiören','Mamak','Yenimahalle','Etimesgut','Sincan'] },
    { id: 'izmir', name: 'İzmir', districts: ['Konak','Bornova','Karşıyaka','Bayraklı','Çiğli','Balçova'] },
    { id: 'bursa', name: 'Bursa', districts: ['Nilüfer','Osmangazi','Yıldırım','Gürsu','Kestel'] },
    { id: 'antalya', name: 'Antalya', districts: ['Muratpaşa','Konyaaltı','Kepez','Alanya','Manavgat'] },
    { id: 'adana', name: 'Adana', districts: ['Seyhan','Çukurova','Yüreğir','Sarıçam'] },
    { id: 'konya', name: 'Konya', districts: ['Selçuklu','Meram','Karatay','Ereğli'] },
    { id: 'gaziantep', name: 'Gaziantep', districts: ['Şahinbey','Şehitkamil','Oğuzeli'] },
  ];

  roomOptions = ['1+0','1+1','2+1','3+1','4+1','4+2','5+1','5+2','6+1','6+2','7+','Stüdyo'];

  heatingTypes = [
    { value: HeatingType.Central, label: 'Merkezi Sistem' },
    { value: HeatingType.Natural, label: 'Doğalgaz (Kombi)' },
    { value: HeatingType.Electric, label: 'Elektrikli' },
    { value: HeatingType.Coal, label: 'Kömür/Soba' },
    { value: HeatingType.Solar, label: 'Güneş Enerjisi' },
  ];

  floorOptions = ['Bodrum','Zemin','Bahçe Katı','Yüksek Zemin', ...Array.from({length: 50}, (_, i) => `${i+1}. Kat`)];

  features = {
    comfort: [
      { id: 'elevator', label: 'Asansör', icon: '🛗' },
      { id: 'furnished', label: 'Eşyalı', icon: '🛋️' },
      { id: 'balcony', label: 'Balkon/Teras', icon: '🌅' },
      { id: 'parking', label: 'Otopark', icon: '🚗' },
      { id: 'storage', label: 'Depo/Kiler', icon: '📦' },
      { id: 'fireplace', label: 'Şömine', icon: '🔥' },
      { id: 'pool', label: 'Havuz', icon: '🏊' },
      { id: 'sauna', label: 'Sauna/Hamam', icon: '🧖' },
      { id: 'gym', label: 'Spor Salonu', icon: '💪' },
    ],
    security: [
      { id: 'security', label: 'Güvenlik/Kapıcı', icon: '👮' },
      { id: 'intercom', label: 'Görüntülü Diafon', icon: '📷' },
      { id: 'alarm', label: 'Alarm Sistemi', icon: '🔔' },
      { id: 'steeldoor', label: 'Çelik Kapı', icon: '🚪' },
    ],
    location: [
      { id: 'seaView', label: 'Deniz Manzarası', icon: '🌊' },
      { id: 'cityView', label: 'Şehir Manzarası', icon: '🌆' },
      { id: 'greenArea', label: 'Yeşil Alan', icon: '🌳' },
      { id: 'nearMetro', label: 'Metroya Yakın', icon: '🚇' },
      { id: 'nearSchool', label: 'Okula Yakın', icon: '🏫' },
      { id: 'nearHospital', label: 'Hastaneye Yakın', icon: '🏥' },
      { id: 'nearShopping', label: 'AVM Yakını', icon: '🛍️' },
    ],
  };

  selectedFeatures: Set<string> = new Set();

  get availableDistricts(): string[] {
    const cityId = this.propertyForm.get('step2')?.get('city')?.value;
    const city = this.cities.find(c => c.id === cityId);
    return city?.districts || [];
  }

  get progressPercentage(): number {
    return ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
  }

  get step1Form(): FormGroup { return this.propertyForm.get('step1') as FormGroup; }
  get step2Form(): FormGroup { return this.propertyForm.get('step2') as FormGroup; }
  get step3Form(): FormGroup { return this.propertyForm.get('step3') as FormGroup; }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.propertyForm = this.createForm();
  }

  ngOnInit(): void {}

  private createForm(): FormGroup {
    return this.fb.group({
      step1: this.fb.group({
        priceType: [PropertyPriceType.Sale, Validators.required],
        propertyType: [PropertyType.Apartment, Validators.required],
        title: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
        description: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(2000)]],
        price: ['', [Validators.required, Validators.min(1)]],
        currency: ['TRY'],
        isNegotiable: [false],
        isVip: [false],
        isFeatured: [false],
      }),
      step2: this.fb.group({
        city: ['', Validators.required],
        district: ['', Validators.required],
        neighborhood: [''],
        street: ['', Validators.required],
        buildingNo: [''],
        apartmentNo: [''],
        postalCode: [''],
        hideExactAddress: [false],
      }),
      step3: this.fb.group({
        rooms: ['3+1'],
        bedrooms: [3],
        bathrooms: [1],
        area: ['', [Validators.required, Validators.min(1)]],
        floor: [''],
        totalFloors: [''],
        buildYear: [''],
        balconyCount: [0],
        parkingSpaces: [0],
        furnished: [false],
        heating: [HeatingType.Natural],
        elevator: [false],
        condition: ['new'],
        deedType: ['ownership'],
        creditEligible: [true],
        swapPossible: [false],
      }),
    });
  }

  selectPriceType(type: PropertyPriceType): void {
    this.step1Form.patchValue({ priceType: type });
  }

  selectPropertyType(type: PropertyType): void {
    this.step1Form.patchValue({ propertyType: type });
  }

  toggleFeature(featureId: string): void {
    if (this.selectedFeatures.has(featureId)) {
      this.selectedFeatures.delete(featureId);
    } else {
      this.selectedFeatures.add(featureId);
    }
  }

  isFeatureSelected(featureId: string): boolean {
    return this.selectedFeatures.has(featureId);
  }

  onCityChange(): void {
    this.step2Form.patchValue({ district: '' });
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.processFiles(Array.from(input.files));
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = true;
  }

  onDragLeave(): void {
    this.dragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = false;
    const files = Array.from(event.dataTransfer?.files || []);
    this.processFiles(files);
  }

  private processFiles(files: File[]): void {
    const imageFiles = files.filter(f => f.type.startsWith('image/'));
    if (this.uploadedImages.length + imageFiles.length > 20) {
      this.notificationService.showWarning('En fazla 20 fotoğraf yükleyebilirsiniz.');
      return;
    }
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedImages.push({
          file,
          preview: e.target?.result as string,
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number): void {
    this.uploadedImages.splice(index, 1);
  }

  setPrimaryImage(index: number): void {
    const [primary] = this.uploadedImages.splice(index, 1);
    this.uploadedImages.unshift(primary);
  }

  nextStep(): void {
    if (this.validateCurrentStep()) {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goToStep(step: number): void {
    if (step < this.currentStep) {
      this.currentStep = step;
    }
  }

  private validateCurrentStep(): boolean {
    switch (this.currentStep) {
      case 1:
        if (this.step1Form.invalid) {
          this.step1Form.markAllAsTouched();
          this.notificationService.showWarning('Lütfen tüm zorunlu alanları doldurun.');
          return false;
        }
        return true;
      case 2:
        if (this.step2Form.invalid) {
          this.step2Form.markAllAsTouched();
          this.notificationService.showWarning('Lütfen konum bilgilerini eksiksiz girin.');
          return false;
        }
        return true;
      case 3:
        if (this.step3Form.invalid) {
          this.step3Form.markAllAsTouched();
          this.notificationService.showWarning('Lütfen emlak detaylarını girin.');
          return false;
        }
        return true;
      case 4:
        if (this.uploadedImages.length === 0) {
          this.notificationService.showWarning('En az 1 fotoğraf eklemeniz önerilir.');
        }
        return true;
      default:
        return true;
    }
  }

  formatPriceDisplay(): string {
    const price = this.step1Form.get('price')?.value;
    const priceType = this.step1Form.get('priceType')?.value;
    if (!price) return '-';
    const formatted = new Intl.NumberFormat('tr-TR').format(price);
    switch (priceType) {
      case PropertyPriceType.Rent: return `${formatted} ₺ / ay`;
      case PropertyPriceType.DailyRent: return `${formatted} ₺ / gün`;
      default: return `${formatted} ₺`;
    }
  }

  getPropertyTypeLabel(): string {
    const type = this.step1Form.get('propertyType')?.value;
    return this.propertyTypes.find(t => t.value === type)?.label || '';
  }

  getPriceTypeLabel(): string {
    const type = this.step1Form.get('priceType')?.value;
    return this.priceTypes.find(t => t.value === type)?.label || '';
  }

  getCityName(): string {
    const cityId = this.step2Form.get('city')?.value;
    return this.cities.find(c => c.id === cityId)?.name || '';
  }

  onSubmit(): void {
    this.isSubmitting = true;
    // Mock submission
    setTimeout(() => {
      this.isSubmitting = false;
      this.notificationService.showSuccess('İlanınız başarıyla yayınlandı! ');
      this.router.navigate(['/customer/dashboard']);
    }, 2000);
  }

  saveDraft(): void {
    this.notificationService.showInfo('İlanınız taslak olarak kaydedildi.');
  }

  cancel(): void {
    this.router.navigate(['/customer/dashboard']);
  }

  getControlError(formGroup: FormGroup, controlName: string): string {
    const control = formGroup.get(controlName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) return 'Bu alan zorunludur.';
      if (control.errors['minlength']) return `En az ${control.errors['minlength'].requiredLength} karakter giriniz.`;
      if (control.errors['maxlength']) return `En fazla ${control.errors['maxlength'].requiredLength} karakter giriniz.`;
      if (control.errors['min']) return 'Geçerli bir değer giriniz.';
    }
    return '';
  }

  isControlInvalid(formGroup: FormGroup, controlName: string): boolean {
    const control = formGroup.get(controlName);
    return !!(control?.invalid && control.touched);
  }

  getCharCount(formGroup: FormGroup, controlName: string): number {
    return formGroup.get(controlName)?.value?.length || 0;
  }
}
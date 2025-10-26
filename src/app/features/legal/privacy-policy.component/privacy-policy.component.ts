import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  lastUpdated = '25 Ekim 2025';
  sections = [
    {
      id: 'giris',
      title: '1. Giriş',
      icon: '📋',
      content: [
        'EmlakNet olarak, kullanıcılarımızın gizliliğine büyük önem veriyoruz. Bu Gizlilik Politikası, kişisel verilerinizin nasıl toplandığını, kullanıldığını, saklandığını ve korunduğunu açıklamaktadır.',
        'Bu politika, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve ilgili mevzuat hükümlerine uygun olarak hazırlanmıştır.',
        'Platformumuzu kullanarak bu gizlilik politikasını kabul etmiş sayılırsınız.'
      ]
    },
    {
      id: 'toplanan-veriler',
      title: '2. Toplanan Kişisel Veriler',
      icon: '📊',
      content: [
        '<strong>Kimlik Bilgileri:</strong>',
        '- Ad, soyad',
        '- T.C. Kimlik numarası (gerekli durumlarda)',
        '- Doğum tarihi',
        '',
        '<strong>İletişim Bilgileri:</strong>',
        '- E-posta adresi',
        '- Telefon numarası',
        '- Açık adres bilgisi',
        '',
        '<strong>Finansal Bilgiler:</strong>',
        '- Banka hesap bilgileri (ödeme işlemleri için)',
        '- Kredi kartı bilgileri (şifreli şekilde)',
        '',
        '<strong>Teknik Veriler:</strong>',
        '- IP adresi',
        '- Tarayıcı türü ve versiyonu',
        '- Cihaz bilgileri',
        '- Çerez verileri',
        '- Kullanım alışkanlıkları',
        '',
        '<strong>İlan ve İçerik Verileri:</strong>',
        '- Yayınladığınız ilan bilgileri',
        '- Fotoğraflar ve açıklamalar',
        '- Favori ilanlar',
        '- Arama geçmişi'
      ]
    },
    {
      id: 'veri-toplama',
      title: '3. Verilerin Toplanma Yöntemleri',
      icon: '🔍',
      content: [
        '<strong>Doğrudan Toplama:</strong>',
        '- Üyelik formu doldurulması',
        '- İlan yayınlama',
        '- İletişim formları',
        '- Telefon ve e-posta iletişimi',
        '',
        '<strong>Otomatik Toplama:</strong>',
        '- Çerezler (cookies)',
        '- Web beacons',
        '- Log kayıtları',
        '- Analitik araçlar (Google Analytics)',
        '',
        '<strong>Üçüncü Taraf Kaynaklar:</strong>',
        '- Sosyal medya hesapları (izninizle)',
        '- Ödeme sağlayıcıları',
        '- Kimlik doğrulama servisleri'
      ]
    },
    {
      id: 'veri-kullanim',
      title: '4. Verilerin Kullanım Amaçları',
      icon: '🎯',
      content: [
        '<strong>Hizmet Sunumu:</strong>',
        '- Hesap oluşturma ve yönetimi',
        '- İlan yayınlama ve görüntüleme',
        '- Kullanıcılar arası iletişimi sağlama',
        '- Özelleştirilmiş deneyim sunma',
        '',
        '<strong>Güvenlik ve Doğrulama:</strong>',
        '- Kimlik doğrulama',
        '- Dolandırıcılık önleme',
        '- Güvenlik açıklarını tespit ve önleme',
        '- Spam ve kötüye kullanımı engelleme',
        '',
        '<strong>İletişim ve Bilgilendirme:</strong>',
        '- Hizmet güncellemeleri',
        '- Pazarlama ve kampanya bildirimleri (izninizle)',
        '- Müşteri destek hizmeti',
        '- Yasal bildirimler',
        '',
        '<strong>Analiz ve İyileştirme:</strong>',
        '- Kullanım istatistikleri',
        '- Performans analizi',
        '- Hizmet kalitesini artırma',
        '- Yeni özellikler geliştirme'
      ]
    },
    {
      id: 'veri-paylasim',
      title: '5. Verilerin Paylaşımı',
      icon: '🤝',
      content: [
        '<strong>Verilerinizi Paylaştığımız Taraflar:</strong>',
        '',
        '<strong>Hizmet Sağlayıcılar:</strong>',
        '- Bulut depolama hizmetleri',
        '- Ödeme işlem sağlayıcıları',
        '- E-posta ve SMS servisleri',
        '- Analitik platformları',
        '',
        '<strong>İş Ortakları:</strong>',
        '- Emlak danışmanları ve acenteler',
        '- Reklam ortakları (anonim veriler)',
        '',
        '<strong>Yasal Zorunluluklar:</strong>',
        '- Mahkeme kararları',
        '- Yasal düzenlemeler',
        '- Kamu otoritelerinin talepleri',
        '',
        '<strong>Veri Paylaşım İlkeleri:</strong>',
        '- Minimum veri paylaşımı prensibi',
        '- Gizlilik sözleşmeleri',
        '- Güvenli veri transfer protokolleri',
        '- Üçüncü tarafların KVKK uyumluluğu'
      ]
    },
    {
      id: 'veri-guvenlik',
      title: '6. Veri Güvenliği',
      icon: '🔒',
      content: [
        '<strong>Teknik Önlemler:</strong>',
        '- SSL/TLS şifreleme',
        '- Güvenlik duvarı (firewall)',
        '- Düzenli güvenlik testleri',
        '- Çift faktörlü kimlik doğrulama',
        '- Veri şifreleme (rest ve transit)',
        '',
        '<strong>İdari Önlemler:</strong>',
        '- Erişim kontrolü ve yetkilendirme',
        '- Personel eğitimleri',
        '- Gizlilik sözleşmeleri',
        '- Düzenli denetimler',
        '',
        '<strong>Fiziksel Önlemler:</strong>',
        '- Güvenli sunucu odaları',
        '- Yedekleme sistemleri',
        '- Felaket kurtarma planları',
        '',
        '<strong>Veri İhlali Durumunda:</strong>',
        '- Kişisel Verileri Koruma Kurulu\'na bildirim (72 saat içinde)',
        '- Etkilenen kullanıcılara bildirim',
        '- Gerekli önlemlerin alınması'
      ]
    },
    {
      id: 'cerezler',
      title: '7. Çerezler (Cookies)',
      icon: '🍪',
      content: [
        '<strong>Çerez Türleri:</strong>',
        '',
        '<strong>Zorunlu Çerezler:</strong>',
        '- Oturum yönetimi',
        '- Güvenlik özellikleri',
        '- Temel işlevsellik',
        '',
        '<strong>Tercih Çerezleri:</strong>',
        '- Dil seçimi',
        '- Tema ayarları',
        '- Görüntüleme tercihleri',
        '',
        '<strong>İstatistik Çerezleri:</strong>',
        '- Google Analytics',
        '- Ziyaretçi sayısı',
        '- Sayfa görüntülenme istatistikleri',
        '',
        '<strong>Pazarlama Çerezleri:</strong>',
        '- Hedefli reklamlar',
        '- Sosyal medya entegrasyonu',
        '- Yeniden pazarlama',
        '',
        '<strong>Çerez Yönetimi:</strong>',
        '- Tarayıcı ayarlarından çerezleri silebilirsiniz',
        '- Çerez tercihlerinizi değiştirebilirsiniz',
        '- Zorunlu çerezler hariç tüm çerezleri reddedebilirsiniz'
      ]
    },
    {
      id: 'haklariniz',
      title: '8. KVKK Kapsamında Haklarınız',
      icon: '⚖️',
      content: [
        'KVKK\'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:',
        '',
        '<strong>1. Bilgi Talep Etme:</strong>',
        '- Kişisel verilerinizin işlenip işlenmediğini öğrenme',
        '- İşlenmişse buna ilişkin bilgi talep etme',
        '',
        '<strong>2. Açıklama İsteme:</strong>',
        '- İşlenme amacını öğrenme',
        '- Kimlere aktarıldığını öğrenme',
        '',
        '<strong>3. Düzeltme Talep Etme:</strong>',
        '- Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme',
        '',
        '<strong>4. Silme ve Yok Etme:</strong>',
        '- İşlenmesini gerektiren sebeplerin ortadan kalkması halinde silme talep etme',
        '',
        '<strong>5. İtiraz Etme:</strong>',
        '- İşlenmesine itiraz etme',
        '- Otomatik sistemler ile analiz edilmesine itiraz etme',
        '',
        '<strong>6. Tazminat Talep Etme:</strong>',
        '- KVKK hükümlerine aykırı işleme nedeniyle zarara uğramanız halinde tazminat talep etme',
        '',
        '<strong>Başvuru Yöntemi:</strong>',
        '- E-posta: kvkk@emlaknet.com',
        '- Posta: EmlakNet A.Ş., İstanbul, Türkiye',
        '- Başvuru formu: www.emlaknet.com/kvkk-basvuru',
        '',
        '<strong>Cevap Süresi:</strong>',
        '- Talebiniz en geç 30 gün içinde sonuçlandırılır',
        '- İşlemin maliyet gerektirmesi halinde Kurulca belirlenen tarifedeki ücret alınabilir'
      ]
    },
    {
      id: 'saklama',
      title: '9. Verilerin Saklanma Süresi',
      icon: '📅',
      content: [
        '<strong>Genel Prensipler:</strong>',
        '- Veriler, işleme amacının gerektirdiği süre boyunca saklanır',
        '- Yasal saklama süreleri dikkate alınır',
        '- Süre sonunda silinir veya anonimleştirilir',
        '',
        '<strong>Saklama Süreleri:</strong>',
        '',
        '<strong>Aktif Üyelik:</strong>',
        '- Üyelik devam ettiği sürece',
        '',
        '<strong>Hesap Kapatma Sonrası:</strong>',
        '- Finansal kayıtlar: 10 yıl (Vergi Usul Kanunu)',
        '- İletişim kayıtları: 3 yıl',
        '- Güvenlik logları: 2 yıl',
        '- Pazarlama izinleri: İzin süresi boyunca',
        '',
        '<strong>Yasal İşlemler:</strong>',
        '- Dava ve takip süreçleri devam ettiği sürece',
        '- Zamanaşımı süreleri boyunca',
        '',
        '<strong>Veri İmhası:</strong>',
        '- Süre bitiminde otomatik silme',
        '- Kurtarılamaz şekilde yok edilme',
        '- İmha kayıtlarının tutulması'
      ]
    },
    {
      id: 'cocuklar',
      title: '10. Çocukların Gizliliği',
      icon: '👶',
      content: [
        'Platformumuz 18 yaş altı bireylere yönelik değildir.',
        '18 yaş altı bireylerin platformu kullanması durumunda veli veya vasinin onayı gerekmektedir.',
        'Bilerek 18 yaş altından veri toplamıyoruz.',
        '18 yaş altı bir çocuğa ait veri topladığımızı fark edersek derhal sileriz.',
        'Ebeveynler, çocuklarının online aktivitelerini takip etmelidir.'
      ]
    },
    {
      id: 'uluslararasi',
      title: '11. Uluslararası Veri Aktarımı',
      icon: '🌍',
      content: [
        '<strong>Aktarım Koşulları:</strong>',
        '- Kural olarak verileriniz Türkiye\'de saklanır',
        '- Yurt dışı aktarımı yalnızca gerekli durumlarda yapılır',
        '- Aktarım için açık rızanız alınır veya yasal zemin oluşturulur',
        '',
        '<strong>Güvenlik Önlemleri:</strong>',
        '- Hedef ülkenin yeterli koruma sağladığının tespiti',
        '- Standart sözleşme hükümleri',
        '- AB Standart Sözleşme Maddeleri',
        '- Privacy Shield sertifikası (ABD için)',
        '',
        '<strong>Kullanılan Hizmetler:</strong>',
        '- Amazon Web Services (AWS) - AB bölgeleri',
        '- Google Cloud Platform - Türkiye/AB',
        '- Diğer hizmet sağlayıcılar yeterli koruma garantisi ile'
      ]
    },
    {
      id: 'degisiklikler',
      title: '12. Politika Değişiklikleri',
      icon: '🔄',
      content: [
        'Bu Gizlilik Politikası gerektiğinde güncellenebilir.',
        'Önemli değişiklikler size e-posta veya platform üzerinden bildirilir.',
        'Güncel versiyon her zaman web sitemizde yayınlanır.',
        'Değişiklikler yayınlandığı tarihte yürürlüğe girer.',
        'Düzenli olarak bu sayfayı kontrol etmenizi öneririz.',
        'Değişikliklerden sonra platformu kullanmaya devam ederseniz, değişiklikleri kabul etmiş sayılırsınız.'
      ]
    }
  ];

  activeSection: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    //window.scrollTo(0, 0);
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      this.activeSection = sectionId;
    }
  }

  printPage(): void {
    window.print();
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  downloadPDF(): void {
    alert('PDF indirme özelliği yakında eklenecek.');
  }
}
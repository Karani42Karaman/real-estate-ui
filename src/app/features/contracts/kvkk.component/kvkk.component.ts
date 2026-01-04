import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-kvkk',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './kvkk.component.html',
  styleUrls: ['./kvkk.component.scss']
})
export class KvkkComponent implements OnInit {
  lastUpdated = '25 Ekim 2025';
  companyInfo = {
    name: 'EmlakNet Emlak Danışmanlık A.Ş.',
    address: 'Levent Mahallesi, Büyükdere Caddesi No:123, Beşiktaş/İstanbul',
    mersis: '0123456789012345',
    phone: '0850 123 45 67',
    email: 'kvkk@emlaknet.com',
    website: 'www.emlaknet.com'
  };

  sections = [
    {
      id: 'veri-sorumlusu',
      title: '1. Veri Sorumlusunun Kimliği',
      icon: '🏢',
      content: [
        '<strong>Veri Sorumlusu:</strong> ' + this.companyInfo.name,
        '<strong>Adres:</strong> ' + this.companyInfo.address,
        '<strong>MERSİS No:</strong> ' + this.companyInfo.mersis,
        '<strong>Telefon:</strong> ' + this.companyInfo.phone,
        '<strong>E-posta:</strong> ' + this.companyInfo.email,
        '<strong>Web Sitesi:</strong> ' + this.companyInfo.website,
        '',
        '6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz veri sorumlusu sıfatıyla tarafımızca aşağıda açıklanan kapsamda işlenebilecektir.'
      ]
    },
    {
      id: 'islenen-veriler',
      title: '2. İşlenen Kişisel Veriler',
      icon: '📊',
      content: [
        '<strong>Kimlik Bilgisi:</strong> Ad, soyad, T.C. kimlik numarası, doğum tarihi, medeni durum',
        '',
        '<strong>İletişim Bilgisi:</strong> Telefon numarası, e-posta adresi, adres bilgisi, faks numarası',
        '',
        '<strong>Lokasyon Verisi:</strong> Konum bilgisi, IP adresi',
        '',
        '<strong>Müşteri İşlem Bilgisi:</strong> İlan bilgileri, arama geçmişi, favori ilanlar, mesajlaşma kayıtları',
        '',
        '<strong>İşlem Güvenliği Bilgisi:</strong> IP adresi, internet sitesi giriş çıkış bilgileri, şifre ve parola bilgileri',
        '',
        '<strong>Finansal Bilgi:</strong> Banka hesap numarası, kredi kartı bilgileri, IBAN numarası',
        '',
        '<strong>Pazarlama Bilgisi:</strong> Alışveriş geçmişi, çerez kayıtları, tercih ve ilgi alanı bilgileri',
        '',
        '<strong>Hukuki İşlem ve Uyum Bilgisi:</strong> Dava/icra dosyası bilgileri, hukuki takip bilgileri',
        '',
        '<strong>Görsel ve İşitsel Kayıtlar:</strong> Fotoğraf, video kayıtları, güvenlik kamerası kayıtları',
        '',
        '<strong>Fiziksel Mekan Güvenliği Bilgisi:</strong> Ofis giriş çıkış kayıtları, ziyaretçi kayıtları'
      ]
    },
    {
      id: 'isleme-amaclari',
      title: '3. Kişisel Verilerin İşlenme Amaçları',
      icon: '🎯',
      content: [
        'Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:',
        '',
        '<strong>Sözleşme İlişkisinin Kurulması ve İfası:</strong>',
        '- Üyelik sözleşmesinin kurulması',
        '- Platform hizmetlerinin sunulması',
        '- İlan yayınlama ve görüntüleme',
        '- Kullanıcılar arası iletişimin sağlanması',
        '',
        '<strong>Yasal Yükümlülüklerin Yerine Getirilmesi:</strong>',
        '- Vergi mevzuatı gereği belge ve kayıt sakl ama',
        '- Kamu kurum ve kuruluşlarının taleplerinin yerine getirilmesi',
        '- Denetim ve raporlama yükümlülüklerinin yerine getirilmesi',
        '',
        '<strong>Meşru Menfaat:</strong>',
        '- İş faaliyetlerinin yürütülmesi',
        '- Müşteri memnuniyeti faaliyetleri',
        '- Pazar araştırması ve analizi',
        '- Reklamcılık ve pazarlama faaliyetleri',
        '- Dolandırıcılık ve kötüye kullanımın önlenmesi',
        '',
        '<strong>Açık Rıza:</strong>',
        '- Pazarlama ve tanıtım faaliyetleri',
        '- Üçüncü kişilere veri aktarımı',
        '- Özel nitelikli kişisel veri işleme (gerektiğinde)'
      ]
    },
    {
      id: 'isleme-hukuki-sebep',
      title: '4. Kişisel Verilerin İşlenmesinin Hukuki Sebepleri',
      icon: '⚖️',
      content: [
        'KVKK\'nın 5. ve 6. maddeleri kapsamında kişisel verileriniz aşağıdaki hukuki sebeplere dayanılarak işlenmektedir:',
        '',
        '<strong>Kanunlarda Açıkça Öngörülmesi:</strong>',
        '- Vergi Usul Kanunu',
        '- Türk Ticaret Kanunu',
        '- Tüketicinin Korunması Hakkında Kanun',
        '- İş Kanunu',
        '',
        '<strong>Bir Sözleşmenin Kurulması veya İfası:</strong>',
        '- Üyelik sözleşmesi',
        '- Hizmet sözleşmeleri',
        '- Alım-satım sözleşmeleri',
        '',
        '<strong>Veri Sorumlusunun Hukuki Yükümlülüğünü Yerine Getirebilmesi:</strong>',
        '- Kamu otoritelerine bilgi verme',
        '- Mali denetim ve raporlama',
        '- Yasal saklama yükümlülükleri',
        '',
        '<strong>İlgili Kişinin Temel Hak ve Özgürlüklerine Zarar Vermemek Kaydıyla Veri Sorumlusunun Meşru Menfaatleri:</strong>',
        '- İş geliştirme faaliyetleri',
        '- Müşteri ilişkileri yönetimi',
        '- Bilgi güvenliği',
        '- Fiziksel mekan güvenliği',
        '',
        '<strong>Açık Rıza:</strong>',
        '- Pazarlama iletişimi',
        '- Üçüncü taraflara veri paylaşımı',
        '- Özel nitelikli kişisel veri işleme'
      ]
    },
    {
      id: 'veri-aktarimi',
      title: '5. Kişisel Verilerin Aktarılması',
      icon: '🔄',
      content: [
        '<strong>Yurt İçi Aktarım:</strong>',
        '',
        '<strong>İş Ortaklarımıza:</strong>',
        '- Emlak danışmanları ve acenteler',
        '- Hizmet sağlayıcılar',
        '- Bilgi teknolojileri altyapı hizmeti sağlayıcıları',
        '- Ödeme kuruluşları',
        '',
        '<strong>Kamu Kurum ve Kuruluşlarına:</strong>',
        '- Mahkemeler',
        '- Savcılıklar',
        '- Emniyet Müdürlükleri',
        '- Vergi Dairesi',
        '- Kişisel Verileri Koruma Kurulu',
        '',
        '<strong>Yasal Zorunluluk Gereği:</strong>',
        '- Adli makamların talebi',
        '- Yasal düzenlemeler',
        '- Kamu otoritelerinin yetki alanı',
        '',
        '<strong>Yurt Dışı Aktarım:</strong>',
        '',
        'Kişisel verileriniz KVKK\'nın 9. maddesi uyarınca:',
        '- İlgili kişinin açık rızası',
        '- Kişisel Verileri Koruma Kurulu\'nun izni',
        '- Yeterli koruma bulunan ülkeler',
        '',
        'şartlarına uygun olarak yurt dışına aktarılabilir.',
        '',
        '<strong>Veri Aktarım Güvenliği:</strong>',
        '- Gizlilik sözleşmeleri',
        '- Veri işleme sözleşmeleri',
        '- Standart sözleşme hükümleri',
        '- Teknik ve idari güvenlik önlemleri'
      ]
    },
    {
      id: 'toplama-yontemi',
      title: '6. Kişisel Verilerin Toplanma Yöntemi',
      icon: '📝',
      content: [
        '<strong>Elektronik Ortam:</strong>',
        '- Web sitesi üyelik formu',
        '- Mobil uygulama',
        '- E-posta',
        '- Çağrı merkezi',
        '- Çerezler (cookies)',
        '- Sosyal medya',
        '',
        '<strong>Fiziksel Ortam:</strong>',
        '- Yazılı başvuru formları',
        '- Sözleşmeler',
        '- Faturalar ve dekontlar',
        '- Güvenlik kamera kayıtları',
        '',
        '<strong>Otomatik Yöntemler:</strong>',
        '- Log kayıtları',
        '- Analitik araçlar',
        '- Pixel etiketleri',
        '- Web beacons',
        '',
        '<strong>Üçüncü Taraflardan:</strong>',
        '- Kimlik doğrulama servisleri',
        '- Ödeme sağlayıcıları',
        '- Sosyal medya platformları (izninizle)'
      ]
    },
    {
      id: 'ilgili-kisi-haklari',
      title: '7. İlgili Kişi Olarak Haklarınız',
      icon: '🛡️',
      content: [
        'KVKK\'nın 11. maddesi uyarınca, veri sorumlusuna başvurarak aşağıdaki haklarınızı kullanabilirsiniz:',
        '',
        '<strong>a) Kişisel Veri İşlenip İşlenmediğini Öğrenme</strong>',
        'Kişisel verilerinizin işlenip işlenmediğini sorabilirsiniz.',
        '',
        '<strong>b) Bilgi Talep Etme</strong>',
        'İşlenmişse buna ilişkin bilgi talep edebilirsiniz.',
        '',
        '<strong>c) İşlenme Amacını ve Amaca Uygun Kullanılıp Kullanılmadığını Öğrenme</strong>',
        'Verilerinizin hangi amaçla işlendiğini ve bu amaca uygun kullanılıp kullanılmadığını öğrenebilirsiniz.',
        '',
        '<strong>d) Yurt İçi veya Yurt Dışında Aktarıldığı Üçüncü Kişileri Bilme</strong>',
        'Kişisel verilerinizin kimlere aktarıldığını öğrenebilirsiniz.',
        '',
        '<strong>e) Eksik veya Yanlış İşlenmişse Düzeltilmesini İsteme</strong>',
        'Hatalı veya eksik verilerin düzeltilmesini talep edebilirsiniz.',
        '',
        '<strong>f) KVKK Kapsamında Silinmesini veya Yok Edilmesini İsteme</strong>',
        'İşlenmesini gerektiren sebeplerin ortadan kalkması halinde silinmesini isteyebilirsiniz.',
        '',
        '<strong>g) Düzeltme, Silme ve Yok Edilme İşlemlerinin Aktarıldığı Üçüncü Kişilere Bildirilmesini İsteme</strong>',
        'Yapılan işlemlerin, verilerin aktarıldığı üçüncü kişilere bildirilmesini talep edebilirsiniz.',
        '',
        '<strong>h) İşlenen Verilerin Münhasıran Otomatik Sistemler ile Analiz Edilmesi Sonucuna İtiraz Etme</strong>',
        'Otomatik sistemlerle analiz edilmesine itiraz edebilirsiniz.',
        '',
        '<strong>ı) Kanuna Aykırı İşleme Nedeniyle Zarara Uğraması Halinde Zararın Giderilmesini Talep Etme</strong>',
        'KVKK\'ya aykırı işleme nedeniyle zarar görürseniz tazminat talep edebilirsiniz.'
      ]
    },
    {
      id: 'basvuru-yontemleri',
      title: '8. Başvuru Yöntemleri ve Süreç',
      icon: '📬',
      content: [
        '<strong>Başvuru Kanalları:</strong>',
        '',
        '<strong>1. Yazılı Başvuru:</strong>',
        'Adres: ' + this.companyInfo.address,
        'Başvuru formunu doldurarak ıslak imzalı şekilde gönderebilirsiniz.',
        '',
        '<strong>2. Elektronik Başvuru:</strong>',
        'E-posta: kvkk@emlaknet.com',
        'Kayıtlı Elektronik Posta (KEP): emlaknet@hs01.kep.tr',
        'Güvenli elektronik imza ile imzalanmış başvuru gönderebilirsiniz.',
        '',
        '<strong>3. Web Sitesi Üzerinden:</strong>',
        'www.emlaknet.com/kvkk-basvuru adresinden online başvuru yapabilirsiniz.',
        '',
        '<strong>Başvuru İçeriği:</strong>',
        '- Ad, soyad',
        '- T.C. kimlik numarası',
        '- İletişim bilgileri (adres, e-posta, telefon)',
        '- Talep konusu',
        '- Varsa talebe konu belge ve bilgiler',
        '',
        '<strong>Kimlik Tespiti:</strong>',
        'Başvurunuzda kimliğinizi tespit edici belgeler (T.C. kimlik fotokopisi, imza beyannamesi vb.) istenebilir.',
        '',
        '<strong>Değerlendirme Süreci:</strong>',
        '- Başvurunuz en kısa sürede, en geç 30 gün içinde yanıtlanır',
        '- Başvuru ücretsizdir',
        '- İşlemin ayrıca bir maliyet gerektirmesi halinde Kişisel Verileri Koruma Kurulu tarafından belirlenen tarifedeki ücret alınır',
        '- Cevap yazılı veya elektronik ortamda gönderilebilir',
        '',
        '<strong>Ret Durumu:</strong>',
        'Talebinizin reddedilmesi, verilen cevabın yetersiz bulunması veya süresinde cevap verilmemesi hallerinde Kişisel Verileri Koruma Kurulu\'na şikayette bulunabilirsiniz.'
      ]
    },
    {
      id: 'veri-guvenlik',
      title: '9. Veri Güvenliği',
      icon: '🔐',
      content: [
        'Şirketimiz, KVKK\'nın 12. maddesi gereğince kişisel verilerin hukuka aykırı olarak işlenmesini önlemek, kişisel verilere hukuka aykırı olarak erişilmesini önlemek ve kişisel verilerin muhafazasını sağlamak amacıyla uygun güvenlik düzeyini temin etmeye yönelik gerekli teknik ve idari tedbirleri almaktadır.',
        '',
        '<strong>Teknik Güvenlik Önlemleri:</strong>',
        '- Güvenlik duvarı (firewall) sistemleri',
        '- SSL sertifikası ve şifreleme',
        '- Antivirüs ve anti-malware yazılımları',
        '- Sızma testleri',
        '- Güvenlik açığı taramaları',
        '- Log kayıtlarının tutulması',
        '- Yedekleme sistemleri',
        '- Erişim kontrol sistemleri',
        '',
        '<strong>İdari Güvenlik Önlemleri:</strong>',
        '- Veri güvenliği politikaları',
        '- Personel eğitimleri',
        '- Gizlilik taahhütnameleri',
        '- Yetkilendirme matrisleri',
        '- Düzenli denetimler',
        '- Olay müdahale prosedürleri',
        '',
        '<strong>Fiziksel Güvenlik Önlemleri:</strong>',
        '- Güvenlik kameraları',
        '- Giriş kontrol sistemleri',
        '- Ziyaretçi kayıt sistemi',
        '- Güvenli arşiv odaları',
        '',
        '<strong>Veri İhlali Yönetimi:</strong>',
        '- İhlal tespit sistemleri',
        '- Olay müdahale ekibi',
        '- 72 saat içinde Kurula bildirim',
        '- İlgili kişilere bildirim',
        '- Düzeltici faaliyetler'
      ]
    },
    {
      id: 'politika-guncellemeleri',
      title: '10. Aydınlatma Metninde Değişiklikler',
      icon: '🔄',
      content: [
        'Bu Aydınlatma Metni, yasal düzenlemelerdeki değişiklikler veya şirket politikalarındaki güncellemeler doğrultusunda revize edilebilir.',
        '',
        '<strong>Güncelleme Bildirimi:</strong>',
        '- Önemli değişiklikler e-posta ile bildirilir',
        '- Web sitesinde duyuru yapılır',
        '- Platform üzerinden bildirim gönderilir',
        '',
        '<strong>Yürürlük:</strong>',
        '- Güncellemeler yayınlandığı tarihte yürürlüğe girer',
        '- Değişiklikler bu sayfada gösterilir',
        '- Son güncelleme tarihi belirtilir',
        '',
        '<strong>Kullanıcı Sorumluluğu:</strong>',
        '- Düzenli olarak bu metni kontrol ediniz',
        '- Güncellemelerden haberdar olunuz',
        '- Değişikliklere itirazınız varsa hesabınızı kapatabilirsiniz'
      ]
    },
    {
      id: 'iletisim',
      title: '11. İletişim Bilgileri',
      icon: '📞',
      content: [
        '<strong>Veri Sorumlusu:</strong>',
        this.companyInfo.name,
        '',
        '<strong>Adres:</strong>',
        this.companyInfo.address,
        '',
        '<strong>MERSİS No:</strong>',
        this.companyInfo.mersis,
        '',
        '<strong>Telefon:</strong>',
        this.companyInfo.phone,
        '',
        '<strong>E-posta:</strong>',
        this.companyInfo.email,
        '',
        '<strong>KVKK Başvuru E-posta:</strong>',
        'kvkk@emlaknet.com',
        '',
        '<strong>Web Sitesi:</strong>',
        this.companyInfo.website,
        '',
        '<strong>Çalışma Saatleri:</strong>',
        'Hafta içi: 09:00 - 18:00',
        'Cumartesi: 10:00 - 16:00',
        'Pazar: Kapalı',
        '',
        '<strong>Kişisel Verileri Koruma Kurumu:</strong>',
        'Web: www.kvkk.gov.tr',
        'E-posta: kvkk@kvkk.gov.tr',
        'Tel: 0 (312) 216 50 50'
      ]
    }
  ];

  activeSection: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
   // window.scrollTo(0, 0);
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

  sendKvkkRequest(): void {
    window.location.href = 'mailto:kvkk@emlaknet.com?subject=KVKK Başvurusu';
  }
}
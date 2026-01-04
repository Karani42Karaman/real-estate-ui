import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-terms-of-service',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.scss']
})
export class TermsOfServiceComponent implements OnInit {
  lastUpdated = '25 Ekim 2025';
  sections = [
    {
      id: 'genel',
      title: '1. Genel Hükümler',
      icon: '📋',
      content: [
        'Bu kullanım şartları, EmlakNet platformunu kullanan tüm kullanıcılar için geçerlidir.',
        'Platformumuzu kullanarak bu şartları kabul etmiş sayılırsınız.',
        'EmlakNet, bu şartları önceden haber vermeksizin değiştirme hakkını saklı tutar.',
        'Değişiklikler yayınlandığı anda yürürlüğe girer.'
      ]
    },
    {
      id: 'tanim',
      title: '2. Tanımlar',
      icon: '📖',
      content: [
        '<strong>Platform:</strong> EmlakNet web sitesi ve mobil uygulamalarını ifade eder.',
        '<strong>Kullanıcı:</strong> Platformu kullanan gerçek veya tüzel kişilerdir.',
        '<strong>İlan:</strong> Platform üzerinden yayınlanan emlak alım, satım veya kiralama ilanlarıdır.',
        '<strong>İçerik:</strong> Platform üzerindeki tüm metin, görsel, video ve diğer materyalleri kapsar.'
      ]
    },
    {
      id: 'uyelik',
      title: '3. Üyelik ve Hesap Güvenliği',
      icon: '👤',
      content: [
        'Üyelik için 18 yaşını doldurmuş olmak zorunludur.',
        'Kayıt sırasında verilen bilgilerin doğru ve güncel olması gerekmektedir.',
        'Kullanıcı adı ve şifrenizin güvenliğinden siz sorumlusunuz.',
        'Hesabınızda yetkisiz kullanım fark ederseniz derhal bildiriniz.',
        'Bir kişi yalnızca bir hesap açabilir.',
        'Hesap bilgilerinizi başkalarıyla paylaşmayınız.'
      ]
    },
    {
      id: 'ilan',
      title: '4. İlan Yayınlama Kuralları',
      icon: '🏠',
      content: [
        '<strong>Yasaklanan İçerikler:</strong>',
        '- Yanıltıcı veya yanlış bilgiler içeren ilanlar',
        '- Başkasına ait mülkün izinsiz ilanı',
        '- Müstehcen, hakaret içeren veya yasadışı içerikler',
        '- Telif hakkı ihlali içeren görseller',
        '',
        '<strong>İlan Gereklilikleri:</strong>',
        '- Güncel ve doğru fiyat bilgisi',
        '- Net ve kaliteli fotoğraflar',
        '- Detaylı ve dürüst açıklamalar',
        '- İletişim bilgilerinin doğruluğu'
      ]
    },
    {
      id: 'sorumluluk',
      title: '5. Sorumluluklar ve Yükümlülükler',
      icon: '⚖️',
      content: [
        '<strong>Kullanıcı Sorumlulukları:</strong>',
        '- İlan içeriklerinin doğruluğundan kullanıcı sorumludur',
        '- Platform üzerinden yapılan işlemler kendi sorumluluğunuzdadır',
        '- Diğer kullanıcılara saygılı davranmak zorunludur',
        '',
        '<strong>EmlakNet Sorumlulukları:</strong>',
        '- Platform güvenliğini sağlamak',
        '- Kullanıcı verilerini korumak',
        '- Hizmet kalitesini sürdürmek',
        '',
        '<strong>Sorumluluk Sınırlamaları:</strong>',
        '- Kullanıcılar arası anlaşmazlıklardan sorumlu değiliz',
        '- İlan içeriklerinin doğruluğunu garanti etmeyiz',
        '- Üçüncü taraf bağlantılardan sorumlu değiliz'
      ]
    },
    {
      id: 'odeme',
      title: '6. Ödeme ve İptal Politikası',
      icon: '💳',
      content: [
        '<strong>Ücretli Hizmetler:</strong>',
        '- VIP ilan paketi',
        '- Öne çıkarılmış ilan',
        '- Premium üyelik',
        '',
        '<strong>Ödeme Yöntemleri:</strong>',
        '- Kredi kartı / Banka kartı',
        '- Havale / EFT',
        '- Dijital cüzdanlar',
        '',
        '<strong>İade ve İptal:</strong>',
        '- Hizmet kullanılmadan önce iptal durumunda tam iade',
        '- Kullanılmış hizmetlerde iade yapılmaz',
        '- İadeler 7-14 iş günü içinde hesabınıza yansır'
      ]
    },
    {
      id: 'fikri',
      title: '7. Fikri Mülkiyet Hakları',
      icon: '©️',
      content: [
        'Platform üzerindeki tüm içerik, tasarım ve kod EmlakNet\'e aittir.',
        'İçeriklerin izinsiz kopyalanması, dağıtılması yasaktır.',
        'Kullanıcılar, yükledikleri içeriklerin haklarına sahip olduklarını beyan ederler.',
        'EmlakNet, platform üzerinde yayınlanan içerikleri kullanma hakkına sahiptir.',
        'Telif hakkı ihlali bildirimleri derhal değerlendirilir.'
      ]
    },
    {
      id: 'gizlilik',
      title: '8. Gizlilik ve Veri Koruma',
      icon: '🔒',
      content: [
        'Kişisel verileriniz KVKK kapsamında korunur.',
        'Detaylı bilgi için <a href="/contracts/privacy-policy">Gizlilik Politikası</a>nı inceleyiniz.',
        'Verileriniz üçüncü taraflarla paylaşılmaz (yasal zorunluluk dışında).',
        'İstediğiniz zaman verilerinizi silebilir veya düzenleyebilirsiniz.'
      ]
    },
    {
      id: 'fesih',
      title: '9. Hesap Askıya Alma ve Fesih',
      icon: '🚫',
      content: [
        '<strong>Hesap Askıya Alma Nedenleri:</strong>',
        '- Kullanım şartlarının ihlali',
        '- Hileli veya yanıltıcı davranışlar',
        '- Diğer kullanıcılara zarar verme',
        '- Spam veya kötüye kullanım',
        '',
        '<strong>Fesih Süreci:</strong>',
        '- İhlal durumunda uyarı veya doğrudan fesih',
        '- Kullanıcı hesabını istediği zaman kapatabilir',
        '- Fesih sonrası veriler 6 ay saklanır (yasal zorunluluk)',
        '- Fesih edilen hesaplar yeniden açılamaz'
      ]
    },
    {
      id: 'uyusmazlik',
      title: '10. Uyuşmazlık Çözümü',
      icon: '⚡',
      content: [
        '<strong>Yasal Çerçeve:</strong>',
        '- Bu sözleşme Türkiye Cumhuriyeti yasalarına tabidir',
        '- Uyuşmazlıklar öncelikle dostane çözülmeye çalışılır',
        '- Çözüm sağlanamazsa İstanbul mahkemeleri ve icra daireleri yetkilidir',
        '',
        '<strong>İletişim:</strong>',
        '- E-posta: contracts@emlaknet.com',
        '- Telefon: 0850 123 45 67',
        '- Adres: İstanbul, Türkiye'
      ]
    },
    {
      id: 'diger',
      title: '11. Diğer Hükümler',
      icon: '📌',
      content: [
        'Bu sözleşmenin herhangi bir maddesi geçersiz sayılırsa, diğer maddeler geçerliliğini korur.',
        'EmlakNet bildirimde bulunmaksızın hizmetleri değiştirebilir veya sonlandırabilir.',
        'Mücbir sebepler durumunda EmlakNet sorumlu tutulamaz.',
        'Bu şartların Türkçe versiyonu esas alınır.',
        'Güncellemeler bu sayfada yayınlanır ve kullanıcılara bildirilir.'
      ]
    }
  ];

  activeSection: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Sayfa yüklendiğinde en üste scroll
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
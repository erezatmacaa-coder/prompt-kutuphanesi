function getTurkishPrompts() {
  const today = new Date().toLocaleDateString('tr-TR');
  const result = [];
  let id = Date.now();

  const categories = {
    yazilim: {
      titles: [
        'Kod Açıklaması', 'Hata Ayıklama', 'Kod İyileştirme', 'Test Yazma', 'Dökümantasyon',
        'API Tasarımı', 'Veritabanı Sorgusu', 'Algoritma Çözümü', 'Regex Oluşturma', 'Kod İnceleme',
        'Refactoring', 'Debug Yardımı', 'CLI Komutu', 'Config Ayarları', 'Deploy Kontrol',
        'Güvenlik Taraması', 'Performance Optimizasyonu', 'Versiyon Yükseltme', 'Kod Dönüştürme',
        'Log Analizi'
      ],
      actions: [
        'Şu kodu satır satır açıkla: [KOD]',
        'Bu kodda hata var, bul ve düzelt: [KOD]',
        'Şu kodu daha temiz yaz: [KOD]',
        'Bu fonksiyon için unit test yaz: [KOD]',
        'Şu API endpoint\'i için dökümantasyon hazırla: [KOD]',
        'Şu işlevi yapan bir API tasarla: [İŞLEV]',
        'Şu veri için SQL sorgusu yaz: [VERİ]',
        'Şu problemi en verimli algoritmayla çöz: [PROBLEM]',
        'Şu metin için regex deseni oluştur: [METİN]',
        'Şu kod parçasını code review yap: [KOD]',
        'Şu kodu daha performanslı hale getir: [KOD]',
        'Şu hatayı debug etmeme yardımcı ol: [HATA]',
        'Şu işlemi yapan bir CLI komutu yaz: [İŞLEM]',
        'Şu framework için konfigürasyon hazırla: [FRAMEWORK]',
        'Şu uygulamayı production\'a deploy etmek için gerekenleri listele',
        'Şu kodda güvenlik açığı var mı kontrol et: [KOD]',
        'Şu sorguyu optimize et: [SORGU]',
        'Şu kütüphaneyi yeni versiyona geçirmek için yapılması gerekenler: [KÜTÜPHANE]',
        'Şu kodu Python\'dan JavaScript\'e dönüştür: [KOD]',
        'Şu log kayıtlarını analiz et ve sorunu bul: [LOG]'
      ],
      topics: [
        'Python', 'JavaScript', 'Java', 'Go', 'Rust', 'TypeScript', 'C#', 'PHP',
        'React', 'Vue', 'Angular', 'Node.js', 'Django', 'Flask', 'FastAPI',
        'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes',
        'GraphQL', 'REST API', 'WebSocket', 'gRPC', 'RabbitMQ',
        'AWS Lambda', 'Azure Functions', 'Firebase', 'Heroku', 'Vercel'
      ]
    },
    yaraticilik: {
      titles: [
        'Hikaye Oluştur', 'Şiir Yaz', 'Karakter Tasarla', 'Diyalog Yaz', 'Slogan Bul',
        'Logo Fikri', 'Renk Paleti', 'İsim Bul', 'Manzara Tasviri', 'Rüya Yorumu',
        'Şarkı Sözü', 'Film Senaryosu', 'Oyun Hikayesi', 'Mizah Yazısı', 'Metafor Üret',
        'Atasözü Türet', 'Takma İsim', 'Hikaye Başlığı', 'Blog Fikri', 'Yaratıcı Çözüm'
      ],
      actions: [
        '[KONU] hakkında kısa bir hikaye yaz. Ton: [TON].',
        '[KONU] temalı bir şiir yaz, [UZUNLUK] dörtlük olsun.',
        'Fantastik bir evren için [ÖZELLİK] özelliklerine sahip bir karakter tasarla.',
        '[KARAKTER1] ve [KARAKTER2] arasında [KONU] hakkında komik bir diyalog yaz.',
        '[ÜRÜN] için yaratıcı bir slogan bul, akılda kalıcı olsun.',
        '[SEKTÖR] sektörü için bir logo konsepti oluştur. Renkler: [RENKLER].',
        '[TEMA] temalı bir renk paleti oluştur, 5 renk.',
        '[KONSEPT] ile ilgili benzersiz bir isim bul.',
        '[YER] manzarasını görselleştir ve detaylıca tasvir et.',
        'Şu rüyayı yorumla: [RÜYA].',
        '[KONU] hakkında duygusal bir şarkı sözü yaz.',
        '[TEMA] temalı kısa bir film senaryosu yaz, 3 sahne.',
        'Bir RPG oyunu için [TEMA] temalı ana hikaye tasarla.',
        '[KONU] hakkında esprili bir yazı kaleme al.',
        '[KAVRAM] için yaratıcı bir metafor bul.',
        '[KONU] ile ilgili yeni bir deyim veya atasözü türet.',
        '[KARAKTER] karakteri için havalı bir takma isim bul.',
        '[KONU] ile ilgili ilgi çekici 10 blog başlığı öner.',
        'Günlük hayatta karşılaştığımız [SORUN] için yaratıcı bir çözüm öner.',
        '[KAVRAM] ile ilgili sıradışı bir bakış açısı yaz.'
      ],
      topics: ['Uzay', 'Deniz', 'Orman', 'Gelecek', 'Geçmiş', 'Aşk', 'Dostluk', 'Macera', 'Gizem', 'Bilim Kurgu'],
      tons: ['komik', 'ciddi', 'melankolik', 'heyecanlı', 'düşünceli', 'absürt', 'romantik', 'gerilimli', 'umut dolu', 'nostaljik'],
      chars: ['Zeynep', 'Murat', 'Luna', 'Max', 'Ada', 'Ege', 'Lily', 'Kai', 'Ela', 'Rüzgar']
    },
    egitim: {
      titles: [
        'Konu Özeti', 'Soru Hazırla', 'Kelime Açıklaması', 'Not Çıkar', 'Ders Planı',
        'Flash Card', 'Örnek Soru', 'Araştırma Konusu', 'Ezber Tekniği', 'Zaman Çizelgesi',
        'Kitap Özeti', 'Makale Analizi', 'Deney Tasarla', 'Tez Konusu', 'Çalışma Programı',
        'Bilgi Grafiği', 'Sunum Hazırla', 'Tartışma Sorusu', 'Kavram Haritası', 'Quiz Hazırla'
      ],
      actions: [
        '[KONU] hakkında detaylı özet çıkar, önemli noktaları listele.',
        '[KONU] ile ilgili 10 adet çoktan seçmeli soru hazırla.',
        '[KELİME] kelimesini detaylıca açıkla, kökenini ve kullanımını anlat.',
        '[KONU] ile ilgili ders notları hazırla, ana başlıklara ayır.',
        '[KONU] için 40 dakikalık bir ders planı oluştur.',
        '[KONU] ile ilgili 20 adet flash card hazırla, soru-cevap şeklinde.',
        '[KONU] ile ilgili zorluk seviyesi [SEVİYE] olan örnek sorular hazırla.',
        '[KONU] hakkında yapılabilecek 5 araştırma sorusu öner.',
        '[KONU] ile ilgili etkili bir ezber tekniği öner.',
        '[KONU] için adım adım çalışma programı hazırla, 1 haftalık.',
        '[KİTAP] kitabının kısa özetini çıkar ve ana temalarını açıkla.',
        '[MAKALE] makalesini analiz et, güçlü ve zayıf yönlerini belirt.',
        '[KONU] ile ilgili basit bir deney tasarla, malzemeleri listele.',
        '[ALAN] alanında güncel bir tez konusu öner.',
        '[SINAV] için 1 aylık ders çalışma programı oluştur.',
        '[KONU] ile ilgili bir bilgi grafiği içeriği hazırla.',
        '[KONU] hakkında etkileyici bir sunum taslağı hazırla, 10 slayt.',
        '[KONU] ile ilgili tartışma soruları hazırla.',
        '[KONU] ile ilgili kavram haritası oluştur, ilişkileri göster.',
        '[KONU] hakkında kısa bir quiz hazırla, 5 soru.'
      ],
      topics: [
        'Fotosentez', 'DNA Replikasyonu', 'Küresel Isınma', 'Felsefe', 'Osmanlı Tarihi',
        'Kuantum Fiziği', 'Matematik', 'Dil Bilgisi', 'Coğrafya', 'Psikoloji',
        'Ekonomi', 'Kimya', 'Astronomi', 'Mitoloji', 'Yapay Zeka',
        'İkinci Dünya Savaşı', 'Sürdürülebilirlik', 'Demokrasi', 'Evrim Teorisi', 'Dijital Dönüşüm'
      ]
    },
    is: {
      titles: [
        'E-posta Taslağı', 'Toplantı Notları', 'İş İlanı', 'Sunum Metni', 'SWOT Analizi',
        'Strateji Belirle', 'Bütçe Planı', 'Proje Özeti', 'Müşteri Mektubu', 'Rapor Hazırla',
        'Pazarlama Metni', 'Teklif Mektubu', 'Sözleşme Özeti', 'Performans Değerlendirme', 'İş Planı',
        'LinkedIn Yazısı', 'Tanıtım Yazısı', 'Anket Sorusu', 'Kriz Yönetimi', 'Roadmap Oluştur'
      ],
      actions: [
        '[KONU] hakkında profesyonel e-posta taslağı hazırla, alıcı: [ALICI].',
        '[TOPLANTI] toplantısı için detaylı notlar hazırla, gündem maddeleri: [GÜNDEM].',
        '[POZİSYON] pozisyonu için kapsamlı bir iş ilanı yaz.',
        '[KONU] hakkında ikna edici bir sunum metni hazırla, [SÜRE] dakikalık.',
        '[ŞİRKET] için SWOT analizi yap: Güçlü yönler, Zayıf yönler, Fırsatlar, Tehditler.',
        '[HEDEF] hedefine ulaşmak için 6 aylık strateji belirle.',
        '[PROJE] için detaylı bütçe planı hazırla.',
        '[PROJE] projesini yöneticine özetle: amaç, kapsam, zaman çizelgesi.',
        '[MÜŞTERI] müşterisine resmi bir teşekkür mektubu yaz.',
        '[KONU] hakkında kapsamlı bir durum raporu hazırla.',
        '[ÜRÜN] için etkileyici bir pazarlama metni yaz, hedef kitle: [KITLE].',
        '[PROJE] için profesyonel bir teklif mektubu hazırla.',
        '[KONU] ile ilgili sözleşmenin önemli maddelerini özetle.',
        '[KİŞİ] için performans değerlendirme raporu hazırla.',
        'Bir [SEKTÖR] girişimi için kısa iş planı hazırla: vizyon, misyon, hedefler.',
        '[KONU] hakkında LinkedIn\'de yayınlamak için profesyonel bir yazı yaz.',
        '[ÜRÜN/HİZMET] için kısa bir tanıtım yazısı hazırla.',
        '[KONU] hakkında müşteri memnuniyeti anketi için sorular hazırla.',
        '[DURUM] durumunda kriz yönetimi planı hazırla, adım adım.',
        '[ÜRÜN] için 6 aylık ürün roadmap\'i oluştur.'
      ],
      topics: [
        'Satış Stratejisi', 'Dijital Pazarlama', 'Müşteri İlişkileri', 'Ürün Lansmanı', 'Takım Yönetimi',
        'Bütçe Planlaması', 'Pazar Araştırması', 'Marka Bilinirliği', 'Veri Analizi', 'İş Süreçleri',
        'Müşteri Desteği', 'İnsan Kaynakları', 'Halkla İlişkiler', 'Satış Ortaklığı', 'E-ticaret'
      ]
    },
    gunluk: {
      titles: [
        'Yemek Tarifi', 'Seyahat Planı', 'Alışveriş Listesi', 'Film Önerisi', 'Kitap Önerisi',
        'Egzersiz Programı', 'Günlük Rutin', 'Hediye Fikri', 'Kariyer Tavsiyesi', 'Dekorasyon Fikri',
        'Bütçe Takibi', 'Yeni Hobi', 'Sağlık Tavsiyesi', 'Davetiye Metni', 'Sosyal Medya Yazısı',
        'Bahçe İpuçları', 'Ev Temizliği', 'Dil Öğrenme', 'Kişisel Gelişim', 'Hafta Sonu Planı'
      ],
      actions: [
        '[MALZEMELER] ile yapılabilecek kolay bir yemek tarifi ver.',
        '[YER] için 3 günlük seyahat planı hazırla, bütçe: [BÜTÇE] TL.',
        '[DURUM] için alışveriş listesi hazırla, bütçene dikkat et.',
        '[TÜR] filmleri seviyorsan izlemen gereken 5 film öner.',
        '[TÜR] kitaplardan hoşlanıyorsan 5 kitap öner ve nedenini açıkla.',
        'Evde yapılabilecek [SÜRE] dakikalık günlük egzersiz programı hazırla.',
        'Verimli bir gün için sabah rutini öner, 5 madde.',
        '[KİŞİ] için bütçesi [BÜTÇE] TL olan yaratıcı bir hediye fikri bul.',
        '[ALAN] alanında kariyer yapmak isteyen birine 5 tavsiye ver.',
        'Küçük bir odayı daha ferah gösterecek dekorasyon fikirleri ver.',
        'Aylık bütçe takibi için basit bir tablo hazırla, gider kategorileri: [KATEGORİLER].',
        'Evde başlanabilecek [BÜTÇE] TL bütçeli yaratıcı bir hobi öner.',
        '[DURUM] için sağlıklı yaşam tavsiyeleri ver, 5 madde.',
        '[KONU] temalı bir doğum günü davetiyesi metni yaz.',
        '[KONU] hakkında Instagram\'da paylaşmak için ilgi çekici bir gönderi yaz.',
        'Evde kolayca yetiştirilebilecek 5 bitki öner ve bakım ipuçları ver.',
        'Hızlı ev temizliği için 10 adımlık bir plan hazırla.',
        'Yeni bir dil öğrenmeye başlayan biri için 1 aylık çalışma programı hazırla.',
        '[KONU] hakkında kişisel gelişim kitapları öner, nedenlerini açıkla.',
        'Hafta sonu evde yapılabilecek eğlenceli 10 aktivite öner.'
      ],
      topics: ['Kahvaltı', 'Spor', 'Okuma', 'Müzik', 'Doğa', 'Teknoloji', 'Moda', 'Yemek', 'Seyahat', 'Hobi'],
      places: ['İstanbul', 'Paris', 'Tokyo', 'Karabük', 'New York', 'Roma', 'Bali', 'Kapadokya', 'Londra', 'Antalya']
    }
  };

  Object.keys(categories).forEach(cat => {
    const data = categories[cat];
    for (let i = 1; i <= 200; i++) {
      const title = data.titles[Math.floor(Math.random() * data.titles.length)] + (i > data.titles.length ? ` #${i}` : '');
      let text = data.actions[Math.floor(Math.random() * data.actions.length)];
      text = text.replace('[KONU]', data.topics[Math.floor(Math.random() * data.topics.length)]);
      text = text.replace('[KOD]', '```kod\n# kod parçanı buraya yapıştır\n```');
      text = text.replace('[KOD]', '```kod\n# kod parçanı buraya yapıştır\n```');
      if (text.includes('[TON]')) {
        text = text.replace('[TON]', data.tons ? data.tons[Math.floor(Math.random() * data.tons.length)] : 'nötr');
      }
      if (text.includes('[KARAKTER]')) {
        text = text.replace('[KARAKTER]', 'Ana Karakter');
      }
      if (text.includes('[KARAKTERLER]')) {
        text = text.replace('[KARAKTERLER]', data.chars ? data.chars.slice(0, 3).join(', ') : 'Karakter1, Karakter2');
      }
      if (text.includes('[KARAKTER1]')) {
        const chars = data.chars || ['Karakter A', 'Karakter B'];
        text = text.replace('[KARAKTER1]', chars[Math.floor(Math.random() * chars.length)]);
        text = text.replace('[KARAKTER2]', chars[Math.floor(Math.random() * chars.length)]);
      }
      text = text.replace('[KİTAP]', 'Kitap Adı');
      text = text.replace('[KELİME]', data.topics[Math.floor(Math.random() * data.topics.length)]);
      text = text.replace('[PROBLEM]', 'Belirlediğin bir problem');
      text = text.replace('[VERİ]', 'Veritabanı tablo adı');
      text = text.replace('[KAVRAM]', data.topics[Math.floor(Math.random() * data.topics.length)]);
      text = text.replace('[İŞLEV]', 'Belirlediğin bir işlev');
      text = text.replace('[İŞLEM]', 'Belirlediğin bir işlem');
      text = text.replace('[SEKTÖR]', 'E-ticaret');
      text = text.replace('[POZİSYON]', data.topics[Math.floor(Math.random() * data.topics.length)]);
      text = text.replace('[ÜRÜN/HİZMET]', data.topics[Math.floor(Math.random() * data.topics.length)]);
      text = text.replace('[ÜRÜN]', data.topics[Math.floor(Math.random() * data.topics.length)]);
      text = text.replace('[HEDEF]', 'Belirlediğin bir hedef');
      text = text.replace('[ALICI]', 'alici@firma.com');
      text = text.replace('[KITLE]', 'Belirlediğin bir kitle');
      text = text.replace('[SÜRE]', Math.floor(Math.random() * 30 + 5) + '');
      text = text.replace('[RENKLER]', 'mavi, mor, siyah');
      text = text.replace('[RÜYA]', 'Gördüğün bir rüya');
      text = text.replace('[MALZEMELER]', ['yumurta, peynir, domates', 'makarna, zeytinyağı, sarımsak', 'tavuk, pirinç, sebze', 'mercimek, soğan, havuç', 'un, süt, şeker'][Math.floor(Math.random() * 5)]);
      text = text.replace('[YER]', data.places ? data.places[Math.floor(Math.random() * data.places.length)] : 'Türkiye');
      text = text.replace('[BÜTÇE]', Math.floor(Math.random() * 5000 + 200) + '');
      text = text.replace('[KİŞİ]', 'Sevdiğin birinin adı');
      text = text.replace('[ALAN]', data.topics[Math.floor(Math.random() * data.topics.length)]);
      text = text.replace('[TEMA]', data.topics[Math.floor(Math.random() * data.topics.length)]);
      text = text.replace('[TÜR]', ['bilim kurgu', 'romantik', 'komedi', 'gerilim', 'dram', 'belgesel'][Math.floor(Math.random() * 6)]);
      text = text.replace('[MAKALE]', 'Makale başlığı');
      text = text.replace('[SINAV]', 'gireceğin sınavın adı');
      text = text.replace('[SEVİYE]', ['kolay', 'orta', 'zor'][Math.floor(Math.random() * 3)]);
      text = text.replace('[UZUNLUK]', Math.floor(Math.random() * 4 + 2) + '');
      text = text.replace('[TAKIM]', 'Takım adı');
      text = text.replace('[ÖZELLİK]', 'karakteristik özellik');
      text = text.replace('[DURUM]', ['sağlıklı', 'stresli', 'üşengeç', 'motivasyonu yüksek', 'zamanı kısıtlı'][Math.floor(Math.random() * 5)]);
      text = text.replace('[KATEGORİLER]', 'fatura, gıda, eğlence, ulaşım, sağlık');
      text = text.replace('[SORUN]', 'karşılaştığın bir sorun');
      text = text.replace('[FRAMEWORK]', data.topics[Math.floor(Math.random() * data.topics.length)]);
      text = text.replace('[ŞİRKET]', 'Şirket Adı');
      text = text.replace('[KONSEPT]', 'bir konsept');
      text = text.replace('[MÜŞTERI]', 'Müşteri Adı');
      text = text.replace('[TOPLANTI]', data.topics[Math.floor(Math.random() * data.topics.length)]);
      text = text.replace('[GÜNDEM]', 'gündem maddeleri');
      text = text.replace('[SORGU]', 'yavaş çalışan sorgu');
      text = text.replace('[KÜTÜPHANE]', data.topics[Math.floor(Math.random() * data.topics.length)]);
      text = text.replace('[LOG]', 'sistem logları');
      text = text.replace('[HATA]', 'karşılaştığın hata mesajı');
      text = text.replace('[METİN]', 'belirlediğin bir metin');
      text = text.replace('[PROJE]', data.topics[Math.floor(Math.random() * data.topics.length)]);
      text = text.replace(/\[[A-ZÇŞĞÜÖİ\/]+\]/g, 'belirlediğin bir değer');

      const descs = [
        'AI ile hızlıca çöz.', 'Zamandan tasarruf et.', 'İşlerini kolaylaştır.',
        'Yaratıcılığını konuştur.', 'Pratik ve kullanışlı.',
        'Her gün kullanabileceğin bir prompt.', 'Üretkenliğini artır.',
        'AI\'nın gücünü kullan.', 'Kolayca uygula.', 'Favori promptlarından biri olacak.'
      ];

      result.push({
        id: id++,
        title: title.replace('#0', '#1'),
        category: cat,
        text: text,
        desc: descs[Math.floor(Math.random() * descs.length)],
        date: today
      });
    }
  });

  return result;
}

function getEnglishPrompts() {
  const today = new Date().toLocaleDateString('en-US');
  const result = [];
  let id = Date.now() + 1000000;

  const categories = {
    yazilim: {
      titles: ['Code Explanation', 'Debugging Help', 'Code Review', 'Write Tests', 'Documentation', 'API Design', 'Database Query', 'Algorithm Solution', 'Regex Builder', 'Code Review', 'Refactoring', 'Debug Assistance', 'CLI Command', 'Config Setup', 'Deploy Checklist', 'Security Audit', 'Performance Tuning', 'Version Upgrade', 'Code Conversion', 'Log Analysis'],
      actions: [
        'Explain this code line by line: [KOD]',
        'Find and fix the bug in this code: [KOD]',
        'Rewrite this code to be cleaner: [KOD]',
        'Write unit tests for this function: [KOD]',
        'Write documentation for this API endpoint: [KOD]',
        'Design an API that does [ISLEV]',
        'Write a SQL query for [VERI]',
        'Solve [PROBLEM] most efficiently using an algorithm',
        'Create a regex pattern for [METIN]',
        'Do a code review on: [KOD]',
        'Make this code more performant: [KOD]',
        'Help me debug this error: [HATA]',
        'Write a CLI command that does [ISLEM]',
        'Prepare configuration for [FRAMEWORK]',
        'List steps to deploy [PROJE] to production',
        'Check this code for security vulnerabilities: [KOD]',
        'Optimize this query: [SORGU]',
        'Steps to upgrade [KUTUPHANE] to the latest version',
        'Convert this code from Python to JavaScript: [KOD]',
        'Analyze these logs and find the issue: [LOG]'
      ],
      topics: ['Python', 'JavaScript', 'Java', 'Go', 'Rust', 'TypeScript', 'C#', 'PHP', 'React', 'Vue', 'Angular', 'Node.js', 'Django', 'Flask', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'GraphQL', 'REST API', 'WebSocket', 'gRPC', 'RabbitMQ', 'AWS Lambda', 'Azure Functions', 'Firebase', 'Heroku', 'Vercel']
    },
    yaraticilik: {
      titles: ['Write a Story', 'Compose a Poem', 'Design a Character', 'Write Dialogue', 'Create a Slogan', 'Logo Idea', 'Color Palette', 'Name Generator', 'Scene Description', 'Dream Interpretation', 'Song Lyrics', 'Film Script', 'Game Story', 'Comedy Piece', 'Create Metaphor', 'Invent a Proverb', 'Pen Name', 'Story Title', 'Blog Idea', 'Creative Solution'],
      actions: [
        'Write a short story about [KONU]. Tone: [TON].',
        'Write a poem about [KONU], [UZUNLUK] stanzas.',
        'Design a character with [OZELLIK] traits for a fantasy universe.',
        'Write a funny dialogue between [KARAKTER1] and [KARAKTER2] about [KONU].',
        'Create a catchy slogan for [URUN].',
        'Design a logo concept for [SEKTOR] industry. Colors: [RENKLER].',
        'Create a [TEMA]-themed color palette with 5 colors.',
        'Find a unique name related to [KONSEPT].',
        'Visualize and describe [YER] in detail.',
        'Interpret this dream: [RUYA].',
        'Write emotional song lyrics about [KONU].',
        'Write a short film script with [TEMA] theme, 3 scenes.',
        'Design a main story for an RPG game with [TEMA] theme.',
        'Write a humorous piece about [KONU].',
        'Create a creative metaphor for [KAVRAM].',
        'Invent a new saying or proverb about [KONU].',
        'Find a cool nickname for [KARAKTER].',
        'Suggest 10 interesting blog titles about [KONU].',
        'Suggest a creative solution for [SORUN] we face daily.',
        'Write an unusual perspective on [KAVRAM].'
      ],
      topics: ['Space', 'Ocean', 'Forest', 'Future', 'Past', 'Love', 'Friendship', 'Adventure', 'Mystery', 'Sci-Fi'],
      tons: ['funny', 'serious', 'melancholic', 'exciting', 'thoughtful', 'absurd', 'romantic', 'thrilling', 'hopeful', 'nostalgic'],
      chars: ['Emma', 'Lucas', 'Luna', 'Max', 'Aria', 'Ege', 'Lily', 'Kai', 'Ela', 'Ruzgar']
    },
    egitim: {
      titles: ['Topic Summary', 'Create Questions', 'Word Explanation', 'Take Notes', 'Lesson Plan', 'Flash Cards', 'Sample Questions', 'Research Topic', 'Memory Technique', 'Timeline', 'Book Summary', 'Article Analysis', 'Design Experiment', 'Thesis Topic', 'Study Schedule', 'Infographic', 'Prepare Presentation', 'Discussion Question', 'Concept Map', 'Create Quiz'],
      actions: [
        'Create a detailed summary of [KONU], list key points.',
        'Prepare 10 multiple choice questions about [KONU].',
        'Explain the word [KELIME] in detail, its origin and usage.',
        'Prepare study notes for [KONU], organized by main topics.',
        'Create a 40-minute lesson plan for [KONU].',
        'Prepare 20 flash cards about [KONU], question-answer format.',
        'Prepare sample questions about [KONU] at [SEVIYE] difficulty.',
        'Suggest 5 research questions about [KONU].',
        'Suggest an effective memorization technique for [KONU].',
        'Create a 1-week study schedule for [KONU].',
        'Summarize [KITAP] and explain its main themes.',
        'Analyze [MAKALE], identify strengths and weaknesses.',
        'Design a simple experiment for [KONU], list materials.',
        'Suggest a current thesis topic in [ALAN].',
        'Create a 1-month study plan for [SINAV].',
        'Prepare infographic content about [KONU].',
        'Prepare a 10-slide presentation outline about [KONU].',
        'Prepare discussion questions about [KONU].',
        'Create a concept map for [KONU], show relationships.',
        'Create a short 5-question quiz about [KONU].'
      ],
      topics: ['Photosynthesis', 'DNA Replication', 'Global Warming', 'Philosophy', 'Ottoman History', 'Quantum Physics', 'Mathematics', 'Grammar', 'Geography', 'Psychology', 'Economics', 'Chemistry', 'Astronomy', 'Mythology', 'Artificial Intelligence', 'World War II', 'Sustainability', 'Democracy', 'Evolution Theory', 'Digital Transformation']
    },
    is: {
      titles: ['Email Draft', 'Meeting Notes', 'Job Posting', 'Presentation Script', 'SWOT Analysis', 'Set Strategy', 'Budget Plan', 'Project Summary', 'Client Letter', 'Prepare Report', 'Marketing Copy', 'Proposal Letter', 'Contract Summary', 'Performance Review', 'Business Plan', 'LinkedIn Post', 'Product Description', 'Survey Questions', 'Crisis Plan', 'Create Roadmap'],
      actions: [
        'Write a professional email about [KONU], recipient: [ALICI].',
        'Prepare detailed notes for [TOPLANTI] meeting, agenda: [GUNDEM].',
        'Write a comprehensive job posting for [POZISYON] position.',
        'Write a persuasive presentation script about [KONU], [SURE] minutes.',
        'Perform SWOT analysis for [SIRKET]: Strengths, Weaknesses, Opportunities, Threats.',
        'Set a 6-month strategy to achieve [HEDEF].',
        'Prepare a detailed budget plan for [PROJE].',
        'Summarize [PROJE] for your manager: goal, scope, timeline.',
        'Write a formal thank you letter to [MUSTERI].',
        'Prepare a comprehensive status report about [KONU].',
        'Write an impressive marketing copy for [URUN], target: [KITLE].',
        'Prepare a professional proposal letter for [PROJE].',
        'Summarize important clauses of a contract about [KONU].',
        'Prepare a performance review report for [KISI].',
        'Create a short business plan for a [SEKTOR] startup: vision, mission, goals.',
        'Write a professional LinkedIn post about [KONU].',
        'Write a short product description for [URUN_HIZMET].',
        'Prepare customer satisfaction survey questions about [KONU].',
        'Create a crisis management plan for [DURUM] situation, step by step.',
        'Create a 6-month product roadmap for [URUN].'
      ],
      topics: ['Sales Strategy', 'Digital Marketing', 'Customer Relations', 'Product Launch', 'Team Management', 'Budget Planning', 'Market Research', 'Brand Awareness', 'Data Analysis', 'Business Processes', 'Customer Support', 'Human Resources', 'Public Relations', 'Affiliate Marketing', 'E-commerce']
    },
    gunluk: {
      titles: ['Recipe', 'Travel Plan', 'Shopping List', 'Movie Suggestion', 'Book Suggestion', 'Exercise Plan', 'Daily Routine', 'Gift Idea', 'Career Advice', 'Decoration Idea', 'Budget Tracking', 'New Hobby', 'Health Advice', 'Invitation Text', 'Social Media Post', 'Gardening Tips', 'Home Cleaning', 'Language Learning', 'Self Improvement', 'Weekend Plans'],
      actions: [
        'Give an easy recipe using [MALZEMELER].',
        'Prepare a 3-day travel plan for [YER], budget: [BUTCE] USD.',
        'Prepare a shopping list for [DURUM], mind your budget.',
        'Suggest 5 movies to watch if you like [TUR] movies.',
        'If you like [TUR] books, suggest 5 and explain why.',
        'Prepare a [SURE]-minute daily exercise routine to do at home.',
        'Suggest a 5-step morning routine for a productive day.',
        'Find a creative gift idea for [KISI] with a budget of [BUTCE] USD.',
        'Give 5 career advice tips to someone wanting to work in [ALAN].',
        'Give decoration ideas to make a small room feel more spacious.',
        'Create a simple monthly budget tracker, expense categories: [KATEGORILER].',
        'Suggest a creative hobby to start at home with budget of [BUTCE] USD.',
        'Give 5 healthy living tips for someone who is [DURUM].',
        'Write a birthday invitation text with [KONU] theme.',
        'Write an engaging Instagram post about [KONU].',
        'Suggest 5 easy-to-grow indoor plants and care tips.',
        'Create a 10-step quick home cleaning plan.',
        'Create a 1-month study plan for someone starting to learn a new language.',
        'Suggest self-development books about [KONU] and explain why.',
        'Suggest 10 fun activities to do at home on the weekend.'
      ],
      topics: ['Breakfast', 'Sports', 'Reading', 'Music', 'Nature', 'Technology', 'Fashion', 'Food', 'Travel', 'Hobby'],
      places: ['Istanbul', 'Paris', 'Tokyo', 'London', 'New York', 'Rome', 'Bali', 'Cappadocia', 'Barcelona', 'Antalya']
    }
  };

  Object.keys(categories).forEach(cat => {
    const data = categories[cat];
    for (let i = 1; i <= 200; i++) {
      const title = data.titles[Math.floor(Math.random() * data.titles.length)] + (i > data.titles.length ? ` #${i}` : '');
      let text = data.actions[Math.floor(Math.random() * data.actions.length)];
      text = text.replace('[KONU]', data.topics[Math.floor(Math.random() * data.topics.length)]);
      text = text.replace('[KOD]', '```code\n# paste your code here\n```');
      if (text.includes('[TON]')) {
        text = text.replace('[TON]', data.tons ? data.tons[Math.floor(Math.random() * data.tons.length)] : 'neutral');
      }
      if (text.includes('[KARAKTER]')) {
        text = text.replace('[KARAKTER]', 'Main Character');
      }
      if (text.includes('[KARAKTERLER]')) {
        text = text.replace('[KARAKTERLER]', data.chars ? data.chars.slice(0, 3).join(', ') : 'Char1, Char2, Char3');
      }
      if (text.includes('[KARAKTER1]')) {
        const chars = data.chars || ['Character A', 'Character B'];
        text = text.replace('[KARAKTER1]', chars[Math.floor(Math.random() * chars.length)]);
        text = text.replace('[KARAKTER2]', chars[Math.floor(Math.random() * chars.length)]);
      }
      text = text.replace('[KITAP]', 'Book Title');
      text = text.replace('[KELIME]', data.topics[Math.floor(Math.random() * data.topics.length)]);
      text = text.replace('[PROBLEM]', 'a problem you choose');
      text = text.replace('[VERI]', 'database table name');
      text = text.replace('[KAVRAM]', data.topics[Math.floor(Math.random() * data.topics.length)]);
      text = text.replace('[ISLEV]', 'a function you choose');
      text = text.replace('[ISLEM]', 'an operation you choose');
      text = text.replace('[SEKTOR]', 'E-commerce');
      text = text.replace('[POZISYON]', data.topics[Math.floor(Math.random() * data.topics.length)]);
      text = text.replace('[URUN_HIZMET]', data.topics[Math.floor(Math.random() * data.topics.length)]);
      text = text.replace('[URUN]', data.topics[Math.floor(Math.random() * data.topics.length)]);
      text = text.replace('[HEDEF]', 'a goal you choose');
      text = text.replace('[ALICI]', 'recipient@company.com');
      text = text.replace('[KITLE]', 'your target audience');
      text = text.replace('[SURE]', Math.floor(Math.random() * 30 + 5) + '');
      text = text.replace('[RENKLER]', 'blue, purple, black');
      text = text.replace('[RUYA]', 'a dream you had');
      text = text.replace('[MALZEMELER]', ['eggs, cheese, tomatoes', 'pasta, olive oil, garlic', 'chicken, rice, vegetables', 'lentils, onion, carrots', 'flour, milk, sugar'][Math.floor(Math.random() * 5)]);
      text = text.replace('[YER]', data.places ? data.places[Math.floor(Math.random() * data.places.length)] : 'Turkey');
      text = text.replace('[BUTCE]', Math.floor(Math.random() * 5000 + 200) + '');
      text = text.replace('[KISI]', 'a loved one\'s name');
      text = text.replace('[ALAN]', data.topics[Math.floor(Math.random() * data.topics.length)]);
      text = text.replace('[TEMA]', data.topics[Math.floor(Math.random() * data.topics.length)]);
      text = text.replace('[TUR]', ['sci-fi', 'romantic', 'comedy', 'thriller', 'drama', 'documentary'][Math.floor(Math.random() * 6)]);
      text = text.replace('[MAKALE]', 'Article title');
      text = text.replace('[SINAV]', 'your exam name');
      text = text.replace('[SEVIYE]', ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)]);
      text = text.replace('[UZUNLUK]', Math.floor(Math.random() * 4 + 2) + '');
      text = text.replace('[TAKIM]', 'Team name');
      text = text.replace('[OZELLIK]', 'a characteristic trait');
      text = text.replace('[DURUM]', ['healthy', 'stressed', 'lazy', 'highly motivated', 'short on time'][Math.floor(Math.random() * 5)]);
      text = text.replace('[KATEGORILER]', 'bills, food, entertainment, transport, health');
      text = text.replace('[SORUN]', 'a problem you face');
      text = text.replace('[FRAMEWORK]', data.topics[Math.floor(Math.random() * data.topics.length)]);
      text = text.replace('[SIRKET]', 'Company Name');
      text = text.replace('[KONSEPT]', 'a concept');
      text = text.replace('[MUSTERI]', 'Client Name');
      text = text.replace('[TOPLANTI]', data.topics[Math.floor(Math.random() * data.topics.length)]);
      text = text.replace('[GUNDEM]', 'agenda items');
      text = text.replace('[SORGU]', 'slow running query');
      text = text.replace('[KUTUPHANE]', data.topics[Math.floor(Math.random() * data.topics.length)]);
      text = text.replace('[LOG]', 'system logs');
      text = text.replace('[HATA]', 'error message you encountered');
      text = text.replace('[METIN]', 'a text of your choice');
      text = text.replace('[PROJE]', data.topics[Math.floor(Math.random() * data.topics.length)]);
      text = text.replace(/\[[A-Z]+\]/g, 'a value of your choice');

      const descs = [
        'Quickly solve with AI.', 'Save time.', 'Make your work easier.',
        'Unleash your creativity.', 'Practical and useful.',
        'A prompt you can use every day.', 'Boost your productivity.',
        'Harness the power of AI.', 'Easy to apply.', 'One of your favorite prompts.'
      ];

      result.push({
        id: id++,
        title: title.replace('#0', '#1'),
        category: cat,
        text: text,
        desc: descs[Math.floor(Math.random() * descs.length)],
        date: today
      });
    }
  });

  return result;
}

function getFallbackPrompts(lang) {
  if (lang === 'en') {
    const today = new Date().toLocaleDateString('en-US');
    return [
      { id: 1000001, title: 'Code Explanation', category: 'yazilim', text: 'Explain this code line by line: [paste your code here]', desc: 'Helps you understand any piece of code.', date: today },
      { id: 1000002, title: 'Debugging', category: 'yazilim', text: 'There is a bug in this code. Find and fix it: [paste your code here]', desc: 'Find bugs in your code with AI.', date: today },
      { id: 1000003, title: 'Story', category: 'yaraticilik', text: 'Write a short story about [topic].', desc: 'For creative storytelling.', date: today },
      { id: 1000004, title: 'Topic Summary', category: 'egitim', text: 'Create a detailed summary about [topic].', desc: 'Ideal for studying.', date: today },
      { id: 1000005, title: 'Email Draft', category: 'is', text: 'Write a professional email about [topic].', desc: 'Quickly draft business emails.', date: today },
      { id: 1000006, title: 'Recipe', category: 'gunluk', text: 'Give me an easy recipe I can make with ingredients I have.', desc: 'Ask what to cook with available ingredients.', date: today }
    ];
  }
  const today = new Date().toLocaleDateString('tr-TR');
  return [
    { id: 1, title: 'Kod Açıklaması', category: 'yazilim', text: 'Şu kodu satır satır açıkla: [kodunu buraya yapıştır]', desc: 'Herhangi bir kod parçasını anlamana yardımcı olur.', date: today },
    { id: 2, title: 'Hata Ayıklama', category: 'yazilim', text: 'Bu kodda hata var. Hatayı bul ve düzelt: [kodunu buraya yapıştır]', desc: 'Kodundaki hataları AI ile bul.', date: today },
    { id: 3, title: 'Hikaye Oluştur', category: 'yaraticilik', text: '[konu] hakkında kısa bir hikaye yaz.', desc: 'Yaratıcı hikayeler oluşturmak için.', date: today },
    { id: 4, title: 'Konu Özeti', category: 'egitim', text: '[konu] hakkında detaylı bir özet çıkar.', desc: 'Ders çalışırken konuları özetletmek için ideal.', date: today },
    { id: 5, title: 'E-posta Taslağı', category: 'is', text: '[konu] hakkında profesyonel bir e-posta taslağı hazırla.', desc: 'İş e-postalarını hızlıca hazırla.', date: today },
    { id: 6, title: 'Yemek Tarifi', category: 'gunluk', text: 'Elimdeki malzemelerle yapılabilecek kolay bir yemek tarifi ver.', desc: 'Elimizdeki malzemelerle ne yapabileceğimizi sorar.', date: today }
  ];
}

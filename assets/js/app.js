const STORAGE_KEY = 'prompt_kutuphanesi';
let prompts = [];
let currentFilter = 'all';
let searchQuery = '';
let editingId = null;

function loadPrompts() {
  const stored = localStorage.getItem(STORAGE_KEY);
  prompts = stored ? JSON.parse(stored) : [];
  if (!prompts.length) {
    prompts = getDefaultPrompts();
    savePrompts();
  }
  render();
}

function getDefaultPrompts() {
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
        '[KONU] hakkında LinkedIn'de yayınlamak için profesyonel bir yazı yaz.',
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
        '[KONU] hakkında Instagram'da paylaşmak için ilgi çekici bir gönderi yaz.',
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
      text = text.replace('[SEKTÖR]', 'E-ticaret');
      text = text.replace('[POZISYON]', data.topics[Math.floor(Math.random() * data.topics.length)]);
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
      text = text.replace('[SEVIYE]', ['kolay', 'orta', 'zor'][Math.floor(Math.random() * 3)]);
      text = text.replace('[SEVİYE]', ['kolay', 'orta', 'zor'][Math.floor(Math.random() * 3)]);
      text = text.replace('[UZUNLUK]', Math.floor(Math.random() * 4 + 2) + '');
      text = text.replace('[TAKIM]', 'Takım adı');
      text = text.replace('[ÖZELLIK]', 'karakteristik özellik');
      text = text.replace('[DURUM]', ['sağlıklı', 'stresli', 'üşengeç', 'motivasyonu yüksek', 'zamanı kısıtlı'][Math.floor(Math.random() * 5)]);
      text = text.replace('[KATEGORILER]', 'fatura, gıda, eğlence, ulaşım, sağlık');
      text = text.replace('[SORUN]', 'karşılaştığın bir sorun');
      text = text.replace('[FRAMEWORK]', data.topics[Math.floor(Math.random() * data.topics.length)]);
      text = text.replace('[ŞIRKET]', 'Şirket Adı');
      text = text.replace('[KONSEPT]', 'bir konsept');
      text = text.replace('[MÜŞTERI]', 'Müşteri Adı');
      text = text.replace('[TOPLANTI]', data.topics[Math.floor(Math.random() * data.topics.length)]);
      text = text.replace('[GÜNDEM]', 'gündem maddeleri');
      text = text.replace('[SORGU]', 'yavaş çalışan sorgu');
      text = text.replace('[KÜTÜPHANE]', data.topics[Math.floor(Math.random() * data.topics.length)]);
      text = text.replace('[LOG]', 'sistem logları');
      text = text.replace('[HATA]', 'karşılaştığın hata mesajı');

      const descs = [
        'AI ile hızlıca çöz.',
        'Zamandan tasarruf et.',
        'İşlerini kolaylaştır.',
        'Yaratıcılığını konuştur.',
        'Pratik ve kullanışlı.',
        'Her gün kullanabileceğin bir prompt.',
        'Üretkenliğini artır.',
        'AI\'nın gücünü kullan.',
        'Kolayca uygula.',
        'Favori promptlarından biri olacak.'
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

function savePrompts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
}

function render() {
  const container = document.getElementById('promptsContainer');
  const count = document.getElementById('promptCount');

  let filtered = prompts;
  if (currentFilter !== 'all') {
    filtered = filtered.filter(p => p.category === currentFilter);
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.text.toLowerCase().includes(q) ||
      (p.desc && p.desc.toLowerCase().includes(q))
    );
  }

  count.textContent = prompts.length;

  if (!filtered.length) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-search"></i>
        <h3>Sonuç bulunamadı</h3>
        <p>Farklı bir kategori veya arama terimi dene.</p>
      </div>`;
    return;
  }

  container.innerHTML = filtered.map(p => `
    <div class="prompt-card">
      <div class="card-top">
        <span class="card-category">${getCategoryLabel(p.category)}</span>
        <div class="card-actions">
          <button onclick="editPrompt('${p.id}')" title="Düzenle"><i class="fas fa-pen"></i></button>
          <button class="delete" onclick="deletePrompt('${p.id}')" title="Sil"><i class="fas fa-trash"></i></button>
        </div>
      </div>
      <h3>${escapeHtml(p.title)}</h3>
      <div class="card-text" onclick="this.classList.toggle('expanded')">${escapeHtml(p.text)}</div>
      ${p.desc ? `<div class="card-desc">${escapeHtml(p.desc)}</div>` : ''}
      <div class="card-footer">
        <span class="card-date">${p.date}</span>
        <button class="copy-btn" onclick="copyPrompt('${p.id}')"><i class="fas fa-copy"></i> Kopyala</button>
      </div>
    </div>
  `).join('');
}

function getCategoryLabel(cat) {
  const labels = { yazilim: 'Yazılım', yaraticilik: 'Yaratıcılık', egitim: 'Eğitim', is: 'İş', gunluk: 'Günlük' };
  return labels[cat] || cat;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function copyPrompt(id) {
  const p = prompts.find(x => x.id == id);
  if (!p) return;
  navigator.clipboard.writeText(p.text).then(() => {
    showToast('Prompt panoya kopyalandı!');
  });
}

function deletePrompt(id) {
  prompts = prompts.filter(p => p.id != id);
  savePrompts();
  render();
  showToast('Prompt silindi.');
}

function editPrompt(id) {
  const p = prompts.find(x => x.id == id);
  if (!p) return;
  editingId = p.id;
  document.getElementById('modalTitle').textContent = 'Prompt Düzenle';
  document.getElementById('promptTitle').value = p.title;
  document.getElementById('promptCategory').value = p.category;
  document.getElementById('promptText').value = p.text;
  document.getElementById('promptDesc').value = p.desc || '';
  openModal();
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

function openModal() {
  document.getElementById('modal').classList.add('open');
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.getElementById('modalTitle').textContent = 'Yeni Prompt';
  document.getElementById('promptTitle').value = '';
  document.getElementById('promptCategory').value = 'yazilim';
  document.getElementById('promptText').value = '';
  document.getElementById('promptDesc').value = '';
  editingId = null;
}

document.getElementById('addBtn').addEventListener('click', () => {
  editingId = null;
  document.getElementById('modalTitle').textContent = 'Yeni Prompt';
  openModal();
});

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalCancel').addEventListener('click', closeModal);
document.getElementById('modal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeModal();
});

document.getElementById('modalSave').addEventListener('click', () => {
  const title = document.getElementById('promptTitle').value.trim();
  const category = document.getElementById('promptCategory').value;
  const text = document.getElementById('promptText').value.trim();
  const desc = document.getElementById('promptDesc').value.trim();

  if (!title || !text) {
    showToast('Başlık ve prompt metni zorunludur.');
    return;
  }

  if (editingId) {
    const p = prompts.find(x => x.id == editingId);
    if (p) {
      p.title = title;
      p.category = category;
      p.text = text;
      p.desc = desc;
    }
  } else {
    prompts.unshift({
      id: Date.now(),
      title,
      category,
      text,
      desc,
      date: new Date().toLocaleDateString('tr-TR')
    });
  }

  savePrompts();
  closeModal();
  render();
  showToast(editingId ? 'Prompt güncellendi.' : 'Prompt eklendi.');
});

document.getElementById('searchInput').addEventListener('input', (e) => {
  searchQuery = e.target.value;
  render();
});

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});

const glow = document.querySelector('.cursor-glow');
if (glow) {
  let mx = 0, my = 0, gx = 0, gy = 0;
  document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
  function animateGlow() {
    gx += (mx - gx) * 0.06;
    gy += (my - gy) * 0.06;
    glow.style.left = gx + 'px';
    glow.style.top = gy + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
}

loadPrompts();

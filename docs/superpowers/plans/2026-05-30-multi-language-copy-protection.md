# Multi-Language & Copy Protection Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add TR/EN multi-language support, placeholder guarantee, copy protection, and footer to Prompt Kutuphanesi

**Architecture:** Extract prompt data into `prompts.js`, translations into `translations.js`. app.js remains core logic. Language stored in localStorage, UI re-renders on switch. Copy protection via CSS + JS event blocking + DevTools detection.

**Tech Stack:** Vanilla JS, CSS, HTML — no libraries.

**Files:**
- Modify: `assets/js/app.js`
- Create: `assets/js/translations.js`
- Create: `assets/js/prompts.js`
- Modify: `index.html`
- Modify: `assets/css/style.css`

---

### Task 1: Create translations.js (TR/EN UI strings)

**Files:**
- Create: `assets/js/translations.js`

- [ ] **Step 1: Write translations.js with full i18n object**

Create file with TR and EN strings for every UI element:

```js
const LANG = {
  tr: {
    nav: { logo: 'PK', title: 'Prompt Kütüphanesi', subtitle: 'En sevdiğin AI prompt\'larını kaydet, kategorize et ve tekrar kullan.' },
    addBtn: 'Yeni Prompt',
    searchPlaceholder: 'Prompt ara...',
    filters: { all: 'Tümü', yazilim: 'Yazılım', yaraticilik: 'Yaratıcılık', egitim: 'Eğitim', is: 'İş', gunluk: 'Günlük' },
    prompt: { title: 'Başlık', category: 'Kategori', text: 'Prompt Metni', desc: 'Açıklama', descOptional: '(opsiyonel)', textPlaceholder: 'Prompt metnini buraya yapıştır...', descPlaceholder: 'Ne işe yaradığını kısaca açıkla...' },
    modal: { newTitle: 'Yeni Prompt', editTitle: 'Prompt Düzenle', cancel: 'İptal', save: 'Kaydet' },
    toast: { copied: 'Prompt panoya kopyalandı!', deleted: 'Prompt silindi.', updated: 'Prompt güncellendi.', added: 'Prompt eklendi.', required: 'Başlık ve prompt metni zorunludur.' },
    empty: { title: 'Henüz prompt yok', desc: 'İlk prompt\'unu eklemek için yukarıdaki butonu kullan.', noResults: 'Sonuç bulunamadı', noResultsDesc: 'Farklı bir kategori veya arama terimi dene.' },
    footer: '© 2025 Samet Erez Atmaca. Tüm hakları saklıdır.',
    copyBtn: 'Kopyala',
    editTitleAttr: 'Düzenle',
    deleteTitleAttr: 'Sil',
    langLabel: 'EN'
  },
  en: {
    nav: { logo: 'PK', title: 'Prompt Library', subtitle: 'Save, categorize and reuse your favorite AI prompts.' },
    addBtn: 'New Prompt',
    searchPlaceholder: 'Search prompts...',
    filters: { all: 'All', yazilim: 'Software', yaraticilik: 'Creative', egitim: 'Education', is: 'Business', gunluk: 'Daily' },
    prompt: { title: 'Title', category: 'Category', text: 'Prompt Text', desc: 'Description', descOptional: '(optional)', textPlaceholder: 'Paste your prompt text here...', descPlaceholder: 'Briefly describe what it does...' },
    modal: { newTitle: 'New Prompt', editTitle: 'Edit Prompt', cancel: 'Cancel', save: 'Save' },
    toast: { copied: 'Prompt copied to clipboard!', deleted: 'Prompt deleted.', updated: 'Prompt updated.', added: 'Prompt added.', required: 'Title and prompt text are required.' },
    empty: { title: 'No prompts yet', desc: 'Click the button above to add your first prompt.', noResults: 'No results found', noResultsDesc: 'Try a different category or search term.' },
    footer: '© 2025 Samet Erez Atmaca. All rights reserved.',
    copyBtn: 'Copy',
    editTitleAttr: 'Edit',
    deleteTitleAttr: 'Delete',
    langLabel: 'TR'
  }
};
let currentLang = localStorage.getItem('prompt_lang') || 'tr';
```

- [ ] **Step 2: Commit**

```bash
git add assets/js/translations.js
git commit -m "feat: add translations.js with TR/EN UI strings"
```

---

### Task 2: Create prompts.js with dual prompt generators

**Files:**
- Create: `assets/js/prompts.js`

- [ ] **Step 1: Write prompts.js with TR + EN generators**

Extract Turkish generator from app.js and add English version. Each generator produces 1000 prompts. All placeholders must have corresponding replacements. English data should use natural English content (not literal translation).

```js
// =============== TURKISH PROMPTS ===============
function getTurkishPrompts() {
  // Same logic as current getDefaultPrompts() with Turkish content
  // Categories: yazilim, yaraticilik, egitim, is, gunluk
  // 5 categories x 200 prompts each
  const today = new Date().toLocaleDateString('tr-TR');
  const result = [];
  let id = Date.now();

  const categories = {
    yazilim: {
      titles: ['Kod Açıklaması', 'Hata Ayıklama', 'Kod İyileştirme', 'Test Yazma', 'Dökümantasyon', /* ... same 20 titles */],
      actions: ['Şu kodu satır satır açıkla: [KOD]', /* ... same 20 actions */],
      topics: ['Python', 'JavaScript', /* ... same 30 topics */]
    },
    yaraticilik: { /* same as current */ },
    egitim: { /* same as current */ },
    is: { /* same as current */ },
    gunluk: { /* same as current */ }
  };

  /* same generation loop as current getDefaultPrompts() */
  // IMPORTANT: All placeholders must be handled:
  // [KONU], [KOD], [TON], [KARAKTER], [KARAKTERLER], [KARAKTER1], [KARAKTER2], 
  // [KİTAP], [KELİME], [PROBLEM], [VERİ], [KAVRAM], [İŞLEV], [İŞLEM], [SEKTÖR],
  // [POZİSYON], [ÜRÜN/HİZMET], [ÜRÜN], [HEDEF], [ALICI], [KITLE], [SÜRE], 
  // [RENKLER], [RÜYA], [MALZEMELER], [YER], [BÜTÇE], [KİŞİ], [ALAN], [TEMA],
  // [TÜR], [MAKALE], [SINAV], [SEVİYE], [UZUNLUK], [TAKIM], [ÖZELLİK], [DURUM],
  // [KATEGORİLER], [SORUN], [FRAMEWORK], [ŞİRKET], [KONSEPT], [MÜŞTERI],
  // [TOPLANTI], [GÜNDEM], [SORGU], [KÜTÜPHANE], [LOG], [HATA], [METİN], [PROJE],
  // [METİN], [POZİSYON]
  // Final regex catch-all for any missed placeholders

  Object.keys(categories).forEach(cat => {
    const data = categories[cat];
    for (let i = 1; i <= 200; i++) {
      const title = data.titles[Math.floor(Math.random() * data.titles.length)] + (i > data.titles.length ? ` #${i}` : '');
      let text = data.actions[Math.floor(Math.random() * data.actions.length)];
      
      // All placeholder replacements in order
      text = text.replace('[KONU]', data.topics[Math.floor(Math.random() * data.topics.length)]);
      text = text.replace('[KOD]', '```kod\\n# kod parçanı buraya yapıştır\\n```');
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

// =============== ENGLISH PROMPTS ===============
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
        'Design an API that does [PROJE]',
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

  // Same generation loop as Turkish but with English replacements
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

// =============== FALLBACK ===============
function getFallbackPrompts(lang) {
  if (lang === 'en') {
    return [
      { id: 1000001, title: 'Code Explanation', category: 'yazilim', text: 'Explain this code line by line: [paste your code here]', desc: 'Helps you understand any piece of code.', date: new Date().toLocaleDateString('en-US') },
      { id: 1000002, title: 'Debugging', category: 'yazilim', text: 'There is a bug in this code. Find and fix it: [paste your code here]', desc: 'Find bugs in your code with AI.', date: new Date().toLocaleDateString('en-US') },
      { id: 1000003, title: 'Story', category: 'yaraticilik', text: 'Write a short story about [topic].', desc: 'For creative storytelling.', date: new Date().toLocaleDateString('en-US') },
      { id: 1000004, title: 'Topic Summary', category: 'egitim', text: 'Create a detailed summary about [topic].', desc: 'Ideal for studying.', date: new Date().toLocaleDateString('en-US') },
      { id: 1000005, title: 'Email Draft', category: 'is', text: 'Write a professional email about [topic].', desc: 'Quickly draft business emails.', date: new Date().toLocaleDateString('en-US') },
      { id: 1000006, title: 'Recipe', category: 'gunluk', text: 'Give me an easy recipe I can make with ingredients I have.', desc: 'Ask what to cook with available ingredients.', date: new Date().toLocaleDateString('en-US') }
    ];
  }
  // Turkish fallback (existing)
  const today = new Date().toLocaleDateString('tr-TR');
  return [ /* existing 6 TR prompts */ ];
}
```

- [ ] **Step 2: Ensure all placeholders are handled in English generator**

Verify every action in every English category has all its placeholders covered:
- `[KOD]`, `[KONU]`, `[TON]`, `[KARAKTER]`, `[KARAKTER1]`, `[KARAKTER2]`, `[KARAKTERLER]`, `[METIN]`, `[VERI]`, `[PROBLEM]`, `[ISLEM]`, `[FRAMEWORK]`, `[HATA]`, `[LOG]`, `[SORGU]`, `[KUTUPHANE]`, `[PROJE]`
- Final regex catch-all: `/\[[A-Z]+\]/g` → fallback value

- [ ] **Step 3: Commit**

```bash
git add assets/js/prompts.js
git commit -m "feat: add prompts.js with dual TR/EN generators"
```

---

### Task 3: Modify app.js for multi-language

**Files:**
- Modify: `assets/js/app.js`

- [ ] **Step 1: Update loadPrompts to use dual storage structure**

```js
function loadPrompts() {
  const stored = localStorage.getItem(STORAGE_KEY);
  const data = stored ? JSON.parse(stored) : { generated: {}, user: [] };
  
  // Ensure current language prompts exist
  if (!data.generated[currentLang] || !data.generated[currentLang].length) {
    try {
      data.generated[currentLang] = currentLang === 'tr' ? getTurkishPrompts() : getEnglishPrompts();
    } catch (e) {
      data.generated[currentLang] = getFallbackPrompts(currentLang);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
  
  prompts = data;
  render();
}

function savePrompts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
}

function getDisplayPrompts() {
  const generated = (prompts.generated && prompts.generated[currentLang]) || [];
  const user = prompts.user || [];
  return [...generated, ...user];
}
```

- [ ] **Step 2: Update render() to use getDisplayPrompts() and i18n**

Change: `let filtered = prompts;` → `let filtered = getDisplayPrompts();`
Update all hardcoded TR strings to use `t()` helper.
Update filter buttons to show translated labels.
Update category labels.
Update empty state messages.
Update modal titles and buttons.
Update toast messages.
Update copy button text.

- [ ] **Step 3: Update editor functions**

- `editPrompt`, `deletePrompt`, `copyPrompt` — search in combined list
- `modalSave` — push to `prompts.user` instead of `prompts`

- [ ] **Step 4: Remove old getDefaultPrompts from app.js**

All prompt generation logic is now in prompts.js. Remove `getDefaultPrompts` and `getFallbackPrompts` from app.js.

- [ ] **Step 5: Add language switcher function**

```js
function switchLang(lang) {
  currentLang = lang;
  localStorage.setItem('prompt_lang', lang);
  if (!prompts.generated[lang] || !prompts.generated[lang].length) {
    try {
      prompts.generated[lang] = lang === 'tr' ? getTurkishPrompts() : getEnglishPrompts();
    } catch (e) {
      prompts.generated[lang] = getFallbackPrompts(lang);
    }
    savePrompts();
  }
  document.getElementById('langToggle').textContent = LANG[lang].langLabel;
  render();
}
```

- [ ] **Step 6: Commit**

```bash
git add assets/js/app.js
git commit -m "feat: update app.js for multi-language support"
```

---

### Task 4: Update index.html

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add lang toggle button in navbar**

```html
<button class="lang-btn" id="langToggle" onclick="switchLang(currentLang === 'tr' ? 'en' : 'tr')">EN</button>
```

- [ ] **Step 2: Add footer**

```html
<footer class="site-footer">
  <p>© 2025 Samet Erez Atmaca. Tüm hakları saklıdır.</p>
</footer>
```

- [ ] **Step 3: Add lang script before app.js**

```html
<script src="assets/js/translations.js"></script>
<script src="assets/js/prompts.js"></script>
<script src="assets/js/app.js"></script>
```

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add lang toggle and footer to HTML"
```

---

### Task 5: Update style.css

**Files:**
- Modify: `assets/css/style.css`

- [ ] **Step 1: Add copy protection CSS**

```css
body {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
```

- [ ] **Step 2: Add footer styles**

```css
.site-footer {
  text-align: center;
  padding: 20px;
  font-size: 13px;
  color: var(--text-secondary);
  border-top: 1px solid var(--border);
  margin-top: 40px;
}
```

- [ ] **Step 3: Add lang toggle button styles**

```css
.lang-btn {
  background: var(--card-bg);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s;
}
.lang-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}
```

- [ ] **Step 4: Commit**

```bash
git add assets/css/style.css
git commit -m "feat: add copy protection, footer, and lang toggle styles"
```

---

### Task 6: Add copy protection JavaScript

**Files:**
- Modify: `assets/js/app.js`

- [ ] **Step 1: Add event blocking at bottom of app.js**

```js
// Copy protection
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
    (e.ctrlKey && ['U', 'S'].includes(e.key))
  ) {
    e.preventDefault();
  }
});

// DevTools detection
setInterval(() => {
  const start = performance.now();
  debugger;
  const end = performance.now();
  if (end - start > 100) {
    document.body.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#0a0a0f;color:#fff;font-family:sans-serif;text-align:center;padding:20px">
        <div>
          <h1 style="font-size:24px;margin-bottom:12px;color:#00d4ff">🔒 Developer Tools Detected</h1>
          <p style="color:#888;font-size:14px">Please close DevTools to continue using Prompt Kütüphanesi.</p>
        </div>
      </div>`;
  }
}, 2000);
```

- [ ] **Step 2: Test protection locally**

Open `index.html` in a browser, try F12, right-click, Ctrl+U. All should be blocked.

- [ ] **Step 3: Commit**

```bash
git add assets/js/app.js
git commit -m "feat: add copy protection and DevTools detection"
```

---

### Task 7: Push and verify

**Files:**
- N/A

- [ ] **Step 1: Push all changes to GitHub**

```bash
git push
```

- [ ] **Step 2: Wait for GitHub Pages deploy (~1 min)**

- [ ] **Step 3: Verify live site**

Visit https://erezatmacaa-coder.github.io/prompt-kutuphanesi/ and test:
- Language toggle works (TR/EN)
- UI text changes correctly
- Prompts load in both languages
- Footer visible
- Right-click blocked, F12 blocked
- Copy button still works
- No `[PLACEHOLDER]` text visible in prompts

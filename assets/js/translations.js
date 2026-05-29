const LANG = {
  tr: {
    nav: { logo: 'PK', title: 'Prompt Kütüphanesi', subtitle: 'En sevdi\u011fin AI prompt\'lar\u0131n\u0131 kaydet, kategorize et ve tekrar kullan.' },
    addBtn: 'Yeni Prompt',
    searchPlaceholder: 'Prompt ara...',
    filters: { all: 'Tümü', yazilim: 'Yaz\u0131l\u0131m', yaraticilik: 'Yarat\u0131c\u0131l\u0131k', egitim: 'E\u011fitim', is: '\u0130\u015f', gunluk: 'Günlük' },
    prompt: { title: 'Ba\u015fl\u0131k', category: 'Kategori', text: 'Prompt Metni', desc: 'Aç\u0131klama', descOptional: '(opsiyonel)', textPlaceholder: 'Prompt metnini buraya yap\u0131\u015ft\u0131r...', descPlaceholder: 'Ne i\u015fe yarad\u0131\u011f\u0131n\u0131 k\u0131saca aç\u0131kla...' },
    modal: { newTitle: 'Yeni Prompt', editTitle: 'Prompt Düzenle', cancel: '\u0130ptal', save: 'Kaydet' },
    toast: { copied: 'Prompt panoya kopyaland\u0131!', deleted: 'Prompt silindi.', updated: 'Prompt güncellendi.', added: 'Prompt eklendi.', required: 'Ba\u015fl\u0131k ve prompt metni zorunludur.' },
    empty: { title: 'Henüz prompt yok', desc: '\u0130lk prompt\'unu eklemek için yukar\u0131daki butonu kullan.', noResults: 'Sonuç bulunamad\u0131', noResultsDesc: 'Farkl\u0131 bir kategori veya arama terimi dene.' },
    footer: '© 2025 Samet Erez Atmaca. Tüm haklar\u0131 sakl\u0131d\u0131r.',
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
function t(path) {
  const keys = path.split('.');
  let val = LANG[currentLang];
  for (const k of keys) { val = val[k]; if (!val) break; }
  return val || path;
}

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
  return [
    { id: Date.now() + 1, title: 'Kod Açıklaması', category: 'yazilim', text: 'Şu kodu satır satır açıkla: [KODU BURAYA YAPIŞTIR]', desc: 'Herhangi bir kod parçasını anlamana yardımcı olur.', date: new Date().toLocaleDateString('tr-TR') },
    { id: Date.now() + 2, title: 'Hata Ayıklama', category: 'yazilim', text: 'Bu kodda hata var. Hatayı bul ve düzelt: [KODU BURAYA YAPIŞTIR]', desc: 'Kodundaki hataları AI ile bul.', date: new Date().toLocaleDateString('tr-TR') },
    { id: Date.now() + 3, title: 'Hikaye Oluştur', category: 'yaraticilik', text: '[KONU] hakkında kısa bir hikaye yaz. Karakterler: [KARAKTERLER]. Ton: [TON].', desc: 'Yaratıcı hikayeler oluşturmak için.', date: new Date().toLocaleDateString('tr-TR') },
    { id: Date.now() + 4, title: 'Konu Özeti', category: 'egitim', text: '[KONU] hakkında detaylı bir özet çıkar. Önemli noktaları madde madde listele.', desc: 'Ders çalışırken konuları özetletmek için ideal.', date: new Date().toLocaleDateString('tr-TR') },
    { id: Date.now() + 5, title: 'E-posta Taslağı', category: 'is', text: '[KONU] hakkında profesyonel bir e-posta taslağı hazırla. Alıcı: [ALICI].', desc: 'İş e-postalarını hızlıca hazırla.', date: new Date().toLocaleDateString('tr-TR') },
    { id: Date.now() + 6, title: 'Yemek Tarifi', category: 'gunluk', text: '[MALZEMELER] ile yapılabilecek kolay bir yemek tarifi ver.', desc: 'Elimizdeki malzemelerle ne yapabileceğimizi sorar.', date: new Date().toLocaleDateString('tr-TR') }
  ];
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

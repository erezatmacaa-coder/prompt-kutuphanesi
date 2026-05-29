const STORAGE_KEY = 'prompt_kutuphanesi';
let prompts = { generated: {}, user: [] };
let currentFilter = 'all';
let searchQuery = '';
let editingId = null;

function getDisplayPrompts() {
  const g = (prompts.generated && prompts.generated[currentLang]) || [];
  const u = prompts.user || [];
  return [...g, ...u];
}

function findPrompt(id) {
  const u = prompts.user || [];
  for (const p of u) { if (p.id == id) return p; }
  const g = (prompts.generated && prompts.generated[currentLang]) || [];
  for (const p of g) { if (p.id == id) return p; }
  return null;
}

function loadPrompts() {
  const stored = localStorage.getItem(STORAGE_KEY);
  const raw = stored ? JSON.parse(stored) : { generated: {}, user: [] };
  if (!raw.generated) raw.generated = {};
  if (!raw.user) raw.user = [];
  if (!raw.generated[currentLang] || !raw.generated[currentLang].length) {
    try {
      raw.generated[currentLang] = currentLang === 'tr' ? getTurkishPrompts() : getEnglishPrompts();
    } catch (e) {
      raw.generated[currentLang] = getFallbackPrompts(currentLang);
    }
  }
  prompts = raw;
  savePrompts();
  applyLang();
  render();
}

function savePrompts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
}

function applyLang() {
  document.getElementById('langToggle').textContent = t('langLabel');
  document.querySelector('.logo').innerHTML = `${t('nav.logo')}<span class="logo-accent">.</span>`;
  document.querySelector('.hero h1').innerHTML = `${t('nav.title')} <span class="gradient">.</span>`;
  document.querySelector('.hero p').textContent = t('nav.subtitle');
  document.getElementById('addBtn').innerHTML = `<i class="fas fa-plus"></i> ${t('addBtn')}`;
  document.getElementById('searchInput').placeholder = t('searchPlaceholder');
  document.getElementById('modalTitle').textContent = editingId ? t('modal.editTitle') : t('modal.newTitle');
  document.querySelectorAll('.filter-btn').forEach(btn => {
    const f = btn.dataset.filter;
    btn.textContent = f === 'all' ? t('filters.all') : t(`filters.${f}`);
  });
  document.getElementById('modalCancel').textContent = t('modal.cancel');
  document.getElementById('modalSave').textContent = t('modal.save');
  document.getElementById('footerText').textContent = t('footer');
}

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
  applyLang();
  render();
}

function render() {
  const container = document.getElementById('promptsContainer');
  const count = document.getElementById('promptCount');
  const all = getDisplayPrompts();

  let filtered = all;
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

  count.textContent = all.length;

  if (!filtered.length) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-search"></i>
        <h3>${t('empty.noResults')}</h3>
        <p>${t('empty.noResultsDesc')}</p>
      </div>`;
    return;
  }

  container.innerHTML = filtered.map(p => `
    <div class="prompt-card">
      <div class="card-top">
        <span class="card-category">${getCategoryLabel(p.category)}</span>
        <div class="card-actions">
          <button onclick="editPrompt('${p.id}')" title="${t('editTitleAttr')}"><i class="fas fa-pen"></i></button>
          <button class="delete" onclick="deletePrompt('${p.id}')" title="${t('deleteTitleAttr')}"><i class="fas fa-trash"></i></button>
        </div>
      </div>
      <h3>${escapeHtml(p.title)}</h3>
      <div class="card-text" onclick="this.classList.toggle('expanded')">${escapeHtml(p.text)}</div>
      ${p.desc ? `<div class="card-desc">${escapeHtml(p.desc)}</div>` : ''}
      <div class="card-footer">
        <span class="card-date">${p.date}</span>
        <button class="copy-btn" onclick="copyPrompt('${p.id}')"><i class="fas fa-copy"></i> ${t('copyBtn')}</button>
      </div>
    </div>
  `).join('');
}

function getCategoryLabel(cat) {
  return t(`filters.${cat}`) || cat;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function copyPrompt(id) {
  const p = findPrompt(id);
  if (!p) return;
  navigator.clipboard.writeText(p.text).then(() => {
    showToast(t('toast.copied'));
  });
}

function deletePrompt(id) {
  const p = findPrompt(id);
  if (!p) return;
  const isUser = prompts.user.some(x => x.id == id);
  if (isUser) {
    prompts.user = prompts.user.filter(x => x.id != id);
  } else {
    const g = prompts.generated[currentLang] || [];
    prompts.generated[currentLang] = g.filter(x => x.id != id);
  }
  savePrompts();
  render();
  showToast(t('toast.deleted'));
}

function editPrompt(id) {
  const p = findPrompt(id);
  if (!p) return;
  editingId = p.id;
  document.getElementById('modalTitle').textContent = t('modal.editTitle');
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
  document.getElementById('modalTitle').textContent = t('modal.newTitle');
  document.getElementById('promptTitle').value = '';
  document.getElementById('promptCategory').value = 'yazilim';
  document.getElementById('promptText').value = '';
  document.getElementById('promptDesc').value = '';
  editingId = null;
}

document.getElementById('addBtn').addEventListener('click', () => {
  editingId = null;
  document.getElementById('modalTitle').textContent = t('modal.newTitle');
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
    showToast(t('toast.required'));
    return;
  }

  if (editingId) {
    const p = findPrompt(editingId);
    if (p) {
      p.title = title;
      p.category = category;
      p.text = text;
      p.desc = desc;
    }
  } else {
    prompts.user.unshift({
      id: Date.now(),
      title,
      category,
      text,
      desc,
      date: new Date().toLocaleDateString(currentLang === 'tr' ? 'tr-TR' : 'en-US')
    });
  }

  savePrompts();
  closeModal();
  render();
  showToast(editingId ? t('toast.updated') : t('toast.added'));
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

document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) || (e.ctrlKey && ['U', 'S'].includes(e.key))) {
    e.preventDefault();
  }
});

setInterval(() => {
  const start = performance.now();
  debugger;
  if (performance.now() - start > 100) {
    document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#0a0a0f;color:#fff;font-family:sans-serif;text-align:center;padding:20px"><div><h1 style="font-size:24px;margin-bottom:12px;color:#00d4ff">\u{1F512} Developer Tools Detected</h1><p style="color:#888;font-size:14px">Please close DevTools to continue using Prompt K\u00fct\u00fcphanesi.</p></div></div>';
  }
}, 2000);

loadPrompts();

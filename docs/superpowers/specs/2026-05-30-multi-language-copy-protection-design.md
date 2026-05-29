# Prompt Kutuphanesi - Multi-Language & Copy Protection

## 1. Multi-Language (TR/EN)

**i18n System:**
- Single `i18n[lang]` object with all UI strings
- Language selector in navbar (TR | EN toggle button)
- Selection saved to `localStorage('prompt_lang')`
- Default: browser's preferred language or TR fallback

**1000+ Prompt Generation:**
- `getDefaultPrompts('tr')` and `getDefaultPrompts('en')` are separate functions with translated templates, topics, actions
- English topics/actions use generic English content (not just translated Turkish content)
- Storage structure: `{ generated: { tr: [...], en: [...] }, user: [...] }`
- On language switch: show `generated[lang]` + user prompts
- User prompts are shared between languages

## 2. Placeholder Guarantee

- Audit all action templates for unreplaced placeholders
- Add `[METIN]`, `[PROJE]`, `[METİN]` replacements where missing
- Final regex pass: `/\[[A-ZÇŞĞÜÖİ\/]+\]/g` → fallback value
- Test: every generated prompt must have 0 remaining `[PLACEHOLDER]` patterns

## 3. Copy Protection

- `user-select: none` on body
- Right-click context menu disabled
- `Ctrl+S`, `Ctrl+U`, `F12`, `Ctrl+Shift+I` blocked
- DevTools detection: periodic debugger statement + console warning
- Copy button still works (core feature)

## 4. Footer

```
© 2025 Samet Erez Atmaca. Tüm hakları saklıdır. | All rights reserved.
```

## Files Changed

- `assets/js/app.js` — i18n system, dual generator, protection
- `assets/css/style.css` — footer styles, user-select
- `index.html` — lang selector, footer HTML

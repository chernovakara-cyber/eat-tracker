const STORAGE_KEY = 'bju-diary-v1';
const PRODUCTS_KEY = 'bju-products-v1';

const defaultProducts = [
  { id: crypto.randomUUID(), name: 'Яйцо', aliases: ['яйцо','яйца','яиц'], unit: 'piece', gramsPerPiece: 55, p: 12.7, f: 10.9, c: 0.7, kcal: 157 },
  { id: crypto.randomUUID(), name: 'Кетчуп', aliases: ['кетчуп','кетчупа'], unit: 'g', gramsPerPiece: 0, p: 1.3, f: 0.2, c: 22.2, kcal: 101 },
  { id: crypto.randomUUID(), name: 'Куриная грудка', aliases: ['куриная грудка','грудка','курицы','курица'], unit: 'g', gramsPerPiece: 0, p: 31, f: 3.6, c: 0, kcal: 165 },
  { id: crypto.randomUUID(), name: 'Рис варёный', aliases: ['рис','риса'], unit: 'g', gramsPerPiece: 0, p: 2.7, f: 0.3, c: 28.2, kcal: 130 },
  { id: crypto.randomUUID(), name: 'Овсянка', aliases: ['овсянка','овсянки','овсяные хлопья'], unit: 'g', gramsPerPiece: 0, p: 12.3, f: 6.1, c: 59.5, kcal: 352 },
  { id: crypto.randomUUID(), name: 'Молоко 2.5%', aliases: ['молоко','молока'], unit: 'g', gramsPerPiece: 0, p: 2.8, f: 2.5, c: 4.7, kcal: 52 },
  { id: crypto.randomUUID(), name: 'Творог 5%', aliases: ['творог','творога'], unit: 'g', gramsPerPiece: 0, p: 17, f: 5, c: 1.8, kcal: 121 },
  { id: crypto.randomUUID(), name: 'Банан', aliases: ['банан','банана','бананы'], unit: 'g', gramsPerPiece: 0, p: 1.1, f: 0.3, c: 22.8, kcal: 96 },
  { id: crypto.randomUUID(), name: 'Сыр', aliases: ['сыр','сыра'], unit: 'g', gramsPerPiece: 0, p: 24, f: 29, c: 0.5, kcal: 363 },
  { id: crypto.randomUUID(), name: 'Хлеб', aliases: ['хлеб','хлеба'], unit: 'g', gramsPerPiece: 0, p: 8.1, f: 1, c: 48.8, kcal: 242 }
];

const $ = (id) => document.getElementById(id);
const els = {
  dayPicker: $('dayPicker'), prevDay: $('prevDay'), nextDay: $('nextDay'),
  targetProtein: $('targetProtein'), targetFat: $('targetFat'), targetCarbs: $('targetCarbs'),
  proteinEaten: $('proteinEaten'), fatEaten: $('fatEaten'), carbsEaten: $('carbsEaten'), kcalEaten: $('kcalEaten'),
  proteinLeft: $('proteinLeft'), fatLeft: $('fatLeft'), carbsLeft: $('carbsLeft'),
  proteinProgress: $('proteinProgress'), fatProgress: $('fatProgress'), carbsProgress: $('carbsProgress'),
  quickInput: $('quickInput'), parseBtn: $('parseBtn'), manualBtn: $('manualBtn'), voiceBtn: $('voiceBtn'), voiceStatus: $('voiceStatus'),
  entriesList: $('entriesList'), historyList: $('historyList'), diaryTitle: $('diaryTitle'), clearDayBtn: $('clearDayBtn'),
  manualDialog: $('manualDialog'), manualProduct: $('manualProduct'), manualAmount: $('manualAmount'), manualUnit: $('manualUnit'), manualSubmit: $('manualSubmit'),
  settingsBtn: $('settingsBtn'), settingsDialog: $('settingsDialog'), productEditor: $('productEditor'), addProductBtn: $('addProductBtn'), saveProductsBtn: $('saveProductsBtn')
};

let data = loadJSON(STORAGE_KEY, {});
let products = loadProducts();

function localDateString(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth()+1).padStart(2,'0');
  const d = String(date.getDate()).padStart(2,'0');
  return `${y}-${m}-${d}`;
}

function formatDate(dateString) {
  const d = new Date(dateString + 'T12:00:00');
  return d.toLocaleDateString('ru-RU', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
}

function loadJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function saveProducts() {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

function loadProducts() {
  const saved = loadJSON(PRODUCTS_KEY, null);
  return Array.isArray(saved) && saved.length ? saved : structuredClone(defaultProducts);
}

function ensureDay(date) {
  if (!data[date]) data[date] = { targets: { p: 0, f: 0, c: 0 }, entries: [] };
  return data[date];
}

function round1(n) {
  return Math.round((Number(n) || 0) * 10) / 10;
}

function escapeHtml(value='') {
  return value.replace(/[&<>'"]/g, c => ({
    '&':'&amp;',
    '<':'&lt;',
    '>':'&gt;',
    "'":'&#39;',
    '"':'&quot;'
  }[c]));
}

function totalsFor(day) {
  return day.entries.reduce((acc, e) => {
    acc.p += e.p;
    acc.f += e.f;
    acc.c += e.c;
    acc.kcal += e.kcal;
    return acc;
  }, {p:0,f:0,c:0,kcal:0});
}

function calcFromProduct(product, amount, unit) {
  let grams = Number(amount);

  if (unit === 'piece') {
    grams = Number(amount) * Number(product.gramsPerPiece || 0);
  }

  const factor = grams / 100;

  return {
    grams,
    p: product.p * factor,
    f: product.f * factor,
    c: product.c * factor,
    kcal: product.kcal * factor
  };
}

function render() {
  const date = els.dayPicker.value;
  const day = ensureDay(date);
  const totals = totalsFor(day);

  els.diaryTitle.textContent = `Еда за ${formatDate(date)}`;

  els.targetProtein.value = day.targets.p || '';
  els.targetFat.value = day.targets.f || '';
  els.targetCarbs.value = day.targets.c || '';

  updateStat('protein', totals.p, day.targets.p);
  updateStat('fat', totals.f, day.targets.f);
  updateStat('carbs', totals.c, day.targets.c);

  els.kcalEaten.textContent = `${Math.round(totals.kcal)} ккал`;

  renderEntries(day);
  renderHistory();
  renderManualProducts();
}

function updateStat(type, eaten, target) {
  const targetNum = Number(target) || 0;
  const left = Math.max(0, targetNum - eaten);

  els[type + 'Eaten'].textContent = `${round1(eaten)} г`;
  els[type + 'Left'].textContent = targetNum
    ? `${round1(left)} г`
    : 'цель не задана';

  const pct = targetNum
    ? Math.min(100, eaten / targetNum * 100)
    : 0;

  els[type + 'Progress'].style.width = `${pct}%`;
}

function renderEntries(day) {
  if (!day.entries.length) {
    els.entriesList.innerHTML =
      '<div class="empty">Пока ничего не записано.</div>';
    return;
  }

  els.entriesList.innerHTML = day.entries.map(e => `
    <div class="entry">
      <div>
        <div class="entry-title">
          ${escapeHtml(e.name)} — ${round1(e.amount)}
          ${e.unit === 'piece' ? 'шт.' : 'г'}
        </div>

        <div class="entry-macros">
          Б ${round1(e.p)} ·
          Ж ${round1(e.f)} ·
          У ${round1(e.c)} ·
          ${Math.round(e.kcal)} ккал
        </div>
      </div>

      <div class="entry-actions">
        <button
          class="mini-btn delete-entry"
          data-id="${e.id}">
          Удалить
        </button>
      </div>
    </div>
  `).join('');

  els.entriesList
    .querySelectorAll('.delete-entry')
    .forEach(btn => btn.addEventListener('click', () => {
      day.entries = day.entries.filter(
        e => e.id !== btn.dataset.id
      );

      saveData();
      render();
    }));
}

function renderHistory() {
  const dates = Object.keys(data)
    .filter(d =>
      data[d].entries.length ||
      data[d].targets.p ||
      data[d].targets.f ||
      data[d].targets.c
    )
    .sort((a,b) => b.localeCompare(a));

  if (!dates.length) {
    els.historyList.innerHTML =
      '<div class="empty">История появится после первой записи.</div>';
    return;
  }

  els.historyList.innerHTML = dates.map(date => {
    const t = totalsFor(data[date]);

    return `
      <div class="history-item" data-date="${date}">
        <div>
          <div class="history-date">
            ${formatDate(date)}
          </div>

          <div class="history-meta">
            Б ${round1(t.p)} ·
            Ж ${round1(t.f)} ·
            У ${round1(t.c)} ·
            ${Math.round(t.kcal)} ккал
          </div>
        </div>

        <span>→</span>
      </div>
    `;
  }).join('');

  els.historyList
    .querySelectorAll('.history-item')
    .forEach(item => item.addEventListener('click', () => {
      els.dayPicker.value = item.dataset.date;
      render();
      window.scrollTo({top:0, behavior:'smooth'});
    }));
}

function saveTargets() {
  const day = ensureDay(els.dayPicker.value);

  day.targets = {
    p: Number(els.targetProtein.value) || 0,
    f: Number(els.targetFat.value) || 0,
    c: Number(els.targetCarbs.value) || 0
  };

  saveData();
  render();
}

function addEntry(product, amount, unit) {
  if (!product || !amount || amount <= 0) return;

  const calc = calcFromProduct(product, amount, unit);

  if (unit === 'piece' && !product.gramsPerPiece) {
    alert(
      'Для этого продукта не указан вес одной штуки. ' +
      'Измени его в разделе «Продукты».'
    );
    return;
  }

  const day = ensureDay(els.dayPicker.value);

  day.entries.push({
    id: crypto.randomUUID(),
    productId: product.id,
    name: product.name,
    amount: Number(amount),
    unit,
    ...calc
  });

  saveData();
  render();
}

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/,/g,'.')
    .replace(/(граммов|грамма|грамм|гр\.?)/g,'г')
    .replace(/(штуки|штук|штука)/g,'шт');
}

function parseQuickText(raw) {
  const text = normalizeText(raw);
  const found = [];

  const sorted = [...products].sort(
    (a,b) =>
      Math.max(...b.aliases.map(x=>x.length)) -
      Math.max(...a.aliases.map(x=>x.length))
  );

  for (const product of sorted) {
    const aliases = [
      product.name.toLowerCase(),
      ...(product.aliases || [])
    ];

    for (const alias of aliases.sort((a,b)=>b.length-a.length)) {
      const esc = alias.replace(
        /[.*+?^${}()|[\]\\]/g,
        '\\$&'
      );

      const patterns = [
        new RegExp(
          `(\\d+(?:\\.\\d+)?)\\s*(г|шт)?\\s*(?:${esc})`,
          'i'
        ),
        new RegExp(
          `(?:${esc})\\s*(\\d+(?:\\.\\d+)?)\\s*(г|шт)?`,
          'i'
        )
      ];

      let match = null;

      for (const p of patterns) {
        match = text.match(p);
        if (match) break;
      }

      if (match) {
        const amount = Number(match[1]);
        const token = match[2];

        let unit =
          token === 'шт'
            ? 'piece'
            : token === 'г'
              ? 'g'
              : product.unit;

        found.push({
          product,
          amount,
          unit
        });

        break;
      }
    }
  }

  return found;
}

function renderManualProducts() {
  els.manualProduct.innerHTML = products
    .map(p => `
      <option value="${p.id}">
        ${escapeHtml(p.name)}
      </option>
    `)
    .join('');

  const selected =
    products.find(p => p.id === els.manualProduct.value)
    || products[0];

  if (selected) {
    els.manualUnit.value = selected.unit || 'g';
  }
}

function openProductEditor() {
  els.productEditor.innerHTML =
    products.map(productRowHtml).join('');

  els.settingsDialog.showModal();
}

function productRowHtml(p) {
  return `
    <div class="product-row" data-id="${p.id}">
      <label>
        Название
        <input
          data-field="name"
          value="${escapeHtml(p.name)}">
      </label>

      <label>
        Б/100г
        <input
          data-field="p"
          type="number"
          step="0.1"
          value="${p.p}">
      </label>

      <label>
        Ж/100г
        <input
          data-field="f"
          type="number"
          step="0.1"
          value="${p.f}">
      </label>

      <label>
        У/100г
        <input
          data-field="c"
          type="number"
          step="0.1"
          value="${p.c}">
      </label>

      <label>
        ккал/100г
        <input
          data-field="kcal"
          type="number"
          step="0.1"
          value="${p.kcal}">
      </label>

      <label>
        г/шт
        <input
          data-field="gramsPerPiece"
          type="number"
          step="0.1"
          value="${p.gramsPerPiece || 0}">
      </label>

      <button
        class="remove-product"
        type="button">
        Удалить
      </button>
    </div>
  `;
}

function bindProductEditorRemovers() {
  els.productEditor
    .querySelectorAll('.remove-product')
    .forEach(btn =>
      btn.addEventListener('click', () =>
        btn.closest('.product-row').remove()
      )
    );
}

function saveProductEditor() {
  const rows = [
    ...els.productEditor.querySelectorAll('.product-row')
  ];

  products = rows.map(row => {
    const get = f =>
      row.querySelector(`[data-field="${f}"]`).value;

    const old = products.find(
      p => p.id === row.dataset.id
    );

    const name = get('name').trim();

    return {
      id: row.dataset.id || crypto.randomUUID(),

      name,

      aliases:
        old?.aliases?.length
          ? old.aliases
          : [name.toLowerCase()],

      unit:
        Number(get('gramsPerPiece')) > 0
          ? (old?.unit || 'g')
          : 'g',

      gramsPerPiece:
        Number(get('gramsPerPiece')) || 0,

      p: Number(get('p')) || 0,
      f: Number(get('f')) || 0,
      c: Number(get('c')) || 0,
      kcal: Number(get('kcal')) || 0
    };
  }).filter(p => p.name);

  saveProducts();
  els.settingsDialog.close();
  render();
}


// Дата

els.dayPicker.value = localDateString();

els.dayPicker.addEventListener(
  'change',
  render
);

els.prevDay.addEventListener('click', () => {
  const d = new Date(
    els.dayPicker.value + 'T12:00:00'
  );

  d.setDate(d.getDate() - 1);

  els.dayPicker.value =
    localDateString(d);

  render();
});

els.nextDay.addEventListener('click', () => {
  const d = new Date(
    els.dayPicker.value + 'T12:00:00'
  );

  d.setDate(d.getDate() + 1);

  els.dayPicker.value =
    localDateString(d);

  render();
});


// Цели БЖУ

[
  els.targetProtein,
  els.targetFat,
  els.targetCarbs
].forEach(i =>
  i.addEventListener(
    'change',
    saveTargets
  )
);


// Быстрый ввод

els.parseBtn.addEventListener('click', () => {
  const parsed =
    parseQuickText(
      els.quickInput.value.trim()
    );

  if (!parsed.length) {
    alert(
      'Не получилось распознать продукты. ' +
      'Проверь названия или добавь запись вручную.'
    );
    return;
  }

  parsed.forEach(x =>
    addEntry(
      x.product,
      x.amount,
      x.unit
    )
  );

  els.quickInput.value = '';
});


// Ручное добавление

els.manualBtn.addEventListener('click', () => {
  renderManualProducts();

  els.manualAmount.value = '';

  els.manualDialog.showModal();
});

els.manualProduct.addEventListener('change', () => {
  const p = products.find(
    x => x.id === els.manualProduct.value
  );

  if (p) {
    els.manualUnit.value =
      p.unit || 'g';
  }
});

els.manualSubmit.addEventListener('click', () => {
  const p = products.find(
    x => x.id === els.manualProduct.value
  );

  addEntry(
    p,
    Number(els.manualAmount.value),
    els.manualUnit.value
  );

  els.manualDialog.close();
});


// Очистить день

els.clearDayBtn.addEventListener('click', () => {
  if (
    confirm(
      'Удалить все записи этого дня? Цели БЖУ останутся.'
    )
  ) {
    ensureDay(
      els.dayPicker.value
    ).entries = [];

    saveData();
    render();
  }
});


// Настройки продуктов

els.settingsBtn.addEventListener('click', () => {
  openProductEditor();
  bindProductEditorRemovers();
});

els.addProductBtn.addEventListener('click', () => {
  const p = {
    id: crypto.randomUUID(),
    name: 'Новый продукт',
    aliases: ['новый продукт'],
    unit: 'g',
    gramsPerPiece: 0,
    p: 0,
    f: 0,
    c: 0,
    kcal: 0
  };

  els.productEditor.insertAdjacentHTML(
    'beforeend',
    productRowHtml(p)
  );

  bindProductEditorRemovers();
});

els.saveProductsBtn.addEventListener(
  'click',
  saveProductEditor
);


// Голосовой ввод

const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const rec =
    new SpeechRecognition();

  rec.lang = 'ru-RU';
  rec.interimResults = false;
  rec.maxAlternatives = 1;

  rec.onstart = () => {
    els.voiceBtn.classList.add(
      'listening'
    );

    els.voiceBtn.textContent =
      '🎙️ Слушаю…';

    els.voiceStatus.hidden = false;

    els.voiceStatus.textContent =
      'Говори, например: «2 яйца и 30 грамм кетчупа»';
  };

  rec.onresult = (e) => {
    els.quickInput.value =
      e.results[0][0].transcript;
  };

  rec.onerror = (e) => {
    els.voiceStatus.hidden = false;

    els.voiceStatus.textContent =
      'Не удалось распознать речь: ' +
      e.error;
  };

  rec.onend = () => {
    els.voiceBtn.classList.remove(
      'listening'
    );

    els.voiceBtn.textContent =
      '🎙️ Сказать голосом';
  };

  els.voiceBtn.addEventListener(
    'click',
    () => rec.start()
  );

} else {
  els.voiceBtn.disabled = true;

  els.voiceBtn.textContent =
    '🎙️ Голос недоступен';
}

render();

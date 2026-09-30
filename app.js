const STORAGE_KEY = 'bju-diary-v1';
const PRODUCTS_KEY = 'bju-products-v6';

/* =========================================================
   БАЗОВЫЕ ФУНКЦИИ
========================================================= */

function calculateKcal(p, f, c) {
  return (
    Number(p || 0) * 4 +
    Number(f || 0) * 9 +
    Number(c || 0) * 4
  );
}

function makeProduct(
  id,
  name,
  aliases,
  p,
  f,
  c,
  options = {}
) {
  return {
    id,
    name,
    aliases,
    unit: options.unit || 'g',
    gramsPerPiece: options.gramsPerPiece || 0,
    p,
    f,
    c,
    countProtein: options.countProtein === true,
    kcal: calculateKcal(p, f, c)
  };
}

/* =========================================================
   ПРОДУКТЫ
========================================================= */

const defaultProducts = [
  makeProduct(
    'rice',
    'Рис',
    ['рис', 'риса'],
    7.2,
    0.5,
    76.9
  ),

  makeProduct(
    'pasta',
    'Макароны',
    ['макароны', 'макарон'],
    12,
    1.3,
    70.5
  ),

  makeProduct(
    'buckwheat',
    'Гречка',
    ['гречка', 'гречки', 'гречку'],
    13,
    2.5,
    61
  ),

  makeProduct(
    'chicken',
    'Куриная грудка',
    [
      'куриная грудка',
      'куриной грудки',
      'куриную грудку',
      'грудка',
      'грудки',
      'грудку',
      'курица',
      'курицы',
      'курицу'
    ],
    22,
    4,
    0,
    {
      countProtein: true
    }
  ),

  makeProduct(
    'tuna',
    'Тунец консервированный',
    [
      'тунец',
      'тунца',
      'консервированный тунец',
      'консервированного тунца',
      'тунца консервированного'
    ],
    23,
    1,
    0,
    {
      countProtein: true
    }
  ),

  makeProduct(
    'eggs',
    'Яйца',
    [
      'яйцо',
      'яйца',
      'яиц',
      'яйцами'
    ],
    12.6,
    11.5,
    0.7,
    {
      countProtein: true
    }
  ),

  makeProduct(
    'ham',
    'Ветчина',
    [
      'ветчина',
      'ветчины',
      'ветчину'
    ],
    14,
    4,
    4,
    {
      countProtein: true
    }
  ),

  makeProduct(
    'greek-yogurt',
    'Греческий йогурт',
    [
      'греческий йогурт',
      'греческого йогурта',
      'йогурт',
      'йогурта'
    ],
    8,
    2,
    4.2,
    {
      countProtein: true
    }
  ),

  makeProduct(
    'cheese',
    'Сыр',
    [
      'сыр',
      'сыра'
    ],
    26,
    26,
    0,
    {
      countProtein: true
    }
  ),

  makeProduct(
    'cream-cheese',
    'Творожный сыр',
    [
      'творожный сыр',
      'творожного сыра'
    ],
    6.2,
    21.7,
    4.2,
    {
      countProtein: true
    }
  ),

  makeProduct(
    'beans',
    'Фасоль',
    [
      'фасоль',
      'фасоли'
    ],
    4.5,
    2,
    14
  ),

  makeProduct(
    'bread',
    'Хлеб',
    [
      'хлеб',
      'хлеба'
    ],
    6,
    0,
    46
  ),

  makeProduct(
    'cucumbers',
    'Огурцы',
    [
      'огурец',
      'огурца',
      'огурцы',
      'огурцов'
    ],
    0,
    0,
    3
  ),

  makeProduct(
    'olives',
    'Оливки',
    [
      'оливки',
      'оливок',
      'оливку'
    ],
    2,
    16,
    5
  ),

  makeProduct(
    'asparagus',
    'Спаржа',
    [
      'спаржа',
      'спаржи',
      'спаржу'
    ],
    12,
    15,
    10
  ),

  makeProduct(
    'honey-mustard',
    'Медово-горчичный соус',
    [
      'медово-горчичный соус',
      'медово горчичный соус',
      'медово-горчичного соуса',
      'медово горчичного соуса',
      'горчичный соус',
      'горчичного соуса'
    ],
    1.7,
    37.2,
    22.5
  )
];

/* =========================================================
   ЭЛЕМЕНТЫ
========================================================= */

const $ = id => document.getElementById(id);

const els = {
  dayPicker: $('dayPicker'),
  prevDay: $('prevDay'),
  nextDay: $('nextDay'),

  targetProtein: $('targetProtein'),
  targetFat: $('targetFat'),
  targetCarbs: $('targetCarbs'),

  proteinEaten: $('proteinEaten'),
  fatEaten: $('fatEaten'),
  carbsEaten: $('carbsEaten'),
  kcalEaten: $('kcalEaten'),

  proteinLeft: $('proteinLeft'),
  fatLeft: $('fatLeft'),
  carbsLeft: $('carbsLeft'),

  proteinProgress: $('proteinProgress'),
  fatProgress: $('fatProgress'),
  carbsProgress: $('carbsProgress'),

  quickInput: $('quickInput'),
  parseBtn: $('parseBtn'),
  manualBtn: $('manualBtn'),
  voiceBtn: $('voiceBtn'),
  voiceStatus: $('voiceStatus'),

  entriesList: $('entriesList'),
  historyList: $('historyList'),
  diaryTitle: $('diaryTitle'),
  clearDayBtn: $('clearDayBtn'),

  manualDialog: $('manualDialog'),
  manualProduct: $('manualProduct'),
  manualAmount: $('manualAmount'),
  manualUnit: $('manualUnit'),
  manualSubmit: $('manualSubmit'),

  settingsBtn: $('settingsBtn'),
  settingsDialog: $('settingsDialog'),
  productEditor: $('productEditor'),
  addProductBtn: $('addProductBtn'),
  saveProductsBtn: $('saveProductsBtn')
};

/* =========================================================
   ДАННЫЕ
========================================================= */

let data = loadJSON(STORAGE_KEY, {});
let products = loadProducts();
let editingEntryId = null;

/* =========================================================
   СОХРАНЕНИЕ
========================================================= */

function loadJSON(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function saveData() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
}

function saveProducts() {
  localStorage.setItem(
    PRODUCTS_KEY,
    JSON.stringify(products)
  );
}

function loadProducts() {
  const saved = loadJSON(PRODUCTS_KEY, null);

  if (Array.isArray(saved) && saved.length) {
    return saved.map(product => {
      if (typeof product.countProtein !== 'boolean') {
        product.countProtein = shouldProteinCountByName(product.name);
      }

      product.kcal = calculateKcal(product.p, product.f, product.c);
      return product;
    });
  }

  return structuredClone(defaultProducts);
}

/* =========================================================
   БЕЛОК
========================================================= */

function shouldProteinCountByName(name = '') {
  const n = name.toLowerCase();

  const allowedWords = [
    'курин',
    'грудк',
    'мяс',
    'говядин',
    'индейк',
    'свинин',
    'рыб',
    'тунец',
    'тунц',
    'лосос',
    'семг',
    'форел',
    'кревет',
    'яйц',
    'ветчин',
    'йогурт',
    'сыр',
    'творог',
    'молок',
    'кефир',
    'протеин'
  ];

  return allowedWords.some(word => n.includes(word));
}

/* =========================================================
   ДАТЫ
========================================================= */

function localDateString(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDate(dateString) {
  const d = new Date(dateString + 'T12:00:00');

  return d.toLocaleDateString('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

/* =========================================================
   ОБЩИЕ
========================================================= */

function ensureDay(date) {
  if (!data[date]) {
    data[date] = {
      targets: {
        p: 0,
        f: 0,
        c: 0
      },
      entries: []
    };
  }

  return data[date];
}

function round1(n) {
  return Math.round((Number(n) || 0) * 10) / 10;
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[c]));
}

/* =========================================================
   ПОДСЧЁТ
========================================================= */

function totalsFor(day) {
  return day.entries.reduce((acc, entry) => {
    acc.p += Number(entry.p) || 0;
    acc.f += Number(entry.f) || 0;
    acc.c += Number(entry.c) || 0;
    acc.kcal += Number(entry.kcal) || 0;
    return acc;
  }, {
    p: 0,
    f: 0,
    c: 0,
    kcal: 0
  });
}

function calcFromValues(
  amount,
  unit,
  gramsPerPiece,
  p100,
  f100,
  c100,
  countProtein
) {
  let grams = Number(amount);

  if (unit === 'piece') {
    grams = Number(amount) * Number(gramsPerPiece || 0);
  }

  const factor = grams / 100;

  const realProtein = Number(p100 || 0) * factor;
  const fat = Number(f100 || 0) * factor;
  const carbs = Number(c100 || 0) * factor;

  return {
    grams,
    p: countProtein ? realProtein : 0,
    realProtein,
    f: fat,
    c: carbs,
    kcal: calculateKcal(p100, f100, c100) * factor
  };
}

function calcFromProduct(product, amount, unit) {
  return calcFromValues(
    amount,
    unit,
    product.gramsPerPiece,
    product.p,
    product.f,
    product.c,
    product.countProtein
  );
}

/* =========================================================
   ОТРИСОВКА
========================================================= */

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
  const left = targetNum - eaten;

  els[type + 'Eaten'].textContent = `${round1(eaten)} г`;

  if (!targetNum) {
    els[type + 'Left'].textContent = 'цель не задана';
  } else if (left >= 0) {
    els[type + 'Left'].textContent = `${round1(left)} г`;
  } else {
    els[type + 'Left'].textContent = `+${round1(Math.abs(left))} г`;
  }

  const pct = targetNum
    ? Math.min(100, eaten / targetNum * 100)
    : 0;

  els[type + 'Progress'].style.width = `${pct}%`;
}

/* =========================================================
   СПИСОК ЕДЫ
========================================================= */

function renderEntries(day) {
  if (!day.entries.length) {
    els.entriesList.innerHTML =
      '<div class="empty">Пока ничего не записано.</div>';
    return;
  }

  els.entriesList.innerHTML = day.entries.map(entry => `
    <div class="entry">
      <div>
        <div class="entry-title">
          ${escapeHtml(entry.name)}
          —
          ${round1(entry.amount)}
          ${entry.unit === 'piece' ? 'шт.' : 'г'}
        </div>

        <div class="entry-macros">
          Б ${round1(entry.p)} ·
          Ж ${round1(entry.f)} ·
          У ${round1(entry.c)} ·
          ${Math.round(entry.kcal)} ккал
        </div>
      </div>

      <div class="entry-actions">
        <button
          class="mini-btn edit-entry"
          data-id="${entry.id}"
        >
          ✏️ Редактировать
        </button>

        <button
          class="mini-btn delete-entry"
          data-id="${entry.id}"
        >
          Удалить
        </button>
      </div>
    </div>
  `).join('');

  els.entriesList
    .querySelectorAll('.delete-entry')
    .forEach(btn => {
      btn.addEventListener('click', () => {
        day.entries = day.entries.filter(
          entry => entry.id !== btn.dataset.id
        );

        saveData();
        render();
      });
    });

  els.entriesList
    .querySelectorAll('.edit-entry')
    .forEach(btn => {
      btn.addEventListener('click', () => {
        const entry = day.entries.find(
          item => item.id === btn.dataset.id
        );

        if (entry) {
          openEntryEditor(entry);
        }
      });
    });
}

/* =========================================================
   СТИЛИ ОБЛАЧКА
========================================================= */

function ensureCloudStyles() {
  if (document.getElementById('cloud-editor-styles')) {
    return;
  }

  const style = document.createElement('style');
  style.id = 'cloud-editor-styles';

  style.textContent = `
    #entryEditDialog {
      border: none !important;
      padding: 0 !important;
      margin: auto !important;
      background: transparent !important;
      width: min(96vw, 760px) !important;
      max-width: 760px !important;
      overflow: visible !important;
    }

    #entryEditDialog::backdrop {
      background: rgba(66, 33, 82, .34) !important;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }

    .cloud-stage {
      position: relative;
      width: 100%;
      min-height: 760px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: visible;
      padding: 30px 0;
    }

    .cloud-shape {
      position: relative;
      width: min(92vw, 670px);
      min-height: 640px;
      background: linear-gradient(
        180deg,
        rgba(246, 233, 246, .98) 0%,
        rgba(235, 220, 243, .98) 100%
      );
      border: 3px solid rgba(255,255,255,.95);
      border-radius: 42% 42% 40% 40% / 28% 28% 34% 34%;
      box-shadow:
        0 40px 95px rgba(99, 60, 121, .28),
        inset 0 2px 0 rgba(255,255,255,.95),
        inset 0 -14px 24px rgba(187, 151, 208, .12);
      overflow: visible;
      animation: cloudAppear .26s ease;
    }

    .cloud-shape::before,
    .cloud-shape::after {
      content: "";
      position: absolute;
      background: inherit;
      border: inherit;
      box-shadow: inherit;
      z-index: -1;
    }

    .cloud-shape::before {
      width: 210px;
      height: 210px;
      border-radius: 50%;
      top: -72px;
      left: 50px;
    }

    .cloud-shape::after {
      width: 260px;
      height: 260px;
      border-radius: 50%;
      top: -92px;
      right: 45px;
    }

    .cloud-puff {
      position: absolute;
      background: linear-gradient(
        180deg,
        rgba(246, 233, 246, .98) 0%,
        rgba(235, 220, 243, .98) 100%
      );
      border: 3px solid rgba(255,255,255,.95);
      border-radius: 50%;
      box-shadow:
        0 40px 95px rgba(99, 60, 121, .18),
        inset 0 2px 0 rgba(255,255,255,.95),
        inset 0 -10px 20px rgba(187, 151, 208, .12);
      z-index: -1;
    }

    .puff-1 {
      width: 180px;
      height: 180px;
      top: -58px;
      left: -34px;
    }

    .puff-2 {
      width: 240px;
      height: 240px;
      top: -112px;
      left: 180px;
    }

    .puff-3 {
      width: 190px;
      height: 190px;
      top: -36px;
      right: -18px;
    }

    .puff-4 {
      width: 160px;
      height: 160px;
      bottom: -42px;
      left: 20px;
    }

    .puff-5 {
      width: 210px;
      height: 210px;
      bottom: -72px;
      right: 56px;
    }

    @keyframes cloudAppear {
      from {
        opacity: 0;
        transform: translateY(16px) scale(.97);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .cloud-inner {
      position: relative;
      z-index: 2;
      padding: 58px 42px 40px;
    }

    .cloud-editor-header {
      text-align: center;
      margin-bottom: 28px;
    }

    .cloud-editor-icon {
      width: 88px;
      height: 88px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      margin: -78px auto 12px;
      font-size: 38px;
      color: white;
      background: linear-gradient(135deg, #ff71b8, #8f5cff);
      box-shadow: 0 18px 34px rgba(143,92,255,.26);
      border: 4px solid rgba(255,255,255,.95);
    }

    .cloud-editor-title {
      margin: 0;
      font-size: 34px;
      line-height: 1.08;
      font-weight: 900;
      background: linear-gradient(90deg, #e763b2, #8b57ea);
      color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
    }

    .cloud-editor-subtitle {
      margin: 10px 0 0;
      color: #7a6281;
      font-size: 17px;
      line-height: 1.35;
    }

    .cloud-editor-body {
      display: grid;
      gap: 16px;
    }

    .cloud-field {
      display: grid;
      gap: 7px;
    }

    .cloud-field > span {
      font-size: 17px;
      font-weight: 800;
      color: #6b4772;
      padding-left: 8px;
    }

    .cloud-field input,
    .cloud-field select {
      width: 100%;
      border: 2px solid rgba(210, 181, 227, .92);
      border-radius: 28px;
      padding: 18px 22px;
      font-size: 18px;
      font-weight: 700;
      color: #341936;
      background: rgba(255,255,255,.78);
      outline: none;
      box-shadow:
        inset 0 1px 0 rgba(255,255,255,.95),
        0 8px 20px rgba(111, 75, 127, .08);
    }

    .cloud-field input:focus,
    .cloud-field select:focus {
      border-color: #9568ee;
      box-shadow:
        0 0 0 5px rgba(143,92,255,.11),
        0 8px 24px rgba(111, 75, 127, .12);
    }

    .cloud-macro-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }

    .cloud-check {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      padding: 16px 18px;
      border-radius: 24px;
      background: rgba(255,255,255,.42);
      border: 2px solid rgba(255,255,255,.72);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.7);
      color: #68496f;
      font-size: 16px;
      font-weight: 700;
      line-height: 1.25;
    }

    .cloud-check input {
      width: 24px;
      height: 24px;
      flex: 0 0 auto;
      margin-top: 2px;
      accent-color: #8f5cff;
    }

    .cloud-editor-footer {
      display: flex;
      gap: 16px;
      margin-top: 24px;
    }

    .cloud-cancel,
    .cloud-save {
      flex: 1;
      border: 0;
      border-radius: 24px;
      padding: 18px 18px;
      font-size: 18px;
      font-weight: 900;
      cursor: pointer;
      transition: transform .15s ease, box-shadow .15s ease;
    }

    .cloud-cancel {
      background: rgba(255,255,255,.72);
      color: #765b7b;
      box-shadow: 0 8px 20px rgba(97,64,110,.08);
    }

    .cloud-save {
      color: white;
      background: linear-gradient(90deg, #ff70b7, #8f5cff);
      box-shadow: 0 14px 28px rgba(143,92,255,.24);
    }

    .cloud-cancel:hover,
    .cloud-save:hover {
      transform: translateY(-2px);
    }

    @media (max-width: 760px) {
      #entryEditDialog {
        width: calc(100% - 16px) !important;
      }

      .cloud-stage {
        min-height: auto;
        padding: 18px 0;
      }

      .cloud-shape {
        width: calc(100vw - 24px);
        min-height: auto;
        border-radius: 42px;
      }

      .cloud-shape::before,
      .cloud-shape::after,
      .cloud-puff {
        display: none;
      }

      .cloud-inner {
        padding: 38px 18px 22px;
      }

      .cloud-editor-icon {
        width: 72px;
        height: 72px;
        font-size: 32px;
        margin-top: -56px;
      }

      .cloud-editor-title {
        font-size: 28px;
      }

      .cloud-editor-subtitle {
        font-size: 15px;
      }

      .cloud-field > span {
        font-size: 15px;
      }

      .cloud-field input,
      .cloud-field select {
        padding: 15px 16px;
        font-size: 17px;
        border-radius: 22px;
      }

      .cloud-macro-grid {
        grid-template-columns: 1fr;
      }

      .cloud-check {
        font-size: 14px;
        padding: 14px;
      }

      .cloud-editor-footer {
        flex-direction: column-reverse;
      }

      .cloud-cancel,
      .cloud-save {
        width: 100%;
        padding: 16px;
      }
    }
  `;

  document.head.appendChild(style);
}

/* =========================================================
   СОЗДАНИЕ ОБЛАЧКА
========================================================= */

function ensureEntryEditor() {
  ensureCloudStyles();

  if (document.getElementById('entryEditDialog')) {
    return;
  }

  const dialog = document.createElement('dialog');
  dialog.id = 'entryEditDialog';

  dialog.innerHTML = `
    <div class="cloud-stage">
      <div class="cloud-shape">
        <div class="cloud-puff puff-1"></div>
        <div class="cloud-puff puff-2"></div>
        <div class="cloud-puff puff-3"></div>
        <div class="cloud-puff puff-4"></div>
        <div class="cloud-puff puff-5"></div>

        <div class="cloud-inner">
          <div class="cloud-editor-header">
            <div class="cloud-editor-icon">✏️</div>

            <h2 class="cloud-editor-title">
              Редактировать продукт
            </h2>

            <p class="cloud-editor-subtitle">
              Измени количество или БЖУ с упаковки
            </p>
          </div>

          <div class="cloud-editor-body">
            <label class="cloud-field">
              <span>Название</span>
              <input
                id="editEntryName"
                type="text"
              >
            </label>

            <label class="cloud-field">
              <span>Количество</span>
              <input
                id="editEntryAmount"
                type="number"
                min="0"
                step="0.1"
              >
            </label>

            <label class="cloud-field">
              <span>Единица</span>
              <select id="editEntryUnit">
                <option value="g">граммы</option>
                <option value="piece">штуки</option>
              </select>
            </label>

            <div class="cloud-macro-grid">
              <label class="cloud-field">
                <span>Белки / 100 г</span>
                <input
                  id="editEntryProtein"
                  type="number"
                  min="0"
                  step="0.1"
                >
              </label>

              <label class="cloud-field">
                <span>Жиры / 100 г</span>
                <input
                  id="editEntryFat"
                  type="number"
                  min="0"
                  step="0.1"
                >
              </label>

              <label class="cloud-field">
                <span>Углеводы / 100 г</span>
                <input
                  id="editEntryCarbs"
                  type="number"
                  min="0"
                  step="0.1"
                >
              </label>
            </div>

            <label
              class="cloud-field"
              id="editEntryPieceWeightWrap"
            >
              <span>Вес одной штуки, г</span>
              <input
                id="editEntryPieceWeight"
                type="number"
                min="0"
                step="0.1"
              >
            </label>

            <label class="cloud-check">
              <input
                id="editEntryCountProtein"
                type="checkbox"
              >
              <span>
                Учитывать белок этого продукта
                в моей дневной норме
              </span>
            </label>

            <label class="cloud-check">
              <input
                id="editEntrySaveProduct"
                type="checkbox"
              >
              <span>
                Сохранить эти БЖУ для этого продукта
                на будущее
              </span>
            </label>
          </div>

          <div class="cloud-editor-footer">
            <button
              type="button"
              id="cancelEntryEdit"
              class="cloud-cancel"
            >
              Отмена
            </button>

            <button
              type="button"
              id="saveEntryEdit"
              class="cloud-save"
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(dialog);

  document
    .getElementById('cancelEntryEdit')
    .addEventListener('click', () => {
      dialog.close();
    });

  document
    .getElementById('editEntryUnit')
    .addEventListener('change', updateEntryPieceField);

  document
    .getElementById('saveEntryEdit')
    .addEventListener('click', saveEntryEdit);

  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
}

/* =========================================================
   РЕДАКТИРОВАНИЕ ЗАПИСИ
========================================================= */

function findProductForEntry(entry) {
  return (
    products.find(
      product => product.id === entry.productId
    )
    ||
    products.find(
      product =>
        product.name.toLowerCase() ===
        String(entry.name || '').toLowerCase()
    )
  );
}

function openEntryEditor(entry) {
  ensureEntryEditor();

  editingEntryId = entry.id;

  const product = findProductForEntry(entry);

  document.getElementById('editEntryName').value =
    entry.name || '';

  document.getElementById('editEntryAmount').value =
    entry.amount || '';

  document.getElementById('editEntryUnit').value =
    entry.unit || 'g';

  document.getElementById('editEntryProtein').value =
    entry.p100 ?? product?.p ?? 0;

  document.getElementById('editEntryFat').value =
    entry.f100 ?? product?.f ?? 0;

  document.getElementById('editEntryCarbs').value =
    entry.c100 ?? product?.c ?? 0;

  document.getElementById('editEntryPieceWeight').value =
    entry.gramsPerPiece ?? product?.gramsPerPiece ?? 0;

  const countProtein =
    typeof entry.countProtein === 'boolean'
      ? entry.countProtein
      : (
          product
            ? product.countProtein
            : shouldProteinCountByName(entry.name)
        );

  document.getElementById('editEntryCountProtein').checked =
    countProtein;

  document.getElementById('editEntrySaveProduct').checked =
    false;

  updateEntryPieceField();

  document.getElementById('entryEditDialog').showModal();
}

function updateEntryPieceField() {
  const unit = document.getElementById('editEntryUnit').value;
  const wrap = document.getElementById('editEntryPieceWeightWrap');

  wrap.style.display = unit === 'piece' ? 'grid' : 'none';
}

function saveEntryEdit() {
  const day = ensureDay(els.dayPicker.value);

  const entry = day.entries.find(
    item => item.id === editingEntryId
  );

  if (!entry) {
    return;
  }

  const name = document.getElementById('editEntryName').value.trim();

  const amount = Number(
    document.getElementById('editEntryAmount').value
  );

  const unit = document.getElementById('editEntryUnit').value;

  const p100 = Number(
    document.getElementById('editEntryProtein').value
  ) || 0;

  const f100 = Number(
    document.getElementById('editEntryFat').value
  ) || 0;

  const c100 = Number(
    document.getElementById('editEntryCarbs').value
  ) || 0;

  const gramsPerPiece = Number(
    document.getElementById('editEntryPieceWeight').value
  ) || 0;

  const countProtein = document.getElementById('editEntryCountProtein').checked;

  const saveForFuture = document.getElementById('editEntrySaveProduct').checked;

  if (!name || amount <= 0) {
    alert('Укажи название и количество продукта.');
    return;
  }

  if (unit === 'piece' && gramsPerPiece <= 0) {
    alert('Укажи вес одной штуки.');
    return;
  }

  const calc = calcFromValues(
    amount,
    unit,
    gramsPerPiece,
    p100,
    f100,
    c100,
    countProtein
  );

  entry.name = name;
  entry.amount = amount;
  entry.unit = unit;
  entry.gramsPerPiece = gramsPerPiece;
  entry.p100 = p100;
  entry.f100 = f100;
  entry.c100 = c100;
  entry.countProtein = countProtein;
  entry.p = calc.p;
  entry.realProtein = calc.realProtein;
  entry.f = calc.f;
  entry.c = calc.c;
  entry.kcal = calc.kcal;
  entry.grams = calc.grams;

  if (saveForFuture) {
    let product = findProductForEntry(entry);

    if (!product) {
      product = {
        id: crypto.randomUUID(),
        name,
        aliases: [name.toLowerCase()],
        unit,
        gramsPerPiece,
        p: p100,
        f: f100,
        c: c100,
        countProtein,
        kcal: calculateKcal(p100, f100, c100)
      };

      products.push(product);
      entry.productId = product.id;

    } else {
      product.name = name;
      product.p = p100;
      product.f = f100;
      product.c = c100;
      product.unit = unit;
      product.gramsPerPiece = gramsPerPiece;
      product.countProtein = countProtein;
      product.kcal = calculateKcal(p100, f100, c100);

      entry.productId = product.id;
    }

    saveProducts();
  }

  saveData();

  document.getElementById('entryEditDialog').close();

  editingEntryId = null;
  render();
}

/* =========================================================
   ИСТОРИЯ
========================================================= */

function renderHistory() {
  const dates = Object.keys(data)
    .filter(date =>
      data[date].entries.length ||
      data[date].targets.p ||
      data[date].targets.f ||
      data[date].targets.c
    )
    .sort((a, b) => b.localeCompare(a));

  if (!dates.length) {
    els.historyList.innerHTML =
      '<div class="empty">История появится после первой записи.</div>';
    return;
  }

  els.historyList.innerHTML = dates.map(date => {
    const totals = totalsFor(data[date]);

    return `
      <div
        class="history-item"
        data-date="${date}"
      >
        <div>
          <div class="history-date">
            ${formatDate(date)}
          </div>

          <div class="history-meta">
            Б ${round1(totals.p)} ·
            Ж ${round1(totals.f)} ·
            У ${round1(totals.c)} ·
            ${Math.round(totals.kcal)} ккал
          </div>
        </div>

        <span>→</span>
      </div>
    `;
  }).join('');

  els.historyList
    .querySelectorAll('.history-item')
    .forEach(item => {
      item.addEventListener('click', () => {
        els.dayPicker.value = item.dataset.date;
        render();

        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    });
}

/* =========================================================
   ЦЕЛИ
========================================================= */

function saveTargets() {
  const day = ensureDay(els.dayPicker.value);

  day.targets = {
    p: Number(els.targetProtein.value) || 0,
    f: Number(els.targetFat.value) || 0,
    c: Number(els.targetCarbs.value) || 0
  };

  saveData();
}

/* =========================================================
   ДОБАВЛЕНИЕ ПРОДУКТА
========================================================= */

function addEntry(product, amount, unit) {
  if (!product || !amount || amount <= 0) {
    return;
  }

  if (unit === 'piece' && !product.gramsPerPiece) {
    alert('Для этого продукта не указан вес одной штуки. Введи количество в граммах.');
    return;
  }

  const calc = calcFromProduct(product, amount, unit);
  const day = ensureDay(els.dayPicker.value);

  day.entries.push({
    id: crypto.randomUUID(),
    productId: product.id,
    name: product.name,
    amount: Number(amount),
    unit,
    gramsPerPiece: product.gramsPerPiece || 0,
    p100: product.p,
    f100: product.f,
    c100: product.c,
    countProtein: product.countProtein,
    ...calc
  });

  saveData();
  render();
}

/* =========================================================
   РАСПОЗНАВАНИЕ ТЕКСТА
========================================================= */

function normalizeText(text) {
  return String(text)
    .toLowerCase()
    .replace(/,/g, '.')
    .replace(/\bкилограммов\b/g, 'кг')
    .replace(/\bкилограмма\b/g, 'кг')
    .replace(/\bкилограмм\b/g, 'кг')
    .replace(/\bграммов\b/g, 'г')
    .replace(/\bграмма\b/g, 'г')
    .replace(/\bграмм\b/g, 'г')
    .replace(/\bгр\.?/g, 'г')
    .replace(/\bштуки\b/g, 'шт')
    .replace(/\bштук\b/g, 'шт')
    .replace(/\bштука\b/g, 'шт')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeRegExp(text) {
  return String(text).replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&'
  );
}

function getProductAliases(product) {
  return [
    product.name.toLowerCase(),
    ...(product.aliases || []).map(alias => alias.toLowerCase())
  ]
    .filter((value, index, array) => array.indexOf(value) === index)
    .sort((a, b) => b.length - a.length);
}

function convertAmount(amount, unit) {
  if (unit === 'кг') {
    return {
      amount: amount * 1000,
      unit: 'g'
    };
  }

  if (unit === 'шт') {
    return {
      amount,
      unit: 'piece'
    };
  }

  return {
    amount,
    unit: 'g'
  };
}

function parseProductAmount(text, product) {
  const aliases = getProductAliases(product);

  for (const alias of aliases) {
    const a = escapeRegExp(alias);
    let match = null;

    match = text.match(
      new RegExp(
        `(\\d+(?:\\.\\d+)?)\\s*(кг|г|шт)\\s*(?:${a})(?=\\s|$|,|\\.|и\\b)`,
        'i'
      )
    );

    if (match) {
      return convertAmount(Number(match[1]), match[2]);
    }

    match = text.match(
      new RegExp(
        `(?:${a})\\s*(\\d+(?:\\.\\d+)?)\\s*(кг|г|шт)(?=\\s|$|,|\\.|и\\b)`,
        'i'
      )
    );

    if (match) {
      return convertAmount(Number(match[1]), match[2]);
    }

    match = text.match(
      new RegExp(
        `(\\d+(?:\\.\\d+)?)\\s*(?:${a})(?=\\s|$|,|\\.|и\\b)`,
        'i'
      )
    );

    if (match) {
      const defaultUnit =
        product.gramsPerPiece > 0 ? 'piece' : 'g';

      return {
        amount: Number(match[1]),
        unit: defaultUnit
      };
    }

    match = text.match(
      new RegExp(
        `(?:${a})\\s*(\\d+(?:\\.\\d+)?)(?=\\s|$|,|\\.|и\\b)`,
        'i'
      )
    );

    if (match) {
      const defaultUnit =
        product.gramsPerPiece > 0 ? 'piece' : 'g';

      return {
        amount: Number(match[1]),
        unit: defaultUnit
      };
    }
  }

  return null;
}

function parseQuickText(raw) {
  const text = normalizeText(raw);
  const found = [];

  const sortedProducts = [...products].sort((a, b) => {
    const maxA = Math.max(...getProductAliases(a).map(x => x.length));
    const maxB = Math.max(...getProductAliases(b).map(x => x.length));
    return maxB - maxA;
  });

  for (const product of sortedProducts) {
    const result = parseProductAmount(text, product);

    if (!result) {
      continue;
    }

    found.push({
      product,
      amount: result.amount,
      unit: result.unit
    });
  }

  return found;
}

/* =========================================================
   РУЧНОЕ ДОБАВЛЕНИЕ
========================================================= */

function renderManualProducts() {
  els.manualProduct.innerHTML = products
    .map(product => `
      <option value="${product.id}">
        ${escapeHtml(product.name)}
      </option>
    `)
    .join('');

  const selected =
    products.find(product => product.id === els.manualProduct.value)
    || products[0];

  if (selected) {
    els.manualUnit.value = selected.unit || 'g';
  }
}

/* =========================================================
   РЕДАКТОР ПРОДУКТОВ
========================================================= */

function openProductEditor() {
  els.productEditor.innerHTML =
    products.map(productRowHtml).join('');

  bindProductEditorRemovers();
  els.settingsDialog.showModal();
}

function productRowHtml(product) {
  return `
    <div
      class="product-row"
      data-id="${product.id}"
    >
      <label>
        Название
        <input
          data-field="name"
          value="${escapeHtml(product.name)}"
        >
      </label>

      <label>
        Б / 100 г
        <input
          data-field="p"
          type="number"
          step="0.1"
          value="${product.p}"
        >
      </label>

      <label>
        Ж / 100 г
        <input
          data-field="f"
          type="number"
          step="0.1"
          value="${product.f}"
        >
      </label>

      <label>
        У / 100 г
        <input
          data-field="c"
          type="number"
          step="0.1"
          value="${product.c}"
        >
      </label>

      <label>
        Вес 1 штуки
        <input
          data-field="gramsPerPiece"
          type="number"
          step="0.1"
          value="${product.gramsPerPiece || 0}"
        >
      </label>

      <label>
        Учитывать белок
        <input
          data-field="countProtein"
          type="checkbox"
          ${product.countProtein ? 'checked' : ''}
        >
      </label>

      <button
        class="remove-product"
        type="button"
      >
        Удалить
      </button>
    </div>
  `;
}

function bindProductEditorRemovers() {
  els.productEditor
    .querySelectorAll('.remove-product')
    .forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('.product-row').remove();
      });
    });
}

function saveProductEditor() {
  const rows = [
    ...els.productEditor.querySelectorAll('.product-row')
  ];

  products = rows.map(row => {
    const get = field =>
      row.querySelector(`[data-field="${field}"]`);

    const old = products.find(
      product => product.id === row.dataset.id
    );

    const name = get('name').value.trim();
    const p = Number(get('p').value) || 0;
    const f = Number(get('f').value) || 0;
    const c = Number(get('c').value) || 0;
    const gramsPerPiece =
      Number(get('gramsPerPiece').value) || 0;
    const countProtein =
      get('countProtein').checked;

    return {
      id: row.dataset.id || crypto.randomUUID(),
      name,
      aliases: old?.aliases?.length
        ? old.aliases
        : [name.toLowerCase()],
      unit: gramsPerPiece > 0
        ? (old?.unit || 'g')
        : 'g',
      gramsPerPiece,
      p,
      f,
      c,
      countProtein,
      kcal: calculateKcal(p, f, c)
    };
  }).filter(product => product.name);

  saveProducts();
  els.settingsDialog.close();
  render();
}

/* =========================================================
   СОБЫТИЯ
========================================================= */

els.dayPicker.value = localDateString();

els.dayPicker.addEventListener('change', render);

els.prevDay.addEventListener('click', () => {
  const d = new Date(els.dayPicker.value + 'T12:00:00');
  d.setDate(d.getDate() - 1);
  els.dayPicker.value = localDateString(d);
  render();
});

els.nextDay.addEventListener('click', () => {
  const d = new Date(els.dayPicker.value + 'T12:00:00');
  d.setDate(d.getDate() + 1);
  els.dayPicker.value = localDateString(d);
  render();
});

[
  els.targetProtein,
  els.targetFat,
  els.targetCarbs
].forEach(input => {
  input.addEventListener('change', () => {
    saveTargets();
    render();
  });

  input.addEventListener('blur', saveTargets);
});

els.parseBtn.addEventListener('click', () => {
  const text = els.quickInput.value.trim();

  if (!text) {
    return;
  }

  const parsed = parseQuickText(text);

  if (!parsed.length) {
    alert(
      'Не получилось распознать продукт. Например: «рис 100 г» или «200 грамм куриной грудки».'
    );
    return;
  }

  parsed.forEach(item => {
    addEntry(item.product, item.amount, item.unit);
  });

  els.quickInput.value = '';
});

els.quickInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    event.preventDefault();
    els.parseBtn.click();
  }
});

els.manualBtn.addEventListener('click', () => {
  renderManualProducts();
  els.manualAmount.value = '';
  els.manualDialog.showModal();
});

els.manualProduct.addEventListener('change', () => {
  const product = products.find(
    p => p.id === els.manualProduct.value
  );

  if (product) {
    els.manualUnit.value = product.unit || 'g';
  }
});

els.manualSubmit.addEventListener('click', () => {
  const product = products.find(
    p => p.id === els.manualProduct.value
  );

  addEntry(
    product,
    Number(els.manualAmount.value),
    els.manualUnit.value
  );

  els.manualDialog.close();
});

els.clearDayBtn.addEventListener('click', () => {
  const yes = confirm(
    'Удалить все записи еды за этот день? Цели БЖУ останутся.'
  );

  if (!yes) {
    return;
  }

  ensureDay(els.dayPicker.value).entries = [];
  saveData();
  render();
});

els.settingsBtn.addEventListener('click', openProductEditor);

els.addProductBtn.addEventListener('click', () => {
  const product = {
    id: crypto.randomUUID(),
    name: 'Новый продукт',
    aliases: ['новый продукт'],
    unit: 'g',
    gramsPerPiece: 0,
    p: 0,
    f: 0,
    c: 0,
    countProtein: false,
    kcal: 0
  };

  products.push(product);

  els.productEditor.insertAdjacentHTML(
    'beforeend',
    productRowHtml(product)
  );

  bindProductEditorRemovers();
});

els.saveProductsBtn.addEventListener('click', saveProductEditor);

/* =========================================================
   ГОЛОСОВОЙ ВВОД
========================================================= */

const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();

  recognition.lang = 'ru-RU';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    els.voiceBtn.classList.add('listening');
    els.voiceBtn.textContent = '🎙️ Слушаю…';
    els.voiceStatus.hidden = false;
    els.voiceStatus.textContent =
      'Говори, например: «100 грамм риса» или «куриная грудка 200 грамм»';
  };

  recognition.onresult = event => {
    const transcript = event.results[0][0].transcript;
    els.quickInput.value = transcript;
    els.voiceStatus.hidden = false;
    els.voiceStatus.textContent = `Распознано: ${transcript}`;
  };

  recognition.onerror = event => {
    els.voiceStatus.hidden = false;

    if (event.error === 'not-allowed') {
      els.voiceStatus.textContent =
        'Нет доступа к микрофону. Разреши сайту использовать микрофон в настройках браузера.';
    } else {
      els.voiceStatus.textContent =
        'Не удалось распознать речь: ' + event.error;
    }
  };

  recognition.onend = () => {
    els.voiceBtn.classList.remove('listening');
    els.voiceBtn.textContent = '🎙️ Сказать голосом';
  };

  els.voiceBtn.addEventListener('click', () => {
    try {
      recognition.start();
    } catch {
      // уже запущено
    }
  });

} else {
  els.voiceBtn.disabled = true;
  els.voiceBtn.textContent = '🎙️ Голос недоступен';
  els.voiceStatus.hidden = false;
  els.voiceStatus.textContent =
    'Этот браузер не поддерживает встроенное распознавание речи.';
}

/* =========================================================
   ЗАПУСК
========================================================= */

ensureCloudStyles();
ensureEntryEditor();
render();

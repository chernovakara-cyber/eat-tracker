const STORAGE_KEY = 'bju-diary-v1';
const PRODUCTS_KEY = 'bju-products-v5';

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
   МОИ ПРОДУКТЫ
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

let data = loadJSON(
  STORAGE_KEY,
  {}
);

let products = loadProducts();

let editingEntryId = null;


/* =========================================================
   СОХРАНЕНИЕ
========================================================= */

function loadJSON(key, fallback) {
  try {
    return JSON.parse(
      localStorage.getItem(key)
    ) ?? fallback;
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
  const saved =
    loadJSON(
      PRODUCTS_KEY,
      null
    );

  if (
    Array.isArray(saved) &&
    saved.length
  ) {
    return saved;
  }

  return structuredClone(
    defaultProducts
  );
}


/* =========================================================
   БЕЛОК
========================================================= */

function shouldProteinCountByName(name = '') {
  const n =
    name.toLowerCase();

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

  return allowedWords.some(
    word => n.includes(word)
  );
}


/* =========================================================
   ДАТЫ
========================================================= */

function localDateString(
  date = new Date()
) {
  const y =
    date.getFullYear();

  const m =
    String(
      date.getMonth() + 1
    ).padStart(2, '0');

  const d =
    String(
      date.getDate()
    ).padStart(2, '0');

  return `${y}-${m}-${d}`;
}

function formatDate(dateString) {
  const d =
    new Date(
      dateString +
      'T12:00:00'
    );

  return d.toLocaleDateString(
    'ru-RU',
    {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
  );
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
  return Math.round(
    (Number(n) || 0) * 10
  ) / 10;
}

function escapeHtml(value = '') {
  return String(value).replace(
    /[&<>'"]/g,
    c => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[c])
  );
}


/* =========================================================
   ПОДСЧЁТ
========================================================= */

function totalsFor(day) {
  return day.entries.reduce(
    (acc, entry) => {
      acc.p +=
        Number(entry.p) || 0;

      acc.f +=
        Number(entry.f) || 0;

      acc.c +=
        Number(entry.c) || 0;

      acc.kcal +=
        Number(entry.kcal) || 0;

      return acc;
    },
    {
      p: 0,
      f: 0,
      c: 0,
      kcal: 0
    }
  );
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
  let grams =
    Number(amount);

  if (
    unit === 'piece'
  ) {
    grams =
      Number(amount) *
      Number(
        gramsPerPiece || 0
      );
  }

  const factor =
    grams / 100;

  const realProtein =
    Number(p100 || 0) *
    factor;

  const fat =
    Number(f100 || 0) *
    factor;

  const carbs =
    Number(c100 || 0) *
    factor;

  return {
    grams,

    p:
      countProtein
        ? realProtein
        : 0,

    realProtein,

    f: fat,
    c: carbs,

    kcal:
      calculateKcal(
        p100,
        f100,
        c100
      ) * factor
  };
}

function calcFromProduct(
  product,
  amount,
  unit
) {
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
  const date =
    els.dayPicker.value;

  const day =
    ensureDay(date);

  const totals =
    totalsFor(day);

  els.diaryTitle.textContent =
    `Еда за ${formatDate(date)}`;

  els.targetProtein.value =
    day.targets.p || '';

  els.targetFat.value =
    day.targets.f || '';

  els.targetCarbs.value =
    day.targets.c || '';

  updateStat(
    'protein',
    totals.p,
    day.targets.p
  );

  updateStat(
    'fat',
    totals.f,
    day.targets.f
  );

  updateStat(
    'carbs',
    totals.c,
    day.targets.c
  );

  els.kcalEaten.textContent =
    `${Math.round(
      totals.kcal
    )} ккал`;

  renderEntries(day);
  renderHistory();
  renderManualProducts();
}

function updateStat(
  type,
  eaten,
  target
) {
  const targetNum =
    Number(target) || 0;

  const left =
    targetNum - eaten;

  els[
    type + 'Eaten'
  ].textContent =
    `${round1(eaten)} г`;

  if (!targetNum) {
    els[
      type + 'Left'
    ].textContent =
      'цель не задана';
  } else if (
    left >= 0
  ) {
    els[
      type + 'Left'
    ].textContent =
      `${round1(left)} г`;
  } else {
    els[
      type + 'Left'
    ].textContent =
      `+${round1(
        Math.abs(left)
      )} г`;
  }

  const pct =
    targetNum
      ? Math.min(
          100,
          eaten /
          targetNum *
          100
        )
      : 0;

  els[
    type + 'Progress'
  ].style.width =
    `${pct}%`;
}


/* =========================================================
   СПИСОК ЕДЫ
========================================================= */

function renderEntries(day) {
  if (
    !day.entries.length
  ) {
    els.entriesList.innerHTML =
      '<div class="empty">Пока ничего не записано.</div>';

    return;
  }

  els.entriesList.innerHTML =
    day.entries.map(entry => `
      <div class="entry">

        <div>
          <div class="entry-title">
            ${escapeHtml(entry.name)}
            —
            ${round1(entry.amount)}
            ${
              entry.unit === 'piece'
                ? 'шт.'
                : 'г'
            }
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
    .querySelectorAll(
      '.delete-entry'
    )
    .forEach(btn => {
      btn.addEventListener(
        'click',
        () => {
          day.entries =
            day.entries.filter(
              entry =>
                entry.id !==
                btn.dataset.id
            );

          saveData();
          render();
        }
      );
    });

  els.entriesList
    .querySelectorAll(
      '.edit-entry'
    )
    .forEach(btn => {
      btn.addEventListener(
        'click',
        () => {
          const entry =
            day.entries.find(
              item =>
                item.id ===
                btn.dataset.id
            );

          if (entry) {
            openEntryEditor(
              entry
            );
          }
        }
      );
    });
}


/* =========================================================
   СТИЛИ ОБЛАЧКА
   Добавляются прямо через JS
========================================================= */

function ensureCloudStyles() {
  if (
    document.getElementById(
      'cloud-editor-styles'
    )
  ) {
    return;
  }

  const style =
    document.createElement(
      'style'
    );

  style.id =
    'cloud-editor-styles';

  style.textContent = `

    #entryEditDialog {
      border: none !important;
      padding: 0 !important;
      margin: auto !important;
      background: transparent !important;
      width: min(94vw, 480px) !important;
      max-width: 480px !important;
      overflow: visible !important;
    }

    #entryEditDialog::backdrop {
      background: rgba(55, 25, 67, .34) !important;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }

    .cloud-editor {
      position: relative;
      border-radius: 40px;
      padding: 30px 26px 24px;
      background:
        linear-gradient(
          145deg,
          #fff2fa 0%,
          #f9e8ff 50%,
          #eee5ff 100%
        );
      border: 2px solid rgba(255,255,255,.95);
      box-shadow:
        0 30px 80px rgba(101, 54, 120, .30),
        inset 0 2px 0 rgba(255,255,255,.95);
      animation: cloudEditorPop .25s ease;
      overflow: visible;
    }

    .cloud-editor::before,
    .cloud-editor::after {
      content: "";
      position: absolute;
      background:
        linear-gradient(
          145deg,
          #fff2fa,
          #f1e7ff
        );
      border: 2px solid rgba(255,255,255,.9);
      z-index: -1;
    }

    .cloud-editor::before {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      top: -35px;
      left: 35px;
      box-shadow:
        185px 15px 0 -12px #f0e6ff;
    }

    .cloud-editor::after {
      width: 95px;
      height: 95px;
      border-radius: 50%;
      bottom: -28px;
      right: 42px;
      box-shadow:
        -260px -8px 0 -10px #fff0f8;
    }

    @keyframes cloudEditorPop {
      from {
        opacity: 0;
        transform:
          translateY(15px)
          scale(.95);
      }

      to {
        opacity: 1;
        transform:
          translateY(0)
          scale(1);
      }
    }

    .cloud-editor-header {
      position: relative;
      z-index: 2;
      margin-bottom: 20px;
      text-align: center;
    }

    .cloud-editor-icon {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      margin:
        -55px auto 10px;
      font-size: 25px;
      background:
        linear-gradient(
          135deg,
          #ff83bf,
          #9c70ff
        );
      color: white;
      box-shadow:
        0 12px 28px
        rgba(143,92,255,.28);
    }

    .cloud-editor-title {
      margin: 0;
      font-size: 26px;
      font-weight: 900;
      line-height: 1.15;
      background:
        linear-gradient(
          90deg,
          #ee5ba5,
          #8250e8
        );
      color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
    }

    .cloud-editor-subtitle {
      margin: 6px 0 0;
      color: #806287;
      font-size: 13px;
    }

    .cloud-editor-body {
      position: relative;
      z-index: 2;
      display: grid;
      gap: 12px;
    }

    .cloud-field {
      display: grid;
      gap: 6px;
    }

    .cloud-field > span {
      font-size: 13px;
      font-weight: 800;
      color: #745079;
      padding-left: 4px;
    }

    .cloud-field input,
    .cloud-field select {
      width: 100%;
      border:
        1px solid
        rgba(211,181,222,.9);
      border-radius: 18px;
      padding: 13px 15px;
      color: #341936;
      background:
        rgba(255,255,255,.90);
      outline: none;
      box-shadow:
        0 7px 18px
        rgba(101,63,115,.06);
    }

    .cloud-field input:focus,
    .cloud-field select:focus {
      border-color: #9568ee;
      box-shadow:
        0 0 0 4px
        rgba(143,92,255,.11),
        0 8px 22px
        rgba(101,63,115,.10);
    }

    .cloud-macro-grid {
      display: grid;
      grid-template-columns:
        repeat(3, 1fr);
      gap: 9px;
    }

    .cloud-check {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 12px 13px;
      border-radius: 18px;
      background:
        rgba(255,255,255,.58);
      border:
        1px solid
        rgba(255,255,255,.9);
      color: #68496f;
      font-size: 13px;
      font-weight: 700;
    }

    .cloud-check input {
      width: 19px;
      height: 19px;
      flex:
        0 0 auto;
      margin-top: 1px;
      accent-color: #945eff;
    }

    .cloud-editor-footer {
      position: relative;
      z-index: 2;
      display: flex;
      gap: 10px;
      margin-top: 18px;
    }

    .cloud-cancel,
    .cloud-save {
      flex: 1;
      border: 0;
      border-radius: 18px;
      padding: 13px 16px;
      font-weight: 900;
      cursor: pointer;
      transition:
        transform .15s ease,
        box-shadow .15s ease;
    }

    .cloud-cancel {
      background:
        rgba(255,255,255,.84);
      color: #785e7d;
      box-shadow:
        0 6px 16px
        rgba(97,64,110,.09);
    }

    .cloud-save {
      background:
        linear-gradient(
          90deg,
          #ff70b7,
          #8f5cff
        );
      color: white;
      box-shadow:
        0 12px 26px
        rgba(143,92,255,.26);
    }

    .cloud-cancel:hover,
    .cloud-save:hover {
      transform:
        translateY(-2px);
    }

    @media (
      max-width: 600px
    ) {

      #entryEditDialog {
        width:
          calc(100% - 18px)
          !important;
      }

      .cloud-editor {
        padding:
          27px 17px 20px;
        border-radius: 34px;
        max-height: 88vh;
        overflow-y: auto;
      }

      .cloud-editor::before {
        width: 95px;
        height: 95px;
        top: -25px;
        left: 28px;
      }

      .cloud-editor::after {
        width: 75px;
        height: 75px;
      }

      .cloud-editor-icon {
        margin-top: -45px;
      }

      .cloud-editor-title {
        font-size: 23px;
      }

      .cloud-macro-grid {
        grid-template-columns: 1fr;
      }

      .cloud-editor-footer {
        flex-direction:
          column-reverse;
      }

      .cloud-cancel,
      .cloud-save {
        width: 100%;
      }
    }
  `;

  document.head.appendChild(
    style
  );
}


/* =========================================================
   СОЗДАНИЕ ОБЛАЧКА
========================================================= */

function ensureEntryEditor() {
  ensureCloudStyles();

  if (
    document.getElementById(
      'entryEditDialog'
    )
  ) {
    return;
  }

  const dialog =
    document.createElement(
      'dialog'
    );

  dialog.id =
    'entryEditDialog';

  dialog.innerHTML = `
    <div class="cloud-editor">

      <div class="cloud-editor-header">

        <div class="cloud-editor-icon">
          ✏️
        </div>

        <h2 class="cloud-editor-title">
          Редактировать продукт
        </h2>

        <p class="cloud-editor-subtitle">
          Измени количество или БЖУ с упаковки
        </p>

      </div>

      <div class="cloud-editor-body">

        <label class="cloud-field">

          <span>
            Название
          </span>

          <input
            id="editEntryName"
            type="text"
          >

        </label>


        <label class="cloud-field">

          <span>
            Количество
          </span>

          <input
            id="editEntryAmount"
            type="number"
            min="0"
            step="0.1"
          >

        </label>


        <label class="cloud-field">

          <span>
            Единица
          </span>

          <select
            id="editEntryUnit"
          >
            <option value="g">
              граммы
            </option>

            <option value="piece">
              штуки
            </option>
          </select>

        </label>


        <div class="cloud-macro-grid">

          <label class="cloud-field">

            <span>
              Белки / 100 г
            </span>

            <input
              id="editEntryProtein"
              type="number"
              min="0"
              step="0.1"
            >

          </label>


          <label class="cloud-field">

            <span>
              Жиры / 100 г
            </span>

            <input
              id="editEntryFat"
              type="number"
              min="0"
              step="0.1"
            >

          </label>


          <label class="cloud-field">

            <span>
              Углеводы / 100 г
            </span>

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

          <span>
            Вес одной штуки, г
          </span>

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
  `;

  document.body.appendChild(
    dialog
  );

  document
    .getElementById(
      'cancelEntryEdit'
    )
    .addEventListener(
      'click',
      () => {
        dialog.close();
      }
    );

  document
    .getElementById(
      'editEntryUnit'
    )
    .addEventListener(
      'change',
      updateEntryPieceField
    );

  document
    .getElementById(
      'saveEntryEdit'
    )
    .addEventListener(
      'click',
      saveEntryEdit
    );

  dialog.addEventListener(
    'click',
    event => {
      if (
        event.target ===
        dialog
      ) {
        dialog.close();
      }
    }
  );
}


/* =========================================================
   ОТКРЫТИЕ РЕДАКТИРОВАНИЯ
========================================================= */

function findProductForEntry(
  entry
) {
  return (
    products.find(
      product =>
        product.id ===
        entry.productId
    )
    ||
    products.find(
      product =>
        product.name
          .toLowerCase() ===
        String(
          entry.name || ''
        ).toLowerCase()
    )
  );
}

function openEntryEditor(entry) {
  ensureEntryEditor();

  editingEntryId =
    entry.id;

  const product =
    findProductForEntry(
      entry
    );

  document.getElementById(
    'editEntryName'
  ).value =
    entry.name || '';

  document.getElementById(
    'editEntryAmount'
  ).value =
    entry.amount || '';

  document.getElementById(
    'editEntryUnit'
  ).value =
    entry.unit || 'g';

  document.getElementById(
    'editEntryProtein'
  ).value =
    entry.p100 ??
    product?.p ??
    0;

  document.getElementById(
    'editEntryFat'
  ).value =
    entry.f100 ??
    product?.f ??
    0;

  document.getElementById(
    'editEntryCarbs'
  ).value =
    entry.c100 ??
    product?.c ??
    0;

  document.getElementById(
    'editEntryPieceWeight'
  ).value =
    entry.gramsPerPiece ??
    product?.gramsPerPiece ??
    0;

  const countProtein =
    typeof entry.countProtein ===
    'boolean'
      ? entry.countProtein
      : (
          product
            ? product.countProtein
            : shouldProteinCountByName(
                entry.name
              )
        );

  document.getElementById(
    'editEntryCountProtein'
  ).checked =
    countProtein;

  document.getElementById(
    'editEntrySaveProduct'
  ).checked =
    false;

  updateEntryPieceField();

  document
    .getElementById(
      'entryEditDialog'
    )
    .showModal();
}

function updateEntryPieceField() {
  const unit =
    document.getElementById(
      'editEntryUnit'
    ).value;

  const wrap =
    document.getElementById(
      'editEntryPieceWeightWrap'
    );

  wrap.style.display =
    unit === 'piece'
      ? 'grid'
      : 'none';
}


/* =========================================================
   СОХРАНЕНИЕ РЕДАКТИРОВАНИЯ
========================================================= */

function saveEntryEdit() {
  const day =
    ensureDay(
      els.dayPicker.value
    );

  const entry =
    day.entries.find(
      item =>
        item.id ===
        editingEntryId
    );

  if (!entry) {
    return;
  }

  const name =
    document.getElementById(
      'editEntryName'
    ).value.trim();

  const amount =
    Number(
      document.getElementById(
        'editEntryAmount'
      ).value
    );

  const unit =
    document.getElementById(
      'editEntryUnit'
    ).value;

  const p100 =
    Number(
      document.getElementById(
        'editEntryProtein'
      ).value
    ) || 0;

  const f100 =
    Number(
      document.getElementById(
        'editEntryFat'
      ).value
    ) || 0;

  const c100 =
    Number(
      document.getElementById(
        'editEntryCarbs'
      ).value
    ) || 0;

  const gramsPerPiece =
    Number(
      document.getElementById(
        'editEntryPieceWeight'
      ).value
    ) || 0;

  const countProtein =
    document.getElementById(
      'editEntryCountProtein'
    ).checked;

  const saveForFuture =
    document.getElementById(
      'editEntrySaveProduct'
    ).checked;

  if (
    !name ||
    amount <= 0
  ) {
    alert(
      'Укажи название и количество продукта.'
    );
    return;
  }

  if (
    unit === 'piece' &&
    gramsPerPiece <= 0
  ) {
    alert(
      'Укажи вес одной штуки.'
    );
    return;
  }

  const calc =
    calcFromValues(
      amount,
      unit,
      gramsPerPiece,
      p100,
      f100,
      c100,
      countProtein
    );

  entry.name =
    name;

  entry.amount =
    amount;

  entry.unit =
    unit;

  entry.gramsPerPiece =
    gramsPerPiece;

  entry.p100 =
    p100;

  entry.f100 =
    f100;

  entry.c100 =
    c100;

  entry.countProtein =
    countProtein;

  entry.p =
    calc.p;

  entry.realProtein =
    calc.realProtein;

  entry.f =
    calc.f;

  entry.c =
    calc.c;

  entry.kcal =
    calc.kcal;

  entry.grams =
    calc.grams;

  if (saveForFuture) {
    let product =
      findProductForEntry(
        entry
      );

    if (!product) {
      product = {
        id:
          crypto.randomUUID(),

        name,

        aliases: [
          name.toLowerCase()
        ],

        unit,

        gramsPerPiece,

        p: p100,
        f: f100,
        c: c100,

        countProtein,

        kcal:
          calculateKcal(
            p100,
            f100,
            c100
          )
      };

      products.push(
        product
      );

      entry.productId =
        product.id;

    } else {
      product.name =
        name;

      product.p =
        p100;

      product.f =
        f100;

      product.c =
        c100;

      product.unit =
        unit;

      product.gramsPerPiece =
        gramsPerPiece;

      product.countProtein =
        countProtein;

      product.kcal =
        calculateKcal(
          p100,
          f100,
          c100
        );

      entry.productId =
        product.id;
    }

    saveProducts();
  }

  saveData();

  document
    .getElementById(
      'entryEditDialog'
    )
    .close();

  editingEntryId =
    null;

  render();
}


/* =========================================================
   ИСТОРИЯ
========================================================= */

function renderHistory() {
  const dates =
    Object.keys(data)
      .filter(date =>
        data[date].entries.length ||
        data[date].targets.p ||
        data[date].targets.f ||
        data[date].targets.c
      )
      .sort(
        (a, b) =>
          b.localeCompare(a)
      );

  if (!dates.length) {
    els.historyList.innerHTML =
      '<div class="empty">История появится после первой записи.</div>';

    return;
  }

  els.historyList.innerHTML =
    dates.map(date => {
      const totals =
        totalsFor(
          data[date]
        );

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
    .querySelectorAll(
      '.history-item'
    )
    .forEach(item => {
      item.addEventListener(
        'click',
        () => {
          els.dayPicker.value =
            item.dataset.date;

          render();

          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      );
    });
}


/* =========================================================
   ЦЕЛИ
========================================================= */

function saveTargets() {
  const day =
    ensureDay(
      els.dayPicker.value
    );

  day.targets = {
    p:
      Number(
        els.targetProtein.value
      ) || 0,

    f:
      Number(
        els.targetFat.value
      ) || 0,

    c:
      Number(
        els.targetCarbs.value
      ) || 0
  };

  saveData();
}


/* =========================================================
   ДОБАВЛЕНИЕ
========================================================= */

function addEntry(
  product,
  amount,
  unit
) {
  if (
    !product ||
    !amount ||
    amount <= 0
  ) {
    return;
  }

  const calc =
    calcFromProduct(
      product,
      amount,
      unit
    );

  const day =
    ensureDay(
      els.dayPicker.value
    );

  day.entries.push({
    id:
      crypto.randomUUID(),

    productId:
      product.id,

    name:
      product.name,

    amount:
      Number(amount),

    unit,

    gramsPerPiece:
      product.gramsPerPiece || 0,

    p100:
      product.p,

    f100:
      product.f,

    c100:
      product.c,

    countProtein:
      product.countProtein,

    ...calc
  });

  saveData();
  render();
}


/* =========================================================
   РАСПОЗНАВАНИЕ ФРАЗ
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
    ...(product.aliases || [])
      .map(
        alias =>
          alias.toLowerCase()
      )
  ]
    .filter(
      (
        value,
        index,
        array
      ) =>
        array.indexOf(value) === index
    )
    .sort(
      (a, b) =>
        b.length - a.length
    );
}

function convertAmount(
  amount,
  unit
) {
  if (
    unit === 'кг'
  ) {
    return {
      amount:
        amount * 1000,
      unit: 'g'
    };
  }

  if (
    unit === 'шт'
  ) {
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

function parseProductAmount(
  text,
  product
) {
  const aliases =
    getProductAliases(
      product
    );

  for (
    const alias
    of aliases
  ) {
    const a =
      escapeRegExp(
        alias
      );

    let match;

    match =
      text.match(
        new RegExp(
          `(\\d+(?:\\.\\d+)?)\\s*(кг|г|шт)\\s*(?:${a})(?=\\s|$|,|\\.|и\\b)`,
          'i'
        )
      );

    if (match) {
      return convertAmount(
        Number(match[1]),
        match[2]
      );
    }

    match =
      text.match(
        new RegExp(
          `(?:${a})\\s*(\\d+(?:\\.\\d+)?)\\s*(кг|г|шт)(?=\\s|$|,|\\.|и\\b)`,
          'i'
        )
      );

    if (match) {
      return convertAmount(
        Number(match[1]),
        match[2]
      );
    }
  }

  return null;
}

function parseQuickText(raw) {
  const text =
    normalizeText(raw);

  const found = [];

  const sortedProducts =
    [...products].sort(
      (a, b) => {
        const maxA =
          Math.max(
            ...getProductAliases(a)
              .map(x => x.length)
          );

        const maxB =
          Math.max(
            ...getProductAliases(b)
              .map(x => x.length)
          );

        return maxB - maxA;
      }
    );

  for (
    const product
    of sortedProducts
  ) {
    const result =
      parseProductAmount(
        text,
        product
      );

    if (!result) {
      continue;
    }

    found.push({
      product,
      amount:
        result.amount,
      unit:
        result.unit
    });
  }

  return found;
}


/* =========================================================
   РУЧНОЕ ДОБАВЛЕНИЕ
========================================================= */

function renderManualProducts() {
  els.manualProduct.innerHTML =
    products
      .map(
        product => `
          <option
            value="${product.id}"
          >
            ${escapeHtml(
              product.name
            )}
          </option>
        `
      )
      .join('');
}


/* =========================================================
   НАСТРОЙКИ ПРОДУКТОВ
========================================================= */

function openProductEditor() {
  els.productEditor.innerHTML =
    products
      .map(
        productRowHtml
      )
      .join('');

  bindProductEditorRemovers();

  els.settingsDialog
    .showModal();
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
          value="${escapeHtml(
            product.name
          )}"
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
          value="${
            product.gramsPerPiece || 0
          }"
        >
      </label>

      <label>
        Учитывать белок

        <input
          data-field="countProtein"
          type="checkbox"
          ${
            product.countProtein
              ? 'checked'
              : ''
          }
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
    .querySelectorAll(
      '.remove-product'
    )
    .forEach(btn => {
      btn.addEventListener(
        'click',
        () => {
          btn.closest(
            '.product-row'
          ).remove();
        }
      );
    });
}

function saveProductEditor() {
  const rows = [
    ...els.productEditor
      .querySelectorAll(
        '.product-row'
      )
  ];

  products =
    rows.map(row => {
      const get =
        field =>
          row.querySelector(
            `[data-field="${field}"]`
          );

      const old =
        products.find(
          product =>
            product.id ===
            row.dataset.id
        );

      const name =
        get('name')
          .value
          .trim();

      const p =
        Number(
          get('p').value
        ) || 0;

      const f =
        Number(
          get('f').value
        ) || 0;

      const c =
        Number(
          get('c').value
        ) || 0;

      const gramsPerPiece =
        Number(
          get(
            'gramsPerPiece'
          ).value
        ) || 0;

      const countProtein =
        get(
          'countProtein'
        ).checked;

      return {
        id:
          row.dataset.id ||
          crypto.randomUUID(),

        name,

        aliases:
          old?.aliases?.length
            ? old.aliases
            : [
                name.toLowerCase()
              ],

        unit:
          gramsPerPiece > 0
            ? (
                old?.unit ||
                'g'
              )
            : 'g',

        gramsPerPiece,

        p,
        f,
        c,

        countProtein,

        kcal:
          calculateKcal(
            p,
            f,
            c
          )
      };
    })
    .filter(
      product =>
        product.name
    );

  saveProducts();

  els.settingsDialog.close();

  render();
}


/* =========================================================
   ДАТА
========================================================= */

els.dayPicker.value =
  localDateString();

els.dayPicker.addEventListener(
  'change',
  render
);

els.prevDay.addEventListener(
  'click',
  () => {
    const d =
      new Date(
        els.dayPicker.value +
        'T12:00:00'
      );

    d.setDate(
      d.getDate() - 1
    );

    els.dayPicker.value =
      localDateString(d);

    render();
  }
);

els.nextDay.addEventListener(
  'click',
  () => {
    const d =
      new Date(
        els.dayPicker.value +
        'T12:00:00'
      );

    d.setDate(
      d.getDate() + 1
    );

    els.dayPicker.value =
      localDateString(d);

    render();
  }
);


/* =========================================================
   ЦЕЛИ
========================================================= */

[
  els.targetProtein,
  els.targetFat,
  els.targetCarbs
].forEach(input => {
  input.addEventListener(
    'change',
    () => {
      saveTargets();
      render();
    }
  );
});


/* =========================================================
   БЫСТРЫЙ ВВОД
========================================================= */

els.parseBtn.addEventListener(
  'click',
  () => {
    const text =
      els.quickInput
        .value
        .trim();

    const parsed =
      parseQuickText(
        text
      );

    if (!parsed.length) {
      alert(
        'Не получилось распознать продукт.'
      );

      return;
    }

    parsed.forEach(
      item => {
        addEntry(
          item.product,
          item.amount,
          item.unit
        );
      }
    );

    els.quickInput.value =
      '';
  }
);


/* =========================================================
   РУЧНОЕ
========================================================= */

els.manualBtn.addEventListener(
  'click',
  () => {
    renderManualProducts();

    els.manualAmount.value =
      '';

    els.manualDialog
      .showModal();
  }
);

els.manualSubmit.addEventListener(
  'click',
  () => {
    const product =
      products.find(
        p =>
          p.id ===
          els.manualProduct.value
      );

    addEntry(
      product,
      Number(
        els.manualAmount.value
      ),
      els.manualUnit.value
    );

    els.manualDialog.close();
  }
);


/* =========================================================
   ОЧИСТКА
========================================================= */

els.clearDayBtn.addEventListener(
  'click',
  () => {
    const yes =
      confirm(
        'Удалить все записи за этот день?'
      );

    if (!yes) {
      return;
    }

    ensureDay(
      els.dayPicker.value
    ).entries = [];

    saveData();
    render();
  }
);


/* =========================================================
   НАСТРОЙКИ
========================================================= */

els.settingsBtn.addEventListener(
  'click',
  openProductEditor
);

els.addProductBtn.addEventListener(
  'click',
  () => {
    const product = {
      id:
        crypto.randomUUID(),

      name:
        'Новый продукт',

      aliases: [
        'новый продукт'
      ],

      unit: 'g',

      gramsPerPiece: 0,

      p: 0,
      f: 0,
      c: 0,

      countProtein: false,

      kcal: 0
    };

    products.push(
      product
    );

    els.productEditor
      .insertAdjacentHTML(
        'beforeend',
        productRowHtml(
          product
        )
      );

    bindProductEditorRemovers();
  }
);

els.saveProductsBtn.addEventListener(
  'click',
  saveProductEditor
);


/* =========================================================
   ГОЛОС
========================================================= */

const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition =
    new SpeechRecognition();

  recognition.lang =
    'ru-RU';

  recognition.interimResults =
    false;

  recognition.maxAlternatives =
    1;

  recognition.onstart =
    () => {
      els.voiceBtn.textContent =
        '🎙️ Слушаю…';
    };

  recognition.onresult =
    event => {
      els.quickInput.value =
        event.results[0][0]
          .transcript;
    };

  recognition.onend =
    () => {
      els.voiceBtn.textContent =
        '🎙️ Сказать голосом';
    };

  els.voiceBtn.addEventListener(
    'click',
    () => {
      try {
        recognition.start();
      } catch {}
    }
  );

} else {
  els.voiceBtn.disabled =
    true;
}


/* =========================================================
   ЗАПУСК
========================================================= */

ensureCloudStyles();
ensureEntryEditor();
render();

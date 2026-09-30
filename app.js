const STORAGE_KEY = 'bju-diary-v1';
const PRODUCTS_KEY = 'bju-products-v4';

/* =========================================================
   ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
========================================================= */

function calculateKcal(p, f, c) {
  return Number(p || 0) * 4 +
         Number(f || 0) * 9 +
         Number(c || 0) * 4;
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
   Все БЖУ указаны на 100 г
========================================================= */

const defaultProducts = [

  makeProduct(
    'rice',
    'Рис',
    [
      'рис',
      'риса'
    ],
    7.2,
    0.5,
    76.9
  ),

  makeProduct(
    'pasta',
    'Макароны',
    [
      'макароны',
      'макарон'
    ],
    12,
    1.3,
    70.5
  ),

  makeProduct(
    'buckwheat',
    'Гречка',
    [
      'гречка',
      'гречки',
      'гречку'
    ],
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
      'греческий йогурта',
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
      'творожного сыра',
      'творожный сырок'
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
   ЭЛЕМЕНТЫ СТРАНИЦЫ
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


/* =========================================================
   ЗАГРУЗКА И СОХРАНЕНИЕ
========================================================= */

function loadJSON(key, fallback) {
  try {
    const value =
      JSON.parse(
        localStorage.getItem(key)
      );

    return value ?? fallback;

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

    return saved.map(product => {

      if (
        typeof product.countProtein !==
        'boolean'
      ) {
        product.countProtein =
          shouldProteinCountByName(
            product.name
          );
      }

      product.kcal =
        calculateKcal(
          product.p,
          product.f,
          product.c
        );

      return product;
    });
  }

  return structuredClone(
    defaultProducts
  );
}


/* =========================================================
   КАКОЙ БЕЛОК УЧИТЫВАЕМ
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

function formatDate(
  dateString
) {

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
   ОБЩИЕ ФУНКЦИИ
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

function escapeHtml(
  value = ''
) {

  return String(value)
    .replace(
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
   ПОДСЧЁТ ИТОГОВ
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


/* =========================================================
   РАСЧЁТ ПРОДУКТА
========================================================= */

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

  const kcal100 =
    calculateKcal(
      p100,
      f100,
      c100
    );

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
      kcal100 *
      factor
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
   СПИСОК СЪЕДЕННОГО
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
    day.entries
      .map(entry => {

        const proteinNote =
          entry.countProtein === false
            ? ' · белок не учитывается'
            : '';

        return `
          <div class="entry">

            <div>

              <div class="entry-title">

                ${escapeHtml(
                  entry.name
                )}

                —

                ${round1(
                  entry.amount
                )}

                ${
                  entry.unit ===
                  'piece'
                    ? 'шт.'
                    : 'г'
                }

              </div>

              <div class="entry-macros">

                Б ${round1(entry.p)} ·
                Ж ${round1(entry.f)} ·
                У ${round1(entry.c)} ·
                ${Math.round(
                  entry.kcal
                )} ккал

                ${proteinNote}

              </div>

            </div>

            <div class="entry-actions">

              <button
                class="mini-btn edit-entry"
                data-id="${entry.id}"
              >
                Редактировать
              </button>

              <button
                class="mini-btn delete-entry"
                data-id="${entry.id}"
              >
                Удалить
              </button>

            </div>

          </div>
        `;
      })
      .join('');

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
   РЕДАКТИРОВАНИЕ СЪЕДЕННОГО ПРОДУКТА
========================================================= */

function ensureEntryEditor() {

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
    <form
      method="dialog"
      style="
        min-width:min(90vw,420px);
        max-width:420px;
      "
    >

      <h2>
        Редактировать продукт
      </h2>

      <div
        style="
          display:grid;
          gap:12px;
        "
      >

        <label>
          Название

          <input
            id="editEntryName"
            type="text"
            style="width:100%"
          >
        </label>

        <label>
          Количество

          <input
            id="editEntryAmount"
            type="number"
            min="0"
            step="0.1"
            style="width:100%"
          >
        </label>

        <label>
          Единица

          <select
            id="editEntryUnit"
            style="width:100%"
          >
            <option value="g">
              граммы
            </option>

            <option value="piece">
              штуки
            </option>
          </select>
        </label>

        <label>
          Белки на 100 г

          <input
            id="editEntryProtein"
            type="number"
            min="0"
            step="0.1"
            style="width:100%"
          >
        </label>

        <label>
          Жиры на 100 г

          <input
            id="editEntryFat"
            type="number"
            min="0"
            step="0.1"
            style="width:100%"
          >
        </label>

        <label>
          Углеводы на 100 г

          <input
            id="editEntryCarbs"
            type="number"
            min="0"
            step="0.1"
            style="width:100%"
          >
        </label>

        <label
          id="editEntryPieceWeightWrap"
        >
          Вес одной штуки, г

          <input
            id="editEntryPieceWeight"
            type="number"
            min="0"
            step="0.1"
            style="width:100%"
          >
        </label>

        <label
          style="
            display:flex;
            gap:8px;
            align-items:center;
          "
        >

          <input
            id="editEntryCountProtein"
            type="checkbox"
          >

          Учитывать белок
          в дневной норме

        </label>

        <label
          style="
            display:flex;
            gap:8px;
            align-items:flex-start;
          "
        >

          <input
            id="editEntrySaveProduct"
            type="checkbox"
          >

          Сохранить эти БЖУ
          для этого продукта
          на будущее

        </label>

      </div>

      <div
        style="
          display:flex;
          gap:10px;
          margin-top:18px;
          justify-content:flex-end;
          flex-wrap:wrap;
        "
      >

        <button
          type="button"
          id="cancelEntryEdit"
        >
          Отмена
        </button>

        <button
          type="button"
          id="saveEntryEdit"
        >
          Сохранить
        </button>

      </div>

    </form>
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
}

let editingEntryId = null;

function openEntryEditor(entry) {

  ensureEntryEditor();

  editingEntryId =
    entry.id;

  const product =
    findProductForEntry(
      entry
    );

  const p100 =
    entry.p100 ??
    product?.p ??
    0;

  const f100 =
    entry.f100 ??
    product?.f ??
    0;

  const c100 =
    entry.c100 ??
    product?.c ??
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
    p100;

  document.getElementById(
    'editEntryFat'
  ).value =
    f100;

  document.getElementById(
    'editEntryCarbs'
  ).value =
    c100;

  document.getElementById(
    'editEntryPieceWeight'
  ).value =
    entry.gramsPerPiece ??
    product?.gramsPerPiece ??
    0;

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
      ? 'block'
      : 'none';
}

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

function saveEntryEdit() {

  const date =
    els.dayPicker.value;

  const day =
    ensureDay(date);

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
    !amount ||
    amount <= 0
  ) {

    alert(
      'Укажи название продукта и количество.'
    );

    return;
  }

  if (
    unit === 'piece' &&
    gramsPerPiece <= 0
  ) {

    alert(
      'Укажи вес одной штуки в граммах.'
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
              ${Math.round(
                totals.kcal
              )} ккал
            </div>

          </div>

          <span>
            →
          </span>

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
   ЦЕЛИ БЖУ
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
   ДОБАВЛЕНИЕ ПРОДУКТА
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

  if (
    unit === 'piece' &&
    !product.gramsPerPiece
  ) {

    alert(
      'Для этого продукта не указан вес одной штуки. Введи количество в граммах.'
    );

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
   РАСПОЗНАВАНИЕ ТЕКСТА
========================================================= */

function normalizeText(text) {

  return String(text)
    .toLowerCase()

    .replace(
      /,/g,
      '.'
    )

    .replace(
      /\bкилограммов\b/g,
      'кг'
    )

    .replace(
      /\bкилограмма\b/g,
      'кг'
    )

    .replace(
      /\bкилограмм\b/g,
      'кг'
    )

    .replace(
      /\bграммов\b/g,
      'г'
    )

    .replace(
      /\bграмма\b/g,
      'г'
    )

    .replace(
      /\bграмм\b/g,
      'г'
    )

    .replace(
      /\bгр\.?/g,
      'г'
    )

    .replace(
      /\bштуки\b/g,
      'шт'
    )

    .replace(
      /\bштук\b/g,
      'шт'
    )

    .replace(
      /\bштука\b/g,
      'шт'
    )

    .replace(
      /\s+/g,
      ' '
    )

    .trim();
}

function escapeRegExp(text) {

  return String(text)
    .replace(
      /[.*+?^${}()|[\]\\]/g,
      '\\$&'
    );
}

function getProductAliases(
  product
) {

  return [
    product.name
      .toLowerCase(),

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
        array.indexOf(value) ===
        index
    )

    .sort(
      (a, b) =>
        b.length -
        a.length
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

      unit:
        'g'
    };
  }

  if (
    unit === 'шт'
  ) {

    return {
      amount,
      unit:
        'piece'
    };
  }

  return {
    amount,
    unit:
      'g'
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

    /* 30 г кетчупа */

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

    /* кетчуп 30 г */

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

    /* 30 риса */

    match =
      text.match(
        new RegExp(
          `(\\d+(?:\\.\\d+)?)\\s*(?:${a})(?=\\s|$|,|\\.|и\\b)`,
          'i'
        )
      );

    if (match) {

      return {
        amount:
          Number(
            match[1]
          ),

        unit:
          product.unit ||
          'g'
      };
    }

    /* рис 30 */

    match =
      text.match(
        new RegExp(
          `(?:${a})\\s*(\\d+(?:\\.\\d+)?)(?=\\s|$|,|\\.|и\\b)`,
          'i'
        )
      );

    if (match) {

      return {
        amount:
          Number(
            match[1]
          ),

        unit:
          product.unit ||
          'g'
      };
    }
  }

  return null;
}

function parseQuickText(raw) {

  const text =
    normalizeText(raw);

  const found = [];

  const sortedProducts =
    [...products]
      .sort(
        (a, b) => {

          const maxA =
            Math.max(
              ...getProductAliases(a)
                .map(
                  x =>
                    x.length
                )
            );

          const maxB =
            Math.max(
              ...getProductAliases(b)
                .map(
                  x =>
                    x.length
                )
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

  const selected =
    products.find(
      product =>
        product.id ===
        els.manualProduct.value
    )
    ||
    products[0];

  if (selected) {

    els.manualUnit.value =
      selected.unit ||
      'g';
  }
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
        Вес 1 штуки, г

        <input
          data-field="gramsPerPiece"
          type="number"
          step="0.1"
          value="${
            product.gramsPerPiece ||
            0
          }"
        >
      </label>

      <label
        style="
          display:flex;
          align-items:center;
          gap:7px;
        "
      >

        <input
          data-field="countProtein"
          type="checkbox"
          ${
            product.countProtein
              ? 'checked'
              : ''
          }
        >

        Учитывать белок

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

          btn
            .closest(
              '.product-row'
            )
            .remove();
        }
      );
    });
}

function saveProductEditor() {

  const rows =
    [
      ...els.productEditor
        .querySelectorAll(
          '.product-row'
        )
    ];

  products =
    rows
      .map(row => {

        const get =
          field =>
            row
              .querySelector(
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

els.dayPicker
  .addEventListener(
    'change',
    render
  );

els.prevDay
  .addEventListener(
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

els.nextDay
  .addEventListener(
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

  input.addEventListener(
    'blur',
    saveTargets
  );
});


/* =========================================================
   БЫСТРЫЙ ВВОД
========================================================= */

els.parseBtn
  .addEventListener(
    'click',
    () => {

      const text =
        els.quickInput
          .value
          .trim();

      if (!text) {
        return;
      }

      const parsed =
        parseQuickText(
          text
        );

      if (
        !parsed.length
      ) {

        alert(
          'Не получилось распознать продукт. Например: «рис 100 г» или «200 грамм куриной грудки».'
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

els.quickInput
  .addEventListener(
    'keydown',
    event => {

      if (
        event.key ===
        'Enter'
      ) {

        event.preventDefault();

        els.parseBtn.click();
      }
    }
  );


/* =========================================================
   РУЧНОЕ ДОБАВЛЕНИЕ
========================================================= */

els.manualBtn
  .addEventListener(
    'click',
    () => {

      renderManualProducts();

      els.manualAmount.value =
        '';

      els.manualDialog
        .showModal();
    }
  );

els.manualProduct
  .addEventListener(
    'change',
    () => {

      const product =
        products.find(
          p =>
            p.id ===
            els.manualProduct.value
        );

      if (product) {

        els.manualUnit.value =
          product.unit ||
          'g';
      }
    }
  );

els.manualSubmit
  .addEventListener(
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
   ОЧИСТИТЬ ДЕНЬ
========================================================= */

els.clearDayBtn
  .addEventListener(
    'click',
    () => {

      const yes =
        confirm(
          'Удалить все записи еды за этот день? Цели БЖУ останутся.'
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
   НАСТРОЙКИ ПРОДУКТОВ
========================================================= */

els.settingsBtn
  .addEventListener(
    'click',
    openProductEditor
  );

els.addProductBtn
  .addEventListener(
    'click',
    () => {

      const product = {

        id:
          crypto.randomUUID(),

        name:
          'Новый продукт',

        aliases:
          [
            'новый продукт'
          ],

        unit:
          'g',

        gramsPerPiece:
          0,

        p: 0,
        f: 0,
        c: 0,

        countProtein:
          false,

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

els.saveProductsBtn
  .addEventListener(
    'click',
    saveProductEditor
  );


/* =========================================================
   ГОЛОСОВОЙ ВВОД
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

      els.voiceBtn
        .classList
        .add(
          'listening'
        );

      els.voiceBtn.textContent =
        '🎙️ Слушаю…';

      els.voiceStatus.hidden =
        false;

      els.voiceStatus.textContent =
        'Говори, например: «100 грамм риса» или «куриная грудка 200 грамм»';
    };

  recognition.onresult =
    event => {

      const transcript =
        event.results[0][0]
          .transcript;

      els.quickInput.value =
        transcript;

      els.voiceStatus.hidden =
        false;

      els.voiceStatus.textContent =
        `Распознано: ${transcript}`;
    };

  recognition.onerror =
    event => {

      els.voiceStatus.hidden =
        false;

      if (
        event.error ===
        'not-allowed'
      ) {

        els.voiceStatus.textContent =
          'Нет доступа к микрофону. Разреши сайту использовать микрофон в настройках браузера.';

      } else {

        els.voiceStatus.textContent =
          'Не удалось распознать речь: ' +
          event.error;
      }
    };

  recognition.onend =
    () => {

      els.voiceBtn
        .classList
        .remove(
          'listening'
        );

      els.voiceBtn.textContent =
        '🎙️ Сказать голосом';
    };

  els.voiceBtn
    .addEventListener(
      'click',
      () => {

        try {
          recognition.start();
        } catch {
          // распознавание уже запущено
        }
      }
    );

} else {

  els.voiceBtn.disabled =
    true;

  els.voiceBtn.textContent =
    '🎙️ Голос недоступен';

  els.voiceStatus.hidden =
    false;

  els.voiceStatus.textContent =
    'Этот браузер не поддерживает встроенное распознавание речи.';
}


/* =========================================================
   ЗАПУСК
========================================================= */

ensureEntryEditor();

render();

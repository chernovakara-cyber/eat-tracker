const STORAGE_KEY = 'bju-diary-v1';
const PRODUCTS_KEY = 'bju-products-v2';

/*
  МОИ ПРОДУКТЫ
  Все значения Б/Ж/У указаны на 100 г.
*/

function calculateKcal(p, f, c) {
  return p * 4 + f * 9 + c * 4;
}

function makeProduct(name, aliases, p, f, c, options = {}) {
  return {
    id: crypto.randomUUID(),
    name,
    aliases,
    unit: options.unit || 'g',
    gramsPerPiece: options.gramsPerPiece || 0,
    p,
    f,
    c,
    kcal: calculateKcal(p, f, c)
  };
}

const defaultProducts = [
  makeProduct(
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
    0
  ),

  makeProduct(
    'Тунец консервированный',
    [
      'тунец',
      'тунца',
      'консервированный тунец',
      'тунца консервированного'
    ],
    23,
    1,
    0
  ),

  makeProduct(
    'Яйца',
    [
      'яйцо',
      'яйца',
      'яиц',
      'яйцами'
    ],
    12.6,
    11.5,
    0.7
  ),

  makeProduct(
    'Ветчина',
    [
      'ветчина',
      'ветчины',
      'ветчину'
    ],
    14,
    4,
    4
  ),

  makeProduct(
    'Греческий йогурт',
    [
      'греческий йогурт',
      'греческого йогурта',
      'йогурт',
      'йогурта'
    ],
    8,
    2,
    4.2
  ),

  makeProduct(
    'Сыр',
    [
      'сыр',
      'сыра'
    ],
    26,
    26,
    0
  ),

  makeProduct(
    'Творожный сыр',
    [
      'творожный сыр',
      'творожного сыра'
    ],
    6.2,
    21.7,
    4.2
  ),

  makeProduct(
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

let data = loadJSON(STORAGE_KEY, {});
let products = loadProducts();

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
  const saved = loadJSON(
    PRODUCTS_KEY,
    null
  );

  if (Array.isArray(saved) && saved.length) {
    return saved;
  }

  return structuredClone(defaultProducts);
}

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

function totalsFor(day) {
  return day.entries.reduce(
    (acc, entry) => {
      acc.p += Number(entry.p) || 0;
      acc.f += Number(entry.f) || 0;
      acc.c += Number(entry.c) || 0;
      acc.kcal += Number(entry.kcal) || 0;

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

function calcFromProduct(
  product,
  amount,
  unit
) {
  let grams = Number(amount);

  if (unit === 'piece') {
    grams =
      Number(amount) *
      Number(product.gramsPerPiece || 0);
  }

  const factor = grams / 100;

  return {
    grams,

    p:
      Number(product.p || 0) *
      factor,

    f:
      Number(product.f || 0) *
      factor,

    c:
      Number(product.c || 0) *
      factor,

    kcal:
      Number(product.kcal || 0) *
      factor
  };
}

function render() {
  const date = els.dayPicker.value;
  const day = ensureDay(date);
  const totals = totalsFor(day);

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
    `${Math.round(totals.kcal)} ккал`;

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
  } else if (left >= 0) {
    els[
      type + 'Left'
    ].textContent =
      `${round1(left)} г`;
  } else {
    els[
      type + 'Left'
    ].textContent =
      `+${round1(Math.abs(left))} г`;
  }

  const pct = targetNum
    ? Math.min(
        100,
        eaten / targetNum * 100
      )
    : 0;

  els[
    type + 'Progress'
  ].style.width =
    `${pct}%`;
}

function renderEntries(day) {
  if (!day.entries.length) {
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
            ${entry.unit === 'piece'
              ? 'шт.'
              : 'г'}
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
}

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
        totalsFor(data[date]);

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
  render();
}

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
      'Для этого продукта не указан вес одной штуки. Введи количество в граммах или укажи вес одной штуки в разделе «Продукты».'
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

    ...calc
  });

  saveData();
  render();
}

/*
  НОРМАЛИЗАЦИЯ ФРАЗЫ

  Понимает:

  30 грамм риса
  30 г риса
  рис 30 грамм
  рис 30 г
  риса 30 грамм
  100 граммов гречки
  куриная грудка 200 г
  200 г куриной грудки
*/

function normalizeText(text) {
  return String(text)
    .toLowerCase()

    .replace(/,/g, '.')

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
      /\bгр\b/g,
      'г'
    )

    .replace(
      /\bгр\.\b/g,
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
  return String(text).replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&'
  );
}

function getProductAliases(product) {
  return [
    product.name.toLowerCase(),
    ...(product.aliases || [])
      .map(alias =>
        alias.toLowerCase()
      )
  ]
    .filter(
      (value, index, array) =>
        array.indexOf(value) === index
    )
    .sort(
      (a, b) =>
        b.length - a.length
    );
}

function parseProductAmount(
  text,
  product
) {
  const aliases =
    getProductAliases(product);

  for (const alias of aliases) {
    const a =
      escapeRegExp(alias);

    /*
      30 г риса
      30 г куриной грудки
    */

    let match =
      text.match(
        new RegExp(
          `(\\d+(?:\\.\\d+)?)\\s*(кг|г|шт)\\s*(?:${a})(?=\\s|$|,|\\.|и\\b)`,
          'i'
        )
      );

    if (match) {
      return convertAmount(
        Number(match[1]),
        match[2],
        product
      );
    }

    /*
      рис 30 г
      куриная грудка 200 г
    */

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
        match[2],
        product
      );
    }

    /*
      30 риса
      Обычно считаем граммами,
      кроме продуктов с заданным
      весом одной штуки.
    */

    match =
      text.match(
        new RegExp(
          `(\\d+(?:\\.\\d+)?)\\s*(?:${a})(?=\\s|$|,|\\.|и\\b)`,
          'i'
        )
      );

    if (match) {
      const defaultUnit =
        product.gramsPerPiece > 0
          ? 'piece'
          : 'g';

      return {
        amount:
          Number(match[1]),

        unit:
          defaultUnit
      };
    }

    /*
      рис 30
    */

    match =
      text.match(
        new RegExp(
          `(?:${a})\\s*(\\d+(?:\\.\\d+)?)(?=\\s|$|,|\\.|и\\b)`,
          'i'
        )
      );

    if (match) {
      const defaultUnit =
        product.gramsPerPiece > 0
          ? 'piece'
          : 'g';

      return {
        amount:
          Number(match[1]),

        unit:
          defaultUnit
      };
    }
  }

  return null;
}

function convertAmount(
  amount,
  unit,
  product
) {
  if (unit === 'кг') {
    return {
      amount:
        amount * 1000,

      unit:
        'g'
    };
  }

  if (unit === 'шт') {
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

function parseQuickText(raw) {
  const text =
    normalizeText(raw);

  const found = [];

  /*
    Сначала ищем продукты
    с самыми длинными названиями.

    Это нужно, например, чтобы
    "творожный сыр" не был
    ошибочно распознан как "сыр".
  */

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

  const occupied = [];

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

function renderManualProducts() {
  els.manualProduct.innerHTML =
    products
      .map(product => `
        <option
          value="${product.id}"
        >
          ${escapeHtml(
            product.name
          )}
        </option>
      `)
      .join('');

  const selected =
    products.find(
      product =>
        product.id ===
        els.manualProduct.value
    ) || products[0];

  if (selected) {
    els.manualUnit.value =
      selected.gramsPerPiece > 0
        ? selected.unit
        : 'g';
  }
}

function openProductEditor() {
  els.productEditor.innerHTML =
    products
      .map(productRowHtml)
      .join('');

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
        ккал / 100 г

        <input
          data-field="kcal"
          type="number"
          step="0.1"
          value="${round1(
            product.kcal
          )}"
        >
      </label>

      <label>
        грамм в 1 штуке

        <input
          data-field="gramsPerPiece"
          type="number"
          step="0.1"
          value="${
            product.gramsPerPiece || 0
          }"
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
  const rows = [
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
              )
              .value;

        const old =
          products.find(
            product =>
              product.id ===
              row.dataset.id
          );

        const name =
          get('name').trim();

        const p =
          Number(get('p')) || 0;

        const f =
          Number(get('f')) || 0;

        const c =
          Number(get('c')) || 0;

        const gramsPerPiece =
          Number(
            get('gramsPerPiece')
          ) || 0;

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
              ? 'piece'
              : 'g',

          gramsPerPiece,

          p,
          f,
          c,

          /*
            Калории пересчитываем
            автоматически из БЖУ.
          */

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


/* =====================
   ДАТА
===================== */

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


/* =====================
   ЦЕЛИ БЖУ
===================== */

[
  els.targetProtein,
  els.targetFat,
  els.targetCarbs
].forEach(input => {
  input.addEventListener(
    'change',
    saveTargets
  );

  input.addEventListener(
    'blur',
    saveTargets
  );
});


/* =====================
   БЫСТРЫЙ ВВОД
===================== */

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
        parseQuickText(text);

      if (!parsed.length) {
        alert(
          'Не получилось распознать продукт. Например, напиши: «рис 100 г» или «200 грамм куриной грудки».'
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


/*
  Enter тоже добавляет еду
*/

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


/* =====================
   РУЧНОЕ ДОБАВЛЕНИЕ
===================== */

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

      if (!product) {
        return;
      }

      els.manualUnit.value =
        product.gramsPerPiece > 0
          ? product.unit
          : 'g';
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


/* =====================
   ОЧИСТИТЬ ДЕНЬ
===================== */

els.clearDayBtn
  .addEventListener(
    'click',
    () => {
      const shouldClear =
        confirm(
          'Удалить все записи еды за этот день? Цели БЖУ останутся.'
        );

      if (!shouldClear) {
        return;
      }

      ensureDay(
        els.dayPicker.value
      ).entries = [];

      saveData();
      render();
    }
  );


/* =====================
   ПРОДУКТЫ
===================== */

els.settingsBtn
  .addEventListener(
    'click',
    () => {
      openProductEditor();
      bindProductEditorRemovers();
    }
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
          ['новый продукт'],

        unit:
          'g',

        gramsPerPiece:
          0,

        p: 0,
        f: 0,
        c: 0,
        kcal: 0
      };

      products.push(product);

      els.productEditor
        .insertAdjacentHTML(
          'beforeend',
          productRowHtml(product)
        );

      bindProductEditorRemovers();
    }
  );

els.saveProductsBtn
  .addEventListener(
    'click',
    saveProductEditor
  );


/* =====================
   ГОЛОСОВОЙ ВВОД
===================== */

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
          // уже запущено
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


/* =====================
   ЗАПУСК
===================== */

render();

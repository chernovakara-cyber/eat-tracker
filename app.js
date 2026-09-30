const STORAGE_KEY = 'bju-diary-v1';
const PRODUCTS_KEY = 'bju-products-v1';
const PRODUCTS_VERSION_KEY = 'bju-products-version-v2';


function macroKcal(p, f, c) {

  return Math.round(
    (
      (Number(p) || 0) * 4 +
      (Number(f) || 0) * 9 +
      (Number(c) || 0) * 4
    ) * 10
  ) / 10;

}



const defaultProducts = [

  {
    id: 'rice',
    name: 'Рис',
    aliases: ['рис', 'риса'],
    unit: 'g',
    gramsPerPiece: 0,
    p: 7.2,
    f: 0.5,
    c: 76.9,
    kcal: macroKcal(7.2, 0.5, 76.9),
    countProtein: false
  },

  {
    id: 'pasta',
    name: 'Макароны',
    aliases: ['макароны', 'макарон', 'паста', 'пасты'],
    unit: 'g',
    gramsPerPiece: 0,
    p: 12,
    f: 1.3,
    c: 70.5,
    kcal: macroKcal(12, 1.3, 70.5),
    countProtein: false
  },

  {
    id: 'buckwheat',
    name: 'Гречка',
    aliases: ['гречка', 'гречки', 'гречку'],
    unit: 'g',
    gramsPerPiece: 0,
    p: 13,
    f: 2.5,
    c: 61,
    kcal: macroKcal(13, 2.5, 61),
    countProtein: false
  },

  {
    id: 'chicken',
    name: 'Куриная грудка',
    aliases: [
      'куриная грудка',
      'грудка',
      'грудки',
      'курица',
      'курицы'
    ],
    unit: 'g',
    gramsPerPiece: 0,
    p: 22,
    f: 4,
    c: null,
    kcal: macroKcal(22, 4, 0),
    countProtein: true
  },

  {
    id: 'tuna',
    name: 'Тунец консервированный',
    aliases: [
      'тунец',
      'тунца',
      'тунец консервированный'
    ],
    unit: 'g',
    gramsPerPiece: 0,
    p: 23,
    f: 1,
    c: 0,
    kcal: macroKcal(23, 1, 0),
    countProtein: true
  },

  {
    id: 'eggs',
    name: 'Яйца',
    aliases: [
      'яйцо',
      'яйца',
      'яиц'
    ],
    unit: 'g',
    gramsPerPiece: 55,
    p: 12.6,
    f: 11.5,
    c: 0.7,
    kcal: macroKcal(12.6, 11.5, 0.7),
    countProtein: true
  },

  {
    id: 'ham',
    name: 'Ветчина',
    aliases: [
      'ветчина',
      'ветчины',
      'ветчину'
    ],
    unit: 'g',
    gramsPerPiece: 0,
    p: 14,
    f: 4,
    c: 4,
    kcal: macroKcal(14, 4, 4),
    countProtein: true
  },

  {
    id: 'greek-yogurt',
    name: 'Греческий йогурт',
    aliases: [
      'греческий йогурт',
      'йогурт',
      'йогурта'
    ],
    unit: 'g',
    gramsPerPiece: 0,
    p: 8,
    f: 2,
    c: 4.2,
    kcal: macroKcal(8, 2, 4.2),
    countProtein: true
  },

  {
    id: 'cheese',
    name: 'Сыр',
    aliases: [
      'сыр',
      'сыра'
    ],
    unit: 'g',
    gramsPerPiece: 0,

    /*
      На присланном скриншоте
      белок для сыра не указан.
    */
    p: null,

    f: 26,
    c: 0,

    kcal:
      macroKcal(
        0,
        26,
        0
      ),

    countProtein:
      false
  },

  {
    id: 'cream-cheese',
    name: 'Творожный сыр',
    aliases: [
      'творожный сыр',
      'творожного сыра'
    ],
    unit: 'g',
    gramsPerPiece: 0,
    p: 6.2,
    f: 21.7,
    c: 4.2,
    kcal: macroKcal(6.2, 21.7, 4.2),
    countProtein: true
  },

  {
    id: 'beans',
    name: 'Фасоль',
    aliases: [
      'фасоль',
      'фасоли'
    ],
    unit: 'g',
    gramsPerPiece: 0,
    p: 4.5,
    f: 2,
    c: 14,
    kcal: macroKcal(4.5, 2, 14),
    countProtein: false
  },

  {
    id: 'bread',
    name: 'Хлеб',
    aliases: [
      'хлеб',
      'хлеба'
    ],
    unit: 'g',
    gramsPerPiece: 0,
    p: 6,
    f: 0,
    c: 46,
    kcal: macroKcal(6, 0, 46),
    countProtein: false
  },

  {
    id: 'cucumber',
    name: 'Огурцы',
    aliases: [
      'огурец',
      'огурцы',
      'огурца',
      'огурцов'
    ],
    unit: 'g',
    gramsPerPiece: 0,
    p: 0,
    f: 0,
    c: 3,
    kcal: macroKcal(0, 0, 3),
    countProtein: false
  },

  {
    id: 'olives',
    name: 'Оливки',
    aliases: [
      'оливки',
      'оливок'
    ],
    unit: 'g',
    gramsPerPiece: 0,
    p: 2,
    f: 16,
    c: 5,
    kcal: macroKcal(2, 16, 5),
    countProtein: false
  },

  {
    id: 'asparagus',
    name: 'Спаржа',
    aliases: [
      'спаржа',
      'спаржи'
    ],
    unit: 'g',
    gramsPerPiece: 0,
    p: 12,
    f: 15,
    c: 10,
    kcal: macroKcal(12, 15, 10),
    countProtein: false
  },

  {
    id: 'honey-mustard',
    name: 'Медово-горчичный соус',
    aliases: [
      'медово-горчичный соус',
      'медово горчичный соус',
      'медово-горчичного соуса'
    ],
    unit: 'g',
    gramsPerPiece: 0,
    p: 1.7,
    f: 37.2,
    c: 22.5,
    kcal: macroKcal(1.7, 37.2, 22.5),
    countProtein: false
  }

];



/*
  Старые стандартные продукты предыдущей версии.

  При первом запуске новой версии
  они будут заменены на новый список,
  а добавленные пользователем продукты сохранятся.
*/

const LEGACY_DEFAULT_NAMES =
  new Set([
    'яйцо',
    'кетчуп',
    'куриная грудка',
    'рис варёный',
    'овсянка',
    'молоко 2.5%',
    'творог 5%',
    'банан',
    'сыр',
    'хлеб'
  ]);



const $ =
  (id) =>
    document.getElementById(id);



const els = {

  dayPicker:
    $('dayPicker'),

  prevDay:
    $('prevDay'),

  nextDay:
    $('nextDay'),


  targetProtein:
    $('targetProtein'),

  targetFat:
    $('targetFat'),

  targetCarbs:
    $('targetCarbs'),


  proteinEaten:
    $('proteinEaten'),

  fatEaten:
    $('fatEaten'),

  carbsEaten:
    $('carbsEaten'),

  kcalEaten:
    $('kcalEaten'),


  proteinLeft:
    $('proteinLeft'),

  fatLeft:
    $('fatLeft'),

  carbsLeft:
    $('carbsLeft'),


  proteinStatusText:
    $('proteinStatusText'),

  fatStatusText:
    $('fatStatusText'),

  carbsStatusText:
    $('carbsStatusText'),


  proteinProgress:
    $('proteinProgress'),

  fatProgress:
    $('fatProgress'),

  carbsProgress:
    $('carbsProgress'),


  quickInput:
    $('quickInput'),

  parseBtn:
    $('parseBtn'),

  manualBtn:
    $('manualBtn'),

  voiceBtn:
    $('voiceBtn'),

  voiceStatus:
    $('voiceStatus'),


  entriesList:
    $('entriesList'),

  historyList:
    $('historyList'),

  diaryTitle:
    $('diaryTitle'),

  clearDayBtn:
    $('clearDayBtn'),


  manualDialog:
    $('manualDialog'),

  manualProduct:
    $('manualProduct'),

  manualAmount:
    $('manualAmount'),

  manualUnit:
    $('manualUnit'),

  manualSubmit:
    $('manualSubmit'),


  settingsBtn:
    $('settingsBtn'),

  settingsDialog:
    $('settingsDialog'),

  productEditor:
    $('productEditor'),

  addProductBtn:
    $('addProductBtn'),

  saveProductsBtn:
    $('saveProductsBtn'),


  entryEditDialog:
    $('entryEditDialog'),

  editEntryName:
    $('editEntryName'),

  editEntryAmountLabel:
    $('editEntryAmountLabel'),

  editEntryProtein:
    $('editEntryProtein'),

  editEntryFat:
    $('editEntryFat'),

  editEntryCarbs:
    $('editEntryCarbs'),

  editEntryCountProtein:
    $('editEntryCountProtein'),

  saveEntryEditBtn:
    $('saveEntryEditBtn')

};



let data =
  loadJSON(
    STORAGE_KEY,
    {}
  );


let products =
  loadProducts();


let editingEntryId =
  null;



function localDateString(
  date = new Date()
) {

  const y =
    date.getFullYear();


  const m =
    String(
      date.getMonth() + 1
    ).padStart(
      2,
      '0'
    );


  const d =
    String(
      date.getDate()
    ).padStart(
      2,
      '0'
    );


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
      weekday:
        'long',

      day:
        'numeric',

      month:
        'long',

      year:
        'numeric'
    }
  );

}



function loadJSON(
  key,
  fallback
) {

  try {

    return (
      JSON.parse(
        localStorage.getItem(key)
      ) ?? fallback
    );

  }

  catch {

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



function normalizedName(
  value = ''
) {

  return String(value)
    .trim()
    .toLowerCase()
    .replace(
      /ё/g,
      'е'
    );

}



function optionalProductNumber(
  value
) {

  if (
    value === '' ||
    value === null ||
    value === undefined
  ) {

    return null;

  }


  const n =
    Number(value);


  return Number.isFinite(n)
    ? Math.max(
        0,
        n
      )
    : null;

}



function normalizeProduct(
  product
) {

  const name =
    String(
      product?.name || ''
    ).trim();


  return {

    id:
      product?.id ||
      crypto.randomUUID(),

    name,

    aliases:
      Array.isArray(
        product?.aliases
      ) &&
      product.aliases.length

        ? product.aliases

        : [
            name.toLowerCase()
          ],

    unit:
      'g',

    gramsPerPiece:
      Number(
        product?.gramsPerPiece
      ) || 0,

    p:
      optionalProductNumber(
        product?.p
      ),

    f:
      optionalProductNumber(
        product?.f
      ),

    c:
      optionalProductNumber(
        product?.c
      ),

    kcal:
      Number(
        product?.kcal
      ) ||
      macroKcal(
        product?.p,
        product?.f,
        product?.c
      ),

    countProtein:
      product?.countProtein !== false

  };

}



/*
  Загружает сохранённые продукты
  и один раз переводит старую версию
  списка на новую.
*/

function loadProducts() {

  const saved =
    loadJSON(
      PRODUCTS_KEY,
      null
    );


  const version =
    localStorage.getItem(
      PRODUCTS_VERSION_KEY
    );


  if (
    !Array.isArray(saved) ||
    !saved.length
  ) {

    const fresh =
      structuredClone(
        defaultProducts
      );


    localStorage.setItem(
      PRODUCTS_VERSION_KEY,
      '2'
    );


    localStorage.setItem(
      PRODUCTS_KEY,
      JSON.stringify(fresh)
    );


    return fresh;

  }


  let result;


  if (
    version !== '2'
  ) {

    /*
      Свои пользовательские продукты
      не удаляем.

      Убираем только известные
      стандартные продукты старой версии.
    */

    const customSaved =
      saved
        .map(
          normalizeProduct
        )
        .filter(
          p =>
            !LEGACY_DEFAULT_NAMES
              .has(
                normalizedName(
                  p.name
                )
              )
        );


    result = [

      ...structuredClone(
        defaultProducts
      ),

      ...customSaved

    ];

  }

  else {

    result =
      saved.map(
        normalizeProduct
      );


    /*
      Если какой-то новый стандартный
      продукт отсутствует — добавляем.
    */

    const existingNames =
      new Set(
        result.map(
          p =>
            normalizedName(
              p.name
            )
        )
      );


    for (
      const preset
      of defaultProducts
    ) {

      if (
        !existingNames.has(
          normalizedName(
            preset.name
          )
        )
      ) {

        result.push(
          structuredClone(
            preset
          )
        );

      }

    }

  }


  localStorage.setItem(
    PRODUCTS_VERSION_KEY,
    '2'
  );


  localStorage.setItem(
    PRODUCTS_KEY,
    JSON.stringify(result)
  );


  return result;

}



function ensureDay(
  date
) {

  if (
    !data[date]
  ) {

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

  return (
    Math.round(
      (Number(n) || 0) *
      10
    ) /
    10
  );

}



function escapeHtml(
  value = ''
) {

  return String(value)
    .replace(
      /[&<>'"]/g,
      c => ({
        '&':
          '&amp;',

        '<':
          '&lt;',

        '>':
          '&gt;',

        "'":
          '&#39;',

        '"':
          '&quot;'
      }[c])
    );

}



/* =========================================================
   СЧИТАЕМ ЛИ БЕЛОК ЗАПИСИ
========================================================= */

function entryCountsProtein(
  entry
) {

  return (
    entry.countProtein !==
    false
  );

}



/* =========================================================
   СУММА ЗА ДЕНЬ
========================================================= */

function totalsFor(
  day
) {

  return day.entries.reduce(
    (acc, e) => {

      /*
        Белок прибавляем только
        если галочка включена.
      */

      if (
        entryCountsProtein(e)
      ) {

        acc.p +=
          Number(e.p) || 0;

      }


      acc.f +=
        Number(e.f) || 0;


      acc.c +=
        Number(e.c) || 0;


      acc.kcal +=
        Number(e.kcal) || 0;


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
   БЖУ ПРОДУКТА ПО ВЕСУ
========================================================= */

function calcFromProduct(
  product,
  amount,
  unit = 'g'
) {

  let grams =
    Number(amount);


  if (
    unit === 'piece'
  ) {

    grams =
      Number(amount) *
      Number(
        product.gramsPerPiece ||
        0
      );

  }


  const factor =
    grams / 100;


  const p =
    (Number(product.p) || 0) *
    factor;


  const f =
    (Number(product.f) || 0) *
    factor;


  const c =
    (Number(product.c) || 0) *
    factor;


  const kcal =
    (
      Number(
        product.kcal
      ) ||
      macroKcal(
        product.p,
        product.f,
        product.c
      )
    ) *
    factor;


  return {
    grams,
    p,
    f,
    c,
    kcal
  };

}



/* =========================================================
   ОСНОВНОЙ RENDER
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
    `${Math.round(totals.kcal)} ккал`;


  renderEntries(day);

  renderHistory();

  renderManualProducts();

}



/* =========================================================
   КАРТОЧКИ БЖУ
========================================================= */

function updateStat(
  type,
  eaten,
  target
) {

  const targetNum =
    Number(target) || 0;


  const eatenNum =
    Number(eaten) || 0;


  const rawPct =
    targetNum

      ? (
          eatenNum /
          targetNum
        ) *
        100

      : 0;


  const progressPct =
    Math.min(
      100,
      Math.max(
        0,
        rawPct
      )
    );


  const eatenEl =
    els[
      type +
      'Eaten'
    ];


  const leftEl =
    els[
      type +
      'Left'
    ];


  const statusTextEl =
    els[
      type +
      'StatusText'
    ];


  const progressEl =
    els[
      type +
      'Progress'
    ];


  const card =
    eatenEl.closest(
      '.stat-card'
    );


  eatenEl.textContent =
    `${round1(eatenNum)} г`;


  progressEl.style.width =
    `${progressPct}%`;


  if (
    !targetNum
  ) {

    statusTextEl.textContent =
      '';


    leftEl.textContent =
      'цель не задана';

  }


  else if (
    eatenNum >
    targetNum
  ) {

    statusTextEl.textContent =
      'превысила на';


    leftEl.textContent =
      `${
        round1(
          eatenNum -
          targetNum
        )
      } г`;

  }


  else {

    statusTextEl.textContent =
      'осталось';


    leftEl.textContent =
      `${
        round1(
          targetNum -
          eatenNum
        )
      } г`;

  }


  card.classList.remove(
    'goal-near',
    'goal-over'
  );


  if (
    targetNum > 0 &&
    rawPct >= 95 &&
    rawPct <= 100
  ) {

    card.classList.add(
      'goal-near'
    );

  }


  else if (
    targetNum > 0 &&
    rawPct > 100 &&
    (
      type === 'fat' ||
      type === 'carbs'
    )
  ) {

    card.classList.add(
      'goal-over'
    );

  }

}



/* =========================================================
   ЗАПИСИ ТЕКУЩЕГО ДНЯ
========================================================= */

function renderEntries(
  day
) {

  if (
    !day.entries.length
  ) {

    els.entriesList.innerHTML =
      '<div class="empty">Пока ничего не записано.</div>';

    return;

  }


  els.entriesList.innerHTML =
    day.entries
      .map(
        e => {

          const proteinNote =
            entryCountsProtein(e)

              ? ''

              : ' · белок не считается';


          return `

            <div class="entry">

              <div>

                <div class="entry-title">

                  ${escapeHtml(e.name)}
                  —
                  ${round1(e.amount)}
                  ${e.unit === 'piece' ? 'шт.' : 'г'}

                </div>


                <div class="entry-macros">

                  Б ${round1(e.p)}
                  ·
                  Ж ${round1(e.f)}
                  ·
                  У ${round1(e.c)}
                  ·
                  ${Math.round(e.kcal)} ккал
                  ${proteinNote}

                </div>

              </div>


              <div class="entry-actions">

                <button
                  class="mini-btn edit-entry"
                  data-id="${e.id}"
                  type="button"
                >
                  Редактировать
                </button>


                <button
                  class="mini-btn delete-entry"
                  data-id="${e.id}"
                  type="button"
                >
                  Удалить
                </button>

              </div>

            </div>

          `;

        }
      )
      .join('');


  /*
    Редактирование.
  */

  els.entriesList
    .querySelectorAll(
      '.edit-entry'
    )
    .forEach(
      btn => {

        btn.addEventListener(
          'click',
          () =>
            openEntryEditor(
              btn.dataset.id
            )
        );

      }
    );


  /*
    Удаление.
  */

  els.entriesList
    .querySelectorAll(
      '.delete-entry'
    )
    .forEach(
      btn => {

        btn.addEventListener(
          'click',
          () => {

            day.entries =
              day.entries.filter(
                e =>
                  e.id !==
                  btn.dataset.id
              );


            saveData();

            render();

          }
        );

      }
    );

}



/* =========================================================
   ОТКРЫТЬ ОБЛАЧКО РЕДАКТИРОВАНИЯ
========================================================= */

function openEntryEditor(
  entryId
) {

  const day =
    ensureDay(
      els.dayPicker.value
    );


  const entry =
    day.entries.find(
      e =>
        e.id ===
        entryId
    );


  if (
    !entry
  ) {

    return;

  }


  editingEntryId =
    entryId;


  els.editEntryName.textContent =
    entry.name;


  els.editEntryAmountLabel.textContent =
    `${
      round1(
        entry.amount
      )
    } ${
      entry.unit === 'piece'
        ? 'шт.'
        : 'г'
    } в этой записи`;


  els.editEntryProtein.value =
    round1(
      entry.p
    );


  els.editEntryFat.value =
    round1(
      entry.f
    );


  els.editEntryCarbs.value =
    round1(
      entry.c
    );


  els.editEntryCountProtein.checked =
    entryCountsProtein(
      entry
    );


  els.entryEditDialog
    .showModal();

}



/* =========================================================
   СОХРАНИТЬ РЕДАКТИРОВАНИЕ ЗАПИСИ
========================================================= */

function saveEntryEdit() {

  if (
    !editingEntryId
  ) {

    return;

  }


  const day =
    ensureDay(
      els.dayPicker.value
    );


  const entry =
    day.entries.find(
      e =>
        e.id ===
        editingEntryId
    );


  if (
    !entry
  ) {

    return;

  }


  entry.p =
    Math.max(
      0,
      Number(
        els.editEntryProtein.value
      ) || 0
    );


  entry.f =
    Math.max(
      0,
      Number(
        els.editEntryFat.value
      ) || 0
    );


  entry.c =
    Math.max(
      0,
      Number(
        els.editEntryCarbs.value
      ) || 0
    );


  /*
    Эта галочка относится только
    к конкретной записи конкретного дня.
  */

  entry.countProtein =
    els.editEntryCountProtein.checked;


  /*
    После ручного изменения БЖУ
    пересчитываем калории.
  */

  entry.kcal =
    macroKcal(
      entry.p,
      entry.f,
      entry.c
    );


  saveData();


  editingEntryId =
    null;


  els.entryEditDialog
    .close();


  render();

}



/* =========================================================
   ИСТОРИЯ
========================================================= */

function renderHistory() {

  const dates =
    Object
      .keys(data)
      .filter(
        d =>
          data[d].entries.length ||
          data[d].targets.p ||
          data[d].targets.f ||
          data[d].targets.c
      )
      .sort(
        (a, b) =>
          b.localeCompare(a)
      );


  if (
    !dates.length
  ) {

    els.historyList.innerHTML =
      '<div class="empty">История появится после первой записи.</div>';

    return;

  }


  els.historyList.innerHTML =
    dates
      .map(
        date => {

          const t =
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

                  Б ${round1(t.p)}
                  ·
                  Ж ${round1(t.f)}
                  ·
                  У ${round1(t.c)}
                  ·
                  ${Math.round(t.kcal)} ккал

                </div>

              </div>

              <span>
                →
              </span>

            </div>

          `;

        }
      )
      .join('');


  els.historyList
    .querySelectorAll(
      '.history-item'
    )
    .forEach(
      item => {

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

      }
    );

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

  render();

}



/* =========================================================
   ДОБАВИТЬ ПРОДУКТ
========================================================= */

function addEntry(
  product,
  amount,
  unit = 'g'
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


  if (
    unit === 'piece' &&
    !product.gramsPerPiece
  ) {

    alert(
      'Для этого продукта не указан вес одной штуки. Добавь его в граммах.'
    );

    return;

  }


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

    /*
      При добавлении запись получает
      настройку белка от самого продукта.
    */

    countProtein:
      product.countProtein !==
      false,

    ...calc

  });


  saveData();

  render();

}



/* =========================================================
   РАСПОЗНАВАНИЕ ТЕКСТА
========================================================= */

function normalizeText(
  text
) {

  return text
    .toLowerCase()
    .replace(
      /ё/g,
      'е'
    )
    .replace(
      /,/g,
      '.'
    )
    .replace(
      /(граммов|грамма|грамм|гр\.?)/g,
      'г'
    )
    .replace(
      /(штуки|штук|штука)/g,
      'шт'
    );

}



function parseQuickText(
  raw
) {

  const text =
    normalizeText(raw);


  const found =
    [];


  const sorted =
    [...products]
      .sort(
        (a, b) => {

          const aMax =
            Math.max(
              ...(
                a.aliases ||
                [a.name]
              )
              .map(
                x =>
                  x.length
              )
            );


          const bMax =
            Math.max(
              ...(
                b.aliases ||
                [b.name]
              )
              .map(
                x =>
                  x.length
              )
            );


          return (
            bMax -
            aMax
          );

        }
      );


  for (
    const product
    of sorted
  ) {

    const aliases =
      [
        product.name.toLowerCase(),
        ...(product.aliases || [])
      ];


    for (
      const alias
      of aliases.sort(
        (a, b) =>
          b.length -
          a.length
      )
    ) {

      const esc =
        alias.replace(
          /[.*+?^${}()|[\]\\]/g,
          '\\$&'
        );


      const patterns =
        [

          new RegExp(
            `(\\d+(?:\\.\\d+)?)\\s*(г|шт)?\\s*(?:${esc})`,
            'i'
          ),

          new RegExp(
            `(?:${esc})\\s*(\\d+(?:\\.\\d+)?)\\s*(г|шт)?`,
            'i'
          )

        ];


      let match =
        null;


      for (
        const pattern
        of patterns
      ) {

        match =
          text.match(
            pattern
          );


        if (
          match
        ) {

          break;

        }

      }


      if (
        match
      ) {

        const amount =
          Number(
            match[1]
          );


        const token =
          match[2];


        const unit =
          token === 'шт'
            ? 'piece'
            : 'g';


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



/* =========================================================
   РУЧНОЕ ДОБАВЛЕНИЕ
========================================================= */

function renderManualProducts() {

  const currentValue =
    els.manualProduct.value;


  els.manualProduct.innerHTML =
    products
      .map(
        p =>
          `<option value="${p.id}">${escapeHtml(p.name)}</option>`
      )
      .join('');


  if (
    products.some(
      p =>
        p.id ===
        currentValue
    )
  ) {

    els.manualProduct.value =
      currentValue;

  }


  els.manualUnit.value =
    'g';

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



function productRowHtml(
  p
) {

  const proteinValue =
    p.p === null ||
    p.p === undefined

      ? ''

      : p.p;


  const fatValue =
    p.f === null ||
    p.f === undefined

      ? ''

      : p.f;


  const carbsValue =
    p.c === null ||
    p.c === undefined

      ? ''

      : p.c;


  const checked =
    p.countProtein !== false

      ? 'checked'

      : '';


  return `

    <div
      class="product-row"
      data-id="${p.id}"
    >

      <label>

        Название

        <input
          data-field="name"
          value="${escapeHtml(p.name)}"
        >

      </label>


      <label>

        Б/100г

        <input
          data-field="p"
          type="number"
          min="0"
          step="0.1"
          value="${proteinValue}"
        >

      </label>


      <label>

        Ж/100г

        <input
          data-field="f"
          type="number"
          min="0"
          step="0.1"
          value="${fatValue}"
        >

      </label>


      <label>

        У/100г

        <input
          data-field="c"
          type="number"
          min="0"
          step="0.1"
          value="${carbsValue}"
        >

      </label>


      <label>

        ккал/100г

        <input
          data-field="kcal"
          type="number"
          min="0"
          step="0.1"
          value="${round1(p.kcal)}"
        >

      </label>


      <label class="product-protein-toggle">

        <span>
          Считать белок
        </span>

        <input
          data-field="countProtein"
          type="checkbox"
          ${checked}
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



/* =========================================================
   УДАЛЕНИЕ ПРОДУКТА ИЗ НАСТРОЕК
========================================================= */

function bindProductEditorRemovers() {

  els.productEditor
    .querySelectorAll(
      '.remove-product'
    )
    .forEach(
      btn => {

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

      }
    );

}



function readOptionalNumber(
  input
) {

  const raw =
    input.value.trim();


  return raw === ''

    ? null

    : Math.max(
        0,
        Number(raw) ||
        0
      );

}



/* =========================================================
   СОХРАНЕНИЕ НАСТРОЕК ПРОДУКТОВ
========================================================= */

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
      .map(
        row => {

          const old =
            products.find(
              p =>
                p.id ===
                row.dataset.id
            );


          const nameInput =
            row.querySelector(
              '[data-field="name"]'
            );


          const pInput =
            row.querySelector(
              '[data-field="p"]'
            );


          const fInput =
            row.querySelector(
              '[data-field="f"]'
            );


          const cInput =
            row.querySelector(
              '[data-field="c"]'
            );


          const kcalInput =
            row.querySelector(
              '[data-field="kcal"]'
            );


          const countProteinInput =
            row.querySelector(
              '[data-field="countProtein"]'
            );


          const name =
            nameInput.value.trim();


          const p =
            readOptionalNumber(
              pInput
            );


          const f =
            readOptionalNumber(
              fInput
            );


          const c =
            readOptionalNumber(
              cInput
            );


          const kcal =
            Math.max(
              0,

              Number(
                kcalInput.value
              ) ||

              macroKcal(
                p,
                f,
                c
              )
            );


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
              'g',

            /*
              Оставлено только для
              совместимости со старыми записями.

              В интерфейсе этот столбец
              больше не показывается.
            */

            gramsPerPiece:
              old?.gramsPerPiece ||
              0,

            p,
            f,
            c,
            kcal,

            countProtein:
              countProteinInput.checked

          };

        }
      )
      .filter(
        p =>
          p.name
      );


  saveProducts();


  els.settingsDialog
    .close();


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
        d.getDate() -
        1
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
        d.getDate() +
        1
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
]
.forEach(
  input => {

    input.addEventListener(
      'change',
      saveTargets
    );

  }
);



/* =========================================================
   ДОБАВИТЬ ИЗ ТЕКСТА
========================================================= */

els.parseBtn
  .addEventListener(
    'click',
    () => {

      const parsed =
        parseQuickText(
          els.quickInput.value.trim()
        );


      if (
        !parsed.length
      ) {

        alert(
          'Не получилось распознать продукты. Проверь названия или добавь запись вручную.'
        );

        return;

      }


      parsed.forEach(
        x => {

          addEntry(
            x.product,
            x.amount,
            x.unit
          );

        }
      );


      els.quickInput.value =
        '';

    }
  );



/* =========================================================
   ДОБАВИТЬ ВРУЧНУЮ
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


els.manualSubmit
  .addEventListener(
    'click',
    () => {

      const product =
        products.find(
          x =>
            x.id ===
            els.manualProduct.value
        );


      addEntry(
        product,
        Number(
          els.manualAmount.value
        ),
        'g'
      );


      els.manualDialog
        .close();

    }
  );



/* =========================================================
   ОЧИСТИТЬ ДЕНЬ
========================================================= */

els.clearDayBtn
  .addEventListener(
    'click',
    () => {

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

    }
  );



/* =========================================================
   ОТКРЫТЬ НАСТРОЙКИ
========================================================= */

els.settingsBtn
  .addEventListener(
    'click',
    openProductEditor
  );



/* =========================================================
   ДОБАВИТЬ СВОЙ ПРОДУКТ
========================================================= */

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

        p:
          0,

        f:
          0,

        c:
          0,

        kcal:
          0,

        countProtein:
          true

      };


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
   СОХРАНЕНИЕ РЕДАКТИРОВАНИЯ ЗАПИСИ
========================================================= */

els.saveEntryEditBtn
  .addEventListener(
    'click',
    saveEntryEdit
  );


els.entryEditDialog
  .addEventListener(
    'close',
    () => {

      editingEntryId =
        null;

    }
  );



/* =========================================================
   ГОЛОСОВОЙ ВВОД
========================================================= */

const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;


if (
  SpeechRecognition
) {

  const rec =
    new SpeechRecognition();


  rec.lang =
    'ru-RU';


  rec.interimResults =
    false;


  rec.maxAlternatives =
    1;


  rec.onstart =
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
        'Говори, например: «100 грамм риса и 120 грамм тунца»';

    };


  rec.onresult =
    (e) => {

      els.quickInput.value =
        e.results[0][0]
          .transcript;

    };


  rec.onerror =
    (e) => {

      els.voiceStatus.hidden =
        false;


      els.voiceStatus.textContent =
        'Не удалось распознать речь: ' +
        e.error;

    };


  rec.onend =
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
      () =>
        rec.start()
    );

}


else {

  els.voiceBtn.disabled =
    true;


  els.voiceBtn.textContent =
    '🎙️ Голос недоступен';

}



/* =========================================================
   ПЕРВЫЙ RENDER
========================================================= */

render();

const STORAGE_PRODUCTS_KEY = "eatTrackerProducts_v6";
const STORAGE_DAYS_KEY = "eatTrackerDays_v6";


const defaultProducts = [

  {
    id: uid(),
    name: "Рис",
    protein: 7.2,
    fat: 0.5,
    carbs: 76.9,
    countProtein: true
  },

  {
    id: uid(),
    name: "Макароны",
    protein: 12,
    fat: 1.3,
    carbs: 70.5,
    countProtein: true
  },

  {
    id: uid(),
    name: "Гречка",
    protein: 13,
    fat: 2.5,
    carbs: 61,
    countProtein: true
  },

  {
    id: uid(),
    name: "Куриная грудка",
    protein: 22,
    fat: 4,
    carbs: 0,
    countProtein: true
  },

  {
    id: uid(),
    name: "Тунец консервированный",
    protein: 23,
    fat: 1,
    carbs: 0,
    countProtein: true
  },

  {
    id: uid(),
    name: "Яйца",
    protein: 12.6,
    fat: 11.5,
    carbs: 0.7,
    countProtein: true
  },

  {
    id: uid(),
    name: "Ветчина",
    protein: 14,
    fat: 4,
    carbs: 4,
    countProtein: true
  },

  {
    id: uid(),
    name: "Греческий йогурт",
    protein: 8,
    fat: 2,
    carbs: 4.2,
    countProtein: true
  },

  {
    id: uid(),
    name: "Сыр",
    protein: 0,
    fat: 26,
    carbs: 0,
    countProtein: true
  },

  {
    id: uid(),
    name: "Творожный сыр",
    protein: 6.2,
    fat: 21.7,
    carbs: 4.2,
    countProtein: true
  },

  {
    id: uid(),
    name: "Фасоль",
    protein: 4.5,
    fat: 2,
    carbs: 14,
    countProtein: true
  },

  {
    id: uid(),
    name: "Хлеб",
    protein: 6,
    fat: 0,
    carbs: 46,
    countProtein: true
  },

  {
    id: uid(),
    name: "Огурцы",
    protein: 0,
    fat: 0,
    carbs: 3,
    countProtein: true
  },

  {
    id: uid(),
    name: "Оливки",
    protein: 2,
    fat: 16,
    carbs: 5,
    countProtein: true
  },

  {
    id: uid(),
    name: "Спаржа",
    protein: 12,
    fat: 15,
    carbs: 10,
    countProtein: true
  },

  {
    id: uid(),
    name: "Медово-горчичный соус",
    protein: 1.7,
    fat: 37.2,
    carbs: 22.5,
    countProtein: true
  }

];


let products =
  loadProducts();


let days =
  loadDays();


let currentDay =
  todayIso();


let editingEntryId =
  null;



const els = {

  dayPicker:
    document.getElementById(
      "dayPicker"
    ),

  prevDay:
    document.getElementById(
      "prevDay"
    ),

  nextDay:
    document.getElementById(
      "nextDay"
    ),


  targetProtein:
    document.getElementById(
      "targetProtein"
    ),

  targetFat:
    document.getElementById(
      "targetFat"
    ),

  targetCarbs:
    document.getElementById(
      "targetCarbs"
    ),


  proteinEaten:
    document.getElementById(
      "proteinEaten"
    ),

  proteinLeft:
    document.getElementById(
      "proteinLeft"
    ),

  proteinProgress:
    document.getElementById(
      "proteinProgress"
    ),

  proteinStatusText:
    document.getElementById(
      "proteinStatusText"
    ),


  fatEaten:
    document.getElementById(
      "fatEaten"
    ),

  fatLeft:
    document.getElementById(
      "fatLeft"
    ),

  fatProgress:
    document.getElementById(
      "fatProgress"
    ),

  fatStatusText:
    document.getElementById(
      "fatStatusText"
    ),


  carbsEaten:
    document.getElementById(
      "carbsEaten"
    ),

  carbsLeft:
    document.getElementById(
      "carbsLeft"
    ),

  carbsProgress:
    document.getElementById(
      "carbsProgress"
    ),

  carbsStatusText:
    document.getElementById(
      "carbsStatusText"
    ),


  kcalEaten:
    document.getElementById(
      "kcalEaten"
    ),


  proteinCard:
    document.getElementById(
      "proteinCard"
    ),

  fatCard:
    document.getElementById(
      "fatCard"
    ),

  carbsCard:
    document.getElementById(
      "carbsCard"
    ),


  proteinMascot:
    document.getElementById(
      "proteinMascot"
    ),

  fatMascot:
    document.getElementById(
      "fatMascot"
    ),

  carbsMascot:
    document.getElementById(
      "carbsMascot"
    ),


  proteinBubble:
    document.getElementById(
      "proteinBubble"
    ),

  fatBubble:
    document.getElementById(
      "fatBubble"
    ),

  carbsBubble:
    document.getElementById(
      "carbsBubble"
    ),


  voiceBtn:
    document.getElementById(
      "voiceBtn"
    ),

  voiceStatus:
    document.getElementById(
      "voiceStatus"
    ),

  quickInput:
    document.getElementById(
      "quickInput"
    ),

  parseBtn:
    document.getElementById(
      "parseBtn"
    ),

  manualBtn:
    document.getElementById(
      "manualBtn"
    ),

  clearDayBtn:
    document.getElementById(
      "clearDayBtn"
    ),


  diaryTitle:
    document.getElementById(
      "diaryTitle"
    ),

  entriesList:
    document.getElementById(
      "entriesList"
    ),

  historyList:
    document.getElementById(
      "historyList"
    ),


  manualDialog:
    document.getElementById(
      "manualDialog"
    ),

  manualProduct:
    document.getElementById(
      "manualProduct"
    ),

  manualAmount:
    document.getElementById(
      "manualAmount"
    ),

  manualSubmit:
    document.getElementById(
      "manualSubmit"
    ),


  settingsBtn:
    document.getElementById(
      "settingsBtn"
    ),

  settingsDialog:
    document.getElementById(
      "settingsDialog"
    ),

  productEditor:
    document.getElementById(
      "productEditor"
    ),

  addProductBtn:
    document.getElementById(
      "addProductBtn"
    ),

  saveProductsBtn:
    document.getElementById(
      "saveProductsBtn"
    ),


  entryEditDialog:
    document.getElementById(
      "entryEditDialog"
    ),

  editEntryName:
    document.getElementById(
      "editEntryName"
    ),

  editEntryAmountLabel:
    document.getElementById(
      "editEntryAmountLabel"
    ),

  editEntryProtein:
    document.getElementById(
      "editEntryProtein"
    ),

  editEntryFat:
    document.getElementById(
      "editEntryFat"
    ),

  editEntryCarbs:
    document.getElementById(
      "editEntryCarbs"
    ),

  editEntryCountProtein:
    document.getElementById(
      "editEntryCountProtein"
    ),

  saveEntryEditBtn:
    document.getElementById(
      "saveEntryEditBtn"
    )

};



setup();

renderAll();



/* =========================================================
   INIT
========================================================= */

function setup() {

  ensureDay(
    currentDay
  );


  els.dayPicker.value =
    currentDay;


  els.dayPicker
    .addEventListener(
      "change",
      () => {

        currentDay =
          els.dayPicker.value ||
          todayIso();


        ensureDay(
          currentDay
        );


        renderAll();

      }
    );


  els.prevDay
    .addEventListener(
      "click",
      () => {

        currentDay =
          shiftDay(
            currentDay,
            -1
          );


        ensureDay(
          currentDay
        );


        renderAll();

      }
    );


  els.nextDay
    .addEventListener(
      "click",
      () => {

        currentDay =
          shiftDay(
            currentDay,
            1
          );


        ensureDay(
          currentDay
        );


        renderAll();

      }
    );


  [
    els.targetProtein,
    els.targetFat,
    els.targetCarbs
  ]
  .forEach(
    input => {

      input.addEventListener(
        "input",
        saveTargetsFromInputs
      );


      input.addEventListener(
        "change",
        saveTargetsFromInputs
      );

    }
  );


  els.manualBtn
    .addEventListener(
      "click",
      () => {

        populateManualProducts();


        els.manualAmount.value =
          "";


        els.manualDialog
          .showModal();

      }
    );


  els.manualSubmit
    .addEventListener(
      "click",
      () => {

        const productId =
          els.manualProduct.value;


        const amount =
          toNumber(
            els.manualAmount.value
          );


        if (
          !productId ||
          amount <= 0
        ) {

          alert(
            "Выбери продукт и введи количество."
          );

          return;

        }


        const product =
          products.find(
            p =>
              p.id ===
              productId
          );


        if (
          !product
        ) {

          return;

        }


        addEntryFromProduct(
          product,
          amount
        );


        els.manualDialog
          .close();

      }
    );


  els.settingsBtn
    .addEventListener(
      "click",
      () => {

        renderProductsEditor();


        els.settingsDialog
          .showModal();

      }
    );


  els.addProductBtn
    .addEventListener(
      "click",
      () => {

        products.push({

          id:
            uid(),

          name:
            "",

          protein:
            0,

          fat:
            0,

          carbs:
            0,

          countProtein:
            true

        });


        renderProductsEditor();

      }
    );


  els.saveProductsBtn
    .addEventListener(
      "click",
      saveProductsFromEditor
    );


  els.productEditor
    .addEventListener(
      "click",
      e => {

        const btn =
          e.target.closest(
            ".remove-product"
          );


        if (
          !btn
        ) {

          return;

        }


        const id =
          btn.dataset.id;


        products =
          products.filter(
            p =>
              p.id !== id
          );


        saveProducts();

        renderProductsEditor();

        populateManualProducts();

      }
    );


  els.entriesList
    .addEventListener(
      "click",
      e => {

        const editBtn =
          e.target.closest(
            ".edit-entry"
          );


        const deleteBtn =
          e.target.closest(
            ".delete-entry"
          );


        if (
          editBtn
        ) {

          openEditEntry(
            editBtn.dataset.id
          );

          return;

        }


        if (
          deleteBtn
        ) {

          deleteEntry(
            deleteBtn.dataset.id
          );

        }

      }
    );


  els.saveEntryEditBtn
    .addEventListener(
      "click",
      saveEditedEntry
    );


  els.clearDayBtn
    .addEventListener(
      "click",
      () => {

        if (
          !confirm(
            "Очистить все записи за этот день?"
          )
        ) {

          return;

        }


        const day =
          getDay(
            currentDay
          );


        day.entries =
          [];


        saveDays();

        renderAll();

      }
    );


  els.parseBtn
    .addEventListener(
      "click",
      parseQuickInput
    );


  setupVoiceInput();

}



/* =========================================================
   DATA
========================================================= */

function loadProducts() {

  const raw =
    localStorage.getItem(
      STORAGE_PRODUCTS_KEY
    );


  if (
    !raw
  ) {

    return structuredClone(
      defaultProducts
    );

  }


  try {

    const parsed =
      JSON.parse(
        raw
      );


    if (
      !Array.isArray(parsed) ||
      !parsed.length
    ) {

      return structuredClone(
        defaultProducts
      );

    }


    return parsed.map(
      p => ({

        id:
          p.id ||
          uid(),

        name:
          p.name ||
          "",

        protein:
          toNumber(
            p.protein
          ),

        fat:
          toNumber(
            p.fat
          ),

        carbs:
          toNumber(
            p.carbs
          ),

        countProtein:
          p.countProtein !==
          false

      })
    );

  }


  catch {

    return structuredClone(
      defaultProducts
    );

  }

}



function saveProducts() {

  localStorage.setItem(
    STORAGE_PRODUCTS_KEY,
    JSON.stringify(
      products
    )
  );

}



function loadDays() {

  const raw =
    localStorage.getItem(
      STORAGE_DAYS_KEY
    );


  if (
    !raw
  ) {

    return {};

  }


  try {

    const parsed =
      JSON.parse(
        raw
      );


    return (
      parsed &&
      typeof parsed ===
      "object"
    )
      ? parsed
      : {};

  }


  catch {

    return {};

  }

}



function saveDays() {

  localStorage.setItem(
    STORAGE_DAYS_KEY,
    JSON.stringify(
      days
    )
  );

}



function ensureDay(
  dayKey
) {

  if (
    !days[dayKey]
  ) {

    days[dayKey] = {

      targets: {

        protein:
          0,

        fat:
          0,

        carbs:
          0

      },

      entries:
        []

    };


    saveDays();

  }


  if (
    !days[dayKey].targets
  ) {

    days[dayKey].targets = {

      protein:
        0,

      fat:
        0,

      carbs:
        0

    };

  }


  if (
    !Array.isArray(
      days[dayKey].entries
    )
  ) {

    days[dayKey].entries =
      [];

  }

}



function getDay(
  dayKey
) {

  ensureDay(
    dayKey
  );


  return days[
    dayKey
  ];

}



/* =========================================================
   RENDER
========================================================= */

function renderAll() {

  ensureDay(
    currentDay
  );


  els.dayPicker.value =
    currentDay;


  els.diaryTitle.textContent =
    `Еда за ${formatDateRu(currentDay)}`;


  renderTargets();

  renderStats();

  renderEntries();

  renderHistory();

  populateManualProducts();

}



function renderTargets() {

  const day =
    getDay(
      currentDay
    );


  els.targetProtein.value =
    valueOrEmpty(
      day.targets.protein
    );


  els.targetFat.value =
    valueOrEmpty(
      day.targets.fat
    );


  els.targetCarbs.value =
    valueOrEmpty(
      day.targets.carbs
    );

}



function renderStats() {

  const day =
    getDay(
      currentDay
    );


  const totals =
    getTotals(
      day
    );


  const targets =
    day.targets;


  renderOneMacro({

    type:
      "protein",

    eaten:
      totals.protein,

    target:
      toNumber(
        targets.protein
      ),

    card:
      els.proteinCard,

    eatenEl:
      els.proteinEaten,

    leftEl:
      els.proteinLeft,

    progressEl:
      els.proteinProgress,

    statusEl:
      els.proteinStatusText,

    mascotEl:
      els.proteinMascot,

    bubbleEl:
      els.proteinBubble,

    normalImage:
      "chicken.png",

    sadImage:
      "chicken-sad.png"

  });


  renderOneMacro({

    type:
      "fat",

    eaten:
      totals.fat,

    target:
      toNumber(
        targets.fat
      ),

    card:
      els.fatCard,

    eatenEl:
      els.fatEaten,

    leftEl:
      els.fatLeft,

    progressEl:
      els.fatProgress,

    statusEl:
      els.fatStatusText,

    mascotEl:
      els.fatMascot,

    bubbleEl:
      els.fatBubble,

    normalImage:
      "avocado.png",

    sadImage:
      "avocado-sad.png"

  });


  renderOneMacro({

    type:
      "carbs",

    eaten:
      totals.carbs,

    target:
      toNumber(
        targets.carbs
      ),

    card:
      els.carbsCard,

    eatenEl:
      els.carbsEaten,

    leftEl:
      els.carbsLeft,

    progressEl:
      els.carbsProgress,

    statusEl:
      els.carbsStatusText,

    mascotEl:
      els.carbsMascot,

    bubbleEl:
      els.carbsBubble,

    normalImage:
      "pasta.png",

    sadImage:
      "pasta-sad.png"

  });


  els.kcalEaten.textContent =
    `${formatNumber(totals.kcal)} ккал`;

}



/* =========================================================
   ОДНА КАРТОЧКА БЖУ
========================================================= */

function renderOneMacro(
  config
) {

  const {

    type,
    eaten,
    target,
    card,
    eatenEl,
    leftEl,
    progressEl,
    statusEl,
    mascotEl,
    bubbleEl,
    normalImage,
    sadImage

  } =
    config;


  eatenEl.textContent =
    `${formatNumber(eaten)} г`;


  /*
    Если цель пока не задана,
    персонаж остаётся грустным.

    Таким образом сайт никогда
    не показывает сначала счастливого
    персонажа, который потом резко
    меняется на грустного.
  */

  if (
    target <= 0
  ) {

    statusEl.textContent =
      "цель не задана";


    leftEl.textContent =
      "";


    progressEl.style.width =
      "0%";


    card.classList.remove(
      "goal-near",
      "goal-over"
    );


    mascotEl.src =
      sadImage;


    bubbleEl.hidden =
      true;


    bubbleEl.textContent =
      "";


    bubbleEl.className =
      "mascot-bubble";


    return;

  }


  const state =
    getMacroMood(
      type,
      eaten,
      target
    );


  const diff =
    round1(
      Math.abs(
        target -
        eaten
      )
    );


  const percent =
    Math.max(
      0,
      Math.min(
        (
          eaten /
          target
        ) *
        100,
        100
      )
    );


  if (
    eaten <= target
  ) {

    statusEl.textContent =
      "осталось";


    leftEl.textContent =
      `${formatNumber(diff)} г`;

  }


  else {

    statusEl.textContent =
      "превысила на";


    leftEl.textContent =
      `${formatNumber(diff)} г`;

  }


  progressEl.style.width =
    `${percent}%`;


  card.classList.remove(
    "goal-near",
    "goal-over"
  );


  if (
    state.cardState ===
    "near"
  ) {

    card.classList.add(
      "goal-near"
    );

  }


  if (
    state.cardState ===
    "over"
  ) {

    card.classList.add(
      "goal-over"
    );

  }


  mascotEl.src =
    state.sad
      ? sadImage
      : normalImage;


  if (
    state.bubbleText
  ) {

    bubbleEl.hidden =
      false;


    bubbleEl.textContent =
      state.bubbleText;


    bubbleEl.className =
      `mascot-bubble ${state.bubbleType}`;

  }


  else {

    bubbleEl.hidden =
      true;


    bubbleEl.textContent =
      "";


    bubbleEl.className =
      "mascot-bubble";

  }

}



/* =========================================================
   НАСТРОЕНИЕ ПЕРСОНАЖЕЙ
========================================================= */

function getMacroMood(
  type,
  eaten,
  target
) {

  if (
    target <= 0
  ) {

    return {

      sad:
        true,

      bubbleText:
        "",

      bubbleType:
        "",

      cardState:
        ""

    };

  }


  const ratio =
    eaten /
    target;


  /*
    БЕЛКИ

    меньше 95%:
    грустная курочка

    95% и выше:
    счастливая курочка

    ПРИ ПРЕВЫШЕНИИ:
    карточка всё равно остаётся зелёной.
  */

  if (
    type ===
    "protein"
  ) {

    if (
      ratio <
      0.95
    ) {

      return {

        sad:
          true,

        bubbleText:
          "Скушай белок 💛",

        bubbleType:
          "sad-low",

        cardState:
          ""

      };

    }


    return {

      sad:
        false,

      bubbleText:
        "",

      bubbleType:
        "",

      /*
        Важно:
        зелёная карточка остаётся
        и после превышения 100%.
      */

      cardState:
        "near"

    };

  }


  /*
    ЖИРЫ

    меньше 95%:
    грустный авокадо

    95–100%:
    счастливый

    больше 100%:
    снова грустный + красная карточка
  */

  if (
    type ===
    "fat"
  ) {

    if (
      ratio <
      0.95
    ) {

      return {

        sad:
          true,

        bubbleText:
          "Скушай жиры 🥑",

        bubbleType:
          "sad-low",

        cardState:
          ""

      };

    }


    if (
      ratio >
      1
    ) {

      return {

        sad:
          true,

        bubbleText:
          "Ой... ты скушала слишком много жиров 💔",

        bubbleType:
          "sad-over",

        cardState:
          "over"

      };

    }


    return {

      sad:
        false,

      bubbleText:
        "",

      bubbleType:
        "",

      cardState:
        "near"

    };

  }


  /*
    УГЛЕВОДЫ

    меньше 95%:
    грустные макароны

    95–100%:
    счастливые

    больше 100%:
    снова грустные + красная карточка
  */

  if (
    type ===
    "carbs"
  ) {

    if (
      ratio <
      0.95
    ) {

      return {

        sad:
          true,

        bubbleText:
          "Скушай углеводы 🍝",

        bubbleType:
          "sad-low",

        cardState:
          ""

      };

    }


    if (
      ratio >
      1
    ) {

      return {

        sad:
          true,

        bubbleText:
          "Ой... ты скушала слишком много углеводов 💔",

        bubbleType:
          "sad-over",

        cardState:
          "over"

      };

    }


    return {

      sad:
        false,

      bubbleText:
        "",

      bubbleType:
        "",

      cardState:
        "near"

    };

  }


  return {

    sad:
      false,

    bubbleText:
      "",

    bubbleType:
      "",

    cardState:
      ""

  };

}



/* =========================================================
   ЗАПИСИ
========================================================= */

function renderEntries() {

  const day =
    getDay(
      currentDay
    );


  const entries =
    day.entries ||
    [];


  if (
    !entries.length
  ) {

    els.entriesList.innerHTML =
      `
        <div class="empty">
          Пока нет записей за этот день ✨
        </div>
      `;


    return;

  }


  els.entriesList.innerHTML =
    entries
      .map(
        entry => {

          return `

            <article class="entry">

              <div>

                <div class="entry-title">
                  ${escapeHtml(entry.name)}
                </div>

                <div class="entry-meta">
                  ${formatNumber(entry.amount)} г
                </div>

                <div class="entry-macros">

                  Белки ${formatNumber(entry.protein)} г /
                  Жиры ${formatNumber(entry.fat)} г /
                  Углеводы ${formatNumber(entry.carbs)} г

                </div>

                ${
                  entry.countProtein ===
                  false

                    ? `
                      <div class="entry-note">
                        Белок этой записи не учитывается в дневной сумме
                      </div>
                    `

                    : ""
                }

              </div>


              <div class="entry-actions">

                <button
                  class="mini-btn edit-entry"
                  type="button"
                  data-id="${entry.id}"
                >
                  Редактировать
                </button>


                <button
                  class="mini-btn delete-entry"
                  type="button"
                  data-id="${entry.id}"
                >
                  Удалить
                </button>

              </div>

            </article>

          `;

        }
      )
      .join("");

}



/* =========================================================
   ИСТОРИЯ
========================================================= */

function renderHistory() {

  const keys =
    Object
      .keys(days)
      .sort(
        (a, b) =>
          b.localeCompare(a)
      );


  if (
    !keys.length
  ) {

    els.historyList.innerHTML =
      `
        <div class="empty">
          История пока пустая
        </div>
      `;


    return;

  }


  els.historyList.innerHTML =
    keys
      .map(
        key => {

          const day =
            getDay(
              key
            );


          const totals =
            getTotals(
              day
            );


          const count =
            day.entries.length;


          return `

            <article
              class="history-item"
              data-day="${key}"
            >

              <div>

                <div class="history-date">
                  ${formatDateRu(key)}
                </div>

                <div class="history-meta">

                  ${count} записей ·
                  Б ${formatNumber(totals.protein)} /
                  Ж ${formatNumber(totals.fat)} /
                  У ${formatNumber(totals.carbs)} ·
                  ${formatNumber(totals.kcal)} ккал

                </div>

              </div>


              <button
                class="mini-btn"
                type="button"
                data-go-day="${key}"
              >
                Открыть
              </button>

            </article>

          `;

        }
      )
      .join("");


  els.historyList
    .querySelectorAll(
      "[data-go-day]"
    )
    .forEach(
      btn => {

        btn.addEventListener(
          "click",
          () => {

            currentDay =
              btn.dataset.goDay;


            ensureDay(
              currentDay
            );


            renderAll();

          }
        );

      }
    );

}



/* =========================================================
   PRODUCTS EDITOR
========================================================= */

function renderProductsEditor() {

  if (
    !products.length
  ) {

    els.productEditor.innerHTML =
      `
        <div class="empty">
          Пока нет продуктов
        </div>
      `;


    return;

  }


  els.productEditor.innerHTML =
    products
      .map(
        product => {

          return `

            <div
              class="product-row"
              data-id="${product.id}"
            >

              <label>

                Продукт

                <input
                  class="product-name"
                  type="text"
                  value="${escapeAttr(product.name)}"
                />

              </label>


              <label>

                Белки

                <input
                  class="product-protein"
                  type="number"
                  min="0"
                  step="0.1"
                  value="${valueOrZero(product.protein)}"
                />

              </label>


              <label>

                Жиры

                <input
                  class="product-fat"
                  type="number"
                  min="0"
                  step="0.1"
                  value="${valueOrZero(product.fat)}"
                />

              </label>


              <label>

                Углеводы

                <input
                  class="product-carbs"
                  type="number"
                  min="0"
                  step="0.1"
                  value="${valueOrZero(product.carbs)}"
                />

              </label>


              <label class="product-protein-toggle">

                <span>
                  Считать белок
                </span>

                <input
                  class="product-count-protein"
                  type="checkbox"
                  ${
                    product.countProtein !==
                    false
                      ? "checked"
                      : ""
                  }
                />

              </label>


              <button
                class="remove-product"
                type="button"
                data-id="${product.id}"
              >
                Удалить
              </button>

            </div>

          `;

        }
      )
      .join("");

}



function saveProductsFromEditor() {

  const rows =
    [
      ...els.productEditor
        .querySelectorAll(
          ".product-row"
        )
    ];


  const updated =
    rows
      .map(
        row => ({

          id:
            row.dataset.id ||
            uid(),

          name:
            row
              .querySelector(
                ".product-name"
              )
              ?.value
              .trim() ||
            "",

          protein:
            toNumber(
              row
                .querySelector(
                  ".product-protein"
                )
                ?.value
            ),

          fat:
            toNumber(
              row
                .querySelector(
                  ".product-fat"
                )
                ?.value
            ),

          carbs:
            toNumber(
              row
                .querySelector(
                  ".product-carbs"
                )
                ?.value
            ),

          countProtein:
            !!row
              .querySelector(
                ".product-count-protein"
              )
              ?.checked

        })
      )
      .filter(
        p =>
          p.name
      );


  products =
    updated.length
      ? updated
      : structuredClone(
          defaultProducts
        );


  saveProducts();

  populateManualProducts();


  els.settingsDialog
    .close();


  renderAll();

}



/* =========================================================
   MANUAL ADD
========================================================= */

function populateManualProducts() {

  els.manualProduct.innerHTML =
    products
      .slice()
      .sort(
        (a, b) =>
          a.name.localeCompare(
            b.name,
            "ru"
          )
      )
      .map(
        product => {

          return `
            <option value="${product.id}">
              ${escapeHtml(product.name)}
            </option>
          `;

        }
      )
      .join("");

}



function addEntryFromProduct(
  product,
  amount
) {

  const factor =
    amount /
    100;


  const entry = {

    id:
      uid(),

    productId:
      product.id,

    name:
      product.name,

    amount:
      round1(
        amount
      ),

    protein:
      round1(
        product.protein *
        factor
      ),

    fat:
      round1(
        product.fat *
        factor
      ),

    carbs:
      round1(
        product.carbs *
        factor
      ),

    countProtein:
      product.countProtein !==
      false

  };


  getDay(
    currentDay
  )
  .entries
  .unshift(
    entry
  );


  saveDays();

  renderAll();

}



/* =========================================================
   ENTRY EDIT
========================================================= */

function openEditEntry(
  entryId
) {

  const day =
    getDay(
      currentDay
    );


  const entry =
    day.entries.find(
      item =>
        item.id ===
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
    `Количество: ${formatNumber(entry.amount)} г`;


  els.editEntryProtein.value =
    valueOrZero(
      entry.protein
    );


  els.editEntryFat.value =
    valueOrZero(
      entry.fat
    );


  els.editEntryCarbs.value =
    valueOrZero(
      entry.carbs
    );


  els.editEntryCountProtein.checked =
    entry.countProtein !==
    false;


  els.entryEditDialog
    .showModal();

}



function saveEditedEntry() {

  if (
    !editingEntryId
  ) {

    return;

  }


  const day =
    getDay(
      currentDay
    );


  const entry =
    day.entries.find(
      item =>
        item.id ===
        editingEntryId
    );


  if (
    !entry
  ) {

    return;

  }


  entry.protein =
    round1(
      toNumber(
        els.editEntryProtein.value
      )
    );


  entry.fat =
    round1(
      toNumber(
        els.editEntryFat.value
      )
    );


  entry.carbs =
    round1(
      toNumber(
        els.editEntryCarbs.value
      )
    );


  entry.countProtein =
    !!els.editEntryCountProtein.checked;


  saveDays();

  renderAll();


  els.entryEditDialog
    .close();


  editingEntryId =
    null;

}



function deleteEntry(
  entryId
) {

  const day =
    getDay(
      currentDay
    );


  day.entries =
    day.entries.filter(
      entry =>
        entry.id !==
        entryId
    );


  saveDays();

  renderAll();

}



/* =========================================================
   TARGETS
========================================================= */

function saveTargetsFromInputs() {

  const day =
    getDay(
      currentDay
    );


  day.targets.protein =
    toNumber(
      els.targetProtein.value
    );


  day.targets.fat =
    toNumber(
      els.targetFat.value
    );


  day.targets.carbs =
    toNumber(
      els.targetCarbs.value
    );


  saveDays();

  renderStats();

  renderHistory();

}



/* =========================================================
   TOTALS
========================================================= */

function getTotals(
  day
) {

  const totals = {

    protein:
      0,

    fat:
      0,

    carbs:
      0,

    kcal:
      0

  };


  day.entries.forEach(
    entry => {

      if (
        entry.countProtein !==
        false
      ) {

        totals.protein +=
          toNumber(
            entry.protein
          );

      }


      totals.fat +=
        toNumber(
          entry.fat
        );


      totals.carbs +=
        toNumber(
          entry.carbs
        );


      totals.kcal +=

        toNumber(
          entry.protein
        ) *
        4

        +

        toNumber(
          entry.fat
        ) *
        9

        +

        toNumber(
          entry.carbs
        ) *
        4;

    }
  );


  totals.protein =
    round1(
      totals.protein
    );


  totals.fat =
    round1(
      totals.fat
    );


  totals.carbs =
    round1(
      totals.carbs
    );


  totals.kcal =
    Math.round(
      totals.kcal
    );


  return totals;

}



/* =========================================================
   QUICK PARSE
========================================================= */

function parseQuickInput() {

  const text =
    els.quickInput.value
      .trim();


  if (
    !text
  ) {

    alert(
      "Сначала введи текст с продуктами."
    );

    return;

  }


  const normalized =
    text
      .replace(
        /\n/g,
        " "
      )
      .replace(
        /\s+/g,
        " "
      )
      .trim();


  const segments =
    normalized
      .split(
        /\s*(?:,| и )\s*/i
      )
      .map(
        part =>
          part.trim()
      )
      .filter(
        Boolean
      );


  let addedCount =
    0;


  segments.forEach(
    segment => {

      const lower =
        segment.toLowerCase();


      const product =
        [...products]
          .sort(
            (a, b) =>
              b.name.length -
              a.name.length
          )
          .find(
            p =>
              lower.includes(
                p.name.toLowerCase()
              )
          );


      if (
        !product
      ) {

        return;

      }


      const amountMatch =

        lower.match(
          /(\d+(?:[.,]\d+)?)\s*(?:грамм(?:а|ов)?|гр|г)\b/i
        )

        ||

        lower.match(
          /(\d+(?:[.,]\d+)?)/
        );


      const amount =
        amountMatch
          ? toNumber(
              amountMatch[1]
            )
          : 100;


      if (
        amount >
        0
      ) {

        addEntryFromProduct(
          product,
          amount
        );


        addedCount +=
          1;

      }

    }
  );


  if (
    !addedCount
  ) {

    alert(
      "Не получилось распознать продукты. Попробуй написать, например: 100 грамм риса и 120 грамм тунца."
    );

    return;

  }


  els.quickInput.value =
    "";

}



/* =========================================================
   VOICE
========================================================= */

function setupVoiceInput() {

  const SpeechRecognition =

    window.SpeechRecognition

    ||

    window.webkitSpeechRecognition;


  if (
    !SpeechRecognition
  ) {

    els.voiceBtn.disabled =
      true;


    els.voiceBtn.title =
      "В этом браузере голосовой ввод не поддерживается";


    return;

  }


  const recognition =
    new SpeechRecognition();


  recognition.lang =
    "ru-RU";


  recognition.interimResults =
    false;


  recognition.maxAlternatives =
    1;


  let listening =
    false;


  els.voiceBtn
    .addEventListener(
      "click",
      () => {

        if (
          listening
        ) {

          recognition.stop();

          return;

        }


        recognition.start();

      }
    );


  recognition
    .addEventListener(
      "start",
      () => {

        listening =
          true;


        els.voiceBtn
          .classList
          .add(
            "listening"
          );


        els.voiceStatus.hidden =
          false;


        els.voiceStatus.textContent =
          "Слушаю...";

      }
    );


  recognition
    .addEventListener(
      "result",
      event => {

        const transcript =
          event
            .results
            ?.[0]
            ?.[0]
            ?.transcript
            ?.trim()
          ||
          "";


        if (
          transcript
        ) {

          els.quickInput.value =
            transcript;


          els.voiceStatus.textContent =
            `Распознано: ${transcript}`;

        }

      }
    );


  recognition
    .addEventListener(
      "end",
      () => {

        listening =
          false;


        els.voiceBtn
          .classList
          .remove(
            "listening"
          );

      }
    );


  recognition
    .addEventListener(
      "error",
      () => {

        listening =
          false;


        els.voiceBtn
          .classList
          .remove(
            "listening"
          );


        els.voiceStatus.hidden =
          false;


        els.voiceStatus.textContent =
          "Не удалось распознать речь. Попробуй ещё раз.";

      }
    );

}



/* =========================================================
   HELPERS
========================================================= */

function uid() {

  return Math
    .random()
    .toString(36)
    .slice(
      2,
      11
    );

}



function todayIso() {

  const now =
    new Date();


  const y =
    now.getFullYear();


  const m =
    String(
      now.getMonth() +
      1
    )
    .padStart(
      2,
      "0"
    );


  const d =
    String(
      now.getDate()
    )
    .padStart(
      2,
      "0"
    );


  return `${y}-${m}-${d}`;

}



function shiftDay(
  iso,
  amount
) {

  const [
    y,
    m,
    d
  ] =
    iso
      .split("-")
      .map(
        Number
      );


  const date =
    new Date(
      y,
      m - 1,
      d
    );


  date.setDate(
    date.getDate() +
    amount
  );


  const ny =
    date.getFullYear();


  const nm =
    String(
      date.getMonth() +
      1
    )
    .padStart(
      2,
      "0"
    );


  const nd =
    String(
      date.getDate()
    )
    .padStart(
      2,
      "0"
    );


  return `${ny}-${nm}-${nd}`;

}



function formatDateRu(
  iso
) {

  const [
    y,
    m,
    d
  ] =
    iso.split("-");


  return `${d}.${m}.${y}`;

}



function toNumber(
  value
) {

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {

    return 0;

  }


  const normalized =
    String(value)
      .replace(
        ",",
        "."
      )
      .trim();


  const num =
    Number(
      normalized
    );


  return Number.isFinite(
    num
  )
    ? num
    : 0;

}



function round1(
  value
) {

  return (
    Math.round(
      (
        toNumber(value) +
        Number.EPSILON
      ) *
      10
    )
    /
    10
  );

}



function formatNumber(
  value
) {

  const num =
    round1(
      value
    );


  return Number.isInteger(
    num
  )
    ? String(num)
    : num
        .toFixed(1)
        .replace(
          ".",
          ","
        );

}



function valueOrEmpty(
  value
) {

  return toNumber(
    value
  )
    ? value
    : "";

}



function valueOrZero(
  value
) {

  return toNumber(
    value
  );

}



function escapeHtml(
  str
) {

  return String(str)

    .replaceAll(
      "&",
      "&amp;"
    )

    .replaceAll(
      "<",
      "&lt;"
    )

    .replaceAll(
      ">",
      "&gt;"
    )

    .replaceAll(
      '"',
      "&quot;"
    );

}



function escapeAttr(
  str
) {

  return escapeHtml(
    str
  );

}

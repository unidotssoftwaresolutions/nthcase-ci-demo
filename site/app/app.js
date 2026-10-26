// NthCase Demo, the web twin of GuruAI's android-demo-app: the same shop, screens, texts, ids and labels.
// Everything lives in memory: a page load starts signed out with an empty cart, and nothing reaches the network.
"use strict";

const DEMO_EMAIL = "demo@nthcase.com";
const DEMO_PASSWORD = "demo1234";
const MAX_QUANTITY = 10;
// Material's Snackbar.LENGTH_LONG, as on Android.
const SNACKBAR_MS = 2750;

// The shop's products, in the Android app's order (Catalog.java).
const PRODUCTS = [
  { slug: "mug", name: "Morning Mug", cents: 1400,
    description: "A sturdy stoneware mug that holds a generous 350 ml. Glazed in warm terracotta and safe for the dishwasher." },
  { slug: "notebook", name: "Grid Notebook", cents: 950,
    description: "A5 notebook with 120 dotted-grid pages, a lay-flat binding and an elastic band to keep it closed." },
  { slug: "plant", name: "Desk Plant", cents: 1800,
    description: "An easy-going leafy plant in a clay pot. Happy on a desk, a shelf or a sunny window sill." },
  { slug: "candle", name: "Cedar Candle", cents: 1600,
    description: "A hand-poured candle in an amber jar with a soft cedar scent. Burns for about 40 hours." },
  { slug: "tote", name: "Canvas Tote", cents: 2200,
    description: "A roomy cotton canvas bag with long handles and a striped band. Folds flat when you don't need it." },
  { slug: "bottle", name: "Steel Bottle", cents: 2400,
    description: "A double-walled steel bottle that keeps drinks cold for a day and hot for half of one. Holds 500 ml." },
  { slug: "clock", name: "Wall Clock", cents: 3500,
    description: "A quiet wall clock with a clean white face and a silent movement that never ticks." },
  { slug: "lamp", name: "Desk Lamp", cents: 4200,
    description: "A small lamp with a fabric shade and a weighted base. Gives a warm light for reading." },
  { slug: "sunglasses", name: "Sunglasses", cents: 2800,
    description: "Classic sunglasses with dark lenses that block UV light. Comes with a soft case." },
  { slug: "umbrella", name: "Rain Umbrella", cents: 1900,
    description: "A bright umbrella with a curved handle that opens wide enough for two." },
];

// The pictures and icons: each path is the Android drawable's own pathData and colour (res/drawable/*.xml), with
// @color/art_bg_* and ?attr/color* read from CSS variables so they follow light and dark.
const ART = {
  art_mug: [
    '<path style="fill:var(--art-bg-mug)" d="M24,0h72a24,24 0,0 1,24 24v72a24,24 0,0 1,-24 24h-72a24,24 0,0 1,-24 -24v-72a24,24 0,0 1,24 -24z"/>',
    '<path style="fill:none;stroke:#9E9E9E;stroke-width:3;stroke-linecap:round;stroke-linejoin:round" d="M52,36 q-4,-5 0,-10 q4,-5 0,-10"/>',
    '<path style="fill:none;stroke:#9E9E9E;stroke-width:3;stroke-linecap:round;stroke-linejoin:round" d="M64,36 q-4,-5 0,-10 q4,-5 0,-10"/>',
    '<path style="fill:none;stroke:#C9634A;stroke-width:7;stroke-linecap:round;stroke-linejoin:round" d="M82,54 h4 a10,10 0,0 1,0 20 h-4"/>',
    '<path style="fill:#E07A5F" d="M34,46 h48 v30 a14,14 0,0 1,-14 14 h-20 a14,14 0,0 1,-14 -14 z"/>',
    '<path style="fill:#C9634A" d="M34,46 h48 v6 h-48 z"/>',
    '<path style="fill:#8D6E63" d="M26,92 h64 a4,4 0,0 1,0 8 h-64 a4,4 0,0 1,0 -8 z"/>',
  ],
  art_notebook: [
    '<path style="fill:var(--art-bg-notebook)" d="M24,0h72a24,24 0,0 1,24 24v72a24,24 0,0 1,-24 24h-72a24,24 0,0 1,-24 -24v-72a24,24 0,0 1,24 -24z"/>',
    '<path style="fill:#3D5A80" d="M36,22 h48 a6,6 0,0 1,6 6 v64 a6,6 0,0 1,-6 6 h-48 z"/>',
    '<path style="fill:#293F5C" d="M36,22 h10 v76 h-10 z"/>',
    '<path style="fill:#E0FBFC" d="M56,38 h22 v14 h-22 z"/>',
    '<path style="fill:#98C1D9" d="M59,43 h16 v2 h-16 z"/>',
    '<path style="fill:#EE6C4D" d="M76,22 h4 v76 h-4 z"/>',
  ],
  art_plant: [
    '<path style="fill:var(--art-bg-plant)" d="M24,0h72a24,24 0,0 1,24 24v72a24,24 0,0 1,-24 24h-72a24,24 0,0 1,-24 -24v-72a24,24 0,0 1,24 -24z"/>',
    '<path style="fill:#2E7D32" d="M60,72 C38,64 34,42 42,28 C56,36 64,54 60,72 z"/>',
    '<path style="fill:#43A047" d="M60,72 C82,64 86,42 78,28 C64,36 56,54 60,72 z"/>',
    '<path style="fill:#66BB6A" d="M60,72 C52,54 54,34 60,20 C66,34 68,54 60,72 z"/>',
    '<path style="fill:#D9825B" d="M40,72 h40 l-5,24 a4,4 0,0 1,-4 3 h-22 a4,4 0,0 1,-4 -3 z"/>',
    '<path style="fill:#C46F48" d="M36,66 h48 v9 h-48 z"/>',
  ],
  art_candle: [
    '<path style="fill:var(--art-bg-candle)" d="M24,0h72a24,24 0,0 1,24 24v72a24,24 0,0 1,-24 24h-72a24,24 0,0 1,-24 -24v-72a24,24 0,0 1,24 -24z"/>',
    '<path style="fill:#FFB300" d="M60,20 C66,28 68,34 64,38 C62,40 58,40 56,38 C52,34 54,28 60,20 z"/>',
    '<path style="fill:#FFF3C4" d="M60,28 C63,32 63,35 61,37 C60,38 59,38 58,37 C57,35 57,32 60,28 z"/>',
    '<path style="fill:#3E2723" d="M59,38 h2 v12 h-2 z"/>',
    '<path style="fill:#C08552" d="M38,50 h44 v40 a6,6 0,0 1,-6 6 h-32 a6,6 0,0 1,-6 -6 z"/>',
    '<path style="fill:#F2E8CF" d="M38,50 h44 v8 h-44 z"/>',
    '<path style="fill:#F2E8CF" d="M46,66 h28 v16 h-28 z"/>',
    '<path style="fill:#C08552" d="M52,72 h16 v3 h-16 z"/>',
  ],
  art_tote: [
    '<path style="fill:var(--art-bg-tote)" d="M24,0h72a24,24 0,0 1,24 24v72a24,24 0,0 1,-24 24h-72a24,24 0,0 1,-24 -24v-72a24,24 0,0 1,24 -24z"/>',
    '<path style="fill:none;stroke:#8D6E63;stroke-width:5;stroke-linecap:round;stroke-linejoin:round" d="M48,46 V36 a12,12 0,0 1,24 0 V46"/>',
    '<path style="fill:#E9D8A6" d="M34,44 h52 l4,48 a4,4 0,0 1,-4 4 h-52 a4,4 0,0 1,-4 -4 z"/>',
    '<path style="fill:#005F73" d="M32.3,64 L87.7,64 L88.3,72 L31.7,72 z"/>',
  ],
  art_bottle: [
    '<path style="fill:var(--art-bg-bottle)" d="M24,0h72a24,24 0,0 1,24 24v72a24,24 0,0 1,-24 24h-72a24,24 0,0 1,-24 -24v-72a24,24 0,0 1,24 -24z"/>',
    '<path style="fill:#37474F" d="M52,16 h16 a3,3 0,0 1,3 3 v11 h-22 v-11 a3,3 0,0 1,3 -3 z"/>',
    '<path style="fill:#78909C" d="M50,30 h20 l6,10 h-32 z"/>',
    '<path style="fill:#4DB6AC" d="M44,40 h32 v54 a6,6 0,0 1,-6 6 h-20 a6,6 0,0 1,-6 -6 z"/>',
    '<path style="fill:#80CBC4" d="M50,46 h4 v46 h-4 z"/>',
  ],
  art_clock: [
    '<path style="fill:var(--art-bg-clock)" d="M24,0h72a24,24 0,0 1,24 24v72a24,24 0,0 1,-24 24h-72a24,24 0,0 1,-24 -24v-72a24,24 0,0 1,24 -24z"/>',
    '<path style="fill:#5E548E" d="M60,22 a38,38 0,1 1,0 76 a38,38 0,1 1,0 -76 z"/>',
    '<path style="fill:#FFFFFF" d="M60,29 a31,31 0,1 1,0 62 a31,31 0,1 1,0 -62 z"/>',
    '<path style="fill:#9F86C0" d="M59,33 h2 v6 h-2 z M59,81 h2 v6 h-2 z M33,59 h6 v2 h-6 z M81,59 h6 v2 h-6 z"/>',
    '<path style="fill:#231942" d="M58.5,40 h3 v20 h-3 z"/>',
    '<path style="fill:#231942" d="M60,58.5 h18 v3 h-18 z"/>',
    '<path style="fill:#E63946" d="M60,56 a4,4 0,1 1,0 8 a4,4 0,1 1,0 -8 z"/>',
  ],
  art_lamp: [
    '<path style="fill:var(--art-bg-lamp)" d="M24,0h72a24,24 0,0 1,24 24v72a24,24 0,0 1,-24 24h-72a24,24 0,0 1,-24 -24v-72a24,24 0,0 1,24 -24z"/>',
    '<path style="fill:#FFF8E1;fill-opacity:0.6" d="M38,54 h44 l10,16 h-64 z"/>',
    '<path style="fill:#3D405B" d="M58,50 h4 v42 h-4 z"/>',
    '<path style="fill:#3D405B" d="M36,92 h48 a4,4 0,0 1,0 8 h-48 a4,4 0,0 1,0 -8 z"/>',
    '<path style="fill:#F2CC8F" d="M44,26 h32 l10,28 h-52 z"/>',
    '<path style="fill:#E07A5F" d="M36.1,48 L83.9,48 L86,54 L34,54 z"/>',
  ],
  art_sunglasses: [
    '<path style="fill:var(--art-bg-sunglasses)" d="M24,0h72a24,24 0,0 1,24 24v72a24,24 0,0 1,-24 24h-72a24,24 0,0 1,-24 -24v-72a24,24 0,0 1,24 -24z"/>',
    '<path style="fill:none;stroke:#1D3557;stroke-width:4;stroke-linecap:round;stroke-linejoin:round" d="M54,54 q6,-6 12,0"/>',
    '<path style="fill:none;stroke:#1D3557;stroke-width:4;stroke-linecap:round;stroke-linejoin:round" d="M22,54 h-8"/>',
    '<path style="fill:none;stroke:#1D3557;stroke-width:4;stroke-linecap:round;stroke-linejoin:round" d="M98,54 h8"/>',
    '<path style="fill:#1D3557" d="M26,50 h26 a4,4 0,0 1,4 4 v8 a14,14 0,0 1,-14 14 h-6 a14,14 0,0 1,-14 -14 v-8 a4,4 0,0 1,4 -4 z"/>',
    '<path style="fill:#1D3557" d="M94,50 h-26 a4,4 0,0 0,-4 4 v8 a14,14 0,0 0,14 14 h6 a14,14 0,0 0,14 -14 v-8 a4,4 0,0 0,-4 -4 z"/>',
    '<path style="fill:#FFFFFF;fill-opacity:0.35" d="M32,55 h5 l-7,12 h-3 z"/>',
    '<path style="fill:#FFFFFF;fill-opacity:0.35" d="M74,55 h5 l-7,12 h-3 z"/>',
  ],
  art_umbrella: [
    '<path style="fill:var(--art-bg-umbrella)" d="M24,0h72a24,24 0,0 1,24 24v72a24,24 0,0 1,-24 24h-72a24,24 0,0 1,-24 -24v-72a24,24 0,0 1,24 -24z"/>',
    '<path style="fill:#1D3557" d="M59,20 h2 v9 h-2 z"/>',
    '<path style="fill:#E63946" d="M24,64 a36,36 0,0 1,72 0 z"/>',
    '<path style="fill:#FF6B6B" d="M60,28 C52,40 50,52 48,64 h24 C70,52 68,40 60,28 z"/>',
    '<path style="fill:#1D3557" d="M59,64 h2 v24 h-2 z"/>',
    '<path style="fill:none;stroke:#1D3557;stroke-width:3;stroke-linecap:round;stroke-linejoin:round" d="M60,86 v6 a6,6 0,0 1,-12 0"/>',
  ],
  art_empty_cart: [
    '<path style="fill:var(--surface-container-high)" d="M60,4a56,56 0,1 1,0 112a56,56 0,1 1,0 -112z"/>',
    '<path style="fill:none;stroke:var(--primary);stroke-width:5;stroke-linecap:round" d="M48,46 V40 a12,12 0,0 1,24 0 V46"/>',
    '<path style="fill:var(--primary-container)" d="M34,46 h52 l-4,40 a6,6 0,0 1,-6 5 h-32 a6,6 0,0 1,-6 -5 z"/>',
    '<path style="fill:none;stroke:var(--primary);stroke-width:3;stroke-linecap:round" d="M50,66 h20"/>',
  ],
  art_order_placed: [
    '<path style="fill:var(--primary-container)" d="M60,4a56,56 0,1 1,0 112a56,56 0,1 1,0 -112z"/>',
    '<path style="fill:var(--primary)" d="M60,22a38,38 0,1 1,0 76a38,38 0,1 1,0 -76z"/>',
    '<path style="fill:none;stroke:var(--on-primary);stroke-width:8;stroke-linecap:round;stroke-linejoin:round" d="M44,61 l11,11 l22,-24"/>',
  ],
  ic_bag: [
    '<path style="fill:currentColor;fill-rule:evenodd" d="M4,8h16l-1.6,10.4a2,2 0,0 1,-2 1.6H7.6a2,2 0,0 1,-2 -1.6zM8,8V7a4,4 0,0 1,8 0v1h-2V7a2,2 0,0 0,-4 0v1z"/>',
  ],
  ic_sign_out: [
    '<path style="fill:currentColor;fill-rule:evenodd" d="M4,4h9v2H6v12h7v2H4zM15.6,7.4l1.4,-1.4l6,6l-6,6l-1.4,-1.4l3.6,-3.6H9v-2h10.2z"/>',
  ],
  ic_search: [
    '<path style="fill:currentColor;fill-rule:evenodd" d="M10,3a7,7 0,1 0,0 14a7,7 0,1 0,0 -14zM10,5a5,5 0,1 1,0 10a5,5 0,1 1,0 -10zM14.6,16l1.4,-1.4l5.4,5.4l-1.4,1.4z"/>',
  ],
  ic_add: [
    '<path style="fill:currentColor;fill-rule:evenodd" d="M11,5h2v6h6v2h-6v6h-2v-6H5v-2h6z"/>',
  ],
  ic_remove: [
    '<path style="fill:currentColor;fill-rule:evenodd" d="M5,11h14v2H5z"/>',
  ],
  // Material Components' own icons, which the Android app gets from the library rather than its res/ folder.
  arrow_back: ['<path style="fill:currentColor" d="M20,11H7.83l5.59,-5.59L12,4l-8,8 8,8 1.41,-1.41L7.83,13H20v-2z"/>'],
  visibility: ['<path style="fill:currentColor" d="M12,4.5C7,4.5 2.73,7.61 1,12c1.73,4.39 6,7.5 11,7.5s9.27,-3.11 11,-7.5c-1.73,-4.39 -6,-7.5 -11,-7.5zM12,17c-2.76,0 -5,-2.24 -5,-5s2.24,-5 5,-5 5,2.24 5,5 -2.24,5 -5,5zM12,9c-1.66,0 -3,1.34 -3,3s1.34,3 3,3 3,-1.34 3,-3 -1.34,-3 -3,-3z"/>'],
  visibility_off: ['<path style="fill:currentColor" d="M12,7c2.76,0 5,2.24 5,5 0,0.65 -0.13,1.26 -0.36,1.83l2.92,2.92c1.51,-1.26 2.7,-2.89 3.43,-4.75 -1.73,-4.39 -6,-7.5 -11,-7.5 -1.4,0 -2.74,0.25 -3.98,0.7l2.16,2.16C10.74,7.13 11.35,7 12,7zM2,4.27l2.28,2.28 0.46,0.46C3.08,8.3 1.78,10.02 1,12c1.73,4.39 6,7.5 11,7.5 1.55,0 3.03,-0.3 4.38,-0.84l0.42,0.42L19.73,22 21,20.73 3.27,3 2,4.27zM7.53,9.8l1.55,1.55c-0.05,0.21 -0.08,0.43 -0.08,0.65 0,1.66 1.34,3 3,3 0.22,0 0.44,-0.03 0.65,-0.08l1.55,1.55c-0.67,0.33 -1.41,0.53 -2.2,0.53 -2.76,0 -5,-2.24 -5,-5 0,-0.79 0.2,-1.53 0.53,-2.2zM11.84,9.02l3.15,3.15 0.02,-0.16c0,-1.66 -1.34,-3 -3,-3l-0.17,0.01z"/>'],
  cancel: ['<path style="fill:currentColor" d="M12,2C6.47,2 2,6.47 2,12s4.47,10 10,10 10,-4.47 10,-10S17.53,2 12,2zM17,15.59L15.59,17 12,13.41 8.41,17 7,15.59 10.59,12 7,8.41 8.41,7 12,10.59 15.59,7 17,8.41 13.41,12 17,15.59z"/>'],
};

// ---- Session: who is signed in and what is in the cart (Session.java) ----

const session = {
  signedIn: false,
  // slug → quantity, in the order the products were first added
  lines: new Map(),

  // The e-mail ignores case and surrounding spaces; the password must match exactly.
  signIn(email, password) {
    this.signedIn = email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD;
    return this.signedIn;
  },
  reset() {
    this.signedIn = false;
    this.lines.clear();
  },
  add(slug, quantity) {
    this.setQuantity(slug, (this.lines.get(slug) || 0) + quantity);
  },
  // Capped at MAX_QUANTITY; zero or less removes the line.
  setQuantity(slug, quantity) {
    if (quantity <= 0) this.lines.delete(slug);
    else this.lines.set(slug, Math.min(quantity, MAX_QUANTITY));
  },
  itemCount() {
    let count = 0;
    for (const quantity of this.lines.values()) count += quantity;
    return count;
  },
  totalCents() {
    let total = 0;
    for (const [slug, quantity] of this.lines) total += find(slug).cents * quantity;
    return total;
  },
};

function find(slug) {
  return PRODUCTS.find((product) => product.slug === slug) || null;
}

// The products whose name contains the query, ignoring case; every product for a blank query.
function matching(query) {
  const needle = query.trim().toLowerCase();
  return needle ? PRODUCTS.filter((product) => product.name.toLowerCase().includes(needle)) : PRODUCTS;
}

// "$14.00", the same in every language.
function money(cents) {
  return `$${Math.floor(cents / 100)}.${String(cents % 100).padStart(2, "0")}`;
}

// ---- Drawing ----

function draw(svg, name) {
  svg.innerHTML = ART[name].join("");
}

function art(name, className, dataId) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 120 120");
  svg.setAttribute("class", className);
  svg.setAttribute("aria-hidden", "true");
  if (dataId) svg.dataset.id = dataId;
  draw(svg, name);
  return svg;
}

function icon(name) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  draw(svg, name);
  return svg;
}

function el(tag, attributes, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    if (key === "dataId") node.dataset.id = value;
    else node.setAttribute(key, value);
  }
  node.append(...children);
  return node;
}

function fillPlaceholders(root) {
  for (const svg of root.querySelectorAll("svg[data-icon]")) draw(svg, svg.dataset.icon);
  for (const svg of root.querySelectorAll("svg[data-art]")) draw(svg, svg.dataset.art);
}

// ---- Navigation ----
// The hash picks the screen. Each history entry remembers how far above the products screen it sits (its depth),
// so "back to products" can return there through history, the way Android closes the screens above it.

const LOAD = Math.random().toString(36).slice(2);
let entryCount = 0;
let shownDepth = 0;
let afterReturn = null;
const detailQuantities = new Map(); // history entry → the quantity its detail screen showed

const screenHost = document.getElementById("screen");
const toolbar = document.querySelector(".toolbar");
const backButton = toolbar.querySelector(".nav-back");
const toolbarTitle = toolbar.querySelector(".toolbar-title");
const cartAction = document.getElementById("cart_action");
const cartCount = document.getElementById("cart_count");
const signOutAction = document.getElementById("action_sign_out");
let snackbarTimer = 0;

function parse(hash) {
  if (hash === "#/signin") return { name: "signin" };
  if (hash === "#/products") return { name: "products" };
  if (hash === "#/cart") return { name: "cart" };
  if (hash === "#/order-placed") return { name: "order-placed" };
  const product = /^#\/product\/([a-z]+)$/.exec(hash);
  if (product) return { name: "detail", slug: product[1] };
  return null;
}

function entry() {
  let state = history.state;
  if (!state || state.load !== LOAD) {
    const route = parse(location.hash);
    const depth = !route || route.name === "products" || route.name === "signin" ? 0 : shownDepth + 1;
    state = { load: LOAD, key: ++entryCount, depth };
    history.replaceState(state, "");
  }
  return state;
}

function go(hash) {
  location.hash = hash;
}

function replace(hash) {
  location.replace(hash);
}

// Android's toolbar arrow: the system Back. With nothing of ours behind this screen, go to the products instead.
function back() {
  if (entry().depth > 0) history.back();
  else replace("#/products");
}

function backToProducts(then) {
  const depth = entry().depth;
  if (depth > 0) {
    afterReturn = then || null;
    history.go(-depth);
  } else if (then) {
    go(then);
  } else {
    replace("#/products");
  }
}

function render() {
  const route = parse(location.hash);
  if (!route) return replace(session.signedIn ? "#/products" : "#/signin");
  if (route.name !== "signin" && !session.signedIn) return replace("#/signin");
  const state = entry();
  if (route.name === "products" && afterReturn) {
    const next = afterReturn;
    afterReturn = null;
    shownDepth = state.depth;
    return go(next);
  }
  if (route.name === "detail" && !find(route.slug)) return replace("#/products");
  shownDepth = state.depth;
  clearTimeout(snackbarTimer);
  SCREENS[route.name](route, state);
  screenHost.scrollTop = 0;
}

function mount(templateId, toolbarSetup) {
  const content = document.getElementById(templateId).content.cloneNode(true);
  fillPlaceholders(content);
  screenHost.replaceChildren(content);
  toolbar.hidden = !toolbarSetup;
  if (toolbarSetup) {
    backButton.hidden = !toolbarSetup.back;
    toolbarTitle.textContent = toolbarSetup.title;
    cartAction.hidden = !toolbarSetup.cart;
    signOutAction.hidden = !toolbarSetup.signOut;
  }
  document.title = toolbarSetup ? `${toolbarSetup.title} · NthCase Demo` : "NthCase Demo";
  refreshCartCount();
}

function refreshCartCount() {
  const count = session.itemCount();
  cartCount.textContent = String(count);
  cartCount.hidden = count === 0;
}

function focusHeading(heading) {
  heading.setAttribute("tabindex", "-1");
  heading.focus({ preventScroll: true });
}

backButton.addEventListener("click", back);
cartAction.addEventListener("click", () => go("#/cart"));
// The sign-in screen ends the session when it opens (SignInActivity.onStart).
signOutAction.addEventListener("click", () => replace("#/signin"));

// ---- Screens ----

const SCREENS = {
  signin() {
    if (session.signedIn) session.reset();
    mount("screen-signin", null);
    document.title = "Sign in · NthCase Demo";
    const email = document.getElementById("email_input");
    const password = document.getElementById("password_input");
    const error = document.getElementById("sign_in_error");
    const toggle = screenHost.querySelector(".password-toggle");

    screenHost.querySelector("form").addEventListener("submit", (event) => {
      event.preventDefault();
      if (!session.signIn(email.value, password.value)) {
        error.hidden = false;
        return;
      }
      error.hidden = true;
      // Sign-in leaves no entry behind: Back on the products screen leaves the shop, as on Android.
      replace("#/products");
    });
    email.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      password.focus();
    });
    document.getElementById("use_demo_account").addEventListener("click", () => {
      email.value = DEMO_EMAIL;
      password.value = DEMO_PASSWORD;
      error.hidden = true;
    });
    toggle.addEventListener("click", () => {
      const show = password.type === "password";
      password.type = show ? "text" : "password";
      toggle.setAttribute("aria-pressed", String(show));
      draw(toggle.querySelector("svg"), show ? "visibility_off" : "visibility");
    });
    focusHeading(document.getElementById("app_title"));
  },

  products() {
    mount("screen-products", { title: "Fernwood Goods", cart: true, signOut: true });
    const search = document.getElementById("search_input");
    const clear = screenHost.querySelector(".clear-text");
    const list = document.getElementById("product_list");
    const empty = document.getElementById("products_empty");

    const show = () => {
      const matches = matching(search.value);
      list.replaceChildren(...matches.map(card));
      empty.hidden = matches.length > 0;
      clear.hidden = search.value === "";
    };
    search.addEventListener("input", show);
    search.addEventListener("keydown", (event) => {
      if (event.key === "Enter") search.blur();
    });
    clear.addEventListener("click", () => {
      search.value = "";
      show();
      search.focus();
    });
    show();
    focusHeading(toolbarTitle);
  },

  detail(route, state) {
    const product = find(route.slug);
    mount("screen-detail", { title: "Product details", back: true, cart: true });
    const picture = document.getElementById("detail_image");
    draw(picture, `art_${product.slug}`);
    picture.setAttribute("aria-label", `Picture of ${product.name}`);
    document.getElementById("detail_name").textContent = product.name;
    document.getElementById("detail_price").textContent = money(product.cents);
    document.getElementById("detail_description").textContent = product.description;

    const value = document.getElementById("qty_value");
    const decrease = document.getElementById("qty_decrease");
    const increase = document.getElementById("qty_increase");
    let quantity = 1;
    const showQuantity = (next) => {
      quantity = Math.max(1, Math.min(next, MAX_QUANTITY));
      detailQuantities.set(state.key, quantity);
      value.textContent = String(quantity);
      value.setAttribute("aria-label", `Quantity ${quantity}`);
      decrease.disabled = quantity <= 1;
      increase.disabled = quantity >= MAX_QUANTITY;
    };
    decrease.addEventListener("click", () => showQuantity(quantity - 1));
    increase.addEventListener("click", () => showQuantity(quantity + 1));
    showQuantity(detailQuantities.get(state.key) || 1);

    const host = screenHost.querySelector(".snackbar-host");
    document.getElementById("add_to_cart").addEventListener("click", () => {
      session.add(product.slug, quantity);
      refreshCartCount();
      showSnackbar(host);
    });
    focusHeading(toolbarTitle);
  },

  cart() {
    mount("screen-cart", { title: "Cart", back: true });
    document.getElementById("browse_products").addEventListener("click", () => backToProducts());
    document.getElementById("continue_shopping").addEventListener("click", () => backToProducts());
    document.getElementById("checkout_button").addEventListener("click", () => {
      session.lines.clear();
      // Only Order placed is left above the products, so Back from it lands there.
      backToProducts("#/order-placed");
    });
    renderCart();
    focusHeading(toolbarTitle);
  },

  "order-placed"() {
    mount("screen-order-placed", null);
    document.title = "Order placed · NthCase Demo";
    document.getElementById("back_to_products").addEventListener("click", () => backToProducts());
    focusHeading(document.getElementById("order_placed_title"));
  },
};

// One product card (ProductAdapter): the card carries its own id and label; its children share data-ids.
function card(product) {
  const price = money(product.cents);
  const button = el("button", {
    type: "button", id: `product_${product.slug}`, class: "product-card", "aria-label": `${product.name}, ${price}`,
  },
  art(`art_${product.slug}`, "art product-image", "product_image"),
  el("span", { dataId: "product_name", class: "title-medium product-name" }, product.name),
  el("span", { dataId: "product_price", class: "label-large primary-text" }, price));
  button.addEventListener("click", () => go(`#/product/${product.slug}`));
  return el("li", {}, button);
}

function renderCart() {
  const content = document.getElementById("cart_content");
  const empty = document.getElementById("cart_empty");
  const lines = document.getElementById("cart_lines");
  // Keep keyboard focus on the same control of the same line across the rebuild.
  const focused = document.activeElement;
  const focusLine = focused && focused.closest ? focused.closest(".cart-line") : null;
  const focusTarget = focusLine ? [focusLine.id, focused.dataset.id] : null;

  const isEmpty = session.itemCount() === 0;
  content.hidden = isEmpty;
  empty.hidden = !isEmpty;
  lines.replaceChildren();
  refreshCartCount();
  if (isEmpty) {
    if (focusTarget) document.getElementById("browse_products").focus();
    return;
  }
  for (const [slug, quantity] of session.lines) lines.append(line(find(slug), quantity));
  const total = money(session.totalCents());
  const totalView = document.getElementById("cart_total");
  totalView.textContent = total;
  totalView.setAttribute("aria-label", `Total ${total}`);

  if (focusTarget) {
    const row = document.getElementById(focusTarget[0]);
    const target = row && row.querySelector(`[data-id="${focusTarget[1]}"]`);
    (target && !target.disabled ? target : document.getElementById("checkout_button")).focus();
  }
}

// One cart line (CartActivity.line): every label names its product.
function line(product, quantity) {
  const name = product.name;
  const lineTotal = money(product.cents * quantity);
  const stepButton = (dataId, label, iconName, next) => {
    const button = el("button", {
      type: "button", dataId, class: "outlined-icon-button", "aria-label": label,
    }, icon(iconName));
    button.addEventListener("click", () => change(product, next));
    return button;
  };
  const increase = stepButton("cart_line_increase", `Increase ${name}`, "ic_add", quantity + 1);
  increase.disabled = quantity >= MAX_QUANTITY;
  const remove = el("button", {
    type: "button", dataId: "cart_line_remove", class: "text-button line-remove", "aria-label": `Remove ${name}`,
  }, "Remove");
  remove.addEventListener("click", () => change(product, 0));

  return el("li", { id: `cart_line_${product.slug}`, class: "cart-line", "aria-label": `${name} in cart` },
    art(`art_${product.slug}`, "art line-image", "cart_line_image"),
    el("div", { class: "line-main" },
      el("span", { dataId: "cart_line_name", class: "title-medium line-name" }, name),
      el("span", { dataId: "cart_line_price", class: "body-medium muted" }, `${money(product.cents)} each`),
      remove),
    el("div", { class: "line-side" },
      el("div", { class: "stepper small" },
        stepButton("cart_line_decrease", `Decrease ${name}`, "ic_remove", quantity - 1),
        el("output", {
          dataId: "cart_line_qty", class: "title-medium line-qty", "aria-label": `Quantity of ${name}: ${quantity}`,
        }, String(quantity)),
        increase),
      el("output", {
        dataId: "cart_line_total", class: "title-medium primary-text line-total",
        "aria-label": `${name} total ${lineTotal}`,
      }, lineTotal)));
}

function change(product, quantity) {
  session.setQuantity(product.slug, quantity);
  renderCart();
}

// "Added to cart" with View cart, above Add to cart, for Snackbar.LENGTH_LONG; it waits while the pointer or
// keyboard focus is on it.
function showSnackbar(host) {
  clearTimeout(snackbarTimer);
  const bar = document.getElementById("snackbar").content.firstElementChild.cloneNode(true);
  host.replaceChildren(bar);
  bar.querySelector("#snackbar_action").addEventListener("click", () => go("#/cart"));
  let held = false;
  const hide = () => {
    if (!held) host.replaceChildren();
  };
  const hold = (value) => () => {
    held = value;
    if (!value) {
      clearTimeout(snackbarTimer);
      snackbarTimer = setTimeout(hide, SNACKBAR_MS);
    }
  };
  bar.addEventListener("pointerenter", hold(true));
  bar.addEventListener("pointerleave", hold(false));
  bar.addEventListener("focusin", hold(true));
  bar.addEventListener("focusout", hold(false));
  snackbarTimer = setTimeout(hide, SNACKBAR_MS);
}

fillPlaceholders(document);
window.addEventListener("hashchange", render);
render();

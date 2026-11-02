// Saved state, configuration and the values derived from it.
let NAMES, MAX_PER_PRODUCT, TOTAL_CAP;
const defaultConfig = () => ({ products: DEFAULT_NAMES.slice(), max: 3, icons: {}, totalMode: "auto", total: DEFAULT_NAMES.length });
const maxFor = () => state.config.max;
const usedText = p => TOTAL_CAP === Infinity ? `${used(p)} votes used` : `${used(p)} of ${TOTAL_CAP} votes used`;
const ruleText = () => `Give each product 0 to ${MAX_PER_PRODUCT} votes` +
  (TOTAL_CAP === Infinity ? ", with no limit on total votes." : `, with ${TOTAL_CAP} votes to spend in total.`);
// The most votes one voter can actually spend: every product at its maximum.
const maxSpendable = c => c.products.length * c.max;
function applyConfig() {
  const c = state.config;
  NAMES = c.products;
  MAX_PER_PRODUCT = c.max;
  TOTAL_CAP = c.totalMode === "none" ? Infinity : c.totalMode === "custom" ? Math.min(c.total, maxSpendable(c)) : NAMES.length;
}
const KEY = "purchase-voting-v1";

// Interface state that is not saved.
let showUnvoted = false;
let inSetup = false;
let setupMsg = "";
let newIcon = "Box";
let totalError = 0; // the too-high total the voter asked for, or 0

let state = load();
applyConfig();

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && Array.isArray(s.players)) {
      const c0 = s.config || {};
      const config = Object.assign(defaultConfig(), Array.isArray(c0.products) && c0.products.length >= 2 ? c0 : {});
      if (!c0.totalMode) { config.totalMode = c0.total ? "custom" : "auto"; config.total = c0.total || config.products.length; }
      config.icons = config.icons || {};
      return { players: s.players, draft: s.draft || null, finished: !!s.finished, config };
    }
  } catch (e) {}
  return { players: [], draft: null, finished: false, config: defaultConfig() };
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }

const used = p => Object.values(p.votes).reduce((a, b) => a + b, 0);

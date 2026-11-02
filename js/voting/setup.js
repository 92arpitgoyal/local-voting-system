// Setup screen: products, icons and vote limits.
// A number box with decrease and increase buttons.
function stepper(id, value, min, max, off, label) {
  const d = off ? "disabled" : "";
  return `<span class="inline-flex items-center gap-1.5"><button type="button" class="${BTN_ROUND}" data-step="${id}" data-d="-1" aria-label="Decrease ${label}" ${d || value <= min ? "disabled" : ""}>−</button>
    <input type="number" id="${id}" class="${INPUT} w-16 !p-2 text-center" min="${min}" max="${max}" value="${value}" aria-label="${label}" ${d}>
    <button type="button" class="${BTN_ROUND}" data-step="${id}" data-d="1" aria-label="Increase ${label}" ${d || value >= max ? "disabled" : ""}>+</button></span>`;
}

function setupView() {
  const c = state.config, locked = state.players.length > 0, dis = locked ? "disabled" : "";
  const edit = `<span class="absolute -right-1 -bottom-1 w-4 h-4 rounded-full bg-blue-700 text-white flex items-center justify-center border-2 border-white dark:border-gray-800"><span class="w-2 h-2 block [&>svg]:w-full [&>svg]:h-full">${PENCIL}</span></span>`;
  const iconBtn = (attrs, label, icon) => `<button class="${ICONBOX} relative hover:ring-2 hover:ring-blue-500 disabled:opacity-50" ${attrs} aria-label="${label}" ${dis}>${icon}${edit}</button>`;
  const radio = "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 shrink-0";
  const opt = "flex items-center gap-2.5 py-1.5 min-h-10 cursor-pointer";
  return `<div class="${CARD}">
    ${locked ? `<p class="${MUTED} mb-3">Products and limits are locked because votes have already been submitted. Use Start over on the home page to change them.</p>` : ""}
    <div class="p-4 mb-5 rounded-lg bg-blue-50 dark:bg-gray-900"><div class="font-semibold text-blue-800 dark:text-blue-400">Add products</div>
      <div class="${MUTED} mb-3">Type one name, or several separated by commas.</div>
      <div class="flex items-center gap-2">${iconBtn('id="newIconBtn"', "Choose an icon for the new products", svg(PATHS[newIcon]))}
        <input type="text" id="newProduct" class="${INPUT} flex-1 min-w-0" placeholder="e.g. Laptop, Bicycle, Fridge" maxlength="400" ${dis}></div>
      <button class="${PRIMARY} w-full mt-3" id="addProduct" ${dis}>Add product</button>
      <div class="text-sm text-red-600 dark:text-red-400 mt-2 empty:hidden">${esc(setupMsg)}</div></div>
    <h3 class="text-lg font-semibold mb-2">Products (${NAMES.length})</h3>
    <div class="space-y-2">${NAMES.map((n, i) => `<div class="flex items-center gap-2">${iconBtn(`data-icon="${i}"`, "Change icon for " + esc(n), ICON[n])}
      <input type="text" class="${INPUT} flex-1 min-w-0" data-rename="${i}" value="${esc(n)}" maxlength="40" aria-label="Product name" ${dis}>
      <button class="${BTN_SM} !py-2.5" data-remove="${i}" aria-label="Remove ${esc(n)}" ${locked || NAMES.length <= 2 ? "disabled" : ""}>Remove</button></div>`).join("")}</div>
  </div>
  <div class="${CARD}"><h3 class="text-lg font-semibold mb-2">Votes for each product</h3>
    <label class="flex items-center gap-3 text-sm"><span>Maximum per product</span>
      ${stepper("maxVotes", c.max, 1, 10, locked, "Maximum votes per product")}</label>
  </div>
  <div class="${CARD}"><h3 class="text-lg font-semibold mb-2">Total votes for each voter</h3>
    <label class="${opt}"><input type="radio" class="${radio}" name="totalMode" value="auto" ${c.totalMode === "auto" ? "checked" : ""} ${dis}><span class="text-sm">Equal to the number of products (${NAMES.length})</span></label>
    <label class="${opt}"><input type="radio" class="${radio}" name="totalMode" value="custom" ${c.totalMode === "custom" ? "checked" : ""} ${dis}><span class="text-sm">A fixed number</span>
      ${stepper("totalVotes", totalError || Math.min(c.total, maxSpendable(c)), 1, 500, c.totalMode !== "custom" || locked, "Total votes per voter")}</label>
    <label class="${opt}"><input type="radio" class="${radio}" name="totalMode" value="none" ${c.totalMode === "none" ? "checked" : ""} ${dis}><span class="text-sm">No limit on the total</span></label>
  </div>
  ${totalError ? totalErrorView() : ""}
  <div class="${BAR}"><button class="${BTN}" id="resetDefaults" ${dis}>Restore defaults</button><button class="${PRIMARY}" id="doneBtn">Done</button></div>`;
}

function saveConfig(msg = "", overTotal = 0) {
  setupMsg = msg;
  totalError = overTotal;
  const top = maxSpendable(state.config);
  if (state.config.total > top) state.config.total = top;
  applyConfig(); save(); render();
}
// Shown below the total card when the requested total cannot be spent.
function totalErrorView() {
  const c = state.config, req = totalError, top = maxSpendable(c);
  const need = Math.ceil(req / NAMES.length);
  const raise = need <= 10
    ? `<button class="${BTN_SM}" data-fix="max">Raise the maximum per product to ${need}</button>`
    : `<span>Even the highest maximum per product (10) allows only ${NAMES.length * 10} votes in total.</span>`;
  return `<div class="p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800 space-y-1" role="alert">
    <div class="font-semibold">A total of ${req} votes is too high.</div>
    <div>A voter can spend at most ${top} votes: ${NAMES.length} products with up to ${c.max === 1 ? "1 vote" : c.max + " votes"} each.</div>
    <div class="pt-1">To fix this, either:</div>
    <div class="flex flex-wrap items-center gap-2"><button class="${BTN_SM}" data-fix="total">Lower the total to ${top}</button>${raise}</div></div>`;
}
function validName(name, except) {
  name = name.trim();
  if (!name) return "A product name cannot be empty.";
  if (NAMES.some((n, i) => i !== except && n.toLowerCase() === name.toLowerCase())) return "A product named " + name + " already exists.";
  return "";
}
// Splits a comma-separated entry into clean, unique names.
function parseNames(text) {
  const seen = new Set();
  return text.split(",").map(n => n.trim()).filter(n => n && !seen.has(n.toLowerCase()) && seen.add(n.toLowerCase()));
}
function addProducts(text) {
  const names = parseNames(text);
  if (!names.length) { setupMsg = "Enter at least one product name."; render(); return; }
  const taken = new Set(NAMES.map(n => n.toLowerCase()));
  const added = names.filter(n => !taken.has(n.toLowerCase()));
  const skipped = names.filter(n => taken.has(n.toLowerCase()));
  added.forEach(n => { state.config.products.push(n); state.config.icons[n] = newIcon; });
  if (added.length) newIcon = "Box";
  saveConfig(skipped.length ? "Skipped, already in the list: " + skipped.join(", ") + "." : "");
  document.getElementById("newProduct").focus();
}
function updateAddLabel() {
  const n = parseNames(document.getElementById("newProduct").value).length;
  document.getElementById("addProduct").textContent = n > 1 ? `Add ${n} products` : "Add product";
}

function bindSetup() {
  const $ = id => document.getElementById(id);
  const clamp = (v, lo, hi, d) => Math.min(hi, Math.max(lo, Math.round(+v) || d));
  document.querySelectorAll("[data-rename]").forEach(inp => inp.onchange = () => {
    const i = +inp.dataset.rename, err = validName(inp.value, i);
    if (err) { setupMsg = err; render(); return; }
    const old = state.config.products[i], nn = inp.value.trim();
    const keep = iconId(old);
    state.config.products[i] = nn;
    delete state.config.icons[old];
    state.config.icons[nn] = keep;
    saveConfig();
  });
  document.querySelectorAll("[data-remove]").forEach(b => b.onclick = () => { const [gone] = state.config.products.splice(+b.dataset.remove, 1); delete state.config.icons[gone]; saveConfig(); });
  if ($("addProduct")) {
    $("addProduct").onclick = () => addProducts($("newProduct").value);
    $("newProduct").addEventListener("keydown", e => { if (e.key === "Enter") addProducts($("newProduct").value); });
    $("newProduct").addEventListener("input", updateAddLabel);
  }
  document.querySelectorAll("[data-icon]").forEach(btn => btn.onclick = async () => {
    const name = NAMES[+btn.dataset.icon], id = await pickIcon(iconId(name));
    if (id) { state.config.icons[name] = id; saveConfig(); }
  });
  if ($("newIconBtn")) $("newIconBtn").onclick = async () => {
    const typed = $("newProduct").value, id = await pickIcon(newIcon);
    if (id) newIcon = id;
    render();
    $("newProduct").value = typed;
    updateAddLabel();
  };
  document.querySelectorAll('[name="totalMode"]').forEach(r => r.onchange = () => {
    state.config.totalMode = r.value;
    saveConfig();
  });
  document.querySelectorAll("[data-step]").forEach(b => b.onclick = () => {
    const inp = $(b.dataset.step);
    inp.value = clamp(+inp.value + +b.dataset.d, +inp.min, +inp.max, +inp.min);
    inp.dispatchEvent(new Event("change"));
  });
  if ($("maxVotes")) $("maxVotes").onchange = e => { state.config.max = clamp(e.target.value, 1, 10, 3); saveConfig(); };
  if ($("totalVotes")) $("totalVotes").onchange = e => {
    const req = Math.max(1, Math.round(+e.target.value) || NAMES.length);
    if (req > maxSpendable(state.config)) saveConfig("", req);
    else { state.config.total = req; saveConfig(); }
  };
  document.querySelectorAll("[data-fix]").forEach(b => b.onclick = () => {
    const c = state.config, req = totalError;
    if (b.dataset.fix === "max") { c.max = Math.ceil(req / NAMES.length); c.total = req; }
    else c.total = maxSpendable(c);
    saveConfig();
  });
  if ($("doneBtn")) $("doneBtn").onclick = () => $("setupBtn").click();
  if ($("resetDefaults")) $("resetDefaults").onclick = async () => { if (await confirmDialog("Restore the default products and limits?", "Restore defaults")) { state.config = defaultConfig(); saveConfig(); } };
}

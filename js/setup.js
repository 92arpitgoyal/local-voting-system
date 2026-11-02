// Setup screen: products, icons and vote limits.
// A number box with decrease and increase buttons.
function stepper(id, value, min, max, off, label) {
  const d = off ? "disabled" : "";
  return `<span class="numstep"><button type="button" data-step="${id}" data-d="-1" aria-label="Decrease ${label}" ${d || value <= min ? "disabled" : ""}>−</button>
    <input type="number" id="${id}" min="${min}" max="${max}" value="${value}" aria-label="${label}" ${d}>
    <button type="button" data-step="${id}" data-d="1" aria-label="Increase ${label}" ${d || value >= max ? "disabled" : ""}>+</button></span>`;
}

function setupView() {
  const c = state.config, locked = state.players.length > 0, dis = locked ? "disabled" : "";
  return `<div class="card">
    ${locked ? '<p class="muted">Products and limits are locked because votes have already been submitted. Use Start over on the home page to change them.</p>' : ""}
    <div class="addbox"><div class="label">Add products</div>
      <div class="addhint">Type one name, or several separated by commas.</div>
      <div class="prow"><button class="emoji iconpick" id="newIconBtn" aria-label="Choose an icon for the new products" ${dis}>${svg(PATHS[newIcon])}<span class="edit">${PENCIL}</span></button>
        <input type="text" id="newProduct" placeholder="e.g. Laptop, Bicycle, Fridge" maxlength="400" ${dis}></div>
      <button class="primary addbtn" id="addProduct" ${dis}>Add product</button>
      <div class="warn">${esc(setupMsg)}</div></div>
    <h3 class="listhead">Products (${NAMES.length})</h3>
    ${NAMES.map((n, i) => `<div class="prow"><button class="emoji iconpick" data-icon="${i}" aria-label="Change icon for ${esc(n)}" ${dis}>${ICON[n]}<span class="edit">${PENCIL}</span></button>
      <input type="text" data-rename="${i}" value="${esc(n)}" maxlength="40" aria-label="Product name" ${dis}>
      <button data-remove="${i}" aria-label="Remove ${esc(n)}" ${locked || NAMES.length <= 2 ? "disabled" : ""}>Remove</button></div>`).join("")}
  </div>
  <div class="card tight"><h3>Votes for each product</h3>
    <label class="field"><span>Maximum per product</span>
      ${stepper("maxVotes", c.max, 1, 10, locked, "Maximum votes per product")}</label>
  </div>
  <div class="card tight"><h3>Total votes for each voter</h3>
    <label class="opt"><input type="radio" name="totalMode" value="auto" ${c.totalMode === "auto" ? "checked" : ""} ${dis}><span>Equal to the number of products (${NAMES.length})</span></label>
    <label class="opt"><input type="radio" name="totalMode" value="custom" ${c.totalMode === "custom" ? "checked" : ""} ${dis}><span>A fixed number</span>
      ${stepper("totalVotes", c.total, 1, 500, c.totalMode !== "custom" || locked, "Total votes per voter")}</label>
    <label class="opt"><input type="radio" name="totalMode" value="none" ${c.totalMode === "none" ? "checked" : ""} ${dis}><span>No limit on the total</span></label>
  </div>
  <div class="row between bar"><button id="resetDefaults" ${dis}>Restore defaults</button><button class="primary" id="doneBtn">Done</button></div>`;
}

function saveConfig(msg = "") {
  setupMsg = msg;
  applyConfig(); save(); render();
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
  if ($("totalVotes")) $("totalVotes").onchange = e => { state.config.total = clamp(e.target.value, 1, 500, NAMES.length); saveConfig(); };
  if ($("doneBtn")) $("doneBtn").onclick = () => $("setupBtn").click();
  if ($("resetDefaults")) $("resetDefaults").onclick = async () => { if (await confirmDialog("Restore the default products and limits?", "Restore defaults")) { state.config = defaultConfig(); saveConfig(); } };
}

// Home, voting and results screens.
function homeView() {
  return `<div class="${CARD}">
    <h3 class="text-lg font-semibold mb-3">Next voter</h3>
    <div class="flex gap-2"><input type="text" id="newName" class="${INPUT} flex-1 min-w-0" placeholder="Enter your name" maxlength="30">
    <button class="${PRIMARY}" id="startBtn">Start voting</button></div>
  </div>
  <div class="${CARD}"><h3 class="text-lg font-semibold mb-2">Submitted voters (${state.players.length})</h3>
    <ul class="divide-y divide-gray-200 dark:divide-gray-700">${state.players.map((p, i) => `<li class="flex items-center gap-3 py-2.5">${avatar(p.name, i)}<div class="flex-1 min-w-0 font-medium truncate">${esc(p.name)}</div><span class="${MUTED}">${usedText(p)}</span></li>`).join("")
      || `<li class="${MUTED} py-2">No votes have been submitted yet.</li>`}</ul>
  </div>
  <div class="${BAR}">
    <button class="${BTN}" id="resetBtn">Start over</button>
    <button class="${PRIMARY}" id="finishBtn" ${state.players.length ? "" : "disabled"}>Finish and show results</button></div>`;
}

function votingView() {
  const d = state.draft;
  const spent = used(d), left = TOTAL_CAP - spent;
  const unlimited = TOTAL_CAP === Infinity;
  const arrow = '<svg class="bico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const shuffle = '<svg class="bico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>';
  return `<div class="budget sticky top-3 z-10 ${CARD}">
      <div class="flex items-center justify-between text-sm"><span>Voting as <b>${esc(d.name)}</b></span>
      <span class="left">${unlimited ? `<b>${spent}</b> votes used` : `<b class="${left === 0 ? "text-red-600 dark:text-red-400" : ""}">${left}</b> of ${TOTAL_CAP} votes left`}</span></div>
      ${unlimited ? "" : `<div class="mt-2.5">${PROGRESS(spent / TOTAL_CAP * 100)}</div>`}</div>
    <div class="flex items-center gap-2 mb-3"><span class="${MUTED}">Order:</span><button class="${BTN_SM}" id="shuffleBtn">${shuffle} Random order</button><button class="${BTN_SM}" id="alphaBtn" aria-label="Sort alphabetically, A to Z">A ${arrow} Z</button></div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">${(d.order && d.order.length === NAMES.length ? d.order : NAMES).map(name => {
      const v = d.votes[name] || 0;
      const tone = v ? "border-blue-600 ring-1 ring-blue-600 bg-blue-50 dark:bg-gray-700" : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800";
      return `<div class="p-3 border rounded-lg shadow-sm flex items-center gap-3 cursor-pointer select-none ${tone}" data-tile="${esc(name)}"><div class="${ICONBOX}">${ICON[name]}</div>
        <div class="flex-1 min-w-0"><div class="font-medium truncate">${esc(name)}</div>
          <div class="flex gap-1 mt-1.5">${Array.from({ length: maxFor(name) }, (_, i) => i + 1).map(n => `<div class="w-3 h-3 rounded-full ${n <= v ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-600"}"></div>`).join("")}</div></div>
        <div class="flex items-center gap-2 shrink-0">
          <button class="${BTN_ROUND}" data-vote="${esc(name)}" data-d="-1" ${v === 0 ? "disabled" : ""} aria-label="Remove a vote from ${esc(name)}">−</button>
          <span class="w-5 text-center font-bold tabular-nums">${v}</span>
          <button class="${BTN_ROUND} ${left === 0 ? "opacity-40" : ""}" data-vote="${esc(name)}" data-d="1" ${v >= maxFor(name) ? "disabled" : ""} aria-label="Add a vote to ${esc(name)}">+</button>
        </div></div>`;
    }).join("")}</div>
    <div class="${BAR}">
      <button class="${BTN}" id="cancelBtn">Discard and go back</button>
      <button class="${PRIMARY}" id="submitBtn">Submit my votes</button></div>`;
}

function resultsView() {
  const totals = NAMES.map(name => ({ name, total: state.players.reduce((a, p) => a + (p.votes[name] || 0), 0) }))
    .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));
  const max = Math.max(1, ...totals[0] ? [totals[0].total] : [1]);
  const medals = ["1st", "2nd", "3rd"];

  const voted = totals.filter(t => t.total > 0), unvoted = totals.filter(t => !t.total);
  const top = voted.slice(0, 3);
  let h = `<h2 class="${H2} mt-0">Combined results</h2>`;
  if (!top.length) h += `<div class="${CARD} ${MUTED}">No votes were cast.</div>`;
  else h += `<div class="grid grid-cols-3 gap-3 mb-4">${top.map((t, k) => {
    const glow = ["opacity-90 dark:opacity-90", "opacity-60 dark:opacity-65", "opacity-35 dark:opacity-40"][k];
    return `
    <div class="relative isolate overflow-hidden p-3 text-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
      <div aria-hidden="true" class="absolute inset-x-0 top-0 -z-10 blur-2xl"><div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" class="aspect-[1155/678] w-full bg-gradient-to-tr from-blue-300 to-blue-600 ${glow}"></div></div>
      <div class="text-xs font-bold uppercase tracking-wide text-gray-900 dark:text-white">${medals[k]}</div>
      <div class="w-10 h-10 rounded-lg bg-white text-blue-700 ring-1 ring-blue-200 shadow-sm dark:bg-gray-900 dark:text-blue-300 dark:ring-blue-800 flex items-center justify-center mx-auto my-2">${ICON[t.name]}</div>
      <div class="font-semibold text-sm truncate text-gray-900 dark:text-white">${esc(t.name)}</div><div class="text-2xl font-extrabold text-gray-900 dark:text-white">${t.total}</div></div>`;}).join("")}</div>`;

  if (voted.length) h += `<div class="${CARD}">${voted.map((t, i) =>
    `<div class="grid grid-cols-[1.5rem_2.5rem_1fr_2rem] gap-2.5 items-center py-1.5"><span class="text-center font-medium ${MUTED}">${i + 1}</span><span class="${ICONBOX}">${ICON[t.name]}</span>
      <div class="min-w-0"><div class="text-sm font-medium truncate mb-1">${esc(t.name)}</div>${PROGRESS(t.total / max * 100)}</div>
      <span class="text-right font-bold tabular-nums">${t.total}</span></div>`).join("")}</div>`;

  h += `<h2 class="${H2}">Results by voter</h2>`;
  h += state.players.map((p, i) => {
    const all = NAMES.filter(n => p.votes[n]).sort((a, b) => p.votes[b] - p.votes[a] || a.localeCompare(b));
    const picks = all.slice(0, 5);
    return `<div class="${CARD}"><div class="flex items-center gap-3 mb-3">${avatar(p.name, i)}
      <div class="flex-1 min-w-0 font-medium truncate">${esc(p.name)}</div><span class="${MUTED}">${usedText(p)}</span></div>
      <div class="flex flex-wrap gap-2">${picks.length ? picks.map(n => `<span class="${BADGE}">${ICON[n]} ${esc(n)} <b>${p.votes[n]}</b></span>`).join("") : `<div class="${MUTED}">No votes cast.</div>`}</div>
      ${all.length > 5 ? `<div class="${MUTED} mt-3">Top 5 of ${all.length} products shown. See the full table for the rest.</div>` : ""}</div>`;
  }).join("");

  const cell = "px-4 py-2.5 text-center whitespace-nowrap";
  const row = t => `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"><td class="${cell} !text-left font-medium text-gray-900 dark:text-white">${esc(t.name)}</td>${state.players.map(p => { const v = p.votes[t.name] || 0; return `<td class="${cell} ${v ? "" : "opacity-40"}">${v}</td>`; }).join("")}<td class="${cell} font-bold text-gray-900 dark:text-white">${t.total}</td></tr>`;
  const cols = state.players.length + 2;
  h += `<h2 class="${H2}">Full table</h2><div class="relative overflow-x-auto border border-gray-200 rounded-lg shadow-sm dark:border-gray-700"><table class="w-full text-sm text-gray-500 dark:text-gray-400"><thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"><tr><th class="${cell} !text-left">Product</th>${state.players.map(p => `<th class="${cell}">${esc(p.name)}</th>`).join("")}<th class="${cell}">Total</th></tr></thead><tbody>${
    voted.map(row).join("")}${
    unvoted.length ? `<tr class="cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 border-b dark:border-gray-700" id="toggleRow"><td colspan="${cols}" class="px-4 py-2.5 font-medium text-gray-900 dark:text-white">${showUnvoted ? "▾" : "▸"} Not voted for by anyone (${unvoted.length})</td></tr>${showUnvoted ? unvoted.map(row).join("") : ""}` : ""
  }</tbody></table></div>`;

  h += `<div class="${BAR}">
    <button class="${BTN}" id="backBtn">Back to voter list</button><button class="${BTN}" id="resetBtn">Start over</button></div>`;
  return h;
}

// In-page dialogs that replace the browser popups.
function confirmDialog(message, okLabel = "Confirm") {
  return new Promise(resolve => {
    const back = document.createElement("div");
    back.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50";
    back.innerHTML = `<div class="w-full max-w-sm p-5 bg-white rounded-lg shadow dark:bg-gray-700" role="dialog" aria-modal="true"><p class="mb-5 text-lg text-gray-900 dark:text-white">${esc(message)}</p>
      <div class="flex justify-between gap-3"><button class="${BTN}" data-x="no">Cancel</button><button class="${PRIMARY}" data-x="yes">${esc(okLabel)}</button></div></div>`;
    const done = v => { document.removeEventListener("keydown", onKey); back.remove(); resolve(v); };
    const onKey = e => { if (e.key === "Escape") done(false); };
    back.onclick = e => { if (e.target === back) done(false); else if (e.target.dataset.x) done(e.target.dataset.x === "yes"); };
    document.addEventListener("keydown", onKey);
    document.body.appendChild(back);
    back.querySelector('[data-x="yes"]').focus();
  });
}

function pickIcon(current) {
  return new Promise(resolve => {
    const back = document.createElement("div");
    back.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50";
    back.innerHTML = `<div class="w-full max-w-md max-h-[86vh] flex flex-col p-5 bg-white rounded-lg shadow dark:bg-gray-700" role="dialog" aria-modal="true"><h3 class="text-xl font-semibold text-gray-900 dark:text-white">Choose an icon</h3>
      <p class="${MUTED} mb-3">Tap an icon to select it. Scroll to see more.</p>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(3.5rem,1fr))] gap-2 flex-1 min-h-0 overflow-y-auto py-3 border-y border-gray-200 dark:border-gray-600 overscroll-contain">${Object.keys(PATHS).map(id => `<button class="h-14 flex items-center justify-center rounded-lg border ${id === current ? "border-blue-600 ring-1 ring-blue-600 bg-blue-50 text-blue-700 dark:bg-gray-800 dark:text-blue-400" : "border-gray-200 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"}" data-id="${esc(id)}" aria-label="${esc(id)}">${svg(PATHS[id])}</button>`).join("")}</div>
      <div class="mt-3"><button class="${BTN} w-full" data-x="no">Cancel</button></div></div>`;
    const done = v => { document.removeEventListener("keydown", onKey); back.remove(); resolve(v); };
    const onKey = e => { if (e.key === "Escape") done(null); };
    back.onclick = e => {
      const b = e.target.closest("button");
      if (e.target === back || (b && b.dataset.x)) done(null);
      else if (b && b.dataset.id) done(b.dataset.id);
    };
    document.addEventListener("keydown", onKey);
    document.body.appendChild(back);
  });
}


// In-page dialogs that replace the browser popups.
function confirmDialog(message, okLabel = "Confirm") {
  return new Promise(resolve => {
    const back = document.createElement("div");
    back.className = "modal-back";
    back.innerHTML = `<div class="modal" role="dialog" aria-modal="true"><p>${esc(message)}</p>
      <div class="row between"><button data-x="no">Cancel</button><button class="primary" data-x="yes">${esc(okLabel)}</button></div></div>`;
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
    back.className = "modal-back";
    back.innerHTML = `<div class="modal picker" role="dialog" aria-modal="true"><h3>Choose an icon</h3>
      <p class="hint">Tap an icon to select it. Scroll to see more.</p>
      <div class="icons">${Object.keys(PATHS).map(id => `<button class="icobtn ${id === current ? "sel" : ""}" data-id="${esc(id)}" aria-label="${esc(id)}">${svg(PATHS[id])}</button>`).join("")}</div>
      <div class="foot"><button data-x="no">Cancel</button></div></div>`;
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


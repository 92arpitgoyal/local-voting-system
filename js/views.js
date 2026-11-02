// Home, voting and results screens.
function homeView() {
  return `<div class="card">
    <h3>Next voter</h3>
    <div class="row"><input type="text" id="newName" placeholder="Enter your name" maxlength="30">
    <button class="primary" id="startBtn">Start voting</button></div>
  </div>
  <div class="card"><h3>Submitted voters (${state.players.length})</h3>
    ${state.players.map((p, i) => `<div class="voter">${avatar(p.name, i)}<div class="grow"><b>${esc(p.name)}</b></div><span class="muted">${usedText(p)}</span></div>`).join("")
      || '<div class="muted">No votes have been submitted yet.</div>'}
  </div>
  <div class="row between bar">
    <button id="resetBtn">Start over</button>
    <button class="primary" id="finishBtn" ${state.players.length ? "" : "disabled"}>Finish and show results</button></div>`;
}

function votingView() {
  const d = state.draft;
  const spent = used(d), left = TOTAL_CAP - spent;
  const unlimited = TOTAL_CAP === Infinity;
  return `<div class="budget">
      <div class="row between"><span>Voting as <b>${esc(d.name)}</b></span>
      <span class="left">${unlimited ? `<b>${spent}</b> votes used` : `<b class="${left === 0 ? "warn" : ""}">${left}</b> of ${TOTAL_CAP} votes left`}</span></div>
      ${unlimited ? "" : `<div class="meter"><div style="width:${spent / TOTAL_CAP * 100}%"></div></div>`}</div>
    <div class="row order"><span class="muted">Order:</span><button id="shuffleBtn"><svg class="bico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg> Random order</button><button id="alphaBtn" aria-label="Sort alphabetically, A to Z">A <svg class="bico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg> Z</button></div>
    <div class="grid">${(d.order && d.order.length === NAMES.length ? d.order : NAMES).map(name => {
      const v = d.votes[name] || 0;
      return `<div class="tile ${v ? "on" : ""}" data-tile="${esc(name)}"><div class="emoji">${ICON[name]}</div>
        <div class="grow"><div class="name">${esc(name)}</div>
          <div class="pips">${Array.from({ length: maxFor(name) }, (_, i) => i + 1).map(n => `<div class="pip ${n <= v ? "f" : ""}"></div>`).join("")}</div></div>
        <div class="stepper">
          <button data-vote="${esc(name)}" data-d="-1" ${v === 0 ? "disabled" : ""} aria-label="Remove a vote from ${esc(name)}">−</button>
          <span>${v}</span>
          <button data-vote="${esc(name)}" data-d="1" ${v >= maxFor(name) ? "disabled" : ""} class="${left === 0 ? "dim" : ""}" aria-label="Add a vote to ${esc(name)}">+</button>
        </div></div>`;
    }).join("")}</div>
    <div class="row between bar">
      <button id="cancelBtn">Discard and go back</button>
      <button class="primary" id="submitBtn">Submit my votes</button></div>`;
}

function resultsView() {
  const totals = NAMES.map(name => ({ name, total: state.players.reduce((a, p) => a + (p.votes[name] || 0), 0) }))
    .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));
  const max = Math.max(1, ...totals[0] ? [totals[0].total] : [1]);
  const medals = ["1st", "2nd", "3rd"];

  const voted = totals.filter(t => t.total > 0), unvoted = totals.filter(t => !t.total);
  const top = voted.slice(0, 3);
  let h = `<h2>Combined results</h2>`;
  if (!top.length) h += `<div class="card muted">No votes were cast.</div>`;
  else h += `<div class="podium">${top.map((t, k) => `
    <div class="place p${k + 1}"><div class="medal">${medals[k]}</div><div class="emoji">${ICON[t.name]}</div>
      <div class="name">${esc(t.name)}</div><div class="score">${t.total}</div></div>`).join("")}</div>`;

  if (voted.length) h += `<div class="card">${voted.map((t, i) =>
    `<div class="result"><span class="rank">${i + 1}</span><span class="emoji" style="width:34px;height:34px;border-radius:9px">${ICON[t.name]}</span>
      <div>${esc(t.name)}<div class="track"><div class="fill" style="width:${t.total / max * 100}%"></div></div></div>
      <span class="num">${t.total}</span></div>`).join("")}</div>`;


  h += `<h2>Results by voter</h2>`;
  h += state.players.map((p, i) => {
    const picks = NAMES.filter(n => p.votes[n]).sort((a, b) => p.votes[b] - p.votes[a]);
    return `<div class="card"><div class="voter" style="padding-top:0">${avatar(p.name, i)}
      <div class="grow"><b>${esc(p.name)}</b></div><span class="muted">${usedText(p)}</span></div>
      ${picks.length ? picks.map(n => `<span class="chip">${ICON[n]} ${esc(n)} <b>${p.votes[n]}</b></span>`).join("") : '<div class="muted">No votes cast.</div>'}</div>`;
  }).join("");

  const row = t => `<tr><td>${esc(t.name)}</td>${state.players.map(p => { const v = p.votes[t.name] || 0; return `<td class="${v ? "" : "zero"}">${v}</td>`; }).join("")}<td><b>${t.total}</b></td></tr>`;
  const cols = state.players.length + 2;
  h += `<h2>Full table</h2><div class="card scroll"><table><thead><tr><th>Product</th>${state.players.map(p => `<th>${esc(p.name)}</th>`).join("")}<th>Total</th></tr></thead><tbody>${
    voted.map(row).join("")}${
    unvoted.length ? `<tr class="toggle" id="toggleRow"><td colspan="${cols}">${showUnvoted ? "▾" : "▸"} Not voted for by anyone (${unvoted.length})</td></tr>${showUnvoted ? unvoted.map(row).join("") : ""}` : ""
  }</tbody></table></div>`;

  h += `<div class="row between bar">
    <button id="backBtn">Back to voter list</button><button id="resetBtn">Start over</button></div>`;
  return h;
}


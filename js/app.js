// Rendering and event wiring.
function render() {
  const live = !state.draft && !state.finished;
  if (!live) inSetup = false;
  const hb = document.getElementById("setupBtn");
  hb.hidden = !live;
  hb.innerHTML = inSetup ? "Done" : `${GEAR} Setup`;
  document.getElementById("sub").textContent = inSetup
    ? "Choose which products people vote on and how votes are limited."
    : state.finished
    ? `Final results from ${state.players.length} ${state.players.length === 1 ? "voter" : "voters"}, with combined totals first and then each voter's choices.`
    : ruleText();
  document.getElementById("app").innerHTML = inSetup ? setupView() : state.finished ? resultsView() : state.draft ? votingView() : homeView();
  bind();
}

function bind() {
  const $ = id => document.getElementById(id);
  $("setupBtn").onclick = () => { inSetup = !inSetup; setupMsg = ""; render(); window.scrollTo(0, 0); };
  bindSetup();
  const nameInput = $("newName");
  if (nameInput) {
    nameInput.addEventListener("keydown", e => { if (e.key === "Enter") startVoter(nameInput.value); });
    $("startBtn").onclick = () => startVoter(nameInput.value);
  }
  document.querySelectorAll("[data-tile]").forEach(t => t.onclick = e => { if (!e.target.closest("button")) vote(t.dataset.tile, 1); });
  document.querySelectorAll("[data-vote]").forEach(b => b.onclick = () => vote(b.dataset.vote, +b.dataset.d));
  if ($("shuffleBtn")) $("shuffleBtn").onclick = () => setOrder("shuffle");
  if ($("alphaBtn")) $("alphaBtn").onclick = () => setOrder("alpha");
  if ($("submitBtn")) $("submitBtn").onclick = submitVotes;
  if ($("cancelBtn")) $("cancelBtn").onclick = cancelVoter;
  if ($("finishBtn")) $("finishBtn").onclick = () => { showUnvoted = false; state.finished = true; save(); render(); window.scrollTo(0, 0); };
  if ($("backBtn")) $("backBtn").onclick = () => { state.finished = false; save(); render(); };
  if ($("toggleRow")) $("toggleRow").onclick = () => { showUnvoted = !showUnvoted; const y = window.scrollY; render(); window.scrollTo(0, y); };
  if ($("resetBtn")) $("resetBtn").onclick = resetAll;
}

render();

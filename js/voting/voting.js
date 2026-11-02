// Voting actions: starting, voting, submitting and resetting.
function startVoter(name) {
  name = name.trim();
  if (!name) return;
  state.draft = { name, votes: {}, order: shuffled() };
  save(); render(); window.scrollTo(0, 0);
}
function shuffled() {
  const a = NAMES.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function setOrder(kind) {
  state.draft.order = kind === "alpha" ? NAMES.slice().sort((a, b) => a.localeCompare(b)) : shuffled();
  save(); render();
}
function vote(product, delta) {
  const d = state.draft;
  const cur = d.votes[product] || 0;
  const next = cur + delta;
  if (next > maxFor(product)) { shakeTile(product); return; }
  if (next < 0) return;
  if (delta > 0 && used(d) >= TOTAL_CAP) { shakeBudget(); return; }
  if (next === 0) delete d.votes[product]; else d.votes[product] = next;
  save();
  const y = window.scrollY;
  render(); window.scrollTo(0, y);
}
function shakeTile(product) {
  const el = [...document.querySelectorAll("[data-tile]")].find(t => t.dataset.tile === product);
  if (!el) return;
  el.classList.remove("shake");
  void el.offsetWidth;
  el.classList.add("shake");
  const note = el.querySelector(".maxnote");
  if (note) { note.classList.remove("hidden"); clearTimeout(note.t); note.t = setTimeout(() => note.classList.add("hidden"), 1500); }
  try { navigator.vibrate && navigator.vibrate(200); } catch (e) {}
}
function shakeBudget() {
  const el = document.querySelector(".budget");
  if (!el) return;
  el.classList.remove("shake");
  void el.offsetWidth;
  el.classList.add("shake");
  try { navigator.vibrate && navigator.vibrate(200); } catch (e) {}
}
async function submitVotes() {
  const d = state.draft;
  if (!(await confirmDialog("Submit votes for " + d.name + "? They cannot be changed afterwards.", "Submit votes"))) return;
  if (state.draft !== d) return;
  state.players.push({ id: Date.now() + Math.random().toString(36).slice(2, 6), name: d.name, votes: d.votes });
  state.draft = null;
  save(); render(); window.scrollTo(0, 0);
}
async function cancelVoter() {
  if (!(await confirmDialog("Discard the votes entered so far for " + state.draft.name + "?", "Discard votes"))) return;
  state.draft = null;
  save(); render();
}
async function resetAll() {
  if (!(await confirmDialog("Delete all submitted votes and start over?", "Delete votes"))) return;
  state = { players: [], draft: null, finished: false, config: state.config };
  save(); render();
}


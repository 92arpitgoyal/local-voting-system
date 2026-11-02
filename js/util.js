// Small shared helpers.
const COLORS = ["#5b4bdb","#e0527a","#1f9d8b","#e08a1e","#3b82c4","#a855c7","#6a994e","#d6453d"];
const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const avatar = (name, i) => `<div class="avatar" style="background:${COLORS[i % COLORS.length]}">${esc(name.trim()[0].toUpperCase())}</div>`;

// Small shared helpers.
const COLORS = ["#5b4bdb","#e0527a","#1f9d8b","#e08a1e","#3b82c4","#a855c7","#6a994e","#d6453d"];
const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const avatar = (name, i) => `<div class="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-white shrink-0" style="background:${COLORS[i % COLORS.length]}">${esc(name.trim()[0].toUpperCase())}</div>`;

// Flowbite class sets shared by every screen.
const BTN_OFF = " disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none";
const BTN_BASE = "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700" + BTN_OFF;
const BTN = BTN_BASE + " text-sm px-4 py-2.5";
const BTN_SM = BTN_BASE + " text-xs px-3 py-1.5 inline-flex items-center gap-1.5";
const BTN_ROUND = BTN_BASE + " w-9 h-9 text-lg leading-none inline-flex items-center justify-center shrink-0";
const PRIMARY = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" + BTN_OFF;
const INPUT = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50";
const CARD = "p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700";
const MUTED = "text-sm text-gray-500 dark:text-gray-400";
const ICONBOX = "w-10 h-10 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 flex items-center justify-center shrink-0";
const BADGE = "bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center gap-1 px-2.5 py-1 rounded dark:bg-blue-900 dark:text-blue-300";
const BAR = "sticky bottom-0 z-10 -mx-4 mt-5 px-4 py-3 flex items-center justify-between gap-3 bg-gray-50/90 dark:bg-gray-900/90 backdrop-blur border-t border-gray-200 dark:border-gray-700";
const PROGRESS = (pct) => `<div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700"><div class="bg-blue-600 h-2.5 rounded-full" style="width:${pct}%"></div></div>`;
const H2 = "text-xl font-bold mt-6 mb-3";

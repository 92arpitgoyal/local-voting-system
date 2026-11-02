// Shared by every page: Tailwind setup, the tool list, and the site header.
tailwind.config = { darkMode: 'media', theme: { extend: { fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] } } } };

const SITE_LOGO = '<svg class="w-7 h-7" viewBox="0 0 28 28" fill="none" stroke-linecap="round" aria-hidden="true"><circle cx="6" cy="14" r="2.5" fill="#534AB7"/><path d="M6 9.5a4.5 4.5 0 0 1 0 9" stroke="#534AB7" stroke-width="2"/><path d="M6 5.5a8.5 8.5 0 0 1 0 17" stroke="#7F77DD" stroke-width="2" opacity=".75"/><path d="M6 1.5a12.5 12.5 0 0 1 0 25" stroke="#AFA9EC" stroke-width="2" opacity=".6"/></svg>';

// One entry per tool. Tools without an href are shown as coming soon.
const TOOLS = [
  { name: "Retro board", href: "retro.html", kind: "Capture", text: "Collect what went well and what to improve, vote on cards, and turn them into action items.",
    tone: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300", icon: '<rect x="3" y="4" width="5" height="16" rx="1"/><rect x="10" y="4" width="5" height="10" rx="1"/><rect x="17" y="4" width="4" height="13" rx="1"/>' },
  { name: "Purchase voting", href: "voting.html", kind: "Decide", text: "Let every person spread a limited number of votes across products and see the combined ranking.",
    tone: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300", icon: '<path d="M5 13l4 4L19 7"/><rect x="3" y="3" width="18" height="18" rx="3"/>' },
  { name: "Decision log", kind: "Decide", text: "Record what was decided and why.",
    tone: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300", icon: '<path d="M5 4h11l3 3v13H5z"/><path d="M8 11h8M8 15h8"/>' },
  { name: "Action tracker", kind: "Commit", text: "Turn talk into owned, dated work.",
    tone: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300", icon: '<path d="M4 7l2 2 3-3M4 15l2 2 3-3M12 8h8M12 16h8"/>' },
  { name: "Decision revisit reminders", kind: "Review", text: "Check later whether a decision worked.",
    tone: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300", icon: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M5 4l-2 2M19 4l2 2"/>' },
  { name: "Planning poker", kind: "Free tool", text: "Quick estimation with cards.",
    tone: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300", icon: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M12 8v8M9 11h6"/>' },
  { name: "Meeting timer", kind: "Free tool", text: "Timebox each agenda item.",
    tone: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300", icon: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4M9 3h6"/>' }
];
const toolIcon = t => `<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t.icon}</svg>`;

(function () {
  const host = document.getElementById("site-header");
  if (!host) return;
  const here = location.pathname.split("/").pop() || "index.html";
  const links = TOOLS.filter(t => t.href).map(t => {
    const on = t.href === here;
    return `<a href="${t.href}" ${on ? 'aria-current="page"' : ""} class="px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap ${on ? "text-blue-700 bg-blue-50 dark:bg-gray-700 dark:text-blue-400" : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"}">${t.name}</a>`;
  }).join("");
  host.className = "bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700";
  host.innerHTML = `<div class="max-w-screen-xl mx-auto flex items-center gap-2 px-4 py-3">
    <a href="index.html" class="flex items-center gap-2 text-xl font-semibold mr-3 shrink-0">${SITE_LOGO}<span>Team<span class="text-[#534AB7] dark:text-[#AFA9EC]">-Echo</span></span></a>
    <nav aria-label="Tools" class="flex items-center gap-1 overflow-x-auto">${links}</nav></div>`;
})();

import React from "react";

export default function Topbar({ dark, setDark }: { dark: boolean; setDark: (v: boolean)=>void }) {
  return (
    <header className="bg-white dark:bg-slate-800 border-b dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-semibold">My Calendar</div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-sm text-slate-500 dark:text-slate-300">calendar clone</div>

          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
            title="Toggle dark mode"
          >
            {dark ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </header>
  );
}

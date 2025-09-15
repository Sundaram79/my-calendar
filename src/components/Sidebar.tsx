import React from "react";
import { format, startOfMonth } from "date-fns";

export default function Sidebar(){
  const today = new Date();
  const monthStart = startOfMonth(today);
  return (
    <div className="sticky top-5 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg p-4">
      <div className="text-sm font-semibold mb-2">{format(monthStart, "MMMM yyyy")}</div>
      <div className="text-xs text-slate-500 dark:text-slate-300 mb-4">Mini calendar (placeholder)</div>

      <div className="mb-4">
        <h4 className="font-medium text-sm mb-2">My calendars</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-rose-400" /> Personal</li>
          <li className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-emerald-400" /> Work</li>
        </ul>
      </div>

      <div>
        <h4 className="font-medium text-sm mb-2">Labels</h4>
        <div className="flex gap-2 flex-wrap">
          <button className="text-xs px-2 py-1 border rounded">Meetings</button>
          <button className="text-xs px-2 py-1 border rounded">Personal</button>
        </div>
      </div>
    </div>
  );
}

import React, { useMemo, useState } from "react";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";
import EventDialog from "./EventDialog";
import { EventItem } from "../types";

export default function CalendarGrid({
  events,
  onAddEvent,
  onDeleteEvent
}: {
  events: EventItem[];
  onAddEvent: (e: EventItem)=>void;
  onDeleteEvent: (id: string)=>void;
}) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const rows: Date[][] = useMemo(() => {
    const days: Date[] = [];
    let day = startDate;
    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }
    const weeks: Date[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return weeks;
  }, [startDate, endDate]);

  const eventsByDate = useMemo(() => {
    const map: Record<string, EventItem[]> = {};
    events.forEach(e => {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    });
    return map;
  }, [events]);

  const prev = () => setCurrentMonth(m => subMonths(m, 1));
  const next = () => setCurrentMonth(m => addMonths(m, 1));
  const goToday = () => setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={prev} className="px-3 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700">‹</button>
          <button onClick={goToday} className="px-3 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700">Today</button>
          <button onClick={next} className="px-3 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700">›</button>
          <div className="ml-4 text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded px-2 py-1">
            <button className="px-3 py-1 rounded">Month</button>
            <button className="px-3 py-1 rounded">Week</button>
            <button className="px-3 py-1 rounded">Day</button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg overflow-hidden">
        <div className="grid grid-cols-7 bg-slate-100 dark:bg-slate-900/60 text-sm">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=>(
            <div key={d} className="py-2 text-center font-medium">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px bg-slate-200 dark:bg-slate-700">
          {rows.map((week, wi) => week.map((day, di) => {
            const iso = format(day, "yyyy-MM-dd");
            const inMonth = isSameMonth(day, monthStart);
            const dayEvents = eventsByDate[iso] || [];
            const isToday = isSameDay(day, today);

            return (
              <div key={`${wi}-${di}`} className={`bg-white dark:bg-slate-800 p-2 calendar-cell flex flex-col ${inMonth ? "" : "bg-slate-50 dark:bg-slate-900/40 text-slate-400 dark:text-slate-500"}`}>
                <div className="flex items-center justify-between">
                  <div className={`text-sm font-medium ${isToday ? "text-sky-600" : ""}`}>{format(day, "d")}</div>
                  <button title="Add event" onClick={()=>setSelectedDate(iso)} className="text-xs px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700">+</button>
                </div>

                <div className="mt-2 space-y-1 flex-1 overflow-hidden">
                  {dayEvents.slice(0,3).map(ev => (
                    <div key={ev.id} className="text-xs rounded px-2 py-1 bg-sky-50 dark:bg-sky-900/40 border-l-4 border-sky-500 overflow-hidden text-ellipsis whitespace-nowrap flex justify-between">
                      <span className="truncate">{ev.title}</span>
                      <button onClick={()=>onDeleteEvent(ev.id)} className="ml-2 text-xs opacity-60">✕</button>
                    </div>
                  ))}

                  {dayEvents.length > 3 && (
                    <div className="text-xs text-slate-400">+{dayEvents.length - 3} more</div>
                  )}
                </div>
              </div>
            );
          }))}
        </div>
      </div>

      {selectedDate && (
        <EventDialog date={selectedDate} onClose={()=>setSelectedDate(null)} onSave={onAddEvent} />
      )}
    </div>
  );
}

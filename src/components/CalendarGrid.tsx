import React, { useMemo, useState } from "react";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameMonth, isSameDay, addMonths, subMonths, isToday } from "date-fns";
import EventDialog from "./EventDialog";
import { EventItem } from "../types";

// shadcn/ui
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CalendarGrid({ events, onAddEvent, onDeleteEvent }: { events: EventItem[]; onAddEvent: (e: EventItem) => void; onDeleteEvent: (id: string) => void }) {
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
      events.forEach((e) => {
         if (!map[e.date]) map[e.date] = [];
         map[e.date].push(e);
      });
      return map;
   }, [events]);

   const prev = () => setCurrentMonth((m) => subMonths(m, 1));
   const next = () => setCurrentMonth((m) => addMonths(m, 1));
   const goToday = () => setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));

   return (
      <div className="space-y-4">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
               <Button variant="outline" size="sm" onClick={prev}>
                  ‹
               </Button>
               <Button variant="outline" size="sm" onClick={goToday}>
                  Today
               </Button>
               <Button variant="outline" size="sm" onClick={next}>
                  ›
               </Button>
               <div className="ml-4 text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</div>
            </div>

            <div className="hidden sm:block">
               <Tabs defaultValue="month">
                  <TabsList>
                     <TabsTrigger value="month">Month</TabsTrigger>
                     <TabsTrigger value="week">Week</TabsTrigger>
                     <TabsTrigger value="day">Day</TabsTrigger>
                  </TabsList>
               </Tabs>
            </div>
         </div>

         {/* Calendar Grid */}
         <Card className="overflow-hidden">
            {/* Weekday headers */}
            <div className="grid grid-cols-7 bg-muted text-sm">
               {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className="py-2 text-center font-medium">
                     {d}
                  </div>
               ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-px bg-border">
               {rows.map((week, wi) =>
                  week.map((day, di) => {
                     const iso = format(day, "yyyy-MM-dd");
                     const inMonth = isSameMonth(day, monthStart);
                     const dayEvents = eventsByDate[iso] || [];
                        const today = isToday(day);

                     return (
                        <div key={`${wi}-${di}`} className={`h-24 bg-background p-2 flex flex-col ${inMonth ? "" : "text-muted-foreground bg-muted/40"}`}>
                           <div className="flex items-center justify-between">
                              <div className={`text-sm font-medium ${today ? " text-blue-500": ""}`}>{format(day, "d")}</div>
                              <Button variant="ghost" size="lg" onClick={() => setSelectedDate(iso)} title="Add event">
                                 +
                              </Button>
                           </div>

                           <div className="mt-2 space-y-1 flex-1 overflow-hidden">
                              {dayEvents.slice(0, 3).map((ev) => (
                                 <div key={ev.id} className="text-xs rounded px-2 py-1 bg-primary/10 border-l-4 border-primary flex justify-between items-center truncate">
                                    <span className="truncate">{ev.title}</span>
                                    <Button variant="ghost" size="sm" onClick={() => onDeleteEvent(ev.id)} className="ml-1 h-4 px-1 text-muted-foreground">
                                       ✕
                                    </Button>
                                 </div>
                              ))}

                              {dayEvents.length > 3 && <div className="text-xs text-muted-foreground">+{dayEvents.length - 3} more</div>}
                           </div>
                        </div>
                     );
                  })
               )}
            </div>
         </Card>

         {/* Event Dialog */}
         {selectedDate && <EventDialog date={selectedDate} onClose={() => setSelectedDate(null)} onSave={onAddEvent} />}
      </div>
   );
}

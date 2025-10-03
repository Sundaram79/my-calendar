import CalendarGrid from "@/components/CalendarGrid";
import Sidebar from "@/components/Sidebar";
import { EventItem } from "@/types";
import { createFileRoute } from "@tanstack/react-router";

import { useEffect, useState } from "react";

export const Route = createFileRoute("/calendar")({
   component: calendar,
});

function calendar() {
   const [events, setEvents] = useState<EventItem[]>(() => {
      try {
         const raw = localStorage.getItem("events_v1");
         if (!raw) {
            // sample events
            return [
               { id: "e-1", title: "Team sync", date: "2025-09-14", description: "Weekly team meeting" },
               { id: "e-2", title: "Dentist", date: "2025-09-12", description: "Dental appointment" },
               { id: "e-3", title: "Flight to BLR", date: "2025-09-18", description: "Evening flight" },
            ];
         }
         return JSON.parse(raw);
      } catch {
         return [];
      }
   });

   useEffect(() => {
      try {
         localStorage.setItem("events_v1", JSON.stringify(events));
      } catch {}
   }, [events]);

   const addEvent = (e: EventItem) => {
      setEvents((prev) => [e, ...prev]);
   };

   const deleteEvent = (id: string) => {
      setEvents((prev) => prev.filter((p) => p.id !== id));
   };

   return (
      <div className="min-h-screen bg-background text-foreground">
         <div className="flex gap-4 px-4 py-6 max-w-7xl mx-auto">
            <aside className="hidden lg:block w-72">
               <Sidebar />
            </aside>

            <main className="flex-1">
               <CalendarGrid events={events} onAddEvent={addEvent} onDeleteEvent={deleteEvent} />
            </main>
         </div>
      </div>
   );
}

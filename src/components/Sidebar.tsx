import React from "react";
import { format, startOfMonth } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Sidebar() {
   const today = new Date();
   const monthStart = startOfMonth(today);

   return (
      <Card className="sticky top-5 w-64">
         <CardHeader>
            <CardTitle className="text-sm font-semibold">{format(monthStart, "MMMM yyyy")}</CardTitle>
            <p className="text-xs text-muted-foreground">Mini calendar (placeholder)</p>
         </CardHeader>

         <CardContent className="space-y-4">
            {/* My Calendars */}
            <div>
               <h4 className="font-medium text-sm mb-2">My calendars</h4>
               <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                     <span className="w-3 h-3 rounded bg-rose-400" /> Personal
                  </li>
                  <li className="flex items-center gap-2">
                     <span className="w-3 h-3 rounded bg-emerald-400" /> Work
                  </li>
               </ul>
            </div>

            <Separator />

            {/* Labels */}
            <div>
               <h4 className="font-medium text-sm mb-2">Labels</h4>
               <div className="flex gap-2 flex-wrap">
                  <Button variant="outline" size="sm" className="text-xs px-2 py-1">
                     Meetings
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs px-2 py-1">
                     Personal
                  </Button>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}

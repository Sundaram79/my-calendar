import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Topbar({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
   return (
      <header className="border-b bg-background">
         <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            {/* Left: Logo / Title */}
            <h1 className="text-2xl font-bold">My Calendar</h1>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
               <span className="hidden sm:block text-sm text-muted-foreground">calendar clone</span>

               <Separator orientation="vertical" className="h-6" />

               <Button variant="outline" size="icon" onClick={() => setDark(!dark)} title="Toggle dark mode">
                  {dark ? "🌙" : "☀️"}
               </Button>

               {/* Profile Dropdown */}
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="ghost" size="icon">
                        <Avatar className="w-8 h-8">
                           <AvatarImage src="https://github.com/shadcn.png" />
                           <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                     <DropdownMenuItem>Profile</DropdownMenuItem>
                     <DropdownMenuItem>Settings</DropdownMenuItem>
                     <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         </div>
      </header>
   );
}

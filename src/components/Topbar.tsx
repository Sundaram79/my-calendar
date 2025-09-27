"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sun, Moon, Laptop } from "lucide-react";

export default function Topbar() {
   const { setTheme } = useTheme();

   return (
      <header className="bg-background border-b">
         <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
               <div className="text-2xl font-semibold">My Calendar</div>
            </div>

            <div className="flex items-center gap-3">
               <div className="hidden sm:block text-sm text-muted-foreground">calendar clone</div>
               <Separator orientation="vertical" className="h-6" />

               {/* Theme switcher */}
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="outline" size="icon">
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                     <DropdownMenuItem onClick={() => setTheme("light")}>
                        <Sun className="mr-2 h-4 w-4" /> Light
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => setTheme("dark")}>
                        <Moon className="mr-2 h-4 w-4" /> Dark
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => setTheme("system")}>
                        <Laptop className="mr-2 h-4 w-4" /> System
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
               <Separator orientation="vertical" className="h-6" />
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

// import React from "react";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// export default function Topbar({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
//    return (
//       <header className="border-b bg-background">
//          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
//             {/* Left: Logo / Title */}
//             <h1 className="text-2xl font-bold">My Calendar</h1>

//             {/* Right: Actions */}
//             <div className="flex items-center gap-4">
//                <span className="hidden sm:block text-sm text-muted-foreground">calendar clone</span>

//                <Separator orientation="vertical" className="h-6" />

//                <Button variant="outline" size="icon" onClick={() => setDark(!dark)} title="Toggle dark mode">
//                   {dark ? "🌙" : "☀️"}
//                </Button>

//                {/* Profile Dropdown */}
//                <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                      <Button variant="ghost" size="icon">
//                         <Avatar className="w-8 h-8">
//                            <AvatarImage src="https://github.com/shadcn.png" />
//                            <AvatarFallback>SC</AvatarFallback>
//                         </Avatar>
//                      </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end">
//                      <DropdownMenuItem>Profile</DropdownMenuItem>
//                      <DropdownMenuItem>Settings</DropdownMenuItem>
//                      <DropdownMenuItem>Logout</DropdownMenuItem>
//                   </DropdownMenuContent>
//                </DropdownMenu>
//             </div>
//          </div>
//       </header>
//    );
// }

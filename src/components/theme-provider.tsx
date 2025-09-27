"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
   return (
      <NextThemesProvider
         {...props}
         attribute="class" // Tailwind uses class strategy
         defaultTheme="system" // default theme
         enableSystem={true} // follow OS theme
         disableTransitionOnChange // avoid flicker
      >
         {children}
      </NextThemesProvider>
   );
}

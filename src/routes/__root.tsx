import { ThemeProvider } from "@/components/theme-provider";
import Topbar from "@/components/Topbar";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
   <>
      {/* <div className="p-2 flex gap-2">
         <Link to="/" className="[&.active]:font-bold">
            Home
         </Link>{" "}
         <Link to="/calendar"></Link>
      </div> */}

      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
         <div className="min-h-screen bg-background text-foreground">
            {/* Topbar will now use shadcn's dark mode via useTheme */}
            <Topbar />
            <hr />
            <Outlet />
         </div>
         <TanStackRouterDevtools />
      </ThemeProvider>
   </>
);

export const Route = createRootRoute({ component: RootLayout });

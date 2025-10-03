import { useEffect, useState } from "react";

export function usePathname() {
   const [pathname, setPathname] = useState(() => window.location.pathname);

   useEffect(() => {
      const updatePath = () => setPathname(window.location.pathname);

      // Handle back/forward
      window.addEventListener("popstate", updatePath);

      // Save original methods
      const origPush = history.pushState;
      const origReplace = history.replaceState;

      // Wrap pushState/replaceState
      const wrap = (method: typeof history.pushState) =>
         function (
            this: History,
            data: any,
            unused: string,
            url?: string | URL | null | undefined
         ) {
            const result = method.apply(this, [data, unused, url]);
            updatePath();
            return result;
         };

      history.pushState = wrap(origPush);
      history.replaceState = wrap(origReplace);

      return () => {
         window.removeEventListener("popstate", updatePath);
         history.pushState = origPush;
         history.replaceState = origReplace;
      };
   }, []);

   return pathname;
}

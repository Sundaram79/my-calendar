import App from "@/App";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/calendar")({
   component: calendar,
});

function calendar() {
    return <div>
       <App />
   </div>;
}

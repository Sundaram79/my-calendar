import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
   component: Index,
});

function Index() {
   const navigate = useNavigate();
   const [message, setMessage] = useState("");

   // Hardcoded credentials
   const VALID_USERNAME = "admin";
   const VALID_PASSWORD = "12345";

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const username = formData.get("username") as string;
      const password = formData.get("password") as string;

      if (username === VALID_USERNAME && password === VALID_PASSWORD) {
         setMessage("✅ Login successful!");
         navigate({ to: "/calendar" }); // redirect after login
      } else {
         setMessage("❌ Invalid username or password");
      }
   };

   return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
         <Card className="w-full max-w-md">
         <h1 className="text-center">My Calendar</h1>
            <CardHeader className="text-center">
               <CardTitle className="text-2xl font-bold">User Login</CardTitle>
               <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Username */}
                  <div className="space-y-2">
                     <Label htmlFor="username">Username</Label>
                     <Input id="username" name="username" type="text" placeholder="Enter your username" required />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                     <Label htmlFor="password">Password</Label>
                     <Input id="password" name="password" type="password" placeholder="Enter your password" required />
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full">
                     Login
                  </Button>
               </form>

               {/* Login status message */}
               {message && <p className="mt-3 text-center text-sm font-medium">{message}</p>}
            </CardContent>
         </Card>
      </div>
   );
}

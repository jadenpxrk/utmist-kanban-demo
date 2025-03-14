"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/base/Sidebar/mode-toggle";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Optionally add a timeout if you want to show the landing page briefly
    // before redirecting automatically
    // const timer = setTimeout(() => {
    //   router.push("/dashboard");
    // }, 3000);
    // return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            UTMist Kanban Demo
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <p className="text-center text-muted-foreground">
            Welcome to the UTMist Kanban and Gantt Chart Demo. This application
            showcases a modern React project management interface.
          </p>
          <Button
            onClick={() => router.push("/dashboard")}
            className="w-full"
            variant="utmist"
          >
            Go to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

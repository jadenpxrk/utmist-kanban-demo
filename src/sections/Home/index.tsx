"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "@/components/common/mode-toggle";

export function Home() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            UTMIST Projects Platform Demo
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <p className="text-center text-muted-foreground">
            Dashboard + Kanban Board + Gantt Chart + Settings
          </p>
          <Link href="/dashboard" className="w-full">
            <Button className="w-full" variant="utmist">
              Go to Dashboard
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

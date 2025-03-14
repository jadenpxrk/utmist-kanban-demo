"use client";

import * as React from "react";

import { BarChart, Clock, ListTodo, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="h-full w-full p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Project Dashboard</h1>
          <p className="text-muted-foreground">Project management overview</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/kanban">
            <Button variant="outline">Kanban Board</Button>
          </Link>
          <Link href="/dashboard/gantt">
            <Button variant="outline">Gantt Chart</Button>
          </Link>
        </div>
      </div>

      {/* Dashboard Summary */}
      {/* Don't know what to put here, this is just place holder pretty much */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <ListTodo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              3 added this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground mt-1">
              2 updated today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">
              Up 24% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active on 3 projects
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Projects Section */}
      <h2 className="text-xl font-semibold mb-4">Current Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-all">
          <CardHeader>
            <CardTitle>Frontend Redesign</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Redesigning the UI components for better user experience
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>45%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[45%]"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all">
          <CardHeader>
            <CardTitle>Backend API Development</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Building RESTful API endpoints for data management
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>68%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[68%]"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all">
          <CardHeader>
            <CardTitle>Documentation Project</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Creating comprehensive documentation for developers
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>23%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[23%]"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

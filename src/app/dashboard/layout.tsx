"use client";

import * as React from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "@/sections/Sidebar/AppSidebar";
import { Header } from "@/sections/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

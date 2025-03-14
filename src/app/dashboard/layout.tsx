"use client";

import * as React from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "@/sections/Sidebar/AppSidebar";
import { ClientOnly } from "@/components/common/client-only";
import { Header } from "@/sections/Header";
import { LoadingWrapper } from "@/components/common/loading-wrapper";

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
          <div className="flex-1 overflow-auto">
            <div className="h-full w-full p-6">
              <ClientOnly>
                <LoadingWrapper>{children}</LoadingWrapper>
              </ClientOnly>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

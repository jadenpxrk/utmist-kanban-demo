"use client";

import * as React from "react";

import {
  AudioWaveform,
  Briefcase,
  Calendar,
  Code,
  Command,
  FileText,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  PieChart,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavMain } from "./NavMain";
import { NavProjects } from "./NavProjects";
import { NavUser } from "./NavUser";
import { TeamSwitcher } from "./TeamSwitcher";

// This is sample data.
const data = {
  user: {
    name: "Jaden Park",
    email: "jadenpark@utmist.com",
    avatar: "/avatars/",
  },
  teams: [
    {
      name: "Projects Platform",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Compute Platform",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Web Platform",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Calendar",
      url: "/dashboard/calendar",
      icon: Calendar,
    },
    {
      title: "Kanban Board",
      url: "/dashboard/kanban",
      icon: Frame,
    },
    {
      title: "Gantt Chart",
      url: "/dashboard/gantt",
      icon: PieChart,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ],
  projects: [
    {
      name: "Frontend Redesign",
      url: "#",
      icon: Code,
    },
    {
      name: "Backend API Development",
      url: "#",
      icon: Briefcase,
    },
    {
      name: "Documentation Project",
      url: "#",
      icon: FileText,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

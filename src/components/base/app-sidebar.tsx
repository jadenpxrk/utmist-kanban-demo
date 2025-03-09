"use client";

import * as React from "react";

import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  GitBranch,
  LayoutDashboard,
  Map,
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

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";

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
      title: "Board",
      url: "/board",
      icon: LayoutDashboard,
    },
    {
      title: "Roadmap",
      url: "/roadmap",
      icon: GitBranch,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
  projects: [
    {
      name: "Kanban Board Implementation",
      url: "/",
      icon: Frame,
    },
    {
      name: "Gantt Chart Implementation",
      url: "/gantt",
      icon: PieChart,
    },
    {
      name: "Other Stuff",
      url: "#",
      icon: Map,
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

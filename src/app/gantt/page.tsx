"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/base/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    // BreadcrumbPage,
    // BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/base/mode-toggle";

// Types
interface Task {
    id: number;
    title: string;
    type: string;
    priority: "low" | "medium" | "high";
    assignee: {
        image: string;
        name: string;
    }[];
    start: Date;
    end: Date;
}


const initialTasks: Task[] = [
    {
        id: 1,
        title: "Implement authentication",
        type: "Feature",
        priority: "high",
        assignee: [{
            image: "/avatars/01.png",
            name: "JD",
        }],
        start: new Date("2025-04-01"),
        end: new Date("2025-04-10"),
    },
    {
        id: 2,
        title: "Design system updates",
        type: "Design",
        priority: "medium",
        assignee: [{
            image: "/avatars/02.png",
            name: "AS",
        }, {
            image: "/avatars/01.png",
            name: "JD",
        }],
        start: new Date("2025-04-05"),
        end: new Date("2025-04-15"),
    },
    {
        id: 3,
        title: "Bug fixes in login",
        type: "Bug",
        priority: "low",
        assignee: [{
            image: "/avatars/03.png",
            name: "RK",
        }],
        start: new Date("2025-04-12"),
        end: new Date("2025-04-15"),
    },
    {
        id: 4,
        title: "Implement dashboard",
        type: "Feature",
        priority: "high",
        assignee: [{
            image: "/avatars/04.png",
            name: "JL",
        }],
        start: new Date("2025-04-10"),
        end: new Date("2025-04-25"),
    },
    {
        id: 5,
        title: "Design system updates",
        type: "Design",
        priority: "medium",
        assignee: [{
            image: "/avatars/05.png",
            name: "JL",
        }, {
            image: "/avatars/05.png",
            name: "JL",
        }, {
            image: "/avatars/05.png",
            name: "JL",
        }],
        start: new Date("2025-04-20"),
        end: new Date("2025-05-10"),
    },
    {
        id: 6,
        title: "Bug fixes in dashboard",
        type: "Bug",
        priority: "low",
        assignee: [{
            image: "/avatars/06.png",
            name: "JL",
        }],
        start: new Date("2025-04-28"),
        end: new Date("2025-05-05"),
    }
]

export default function GanttPage() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const sortedTasks = initialTasks.sort((a, b) => a.start.getTime() - b.start.getTime());
        setTasks(sortedTasks);
    }, []);

    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-6 w-full">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="/gantt">Gantt Chart</BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="flex items-center gap-2 ml-auto">
                            <ModeToggle />
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="py-6">
                    <GanttChart tasks={tasks} />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}

function GanttChart({ tasks }: { tasks: Task[] }) {
    const activeMonths = tasks.reduce((months, task) => {
        const startMonth = task.start.getMonth();
        const endMonth = task.end.getMonth() - 1;
        for (let month = startMonth; month <= endMonth; month++) {
            console.log(month);
            if (!months.includes(month)) {
                months.push(month);
            }
        }
        return months;
    }, [] as number[]);

    const numberOfDays = activeMonths.map(month => new Date(2025, month + 1, 0).getDate());

    const startDate = new Date(2025, activeMonths[0] + 1, 1);
    const numberOfWeeksTotal = Math.ceil(numberOfDays.reduce((acc, days) => acc + days, 0) / 7);


    return (
        <ScrollArea className="max-w-[90%]">
            <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-y-2">
                <div></div>

                <div className="flex flex-col gap-2">
                    <div className="flex">
                        {activeMonths.map(month => (
                            <div key={month} className="text-sm bg-gray-200 mr-2 text-center rounded" style={{ width: `${numberOfDays[activeMonths.indexOf(month)]}rem` }}>
                                {new Date(2025, month + 1).toLocaleString("default", { month: "long" })}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between">
                        {Array.from({ length: numberOfWeeksTotal }).map((_, index) => {
                            const weekStart = new Date(startDate);
                            weekStart.setDate(startDate.getDate() + index * 7);
                            const weekEnd = new Date(weekStart);
                            weekEnd.setDate(weekStart.getDate() + 6);

                            return (
                                <div key={index} className="text-sm w-[7rem] bg-gray-200 mr-2 rounded text-center">
                                    {`${weekStart.getDate()}/${weekStart.getMonth() + 1} - ${weekEnd.getDate()}/${weekEnd.getMonth() + 1}`}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-4">
                    {tasks.map(task => (
                        <div key={task.id} className="text-sm whitespace-nowrap h-6">
                            {task.title}
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-2">
                    {tasks.map(task => {
                        const start = (task.start.getTime() - new Date(2025, 3, 1).getTime()) / (1000 * 60 * 60 * 24);
                        const end = (task.end.getTime() - new Date(2025, 3, 1).getTime()) / (1000 * 60 * 60 * 24);
                        return (
                            <div
                                key={task.id}
                                className="relative bg-blue-500 h-6 rounded"
                                style={{
                                    marginLeft: `${start}rem`,
                                    width: `${(end - start)}rem`,
                                }}
                            >
                                {Array.isArray(task.assignee) && task.assignee.map((assignee, i) => (
                                    <Avatar className="h-6 w-6 border-[3px] border-white" key={i} style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: `${i * 15}px`,
                                        transform: "translateY(-50%)",
                                        filter: `brightness(${i === task.assignee.length - 1 ? 1 : 0.8})`,
                                    }}>
                                        <AvatarImage src={assignee.image} />
                                        <AvatarFallback>{assignee.name}</AvatarFallback>
                                    </Avatar>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}
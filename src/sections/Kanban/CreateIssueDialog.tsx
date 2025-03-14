"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useSearch } from "@/hooks/use-search";

export function CreateIssueDialog() {
  const {
    selectedAssignees,
    assigneeSearch,
    setAssigneeSearch,
    filteredAssignees,
    toggleAssignee,
  } = useSearch();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="utmist">Create Issue</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Issue</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column: Title and Description */}
            <div className="flex flex-col h-full gap-4">
              <div>
                <Label
                  id="issueTitle"
                  className="block text-sm font-medium text-foreground"
                >
                  Issue Title
                </Label>
                <Input
                  id="issueTitle"
                  placeholder="Enter issue title"
                  className="mt-1"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <Label
                  id="issueDescription"
                  className="block text-sm font-medium text-foreground"
                >
                  Description
                </Label>
                <Textarea
                  id="issueDescription"
                  placeholder="Enter issue description"
                  className="mt-1 flex-1 w-full p-2 border rounded"
                />
              </div>
            </div>
            {/* Right Column: Priority, Assignees, and Date */}
            <div className="space-y-4">
              <div>
                <Label
                  id="issuePriority"
                  className="block text-sm font-medium text-foreground"
                >
                  Priority
                </Label>
                <Select>
                  <SelectTrigger id="issuePriority" className="mt-1">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="block text-sm font-medium text-foreground">
                  Assignees
                </Label>
                <div className="relative w-full mt-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={assigneeSearch}
                    onChange={(e) => setAssigneeSearch(e.target.value)}
                    placeholder="Search assignees..."
                    className="pl-9"
                  />
                </div>
                <ScrollArea className="mt-2 h-40">
                  <div className="flex flex-col gap-2">
                    {filteredAssignees.map((assignee) => (
                      <div
                        key={assignee.id}
                        onClick={() => toggleAssignee(assignee)}
                        className={`cursor-pointer p-2 rounded border ${
                          selectedAssignees.some((a) => a.id === assignee.id)
                            ? "border-utmist bg-utmist-accent text-utmist"
                            : "border-muted-foreground"
                        }`}
                      >
                        {assignee.name}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              <div>
                <hr className="my-2" />
                <time
                  dateTime={new Date().toISOString()}
                  className="text-sm text-muted-foreground"
                >
                  {`Created ${new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}`}
                </time>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="utmist">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

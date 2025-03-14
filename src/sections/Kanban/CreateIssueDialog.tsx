import * as React from "react";

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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const placeholderAssignees = [
  { id: 1, name: "John Doe", image: "/avatars/01.png" },
  { id: 2, name: "Alice Smith", image: "/avatars/02.png" },
  { id: 3, name: "Robert King", image: "/avatars/03.png" },
  { id: 4, name: "Jaden Park", image: "/avatars/04.png" },
  { id: 5, name: "Tom Zhang", image: "/avatars/05.png" },
];

export function CreateIssueDialog() {
  const [selectedAssignees, setSelectedAssignees] = useState<
    Array<{ id: number; name: string; image: string }>
  >([]);
  const [assigneeSearch, setAssigneeSearch] = useState("");

  const filteredAssignees = placeholderAssignees.filter((assignee) =>
    assignee.name.toLowerCase().includes(assigneeSearch.toLowerCase())
  );

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
                <label
                  htmlFor="issueTitle"
                  className="block text-sm font-medium text-foreground"
                >
                  Issue Title
                </label>
                <Input
                  id="issueTitle"
                  placeholder="Enter issue title"
                  className="mt-1"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <label
                  htmlFor="issueDescription"
                  className="block text-sm font-medium text-foreground"
                >
                  Description
                </label>
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
                <label
                  htmlFor="issuePriority"
                  className="block text-sm font-medium text-foreground"
                >
                  Priority
                </label>
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
                <label className="block text-sm font-medium text-foreground">
                  Assignees
                </label>
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
                        onClick={() => {
                          if (
                            selectedAssignees.some((a) => a.id === assignee.id)
                          ) {
                            setSelectedAssignees(
                              selectedAssignees.filter(
                                (a) => a.id !== assignee.id
                              )
                            );
                          } else {
                            setSelectedAssignees([
                              ...selectedAssignees,
                              assignee,
                            ]);
                          }
                        }}
                        className={`cursor-pointer p-2 rounded border ${
                          selectedAssignees.some((a) => a.id === assignee.id)
                            ? "border-utmist bg-blue-100 text-utmist"
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

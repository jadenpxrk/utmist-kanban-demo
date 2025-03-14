import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { useState } from "react";

// dummy data for people
const dummyPeople = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Alice Smith", email: "alice@example.com" },
  { id: 3, name: "Robert King", email: "robert@example.com" },
  { id: 4, name: "Mary Johnson", email: "mary@example.com" },
  { id: 5, name: "James Brown", email: "james@example.com" },
];

export function ShareProjectDialog() {
  const [peopleSearch, setPeopleSearch] = useState("");

  const filteredPeople = dummyPeople.filter(
    (person) =>
      person.name.toLowerCase().includes(peopleSearch.toLowerCase()) ||
      person.email.toLowerCase().includes(peopleSearch.toLowerCase())
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share Project</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle>Share Project</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <div className="w-full flex flex-col justify-center items-start gap-2">
            <label className="block text-sm font-medium text-foreground">
              Invite by Email
            </label>
            <div className="w-full flex flex-row justify-center items-center gap-2">
              <Input placeholder="Enter email address" />
              <Button variant="utmist" type="submit">
                Send
              </Button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">
              People with Access
            </label>
            <div className="relative w-full mt-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search people..."
                value={peopleSearch}
                onChange={(e) => setPeopleSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <ScrollArea className="h-40 mt-2">
              <div className="flex flex-col gap-2">
                {filteredPeople.map((person) => (
                  <div key={person.id} className="p-2 border rounded">
                    <div className="font-medium">{person.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {person.email}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

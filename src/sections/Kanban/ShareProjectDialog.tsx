"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { useSearch } from "@/hooks/use-search";

export function ShareProjectDialog() {
  const { peopleSearch, setPeopleSearch, filteredPeople } = useSearch();

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
            <Label className="block text-sm font-medium text-foreground">
              Invite by Email
            </Label>
            <div className="w-full flex flex-row justify-center items-center gap-2">
              <Input placeholder="Enter email address" />
              <Button variant="utmist" type="submit">
                Send
              </Button>
            </div>
          </div>
          <div>
            <Label className="block text-sm font-medium text-foreground">
              People with Access
            </Label>
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

import * as React from "react";

import { Check } from "lucide-react";

export function KanbanHeader() {
  return (
    <header className="mb-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Kanban Board</h1>
        <div className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-md">
          <Check className="h-4 w-4 text-utmist" />
          <span className="text-sm text-utmist">Saved</span>
        </div>
      </div>
    </header>
  );
}

import { dummyPeople, placeholderAssignees } from "@/lib/data/kanban-mock";

import { Assignee } from "@/types/kanban";
import { useState } from "react";

export function useSearch() {
  const [selectedAssignees, setSelectedAssignees] = useState<Assignee[]>([]);
  const [assigneeSearch, setAssigneeSearch] = useState("");
  const [peopleSearch, setPeopleSearch] = useState("");

  const filteredAssignees = placeholderAssignees.filter((assignee) =>
    assignee.name.toLowerCase().includes(assigneeSearch.toLowerCase())
  );

  const filteredPeople = dummyPeople.filter(
    (person) =>
      person.name.toLowerCase().includes(peopleSearch.toLowerCase()) ||
      person.email.toLowerCase().includes(peopleSearch.toLowerCase())
  );

  const toggleAssignee = (assignee: Assignee) => {
    if (selectedAssignees.some((a) => a.id === assignee.id)) {
      setSelectedAssignees(
        selectedAssignees.filter((a) => a.id !== assignee.id)
      );
    } else {
      setSelectedAssignees([...selectedAssignees, assignee]);
    }
  };

  return {
    selectedAssignees,
    assigneeSearch,
    setAssigneeSearch,
    peopleSearch,
    setPeopleSearch,
    filteredAssignees,
    filteredPeople,
    toggleAssignee,
  };
}

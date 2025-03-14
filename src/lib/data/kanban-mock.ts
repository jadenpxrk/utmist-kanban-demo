import { Assignee, Person, Tasks } from "@/types/kanban";

// Dummy data for tasks
export const initialTasks: Tasks = {
  todo: [
    {
      id: 1,
      title: "Implement authentication",
      type: "Feature",
      priority: "high",
      assignee: {
        image: "/avatars/01.png",
        name: "JD",
      },
    },
  ],
  inProgress: [
    {
      id: 2,
      title: "Design system updates",
      type: "Design",
      priority: "medium",
      assignee: {
        image: "/avatars/02.png",
        name: "AS",
      },
    },
  ],
  complete: [
    {
      id: 3,
      title: "Bug fixes in login",
      type: "Bug",
      priority: "low",
      assignee: {
        image: "/avatars/03.png",
        name: "RK",
      },
    },
  ],
};

export const placeholderAssignees: Assignee[] = [
  { id: 1, name: "John Doe", image: "/avatars/01.png" },
  { id: 2, name: "Alice Smith", image: "/avatars/02.png" },
  { id: 3, name: "Robert King", image: "/avatars/03.png" },
  { id: 4, name: "Jaden Park", image: "/avatars/04.png" },
  { id: 5, name: "Tom Zhang", image: "/avatars/05.png" },
];

export const dummyPeople: Person[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Alice Smith", email: "alice@example.com" },
  { id: 3, name: "Robert King", email: "robert@example.com" },
  { id: 4, name: "Mary Johnson", email: "mary@example.com" },
  { id: 5, name: "James Brown", email: "james@example.com" },
];

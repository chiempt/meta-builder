export interface ListItem {
  id: string;
  name: string;
  color?: string;
}

export interface FolderItem {
  id: string;
  name: string;
  lists: ListItem[];
}

export interface SpaceItemType {
  id: string;
  name: string;
  color: string;
  folders: FolderItem[];
  lists: ListItem[]; // Lists directly under space
}

export const mockSpaces: SpaceItemType[] = [
  {
    id: "spc-1",
    name: "Roadmap 5x",
    color: "#7B68EE", // Purple
    folders: [
      {
        id: "fld-1",
        name: "Backend Mastery",
        lists: [
          { id: "lst-1", name: "Java Core" },
          { id: "lst-2", name: "Spring Boot" },
        ]
      },
      {
        id: "fld-2",
        name: "Frontend Mastery",
        lists: [
          { id: "lst-3", name: "React JS" },
          { id: "lst-4", name: "Next.js" },
        ]
      }
    ],
    lists: [
      { id: "lst-5", name: "General Discussions" }
    ]
  },
  {
    id: "spc-2",
    name: "Engineering",
    color: "#FF4500", // Orange
    folders: [],
    lists: [
      { id: "lst-6", name: "Bugs & Issues", color: "#E74C3C" },
      { id: "lst-7", name: "Feature Requests" },
    ]
  }
];

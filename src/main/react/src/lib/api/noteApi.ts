export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

const STORAGE_KEY = "metabuilder_mock_notes";

const getNotesFromStorage = (): Note[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);

  // Initial mock data
  const initial: Note[] = [
    { id: "1", title: "Project Architecture", content: "# Architecture\n\nThis is a highly scalable system.", updatedAt: new Date().toISOString() },
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
};

export const noteApi = {
  getNotes: async (): Promise<Note[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return getNotesFromStorage().sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  },

  createNote: async (note: Omit<Note, "id" | "updatedAt">): Promise<Note> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const notes = getNotesFromStorage();
    const newNote: Note = { ...note, id: Math.random().toString(36).substr(2, 9), updatedAt: new Date().toISOString() };
    notes.push(newNote);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    return newNote;
  },

  updateNote: async (id: string, updates: Partial<Note>): Promise<Note> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const notes = getNotesFromStorage();
    const index = notes.findIndex(n => n.id === id);
    if (index === -1) throw new Error("Note not found");
    
    notes[index] = { ...notes[index], ...updates, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    return notes[index];
  }
};

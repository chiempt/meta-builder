export interface Task {
  id: string;
  name: string;
  assignee: string;
  dueDate: string;
  priority: string;
  status: string;
}

const STORAGE_KEY = "metabuilder_mock_tasks";

const getTasksFromStorage = (): Task[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);

  // Initial mock data
  const initial: Task[] = [
    { id: "1", name: "Implement ClickUp layout", assignee: "Chiem Pham", dueDate: "Today", priority: "High", status: "TO DO" },
    { id: "2", name: "Refactor global styles to dark mode", assignee: "Chiem Pham", dueDate: "Tomorrow", priority: "Normal", status: "TO DO" },
    { id: "3", name: "Setup Ant Design strict theme", assignee: "System", dueDate: "Jan 22", priority: "Urgent", status: "IN PROGRESS" },
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
};

export const taskApi = {
  getTasks: async (): Promise<Task[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return getTasksFromStorage();
  },

  createTask: async (task: Omit<Task, "id">): Promise<Task> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const tasks = getTasksFromStorage();
    const newTask: Task = { ...task, id: Math.random().toString(36).substr(2, 9) };
    tasks.push(newTask);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return newTask;
  },

  updateTask: async (id: string, updates: Partial<Task>): Promise<Task> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const tasks = getTasksFromStorage();
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error("Task not found");
    
    tasks[index] = { ...tasks[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return tasks[index];
  },

  deleteTask: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const tasks = getTasksFromStorage();
    const newTasks = tasks.filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
  }
};

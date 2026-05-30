export interface CalendarEvent {
  id: string;
  title: string;
  dateStr: string; // YYYY-MM-DD
  type: 'success' | 'warning' | 'error' | 'default';
}

const STORAGE_KEY = "metabuilder_mock_events";

const getEventsFromStorage = (): CalendarEvent[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);

  const initial: CalendarEvent[] = [
    { id: "1", title: "Implement ClickUp layout", dateStr: "2024-01-08", type: "warning" },
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
};

export const calendarApi = {
  getEvents: async (): Promise<CalendarEvent[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return getEventsFromStorage();
  },

  createEvent: async (event: Omit<CalendarEvent, "id">): Promise<CalendarEvent> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const events = getEventsFromStorage();
    const newEvent: CalendarEvent = { ...event, id: Math.random().toString(36).substr(2, 9) };
    events.push(newEvent);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    return newEvent;
  }
};

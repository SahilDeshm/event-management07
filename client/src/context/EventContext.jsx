import { createContext, useContext, useState } from "react";
import { createEvent, getEventsByProfile, updateEvent } from "../api/event.js";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const loadEvents = async (profileId) => {
    if (!profileId) return;
    const res = await getEventsByProfile(profileId);
    setEvents(res);
  };

  const addEvent = async (payload) => {
    const newEvent = await createEvent(payload);
    setEvents(prev => [...prev, newEvent]);
    return newEvent;
  };

  const editEvent = async (id, updatedEvent) => {
    await updateEvent(id, updatedEvent);
    if (updatedEvent.profiles?.[0]) {
      await loadEvents(updatedEvent.profiles[0]);
    }
  };

  return (
    <EventContext.Provider value={{ events, loadEvents, addEvent, editEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventsContext = () => useContext(EventContext);

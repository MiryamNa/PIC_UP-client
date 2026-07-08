import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { EventCreationDTO } from "../dto/EventCreation";

export interface FamilySelection {
  groom: string | null;
  bride: string | null;
  groomFamily: string[];
  brideFamily: string[];
}

interface EventContextType {
  event: EventCreationDTO | null;
  setEvent: (event: EventCreationDTO) => void;

  selection: FamilySelection;
  setSelection: React.Dispatch<React.SetStateAction<FamilySelection>>;
}

const EventContext = createContext<EventContextType | null>(null);

export function EventProvider({ children }: { children: ReactNode }) {
  const [event, setEvent] = useState<EventCreationDTO | null>(null);

  const [selection, setSelection] = useState<FamilySelection>({
    groom: null,
    bride: null,
    groomFamily: [],
    brideFamily: [],
  });

  return (
    <EventContext.Provider
      value={{
        event,
        setEvent,
        selection,
        setSelection,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEventContext() {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error("useEventContext must be used inside EventProvider");
  }

  return context;
}
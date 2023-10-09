import { Event } from "@prisma/client";
import { create } from "zustand";

interface useEventModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  mode: "create" | "update";
  eventToUpdate?: Event;
  setModeAndEvent: (mode: "create" | "update", eventToUpdate?: Event) => void;
}

export const useEventModal = create<useEventModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  mode: "create",
  eventToUpdate: undefined,
  setModeAndEvent: (mode, eventToUpdate) => {
    set({ mode, eventToUpdate });
  },
}));

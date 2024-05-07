import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from "uuid";
import {
  ZustandState,
  ZustandActions,
} from "./types";

export const useStore = create<ZustandState & ZustandActions>()(
  immer((set) => ({
    // state
    notes: [],
    // actions
    addNote: (note) => set((state) => {
      const newNote = {
        ...note,
        id: uuidv4(),
      };

      state.notes.push(newNote);
    }),
    deleteNote: (id) => set((state) => {
      state.notes = state.notes.filter(note => note.id !== id);
    }),
    editNote: (newNote) => set((state) => {
      const index = state.notes.findIndex((note) => note.id === newNote.id);

      if (index !== -1) {
        state.notes[index] = newNote;
      }
    }),
  }))
);

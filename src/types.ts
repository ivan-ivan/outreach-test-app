import { FunctionComponent } from 'react';

export type NoteActionType = {
  name: 'message' | 'phone' | 'coffee' | 'beer' | 'meeting';
  text: string;
  icon: FunctionComponent;
}

export type NoteType = {
  id: string;
  timestamp: number;
  type: NoteActionType['name'];
  msg: string;
};

export type ZustandState = {
  notes: NoteType[];
};
  
export type ZustandActions = {
  addNote: (note: Omit<NoteType, 'id'>) => void;
  deleteNote: (id: string) => void;
  editNote: (newNote: NoteType) => void;
};

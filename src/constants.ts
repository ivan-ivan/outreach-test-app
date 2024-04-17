import { FunctionComponent } from "react";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import PersonIcon from "@mui/icons-material/Person";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import DefaultIcon from '@mui/icons-material/AddReaction';
import { NoteActionType } from './types';


export const noteActions = [
  { name: 'message', text: 'had a meeting with', icon: ChatBubbleIcon },
  { name: 'phone', text: 'had a call with', icon: PhoneEnabledIcon },
  { name: 'coffee', text: 'had a coffee with', icon: FreeBreakfastIcon },
  { name: 'beer', text: 'had a beer with', icon: SportsBarIcon },
  { name: 'meeting', text: 'added a note', icon: PersonIcon }
] as NoteActionType[];

export const getNoteActionText = (type: NoteActionType['name']): string => {
  return noteActions.find(action => action.name === type)?.text || '';
};

export const getNoteActionIcon = (type: NoteActionType['name']): FunctionComponent => {
  // return noteActions.find(action => action.name === type)?.icon;

  const action = noteActions.find(action => action.name === type);

  return action ? action.icon : DefaultIcon;
};

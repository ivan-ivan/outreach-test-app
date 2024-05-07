import React, { FC, memo, useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Box from '@mui/system/Box';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import styled from '@emotion/styled';
import {NoteActionType, NoteType} from '../../types';
import {getNoteActionIcon, noteActions} from '../../constants';
import { getNoteActionText } from '../../constants';
import { useStore } from "../../store";
import { calculateDaysBetween } from "../../utils/utils";


const BoldTextItem = styled.span`
  color: rgba(18,163,194,255);
  font-weight: bold;
`

type NoteProps = {
  note: NoteType;
  currentUser: string;
  contact: string;
};

const Note: FC<NoteProps>= ({ note, currentUser, contact }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isEditingMode, setIsEditingMode] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(note.msg);
  const [noteType, setNoteType] = useState<NoteActionType['name']>(note.type);
  const deleteNote = useStore((state) => state.deleteNote);
  const editNote = useStore((state) => state.editNote);

  const Icon = getNoteActionIcon(note.type);

  const handleDeleteNote = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEditNote = () => {
    setIsEditingMode(true);
  };

  const handleDoneEditingNote = () => {
    setIsEditingMode(false);

    const newNote = {
      ...note,
      msg: message,
      type: noteType
    };

    editNote(newNote);
  };

  const handleMessageEdit = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
    setMessage(event.currentTarget.value);
  };

  const handleNoteTypeChange = (
      event: React.MouseEvent<HTMLElement>,
      newNoteType: NoteActionType['name'],
  ) => {
    setNoteType(newNoteType);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box bgcolor="rgba(246,246,246,255)">
      <Box display="flex" justifyContent="space-between" width={'50px'} position="absolute" left={60} pt="5px">
        <Box data-testid="feed-time">{calculateDaysBetween(note.timestamp)}d</Box>
        <Icon color="action"/>
      </Box>
      <Box display="flex" justifyContent="space-between" px="10px">
        <Box>
          <Box data-testid="feed-header" my="15px">
            <BoldTextItem>{currentUser}</BoldTextItem>
            <span> {`${getNoteActionText(note.type)} `}</span>
            <BoldTextItem className='feedTextBold'>{contact}</BoldTextItem>
          </Box>
          {isEditingMode ?
              <TextareaAutosize
                  maxRows={4}
                  minRows={4}
                  placeholder="Add a note about Milton Romaguera..."
                  onChange={handleMessageEdit}
                  value={message}
              /> : <Box data-testid="feed-msg" fontSize="small" my="15px">{note.msg}</Box>
          }

          {isEditingMode &&
              <ToggleButtonGroup value={noteType} exclusive onChange={handleNoteTypeChange}>
                {noteActions.map((action: NoteActionType) => {
                  const Icon = action.icon;

                  return (
                      <ToggleButton
                          value={action.name}
                          key={action.name}
                          size="small"
                      >
                        <Icon />
                      </ToggleButton>
                  );
                })}
              </ToggleButtonGroup>
          }
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton onClick={handleDoneEditingNote}>
            <DoneIcon />
          </IconButton>
          <IconButton onClick={handleEditNote}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDeleteNote}>
            <DeleteOutlineIcon />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Typography sx={{ p: 2 }} onClick={() => deleteNote(note.id)}>Delete</Typography>
          </Popover>
        </Box>
      </Box>
    </Box>
  );
};

const isEqual = (prevProps: NoteProps, nextProps: NoteProps) => {
  return prevProps.note.id === nextProps.note.id
    && prevProps.note.timestamp === nextProps.note.timestamp
    && prevProps.note.type === nextProps.note.type
    && prevProps.note.msg === nextProps.note.msg;
}

export default memo(Note, isEqual);

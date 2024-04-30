import React, { FC, memo, useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Box from '@mui/system/Box';
import styled from '@emotion/styled';
import { NoteType } from '../../types';
import { getNoteActionIcon } from '../../constants';
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
  const deleteNote = useStore((state) => state.deleteNote);

  const Icon = getNoteActionIcon(note.type);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
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
          <Box data-testid="feed-msg" fontSize="small" my="15px">{note.msg}</Box>
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton onClick={handleClick}>
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

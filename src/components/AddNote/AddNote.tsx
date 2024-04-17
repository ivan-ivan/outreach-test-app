import { FC, useState, ChangeEventHandler, SyntheticEvent } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { FormControl as BaseFormControl } from '@mui/base/FormControl';
import Box from '@mui/system/Box';
import styled from '@emotion/styled';
import { NoteActionType } from '../../types';
import { noteActions } from '../../constants';
import { useStore } from "../../store";


const Textarea = styled(BaseTextareaAutosize)`
    width: 100%;
`;

const Form = styled(BaseFormControl)`
    background-color: rgba(246,246,246,255);
    padding: 10px;
`;


const AddNote: FC = () => {
  const addNote = useStore((state) => state.addNote);

  const [msg, setMsg] = useState<string>();
  const [noteActionType, setNoteActionType] = useState<NoteActionType['name']>();

  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault();

    if (msg && noteActionType) {
      const timestamp = (new Date()).getTime();

      addNote({ timestamp, msg, type: noteActionType });

      setMsg('');
      setNoteActionType(undefined);
    }
  };

  const handleInput: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setMsg(event.currentTarget.value)
  }

  return (
    <Form data-testid="add-note">
      <Textarea
        maxRows={4}
        minRows={4}
        placeholder="Add a note about Milton Romaguera..."
        onChange={handleInput}
        value={msg}
        data-testid="add-note-input"
      />
      <Box display="flex" justifyContent="space-between" my="10px" mx={0}>
        <Box display="flex" gap="15px">
          {noteActions.map((action: NoteActionType) => {
            const Icon = action.icon;

            return (
              <IconButton
                key={action.name}
                onClick={() => setNoteActionType(action.name)}
              >
                <Icon sx={{ fontSize: 20 }} />
              </IconButton>
            );
          })}
        </Box>
        <Button
          variant="outlined"
          size="small"
          data-testid="add-note-submit"
          disabled={!msg}
          onClick={submitHandler}
        >
          Submit
        </Button>
      </Box>
    </Form>
  );
};

export default AddNote;

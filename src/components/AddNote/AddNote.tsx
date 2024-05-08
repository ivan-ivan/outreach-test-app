import { FC, useState, ChangeEventHandler } from 'react';
import Button from '@mui/material/Button';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
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

  const [message, setMessage] = useState<string>('');
  const [noteActionType, setNoteActionType] = useState<NoteActionType['name'] | null>(null);

  const clearInput = () => {
    setMessage('');
    setNoteActionType(null);
  };

  const submitHandler = () => {
    if (message && noteActionType) {
      const timestamp = (new Date()).getTime();

      addNote({ timestamp, msg: message, type: noteActionType });

      clearInput();
    }
  };

  const handleInput: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setMessage(event.currentTarget.value)
  }

  const handleNoteTypeChange = (
      event: React.MouseEvent<HTMLElement>,
      newNoteType: NoteActionType['name'] | null,
  ) => {
    setNoteActionType(newNoteType);
  };

  const isSubmitDisabled = !message || !noteActionType;

  return (
    <Form data-testid="add-note">
      <Textarea
        maxRows={4}
        minRows={4}
        placeholder="Add a note about Milton Romaguera..."
        onChange={handleInput}
        value={message}
        data-testid="add-note-input"
      />
      <Box display="flex" justifyContent="space-between" my="10px" mx={0}>
        <ToggleButtonGroup value={noteActionType} exclusive onChange={handleNoteTypeChange}>
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
        <Button
          variant="outlined"
          size="small"
          data-testid="add-note-submit"
          disabled={isSubmitDisabled}
          onClick={submitHandler}
        >
          Submit
        </Button>
      </Box>
    </Form>
  );
};

export default AddNote;

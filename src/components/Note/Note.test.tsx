import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // This is for Jest-specific matchers
import { vi } from 'vitest';
import Note from './Note';

vi.mock('../../utils/utils', () => ({
  calculateDaysBetween: vi.fn(() => '5'),
}));

// Define mock data for the note
const note = {
  id: '1',
  timestamp: 1617605600000, // Adjust this timestamp to the appropriate value
  type: 'some_type',
  msg: 'Test message',
};

const currentUser = 'Current User';
const contact = 'Contact Name';

describe('Note component', () => {
  it('renders the note correctly', () => {
    // @ts-ignore
    render(<Note note={note} currentUser={currentUser} contact={contact} />);

    // Verify note elements
    expect(screen.getByTestId('feed-time')).toHaveTextContent('5d');
    expect(screen.getByTestId('feed-header')).toHaveTextContent(currentUser);
    expect(screen.getByTestId('feed-header')).toHaveTextContent(contact);
    expect(screen.getByTestId('feed-msg')).toHaveTextContent(note.msg);
  });
});

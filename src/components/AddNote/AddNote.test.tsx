import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddNote from './AddNote';

describe('AddNote component', () => {
    it('renders the component correctly', () => {
        render(<AddNote />);

        expect(screen.getByTestId('add-note')).toBeInTheDocument();
        expect(screen.getByTestId('add-note-input')).toBeInTheDocument();
        expect(screen.getByTestId('add-note-submit')).toBeInTheDocument();
    });

    it('initially disables the submit button', () => {
        render(<AddNote />);

        const submitButton = screen.getByTestId('add-note-submit');
        expect(submitButton).toBeDisabled();
    });
});

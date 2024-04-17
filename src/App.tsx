import Note from './components/Note/Note';
import AddNote from './components/AddNote/AddNote';
import { useStore } from "./store";
import './App.css'

const currentUser = 'You';
const contact = 'Milton Romaguera';

function App() {
  const notes = useStore((state) => state.notes);

  return (
    <div className="container">
      <AddNote />

      {notes.map((note) =>
        <Note key={note.id} note={note} currentUser={currentUser} contact={contact} />
      )}
    </div>
  )
}

export default App

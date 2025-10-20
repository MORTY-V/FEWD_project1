import { useState } from 'react'
import './App.css'
import HeaderBar from './Header/Header'
import NewNote from './Tasker/Tasker'
import CreatedNote from './Sticky_note/Sticky_note'

type Item = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {

  const [notes, setNotes] = useState<Array<{title: string; description: Item[]; date?: string | null}>>([]);

  const addNote = (title: string, description: Item[], date: Date | null) => {
    const newNotes = [];
    for (let i = 0; i < notes.length; i++) {
      newNotes.push(notes[i]);
    }
    newNotes.push({ title, description, date: date ? date.toISOString() : null });
    setNotes(newNotes);
  };

  const handleDeleteNote = (noteId: number) => {
    setNotes(notes.filter((_, index) => index !== noteId));
  };

  return (
    <>
      <div id="headerDiv">
        <HeaderBar/>
      </div>
      <div id="newNoteDiv">
        <NewNote addNote={addNote} />
      </div>
      <div id="createdNotes">
        {notes.map((note, index) => (
          <CreatedNote
            key={index}
            noteId={index}
            title={note.title}
            description={note.description}
            date={note.date}
            onDeleteNote={handleDeleteNote}
          />
        ))}
      </div>
    </>
  )
}

export default App
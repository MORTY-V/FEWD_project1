import { useState } from 'react'
import './App.css'
import HeaderBar from './Header/Header'
import NewNote from './Tasker/Tasker'
import CreatedNote from './Stick_note/Sticky_note'


function App() {
  const [notes, setNotes] = useState<Array<{title: string; description: string; date?: string | null}>>([]);

  const addNote = (title: string, description: string, date: Date | null) => {
    const newNotes = [];
    for (let i = 0; i < notes.length; i++) {
      newNotes.push(notes[i]);
    }
    newNotes.push({ title, description, date: date ? date.toISOString() : null });
    setNotes(newNotes);
  };

  const deleteNote = (index: number) => {
    const newNotes = [];
    for (let i = 0; i < notes.length; i++) {
      if (i !== index) {
        newNotes.push(notes[i]);
      }
    }
    setNotes(newNotes);
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
            title={note.title}
            description={note.description}
            date={note.date}
            onDelete={() => deleteNote(index)}
          />
        ))}
      </div>
    </>
  )
}

export default App

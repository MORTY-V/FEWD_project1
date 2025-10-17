import { useState } from 'react';
import './Sticky_note.css';

type CreatedNoteProps = {
  title: string;
  description: string;
  date?: string | null;
};

export default function CreatedNote({ title, description, date }: CreatedNoteProps) {
    const [isCompleted, setIsCompleted] = useState(false);

    const handleComplete = () => {
        setIsCompleted(!isCompleted);
    };

    return (
        <div id="note" className={isCompleted ? 'completed' : ''}>
            <div className='sticky-top'></div>
            <h1 className="title">{title}</h1>
            <h2 id="description">{description}</h2>
            {date ? <div id="note-date">{new Date(date).toLocaleDateString()}</div> : null}
            <button id="complete" onClick={handleComplete}></button>
        </div>
    );
}

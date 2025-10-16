import './Sticky_note.css';

type CreatedNoteProps = {
  title: string;
  description: string;
    date?: string | null;
    onDelete: () => void;
};
export default function CreatedNote({ title, description, date, onDelete }: CreatedNoteProps) {
    return (
        <div id="note">
            <h1 id="title">{title}</h1>
                        <h2 id="description">{description}</h2>
                        {date ? <div id="note-date">{new Date(date).toLocaleDateString()}</div> : null}
            <button id="delete" onClick={onDelete}>Delete</button>
        </div>
    );
}
import './Sticky_note.css';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface StickyNoteProps {
  task: Task;
  onToggleComplete: (id: number) => void;
}

export default function StickyNote({ task, onToggleComplete }: StickyNoteProps) {
  return (
    <div className={`sticky-note ${task.completed ? 'completed' : ''}`}>
      <p className="sticky-text">{task.text}</p>

      <div className="sticky-buttons">
        <button
          className={`circle-btn ${task.completed ? 'active' : ''}`}
          onClick={() => onToggleComplete(task.id)}
          aria-label="Mark complete"
        />
      </div>
    </div>
  );
}


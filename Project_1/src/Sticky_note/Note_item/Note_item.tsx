import "./Note_item.css"

type NoteItemProps = {
    id: number;
    text: string;
    completed: boolean;
    onToggle: (id: number) => void;
  };
  
  export const ListItem = ({ id, text, completed, onToggle}: NoteItemProps) => {
    return (
      <li className="list-item">
        <button
          onClick={() => onToggle(id)}
          className={`checkbox-button ${completed ? 'checked' : ''}`}
        >
          {completed && (
            <span className="checkbox-icon">✕</span>
          )}
        </button>
        <span className={`item-text ${completed ? 'completed' : ''}`}>
          {text}
        </span>
      </li>
    );
  };
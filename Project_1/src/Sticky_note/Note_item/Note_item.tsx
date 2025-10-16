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

//possible parent state
//
/*

const handleToggle = (id: number) => {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, completed: !item.completed }  // Toggle this item
        : item  // Keep other items unchanged
    ));
  };

  return (
    <div>
      <ul>
        {items.map(item => (
          <ListItem
            key={item.id}
            id={item.id}
            text={item.text}
            completed={item.completed}
            onToggle={handleToggle}
          />
        ))}
      </ul>
    </div>
  );
};

*/
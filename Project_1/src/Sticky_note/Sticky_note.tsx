import { useState } from 'react';
import './Sticky_note.css';
import { ListItem } from './Note_item/Note_item'; 
import { HamburgerMenu } from './Hamburger_menu/Hamburger_menu';

type CreatedNoteProps = {
  title: string;
  description: Item[];
  date?: string | null;
  noteId: number;
  onDeleteNote: (noteId: number) => void;
};

type Item = {
    id: number;
    text: string;
    completed: boolean;
};

export default function CreatedNote({ title, description, date, noteId, onDeleteNote }: CreatedNoteProps) {
    const [isCompleted, setIsCompleted] = useState(false);

    const [items, setItems] = useState<Item[]>(description);
    const [showMenu, setShowMenu] = useState(false);

    const handleComplete = () => {
        setIsCompleted(!isCompleted);
    };

    const handleToggle = (id: number) => {
        setItems(items.map(item => 
          item.id === id 
            ? { ...item, completed: !item.completed }
            : item
        ));
      };

      const handleAddItem = (_noteId: number, text: string) => {
        const newItem: Item = {
          id: Date.now(),
          text: text,
          completed: false
        };
        setItems([...items, newItem]);
      };
    
      const handleEditItem = (_noteId: number, itemId: number, newText: string) => {
        
        setItems(items.map(item =>
          item.id === itemId ? { ...item, text: newText } : item
        ));
      };
    
      const handleRemoveItem = (_noteId: number, itemId: number) => {
        setItems(items.filter(item => item.id !== itemId));
      };
    
      const handleDeleteNote = (noteId: number) => {
        onDeleteNote(noteId); // Call parent's delete function
      };
    
      const openMenu = () => {
        setShowMenu(true);
      };
    
      const closeMenu = () => {
        setShowMenu(false);
      };
    
    return (
        <>
            <div id="note" className={isCompleted ? 'completed' : ''}>
                <div className='sticky-top'></div>
                <h1 className="title">{title}
                <button className="Hamburger" onClick={openMenu}> ⋮ </button>
                </h1>
                <h2 id="description">
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
                </h2>
                {date ? <div id="note-date">{new Date(date).toLocaleDateString()}</div> : null}
                <button id="complete" onClick={handleComplete}></button>
            </div>

            {showMenu && (
                <HamburgerMenu
                noteId={noteId}
                onClose={closeMenu}
                onDelete={handleDeleteNote}
                onAddItem={handleAddItem}
                onEditItem={handleEditItem}
                onRemoveItem={handleRemoveItem}
                items={items}
                />
            )}
        </>
    );
}

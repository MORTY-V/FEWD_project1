import './Hamburger_menu.css';
import { useState } from 'react';

type Item = {
  id: number;
  text: string;
  completed: boolean;
};

type HamburgerMenuProps = {
  noteId: number;
  onClose: () => void;
  onDelete: (noteId: number) => void;
  onAddItem: (noteId: number, text: string) => void;
  onEditItem: (noteId: number, itemId: number, newText: string) => void;
  onRemoveItem: (noteId: number, itemId: number) => void;
  items: Item[];
};

export const HamburgerMenu = ({ noteId, onClose, onDelete, onAddItem, onEditItem, onRemoveItem, items }: HamburgerMenuProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [newItemText, setNewItemText] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDeleteNote = () => {
    onDelete(noteId);
    onClose();
  };

  const handleAddItem = () => {
    if (newItemText.trim()) {
      onAddItem(noteId, newItemText);
      setNewItemText('');
    }
  };

  const handleStartEdit = (itemId: number, currentText: string) => {
    setEditingItemId(itemId);
    setEditText(currentText);
  };

  const handleSaveEdit = () => {
    if (editText.trim() && editingItemId !== null) {
      onEditItem(noteId, editingItemId, editText);
      setEditingItemId(null);
      setEditText('');
    }
  };

  const handleRemoveItem = (itemId: number) => {
    onRemoveItem(noteId, itemId);
  };

  return (
    <div className="menu-overlay">
      <div className="menu-container">
        <div className="menu-header">
          <h3>Note Options</h3>
          <button onClick={onClose} className="close-button">x</button>
        </div>

        {!isEditing ? (
          <div className="button-group">
            <button onClick={handleEdit} className="edit-button"> Edit Items </button>
            <button onClick={handleDeleteNote} className="delete-button"> Delete Note </button>
          </div>
        ) : (
          <div>
            <h4>Edit Items</h4>
            
            <div className="add-item-section">
              <label className="section-label">Add New Item:</label>
              <input
                type="text"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                placeholder="Enter new item"
                className="text-input"
              />
              <button onClick={handleAddItem} className="add-button"> Add </button>
            </div>

            <div>
              <label className="section-label">Edit or Remove Items:</label>
              {items.map(item => (
                <div key={item.id} className="item-container">
                  {editingItemId === item.id ? (
                    <div>
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="text-input edit-input"
                      />
                      <button onClick={handleSaveEdit} className="save-button"> Save </button>
                      <button onClick={() => setEditingItemId(null)} className="cancel-button"> Cancel </button>
                    </div>
                  ) : (
                    <div className="item-row">
                      <span>{item.text}</span>
                      <div>
                        <button onClick={() => handleStartEdit(item.id, item.text)} className="item-edit-button"> Edit </button>
                        <button onClick={() => handleRemoveItem(item.id)} className="item-remove-button"> Remove </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button onClick={() => setIsEditing(false)} className="done-button"> Done </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Parent component example

/*
export default function StickyNoteApp() {
  const [notes, setNotes] = useState([
    {
      id: 1, title: 'title',
      items: [
        { id: 1, text: 'Buy groceries', completed: false },
        { id: 2, text: 'Walk the dog', completed: false }
      ]
    },
    {
      id: 2, title: 'another title',
      items: [
        { id: 3, text: 'Finish report', completed: false },
        { id: 4, text: 'Email client', completed: false }
      ]
    }
  ]);

  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const handleDeleteNote = (noteId: number) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  const handleAddItem = (noteId: number, text: string) => {
    setNotes(notes.map(note => {
      if (note.id === noteId) {
        const newItem = {
          id: Date.now(),
          text: text,
          completed: false
        };
        return { ...note, items: [...note.items, newItem] };
      }
      return note;
    }));
  };

  const handleEditItem = (noteId: number, itemId: number, newText: string) => {
    setNotes(notes.map(note => {
      if (note.id === noteId) {
        return {
          ...note,
          items: note.items.map(item => item.id === itemId ? { ...item, text: newText } : item)
        };
      }
      return note;
    }));
  };

  const handleRemoveItem = (noteId: number, itemId: number) => {
    setNotes(notes.map(note => {
      if (note.id === noteId) {
        return {
          ...note,
          items: note.items.filter(item => item.id !== itemId)
        };
      }
      return note;
    }));
  };

  const openMenu = (noteId: number) => {
    setActiveMenu(noteId);
  };

  const closeMenu = () => {
    setActiveMenu(null);
  };

  return (
    <div className="app-container">
      <h1>My Sticky Notes</h1>
      <div className="notes-grid">
        {notes.map(note => (
          <div key={note.id} className="sticky-note">
            <div className="note-header">
              <h3>{note.title}</h3>
              <button onClick={() => openMenu(note.id)} className="menu-trigger"> ⋮ </button>
            </div>
            <ul className="note-items">
              {note.items.map(item => (<li key={item.id}> • {item.text} </li>))}
            </ul>
          </div>
        ))}
      </div>

      {activeMenu !== null && (
        <HamburgerMenu
          noteId={activeMenu}
          onClose={closeMenu}
          onDelete={handleDeleteNote}
          onAddItem={handleAddItem}
          onEditItem={handleEditItem}
          onRemoveItem={handleRemoveItem}
          items={notes.find(n => n.id === activeMenu)?.items || []}
        />
      )}
    </div>
  );
}

*/
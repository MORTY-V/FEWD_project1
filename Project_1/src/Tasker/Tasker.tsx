import { useState } from 'react';
import StickyNote from '../Stick_note/Sticky_note';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function Tasker() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const toggleComplete = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };


  return (
    <div>
      <h1>Sticky Note Tasks</h1>
      
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div>
        {tasks.map((task) => (
          <StickyNote
            key={task.id}
            task={task}
            onToggleComplete={toggleComplete}
          />
        ))}
      </div>

      {tasks.length === 0 && <p>No tasks yet. Add one to get started!</p>}
    </div>
  );
}
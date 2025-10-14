import React, { useState } from 'react'
import Calendar from './Calendar_pick/Calendar_pick';
import './Tasker.css'

type InputBoxProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    id?: string;
    name?: string;
};

function InputBox({ value, onChange, placeholder, id, name }: InputBoxProps) {
    return (
        <div id="inputField">
            <input name={name} value={value} onChange={onChange} placeholder={placeholder} id={id} />
        </div>
    );
}

type NewNoteProps = {
    addNote: (title: string, description: string, date: Date | null) => void;
};

export default function NewNote({ addNote }: NewNoteProps) {
    const [inputs, setInputs] = useState({ title: '', description: '' });
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newInputs: { title: string; description: string } = { title: '', description: '' };
    for (const key in inputs) {
      newInputs[key as 'title' | 'description'] = inputs[key as 'title' | 'description'];
    }
    newInputs[name as 'title' | 'description'] = value;
    setInputs(newInputs);
    };

    const handleCreate = () => {
        addNote(inputs.title, inputs.description, selectedDate);
        setInputs({ title: '', description: '' });
        setSelectedDate(null);
    };

    return(
        <div id='newNote'>
            <InputBox name="title" value={inputs.title} onChange={handleChange} placeholder="Title" id="title"/>
            <InputBox name="description" value={inputs.description} onChange={handleChange} placeholder="Description" id="description"/>
            <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
            <button onClick={handleCreate}>Create</button>
        </div>
    );
}
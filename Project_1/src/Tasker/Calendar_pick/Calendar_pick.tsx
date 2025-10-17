import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar_pick.css';

type CalendarProps = {
    selectedDate: Date | null;
    onDateChange: (date: Date | null) => void;
};

export default function Calendar({ selectedDate, onDateChange }: CalendarProps) {
    return (
        <div>
            <DatePicker
                selected={selectedDate}
                onChange={(date: Date | null) => onDateChange(date)}
                placeholderText='Select a Date'
            />
        </div>
    );
}
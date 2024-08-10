import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { IoMdCalendar } from 'react-icons/io';

const DateTimePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}><IoMdCalendar /></button>
      {isOpen && (
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          showTimeSelect
          dateFormat="Pp"
        />
      )}
    </div>
  );
};

export default DateTimePicker;

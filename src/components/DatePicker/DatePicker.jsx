import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./DatePicker.scss";
import MyCalendar from "../Calendar/Calendar";

const MyDatePicker = () => {
  const [selected, setSelected] = useState(null);

  // Sample events for the calendar (replace with your actual events data)
  const events = [
    {
      title: "Meeting",
      start: new Date(),
      end: new Date(),
    },
  ];

  return (
    <div className="datepicker__wrapper">
      {/* Conditionally render DayPicker only when no date is selected */}
      {!selected && (
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          footer={
            selected
              ? `Selected: ${selected.toLocaleDateString()}`
              : "Pick a day."
          }
        />
      )}

      {/* Render MyCalendar when a date is selected */}
      {selected && (
        <div className="big-calendar-wrapper">
          <MyCalendar date={selected} events={events} />

          {/* Button to go back to the date picker */}
          <button onClick={() => setSelected(null)} className="go-back-button">
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default MyDatePicker;


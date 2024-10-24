import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import moment from 'moment';
import AddEventModal from '../AddEventModal/AddEvent';
import Modal from 'react-modal'; // Import Modal for additional setup

// Ensure you set the app element for the modal (required for accessibility)
Modal.setAppElement('#root');

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null); // Store selected slot for modal
  const calendarRef = useRef(null);

  const onEventAdded = async (event) => {
    let calendarApi = calendarRef.current.getApi();
    // Add event to the calendar visually
    calendarApi.addEvent(event);

    // After adding the event visually, send POST request to the backend
    try {
      const newAppointment = {
        startTime: event.start,  // Start time from the event
        endTime: event.end,      // End time from the event
        status: "scheduled"
      };

      console.log("Sending appointment to backend:", newAppointment); // Debugging the POST request

      // Send POST request to create appointment
      await axios.post("http://localhost:8080/appointments", newAppointment);

      // Once the POST is successful, refresh the appointments by fetching updated list
      fetchAppointments();
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  // Fetch appointments when the component mounts
  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/calendar", {
        params: {
          startDate: moment().startOf("week").format("YYYY-MM-DD"),
          endDate: moment().endOf("week").format("YYYY-MM-DD"),
        },
      });

      if (Array.isArray(response.data)) {
        const formattedEvents = response.data.map((appointment) => ({
          title: appointment.volunteer,  // Set volunteer name as title
          start: appointment.date,       // Appointment start time
          end: appointment.date,         // Appointment end time
        }));
        setEvents(formattedEvents);  // Update calendar with fetched appointments
      }
    } catch (error) {
      console.error("Error fetching appointments", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSelect = (selectionInfo) => {
    console.log("Slot selected:", selectionInfo);
    setSelectedSlot({
      start: selectionInfo.startStr,
      end: moment(selectionInfo.startStr).add(30, 'minutes').format(),
    });
    setModalOpen(true); // Open the modal when a slot is selected
  };

  return (
    <div className="calendar-container" id="calendar">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={events}
        selectable={true}
        select={handleSelect} // Handle slot selection to open modal
        eventClick={(clickInfo) => console.log("Event clicked:", clickInfo.event)} // Event debugging
        slotDuration="00:30:00"
        slotMinTime="07:00:00"
        slotMaxTime="19:00:00"
        initialDate={new Date()}
        headerToolbar={{
          right: 'prev,next today',
          center: 'title',
          left: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
      />
      {modalOpen && selectedSlot && (
        <AddEventModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onEventAdded={async (event) => {
            // When the event is added via modal, update the calendar
            await onEventAdded({
              ...event,
              start: selectedSlot.start,
              end: selectedSlot.end,
            });
            setModalOpen(false); // Close modal after adding the event
          }}
          selectedSlot={selectedSlot} // Pass the selected slot to modal
        />
      )}
    </div>
  );
};

export default MyCalendar;











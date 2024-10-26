import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import moment from 'moment';
import AddAppModal from '../AddAppModal/AddAppModal';
import Modal from 'react-modal';
import "./Calendar.scss";

Modal.setAppElement('#root');

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const calendarRef = useRef(null);

  const onEventAdded = async (event) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent(event);

    try {
      const newAppointment = {
        startTime: event.start,
        endTime: event.end,
        status: "scheduled"
      };

      console.log("Sending appointment to backend:", newAppointment);

      await axios.post("http://localhost:8080/appointments", newAppointment);

      fetchAppointments();
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/calendar", {
        params: {
          startDate: moment().startOf("week").format("YYYY-MM-DD"),
          endDate: moment().endOf("week").format("YYYY-MM-DD"),
        },
      });
  
      let formattedEvents = [];
      if (Array.isArray(response.data)) {
        formattedEvents = response.data.map((appointment) => ({
          title: appointment.volunteer,
          start: appointment.date,
          end: appointment.date,
        }));
      }
  
      // Generate "Available" events for each 30-minute slot from 7 AM to 7 PM
// Generate "Available" events for each 30-minute slot from 7 AM to 7 PM
const availableSlots = [];
const startTime = moment().startOf("week").hour(7);
const endTime = moment().startOf("week").hour(19);

for (let day = 0; day < 7; day++) {
  let timeSlot = startTime.clone().add(day, 'days');
  while (timeSlot.isBefore(endTime.clone().add(day, 'days'))) {
    const slotStart = timeSlot.format();
    const slotEnd = timeSlot.clone().add(30, 'minutes').format();
    if (!formattedEvents.some(e => moment(e.start).isSame(slotStart))) {
      availableSlots.push({
        title: "Available",
        start: slotStart,
        end: slotEnd,
        display: "background", // Ensures it shows as a background event
        classNames: ["available-event"] // Custom class for styling
      });
    }
    timeSlot.add(30, 'minutes');
  }
}

setEvents([...availableSlots, ...formattedEvents]);

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
    setModalOpen(true);
  };

  return (
    <main className="main-container">
      <div className="calendar-container" id="calendar">
        <h1>Donation Calendar</h1>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          events={events}
          selectable={true}
          select={handleSelect}
          eventClick={(clickInfo) => console.log("Event clicked:", clickInfo.event)}
          slotDuration="00:30:00"
          slotMinTime="07:00:00"
          slotMaxTime="19:00:00"
          initialDate={new Date()}
          allDaySlot={false}
          height="auto"
          headerToolbar={{
            right: 'prev,next today',
            center: 'title',
            left: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
        />
        {modalOpen && selectedSlot && (
          <AddAppModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onEventAdded={async (event) => {
              await onEventAdded({
                ...event,
                start: selectedSlot.start,
                end: selectedSlot.end,
              });
              setModalOpen(false);
            }}
            selectedSlot={selectedSlot}
          />
        )}
      </div>
    </main>
  );
};

export default MyCalendar;












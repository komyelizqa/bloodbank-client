import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import moment from 'moment';
import AddAppModal from '../AddAppModal/AddAppModal';
import Modal from 'react-modal';


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

      console.log("Sending appointment to backend:", newAppointment); // Debugging the POST request

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

      if (Array.isArray(response.data)) {
        const formattedEvents = response.data.map((appointment) => ({
          title: appointment.volunteer,
          start: appointment.date,
          end: appointment.date,
        }));
        setEvents(formattedEvents);
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
    setModalOpen(true);
  };

  return (
    <div className="calendar-container" id="calendar">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={events}
        selectable={true}
        select={handleSelect}
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
  );
};

export default MyCalendar;











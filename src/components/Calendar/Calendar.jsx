import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import moment from 'moment';
import AddAppModal from '../AddAppModal/AddAppModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import Modal from 'react-modal';
import "./Calendar.scss";

Modal.setAppElement('#root');

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
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

      await axios.post("http://localhost:8080/appointments", newAppointment);
      fetchAppointments();
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  const onDeleteConfirmed = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:8080/appointments/${appointmentId}`);
      fetchAppointments();
    } catch (error) {
      console.error("Error deleting appointment:", error);
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
  
      const formattedEvents = response.data.map((appointment) => ({
        id: appointment.appointmentId,
        title: appointment.volunteer,
        start: appointment.startTime,
        end: appointment.endTime,
      }));
  
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching appointments", error);
    }
  };
  
  

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSelect = (selectionInfo) => {
    setSelectedSlot({
      start: selectionInfo.startStr,
      end: moment(selectionInfo.startStr).add(30, 'minutes').format(),
    });
    setModalOpen(true);
  };

const handleEventClick = (clickInfo) => {
  console.log("Event clicked:", clickInfo.event.id);
  setSelectedEventId(clickInfo.event.id);
  setDeleteModalOpen(true);
};


  return (
    <main className="calendar__main-container">
      <div className="calendar__calendar-container" id="calendar">
        <h1>Donation Calendar</h1>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          events={events}
          editable={true}
          selectable={true}
          select={handleSelect}
          eventClick={handleEventClick}
          slotDuration="00:30:00"
          slotLabelInterval="00:30"
          slotMinTime="07:00:00"
          slotMaxTime="19:00:00"
          initialDate={new Date()}
          allDaySlot={false}
          slotLabelFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }}
          height="auto"
          headerToolbar={{
            right: 'prev,next today',
            center: 'title',
            left: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          dayHeaderFormat={{
            weekday: 'short',
            day: 'numeric',
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
        {deleteModalOpen && selectedEventId && (
          <DeleteModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onDeleteConfirmed={onDeleteConfirmed}
            appointmentId={selectedEventId}
          />
        )}
      </div>
    </main>
  );
};

export default MyCalendar;



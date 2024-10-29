import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import AddAppModal from "../AddAppModal/AddAppModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import "./Calendar.scss";
import {
  onAppAdded,
  onDeleteConfirmed,
  handleDatesSet,
} from "../../utils/calendarRequests";

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const calendarRef = useRef(null);
  const navigate = useNavigate();
  const { type, year, month, day } = useParams();

  useEffect(() => {
    if (!type || !year || !month || !day) {
      const currentDate = new Date();
      const initialYear = moment(currentDate).format("YYYY");
      const initialMonth = moment(currentDate).format("MM");
      const initialDay = moment(currentDate).format("DD");

      navigate(`/calendar/week/${initialYear}/${initialMonth}/${initialDay}`, {
        replace: true,
      });
    }
  }, [type, year, month, day, navigate]);

  const handleSelect = (selectionInfo) => {
    setSelectedSlot({
      start: selectionInfo.startStr,
      end: moment(selectionInfo.startStr).add(30, "minutes").format(),
    });
    setModalOpen(true);
  };

  const handleEventClick = (clickInfo) => {
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
          datesSet={(dateInfo) => handleDatesSet(dateInfo, navigate, setEvents)}
          eventClick={handleEventClick}
          slotDuration="00:30:00"
          slotLabelInterval="00:30"
          slotMinTime="07:00:00"
          slotMaxTime="19:00:00"
          initialDate={new Date()}
          allDaySlot={false}
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          height="auto"
          headerToolbar={{
            right: "prev,next today",
            center: "title",
            left: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          dayHeaderFormat={{
            weekday: "short",
            day: "numeric",
          }}
        />

        {modalOpen && selectedSlot && (
          <AddAppModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onAppAdded={async (event) => {
              await onAppAdded(
                {
                  ...event,
                  start: selectedSlot.start,
                  end: selectedSlot.end,
                },
                calendarRef.current.getApi()
              );
              setModalOpen(false);
            }}
            selectedSlot={selectedSlot}
          />
        )}
        {deleteModalOpen && selectedEventId && (
          <DeleteModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onDeleteConfirmed={async () => {
              const calendarApi = calendarRef.current.getApi();
              await onDeleteConfirmed(
                selectedEventId,
                setEvents,
                setSelectedEventId,
                setDeleteModalOpen,
                calendarApi
              );
            }}
            appointmentId={selectedEventId}
          />
        )}
      </div>
    </main>
  );
};

export default MyCalendar;

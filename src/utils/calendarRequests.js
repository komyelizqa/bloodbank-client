import axios from 'axios';
import moment from 'moment';
import generateAvailableSlots from './generateAvailableSlots';

export const onAppAdded = async (event, calendarApi) => {
  try {
    const newAppointment = {
      startTime: event.start,
      endTime: event.end,
      status: "scheduled",
      volunteer: "John Smith",
    };

    const response = await axios.post("http://localhost:8080/appointments", newAppointment);

    calendarApi.addEvent({
      id: response.data.appointmentId,
      title: response.data.volunteer || "John Smith",
      start: event.start,
      end: event.end,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
  }
};

export const onDeleteConfirmed = async (appointmentId, setEvents, setSelectedEventId, setDeleteModalOpen) => {

  try {

    await axios.delete(`http://localhost:8080/appointments/${appointmentId}`);

    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.filter(event => event.id !== appointmentId);
      return updatedEvents;
    });

    setSelectedEventId(null);
    setDeleteModalOpen(false);

  } catch (error) {
    console.error("Error deleting appointment:", error);
  }
};

export const fetchAppointments = async (viewType, date, setEvents) => {
  try {
    const startDate = moment(date).startOf(viewType);
    const endDate = moment(date).endOf(viewType);

    const response = await axios.get(
      `http://localhost:8080/calendar/${viewType}/${startDate.format("YYYY")}/${startDate.format("MM")}/${startDate.format("DD")}`
    );

    const formattedEvents = response.data.map((appointment) => ({
      id: appointment.appointmentId,
      title: appointment.volunteer,
      start: appointment.startTime,
      end: appointment.endTime,
    }));

    const availableSlots = generateAvailableSlots(formattedEvents, startDate, endDate);
    setEvents([...formattedEvents, ...availableSlots]);
  } catch (error) {
    console.error("Error fetching appointments:", error);
  }
};

export const handleDatesSet = (dateInfo, navigate, setEvents) => {
  const { type: fullCalendarViewType, currentStart } = dateInfo.view;

  const newDate = currentStart;

  const viewType =
    fullCalendarViewType === "dayGridMonth"
      ? "month"
      : fullCalendarViewType === "timeGridDay"
        ? "day"
        : "week";

  const newYear = moment(newDate).format("YYYY");
  const newMonth = moment(newDate).format("MM");
  const newDay = moment(newDate).format("DD");

  navigate(`/calendar/${viewType}/${newYear}/${newMonth}/${newDay}`, { replace: true });

  fetchAppointments(viewType, newDate, setEvents);
};



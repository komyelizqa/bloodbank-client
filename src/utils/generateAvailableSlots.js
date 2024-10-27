// generateAvailableSlots.js
import moment from 'moment';

const generateAvailableSlots = (formattedEvents) => {
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
          display: "background",
          classNames: ["available-event"],
        });
      }
      timeSlot.add(30, 'minutes');
    }
  }
  return availableSlots;
};

export default generateAvailableSlots;

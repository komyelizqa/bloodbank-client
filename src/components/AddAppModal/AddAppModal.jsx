import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import "./AddAppModal.scss";
import close from "../../assets/Icons/close-24px.svg";

Modal.setAppElement('#root');

function AddAppModal({ isOpen, onClose, onEventAdded, selectedSlot }) {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  useEffect(() => {
    if (selectedSlot) {
      setStart(new Date(selectedSlot.start));
      setEnd(new Date(selectedSlot.end));
    }
  }, [selectedSlot]);

  const onSubmit = (event) => {
    event.preventDefault();
  
    const appointmentData = {
      start: start instanceof Date ? start : new Date(start),
      end: end instanceof Date ? end : new Date(end),
    };
    
    onEventAdded(appointmentData);
  
    onClose();

    setStart(new Date());
    setEnd(new Date());
  };
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <button onClick={onClose} className="modal__close-button" aria-label="Close">
        <img src={close} alt="Close" />
      </button>
      <h2 className="text-xl font-semibold mb-4">Add Appointment</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group" style={{ position: 'relative' }}>
          <label htmlFor="start-date">Select start date and time</label>
          <Datetime
            id="start-date"
            value={start}
            onChange={(date) => setStart(date)}
            inputProps={{
              placeholder: 'Select start date and time',
              className: 'form-control'
            }}
          />
        </div>
        <div className="form-group" style={{ position: 'relative' }}>
          <label htmlFor="end-date">Select end date and time</label>
          <Datetime
            id="end-date"
            value={end}
            onChange={(date) => setEnd(date)}
            inputProps={{
              placeholder: 'Select end date and time',
              className: 'form-control'
            }}
          />
        </div>
        <div className="button-group">
          <button type="submit">Create Appointment</button>
          <button 
            type="button" 
            onClick={onClose}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddAppModal;

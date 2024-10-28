import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import "./AddAppModal.scss";
import close from "../../assets/Icons/close-24px.svg";

Modal.setAppElement("#root");

function AddAppModal({ isOpen, onClose, onAppAdded, selectedSlot }) {
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

    onAppAdded(appointmentData);

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
      <section class="add-modal">
        <button
          class="add-modal__close-button"
          onClick={onClose}
          aria-label="Close"
        >
          <img src={close} alt="Close" />
        </button>
        <h2 className="add-modal__header">Add Appointment</h2>
        <form className="add-modal__form" onSubmit={onSubmit}>
          <div className="add-modal__form-group">
            <label htmlFor="start-date" className="add-modal__label">
              Select start date and time
            </label>
            <Datetime
              id="start-date"
              value={start}
              onChange={(date) => setStart(date)}
              inputProps={{
                placeholder: "Select start date and time",
                className: "add-modal__form-control",
              }}
            />
          </div>
          <div className="add-modal__form-group">
            <label htmlFor="end-date" className="add-modal__label">
              Select end date and time
            </label>
            <Datetime
              id="end-date"
              value={end}
              onChange={(date) => setEnd(date)}
              inputProps={{
                placeholder: "Select end date and time",
                className: "add-modal__form-control",
              }}
            />
          </div>
          <div className="add-modal__button-group">
            <button
              type="submit"
              className="add-modal__button add-modal__button--create"
            >
              Create Appointment
            </button>
            <button
              type="button"
              onClick={onClose}
              className="add-modal__button add-modal__button--cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </Modal>
  );
}

export default AddAppModal;

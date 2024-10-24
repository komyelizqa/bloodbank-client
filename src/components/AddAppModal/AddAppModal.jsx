import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import "./AddAppModal.scss";

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

    onEventAdded({
      start: start instanceof Date ? start : new Date(start),
      end: end instanceof Date ? end : new Date(end),
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <form onSubmit={onSubmit}>
        <div>
          <label>Start Date</label>
          <Datetime value={start} onChange={(date) => setStart(date)} />
        </div>
        <div>
          <label>End Date</label>
          <Datetime value={end} onChange={(date) => setEnd(date)} />
        </div>
        <button type="submit">Create</button>
      </form>
    </Modal>
  );
}

export default AddAppModal;

  




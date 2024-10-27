import React from "react";
import Modal from "react-modal";
import "./DeleteModal.scss";
import close from "../../assets/Icons/close-24px.svg";

Modal.setAppElement('#root');

function DeleteModal({ isOpen, onClose, onDeleteConfirmed, appointmentId }) {
  const handleDelete = async () => {
    await onDeleteConfirmed(appointmentId);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="custom-modal-wrapper"
      overlayClassName="modal-overlay"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >

<button onClick={onClose} className="modal__close-button" aria-label="Close">
        <img src={close} alt="Close" />
      </button>
      <div className="delete-modal">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this appointment?</p>
        <div className="button-group">
          <button onClick={handleDelete} className="confirm-delete">
            Delete
          </button>
          <button onClick={onClose} className="cancel-delete">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteModal;


import React from "react";
import Modal from "react-modal";
import "./DeleteModal.scss";
import close from "../../assets/Icons/close-24px.svg";

Modal.setAppElement("#root");

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
      <section className="modal">
        <button
          onClick={onClose}
          className="modal__close-button"
          aria-label="Close"
        >
          <img src={close} alt="Close" />
        </button>
        <h2 class="modal__header">Confirm Deletion</h2>
  <p class="modal__message">Are you sure you want to delete this appointment?</p>
  <div class="modal__button-group">
    <button class="modal__button modal__button--confirm" onClick={handleDelete}>Delete</button>
    <button class="modal__button modal__button--cancel" onClick={onClose}>Cancel</button>
  </div>
      </section>
    </Modal>
  );
}

export default DeleteModal;

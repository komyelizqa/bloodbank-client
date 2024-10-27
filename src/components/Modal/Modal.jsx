import React, { useRef, useEffect } from "react";
import "./Modal.scss";
import close from "../../assets/Icons/close-24px.svg";
import ButtonSecondary from "../ButtonSecondary/ButtonSecondary";
import ButtonDelete from "../ButtonDelete/ButtonDelete";

export default function Modal({ isOpen, onClose, children, handleDelete }) {
  const modalRef = useRef(null);

  const handleCloseModal = () => {
    if (onClose) onClose();
    if (modalRef.current) modalRef.current.close(); // Explicitly close the dialog
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") handleCloseModal();
  };

  useEffect(() => {
    const modalElement = modalRef.current;

    if (modalElement) {
      if (isOpen) {
        modalElement.showModal(); // Open the dialog
      } else {
        modalElement.close(); // Close the dialog
      }
    }
  }, [isOpen]);

  return (
    <dialog
      ref={modalRef}
      onKeyDown={handleKeyDown}
      className="modal"
      onClick={handleCloseModal} // Close when clicking outside
    >
      <div
        className="modal__content"
        onClick={(e) => e.stopPropagation()} // Prevent closing on content click
      >
        <div className="modal__toolbar">
          <button className="modal__close-button" onClick={handleCloseModal}>
            <img src={close} alt="Close" />
          </button>
        </div>
        {children}
        <div className="modal__buttons">
          <div className="modal__cancel" onClick={handleCloseModal}>
            <ButtonSecondary>Cancel</ButtonSecondary>
          </div>
          <div className="modal__submit" onClick={handleDelete}>
            <ButtonDelete>Delete</ButtonDelete>
          </div>
        </div>
      </div>
    </dialog>
  );
}

  
  
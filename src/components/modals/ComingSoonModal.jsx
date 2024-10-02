import React, { useState, useEffect, useRef } from "react";
import Icon from "../../media/icon/icons.jsx";
import "../../styles/coming-soon.css"; // Import the CSS file for styling.

function Modal({ isOpen, onClose, icon, header, body, onConfirm }) {
  const [isVisible, setIsVisible] = useState(isOpen); // Control visibility for animation
  const modalRef = useRef(null); // Ref to access the modal for dragging
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true); // Show the modal when it's open
    }
  }, [isOpen]);

  const handleMouseDown = (e) => {
    // Set dragging to true when the user clicks on the drag icon
    setIsDragging(true);
    const modal = modalRef.current;
    if (modal) {
      const rect = modal.getBoundingClientRect();
      setOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const modal = modalRef.current;
    if (modal) {
      modal.style.left = `${e.clientX - offset.x}px`;
      modal.style.top = `${e.clientY - offset.y}px`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Trigger close animation and then remove modal from DOM
  const handleClose = () => {
    const modalElement = document.querySelector(".modal-frame");
    if (modalElement) {
      modalElement.classList.remove("modal-open");
      modalElement.classList.add("modal-close");
      setTimeout(() => {
        setIsVisible(false);
        onClose(); // Notify parent component after animation finishes
      }, 300); // Wait for the animation to complete
    }
  };

  // Close modal if clicked outside
  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose(); // Close modal if click is outside of the modal content
    }
  };

  if (!isOpen && !isVisible) return null; // Render modal only if it's open or visible

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick} // Detect clicks on the overlay
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        ref={modalRef}
        className={`modal-frame ${isOpen ? "modal-open" : "modal-close"}`}
        style={{ position: "absolute"}}
      >
        <div className="modal-inset">
          {/* Attach drag events to the modal-drag-icon */}
          <div
            className="modal-drag-icon"
            onMouseDown={handleMouseDown}
            style={{ cursor: "move" }}
          >
            <Icon name="drag_modal" width={22} height={22} color="#acacac" />
          </div>
          <img src={icon} alt="Modal header" />
          <div className="modal-header">
            <h3>{header}</h3>
          </div>
          <div className="modal-horizontal-line"></div>
          <div className="modal-body">
            <p>{body}</p>
          </div>
          <div className="modal-footer">
            <button className="modal-button" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

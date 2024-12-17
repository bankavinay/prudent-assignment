import React from "react";

function DeleteBookModal({ bookID, onClose, onDelete }) {
  return (
    <div className="modal">
      <h3>Are you sure you want to delete this book?</h3>
      <button onClick={() => onDelete(bookID)}>Yes</button>
      <button onClick={onClose}>No</button>
    </div>
  );
}

export default DeleteBookModal;

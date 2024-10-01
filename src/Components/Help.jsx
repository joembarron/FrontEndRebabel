import React from 'react';

const Help = ({ isOpen, onClose }) => {
  return (
    <dialog open={isOpen} className="modal-overlay">
      <article>
        <h2>Help</h2>
        <p>
          This is some information on how to use the app
        </p>
        <ul>
          <li>Step 1</li>
          <li>Step 2</li>
        </ul>
        <footer>
          <button className="backBtn" onClick={onClose}>Back</button>
        </footer>
      </article>
    </dialog>
  );
};

export default Help;

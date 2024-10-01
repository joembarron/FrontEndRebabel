import React from 'react';

const About = ({ isOpen, onClose }) => {
  return (
    <dialog open={isOpen} className="modal-overlay">
      <article>
        <h2>About</h2>
        <p>
          This is some information on Gap App
        </p>
        <ul>
          <li>Person</li>
          <li>Person 2</li>
        </ul>
        <footer>
          <button className="backBtn" onClick={onClose}>Back</button>
        </footer>
      </article>
    </dialog>
  );
};

export default About;

import React from 'react';

const About = ({ isOpen, onClose }) => {
  return (
    <dialog open={isOpen} className="modal-overlay">
      <article>
        <h2>About</h2>
        <p>
        Linguists use a variety of software tools to document endangered languages. 
        They frequently need to move language data stored in one program into another, a process for which no automated and user-friendly tool exists. 
        There is also no efficient way to import language data from the output of natural language processing (NLP) models into these software tools. 
        The Gap App desktop application will enable linguists to convert between NLP output files and language data file formats used by software like Fieldworks Language Explorer (FLEx) and ELAN. 
        The app will facilitate the speedy conversion between language data formats through an easy-to-use interface. 
        </p>
        <h3>Team Members:</h3>
        <ul>
          <li>Joseph Barron: Backend Developer/Scrum Master</li>
          <li>Adassa Coimin: Frontend/Backend Developer</li>
          <li>Matthew Denslinger: Frontend Developer</li>
          <li>Elizabeth Thorner: Backend Developer/Project Manager</li>
          <li>Darren Wang: Frontend Developer</li>
        </ul>
        <footer>
          <button className="backBtn" onClick={onClose}>Back</button>
        </footer>
      </article>
    </dialog>
  );
};

export default About;

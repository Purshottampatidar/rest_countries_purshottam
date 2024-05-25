import React, { useState } from 'react';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    const body = document.body;
    const header = document.querySelector('.header');
    const input = document.querySelector('#search');
    const select = document.querySelector('.select');
    const contents = document.querySelectorAll('.content');
    
    
    body.classList.toggle('light-theme', !darkMode);
    header.classList.toggle('light-theme', !darkMode);
    input.classList.toggle('light-theme', !darkMode);
    select.classList.toggle('light-theme', !darkMode);
    contents.forEach((content) => {
      content.classList.toggle('light-theme', !darkMode);
    });
  };

  return (
    <header className='header'>
      <div>
        <h1>Where in the world?</h1>
      </div>
      <div className='change-mode'>
        <i className={`fa-solid ${darkMode ? 'fa-sun' : 'fa-moon'}`} onClick={toggleDarkMode}></i>
        <p>{darkMode ? 'Light Mode' : 'Dark Mode'}</p>
      </div>
    </header>
  );
};

export default Header;

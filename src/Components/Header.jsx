import React, { useState } from 'react';
import ModeButton from './ModeButton';

const Header = () => {

  return (
    <header className='header'>
      <div>
        <h1>Where in the world?</h1>
      </div>
      <ModeButton/>
    </header>
  );
};

export default Header;

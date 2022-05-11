import React from 'react';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
  return (
    <header className={classes['main-header']}>
      <h1>A Typical Page</h1>
      {/* isLoggedIn={props.isAuthenticated} */}
      {/* stopped forwarding isLoggedIn from Navigation as we have used Context in App.js */}

      <Navigation onLogout={props.onLogout} />
    </header>
  );
};

export default MainHeader;

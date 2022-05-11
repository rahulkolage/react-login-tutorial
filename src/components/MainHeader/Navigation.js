import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';

import classes from './Navigation.module.css';

// props removed, as we are using Context
const Navigation = () => {

  const ctx = useContext(AuthContext);

  return (

    // Using useContext Hook
          <nav className={classes.nav}>
            <ul>
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Users</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Admin</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  {/* <button onClick={props.onLogout}>Logout</button> */}
                  <button onClick={ctx.onLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
          
        
    // Using Consumer
    // <AuthContext.Consumer>
    //   {
    //     (ctx) => {
    //       return (
    //         <nav className={classes.nav}>
    //           <ul>
    //             {ctx.isLoggedIn && (
    //               <li>
    //                 <a href="/">Users</a>
    //               </li>
    //             )}
    //             {ctx.isLoggedIn && (
    //               <li>
    //                 <a href="/">Admin</a>
    //               </li>
    //             )}
    //             {ctx.isLoggedIn && (
    //               <li>
    //                 <button onClick={props.onLogout}>Logout</button>
    //               </li>
    //             )}
    //           </ul>
    //         </nav>
    //       )
    //     }
    //   }
    // </AuthContext.Consumer>

    // using PROPS
    // <nav className={classes.nav}>
    //   <ul>
    //     {props.isLoggedIn && (
    //       <li>
    //         <a href="/">Users</a>
    //       </li>
    //     )}
    //     {props.isLoggedIn && (
    //       <li>
    //         <a href="/">Admin</a>
    //       </li>
    //     )}
    //     {props.isLoggedIn && (
    //       <li>
    //         <button onClick={props.onLogout}>Logout</button>
    //       </li>
    //     )}
    //   </ul>
    // </nav>
  );
};

export default Navigation;

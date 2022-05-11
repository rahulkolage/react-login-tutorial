import React, { useState, useEffect } from 'react';
// import { useState } from 'react/cjs/react.production.min';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
});

// named export
// creating custom provider component and move auth logic from app.js to context file
export const AuthContextProviderComponent  = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
    
        if (storedUserLoggedInInformation === "1") {
          setIsLoggedIn(true);
        }
      }, []);
          
    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    };

    const loginHandler = () => {
        localStorage.setItem("isLoggedIn", "1");
        setIsLoggedIn(true);
    }

    return <AuthContext.Provider value={
        {
            isLoggedIn: isLoggedIn,
            onLogout: logoutHandler,
            onLogin: loginHandler
        }
    }>{props.children}</AuthContext.Provider>;
};

// default export
export default AuthContext;
import React, { useContext } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

function App() {
  const ctx = useContext(AuthContext);
  // moved commented logic into auth-context

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

  //   if (storedUserLoggedInInformation === "1") {
  //     setIsLoggedIn(true);
  //   }
  // }, []); // <= currently there is no dependency

  // const loginHandler = (email, password) => {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyways

  //   localStorage.setItem("isLoggedIn", "1");

  //   setIsLoggedIn(true);
  // };

  // const logoutHandler = () => {
  //   localStorage.removeItem("isLoggedIn");
  //   setIsLoggedIn(false);
  // };

  return (
    // <React.Fragment>
      // <AuthContext.Provider value={{
      //   isLoggedIn: isLoggedIn, //false
      //   onLogout: logoutHandler   //  passed a function to context provider
      // }}>

      //   {/* using Context instead forwarding props */}
      //   {/* isAuthenticated={isLoggedIn} */}
      //   {/* onLogout={logoutHandler}  */}
      //   <MainHeader />
      //   <main>
      //     {!isLoggedIn && <Login onLogin={loginHandler} />}
      //     {isLoggedIn && <Home onLogout={logoutHandler} />}
      //   </main>
      // </AuthContext.Provider>
    // </React.Fragment>

    <React.Fragment>   
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>    
    </React.Fragment>
  );
}

export default App;

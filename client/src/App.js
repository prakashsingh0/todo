
import Header from './components/Header';
import Login from './components/Login';

import Profile from './components/Profile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import Todo from './components/Todo';

function App() {
  const [user, setUser] = useState(sessionStorage.getItem("user"));
  const [expirationTime, setExpirationTime] = useState(
    sessionStorage.getItem('expirationTime')
  );
 
  useEffect(() => {
    const checkSession = () => {
      const currentTime = new Date().getTime();
      if (expirationTime && currentTime > expirationTime) {
        // Session expired, clear user data
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('expirationTime');
        setUser(null);
        setExpirationTime(null);
      }
    };

    checkSession();

    // Check session every minute
    const interval = setInterval(checkSession, 60000); // 60000 ms = 1 minute
    return () => clearInterval(interval);
  }, [expirationTime]);

  const handleLogin = (userData) => {
    const currentTime = new Date().getTime();
    const expiration = currentTime + 3600000; // 3600000 ms = 1 hour
    sessionStorage.setItem('user', userData);
    sessionStorage.setItem('expirationTime', expiration);
    setUser(userData);
    setExpirationTime(expiration);
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* <Route
          path="/home/profile"
          element={user ? <Profile /> : <Login />}
        /> */}
        {user && (<Route path='/home/' element={<Header />} >
          <Route path="profile" element={<Profile />} />
          <Route path="todo" element={<Todo />} />

        </Route>)}
        <Route
          path="/"
          element={<Login handleLogin={handleLogin} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

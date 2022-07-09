import * as React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

import { db, auth } from './store/firebase';
import { onAuthStateChanged } from "firebase/auth";
import Home from './pages/Home/Home';
import GuestGreeting from './components/GuestGreeting/GuestGreeting';
import Menu from './components/Menu/Menu';

function App() {
  const [user, setUser] = React.useState(null);
  const [authState, setAuthState] = React.useState(null);

  React.useEffect(() => {
    const unSubscribeAuth = onAuthStateChanged(auth,
      async authenticatedUser => {
        if (authenticatedUser) {
          setUser(authenticatedUser.email);
          setAuthState('home');
        } else {
          setUser(null);
          setAuthState('login');
        }
      })

    return unSubscribeAuth;
  }, [user]);


  if (authState === null) return <div className='font-bold text-center'>Loading...</div>;
  if (authState === 'login') return <> <Menu /><GuestGreeting setAuthState={setAuthState} setUser={setUser} /></>;
  if (authState === 'register') return <Register setAuthState={setAuthState} setUser={setUser} />;
  if (user) return (<Login user={user} setAuthState={setAuthState} setUser={setUser} />)

}

export default App;

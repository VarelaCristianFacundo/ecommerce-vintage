import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../App.css';
import Menu from '../../components/Menu/Menu';
import Home from '../../pages/Home/Home';
import AboutUs from '../../pages/AboutUs/AboutUs';
import Cart from '../../pages/Cart/Cart'
import CheckOut from '../../components/CheckOut/CheckOut';

import { signOut } from 'firebase/auth';
import { auth } from '../../store/firebase';

function Login({
  user,
  setAuthState,
  setUser
}) {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegisterIn, setisRegisterIn] = useState(false)

  let email_analizado = /^([^]+)@(\w+).(\w+)$/.exec(user);
  let [, nombre, servidor, dominio] = email_analizado;

  let nuevoNombre = nombre[0].toUpperCase() + nombre.slice(1);
  let bienvenido = `Bienvenido \n\n ${nuevoNombre}`;


  const handleLoginClick = () => {
    setIsLoggedIn(true);
  }
  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    signOut(auth)
      .then(() => {
        setUser(null);
        setAuthState('login');
      })
      .catch(error => {
        console.log(error);
      })
  }
  const handleRegisterClick = () => {
    setisRegisterIn(true);
  }

  return (
    <div className="App">

      <Menu user={bienvenido} handleLoginClick={handleLoginClick} handleLogoutClick={handleLogoutClick} isLoggedIn={isLoggedIn} handleRegisterClick={handleRegisterClick} isRegisterIn={isRegisterIn} />
      <main className="App-header">
        <Routes>
          <Route path='/cart' element={<Cart />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/checkout' element={<CheckOut />} />
          <Route path='/*' element={<Home isLoggedIn={true} />} />
        </Routes>

      </main>

    </div>
  );
}

export default Login;

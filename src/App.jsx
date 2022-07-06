import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Menu from './components/Menu/Menu';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs';
import { useState } from 'react';
import Cart from './pages/Cart/Cart'
import CheckOut from './components/CheckOut/CheckOut';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegisterIn, setisRegisterIn] = useState(false)

  const handleLoginClick = () => {
    setIsLoggedIn(true);
  }
  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  }
  const handleRegisterClick = () => {
    setisRegisterIn(true);    
  }

  return (
    <div className="App">

      <Menu handleLoginClick={handleLoginClick} handleLogoutClick={handleLogoutClick} isLoggedIn={isLoggedIn} handleRegisterClick={handleRegisterClick} isRegisterIn={isRegisterIn}/>
      <main className="App-header">
      <Routes>
        <Route path='/cart' element={<Cart />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/checkout' element={<CheckOut />} />
        <Route path='/*' element={<Home isLoggedIn={isLoggedIn}/>} />
      </Routes>
        
      </main>
      
    </div>
  );
}

export default App;

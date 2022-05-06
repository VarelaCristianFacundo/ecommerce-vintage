import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Menu from './components/Menu/Menu';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs';
import { useState } from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLoginClick = () => {
    setIsLoggedIn(true);
  }
  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  }

  return (
    <div className="App">

      <Menu handleLoginClick={handleLoginClick} handleLogoutClick={handleLogoutClick} isLoggedIn={isLoggedIn} />
      <main className="App-header">
      <Routes>
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/*' element={<Home isLoggedIn={isLoggedIn}/>} />
      </Routes>
        
      </main>
      
    </div>
  );
}

export default App;

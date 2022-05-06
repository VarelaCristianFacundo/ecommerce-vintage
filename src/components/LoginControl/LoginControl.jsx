import LoginButton from "../LoginButton/LoginButton";
import LogoutButton from "../LogoutButton/LogoutButton";
import React from "react";

function LoginControl({isLoggedIn, handleLoginClick, handleLogoutClick}) {  

  let button;

  if (isLoggedIn) {
    button = <LogoutButton onClick={handleLogoutClick} />;
  } else {
    button = <LoginButton onClick={handleLoginClick} />;
  }

  return (
    <div>      
      {button}
    </div>
  );
}

export default LoginControl
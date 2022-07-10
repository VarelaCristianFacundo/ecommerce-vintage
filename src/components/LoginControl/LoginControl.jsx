import LoginButton from "../LoginButton/LoginButton";
import RegisterButton from "../RegisterButton/RegisterButton";
import LogoutButton from "../LogoutButton/LogoutButton";
import React from "react";

function LoginControl({ handleLogoutClick }) {

  // let button;
  let registerButton;

  // if (isLoggedIn) {
  //   button = <LogoutButton onClick={handleLogoutClick} />;
  // } else {
  //   // button = <LoginButton onClick={handleLoginClick} />;
  //   // registerButton = <RegisterButton onClick={handleRegisterClick} />;
  // }

  return (
    <div style={{margin:"20px", display:"flex", flexDirection:"row", justifyContent:"space-around", alignContent:"space-evenly", alignItems:"center"}}>
      <div style={{marginRight:"10px"}}><LogoutButton onClick={handleLogoutClick} /></div>
      <div>{registerButton}</div>
    </div>
  );
}

export default LoginControl
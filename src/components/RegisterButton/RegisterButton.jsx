import React from 'react'
import { Button} from 'react-bootstrap';
import '../LogoutButton/LogoutButton.css';

const RegisterButton = (props) => {
  return (
    <Button onClick={props.onClick} className="btn-white" style={{width:"80px", textAlign:"center"}}>Register</Button>
  )
}

export default RegisterButton
import React from 'react'
import { Button} from 'react-bootstrap';
import './LogoutButton.css';

const LogoutButton = (props) => {
  return (
    <Button onClick={props.onClick} className="btn-white" style={{width:"80px", textAlign:"center"}}>Logout</Button>
  )
}

export default LogoutButton
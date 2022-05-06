import React from 'react'
import UserGreeting from '../UserGreeting/UserGreeting';
import GuestGreeting from '../GuestGreeting/GuestGreeting';


const ItemListContainer = ({isLoggedIn}) => {  
      
    if (isLoggedIn) {
      return <UserGreeting />;
    }
    return <GuestGreeting />;  
}

export default ItemListContainer
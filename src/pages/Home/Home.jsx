import React from 'react';
import ItemListContainer from '../../components/ItemListContainer/ItemListContainer';

const Home = ({isLoggedIn}) => {
  return (
    <div>        
        <ItemListContainer isLoggedIn={isLoggedIn} />
    </div>
  )
}

export default Home
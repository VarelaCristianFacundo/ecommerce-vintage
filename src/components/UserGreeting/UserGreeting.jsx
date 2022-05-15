import React, { useEffect, useState } from 'react'
import ItemList from '../ItemList/ItemList';
import { Routes, Route } from 'react-router-dom';
import ItemDetailContainer from '../ItemDetailContainer/ItemDetailContainer';
import { Spinner } from 'react-bootstrap';
import { collection, getDocs, getFirestore, query, where, limit } from "firebase/firestore"

const UserGreeting = () => {

  const [prendas, setPrendas] = useState([]);
  const [loading, setLoading] = useState(true);


  function traerProductos() {
    // traigo los datos desde la base de Firestore
    const db = getFirestore();
    const itemCollection = collection(db, 'items');
    const q = query(
      itemCollection,
      where('precio', '<', 200000),
      limit(100)
    );
    return getDocs(q)
  }

  useEffect(() => {
    traerProductos()
      .then(snapshot => {setPrendas(snapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id}
      }))
        
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));

    setLoading(true);
  }, [])

  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>) : (
        <div className='App-header'>
          <Routes>
            <Route path='/' element={<ItemList ropa={prendas} />} />
            <Route path='item/:id' element={<ItemDetailContainer ropa={prendas} />} />
            <Route path='category/:id' element={<ItemList ropa={prendas} />} />
          </Routes>
        </div>
      )}
    </>
  )
}

export default UserGreeting
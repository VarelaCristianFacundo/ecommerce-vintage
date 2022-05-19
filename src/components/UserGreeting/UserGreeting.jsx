import React, { useEffect, useState } from 'react'
import ItemList from '../ItemList/ItemList';
import { Routes, Route } from 'react-router-dom';
import ItemDetailContainer from '../ItemDetailContainer/ItemDetailContainer';
import { Dropdown, Spinner } from 'react-bootstrap';
import { collection, getDocs, query, where, limit } from "firebase/firestore"
import './UserGreeting.css';
import db from "../../store/firebase"

const UserGreeting = () => {

  const [prendas, setPrendas] = useState([]);
  const [loading, setLoading] = useState(true);


  function traerProductos(min, max) {
    // traigo los datos desde la base de Firestore    
    const itemCollection = collection(db, 'items');
    const q = query(
      itemCollection,
      where('precio', '>', min),
      where('precio', '<', max),
      limit(100)
    );
    return getDocs(q)
  }

  useEffect(() => {
    traerProductos(1, 200000)
      .then(snapshot => {
        setPrendas(snapshot.docs.map(doc => {
          return { ...doc.data(), id: doc.id }
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
          <span className="visually-hidden"></span>
        </Spinner>) : (
        <div className='App-header'>
          <div style={{ display: 'flex' }}>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                Precio
              </Dropdown.Toggle>

              <Dropdown.Menu variant="dark">
                <Dropdown.Item onClick={() => traerProductos(1, 3000).then(snapshot => {
                  setPrendas(snapshot.docs.map(doc => {
                    return { ...doc.data(), id: doc.id }
                  }))
                })}>Hasta $3000</Dropdown.Item>
                <Dropdown.Item onClick={() => traerProductos(3000, 5000).then(snapshot => {
                  setPrendas(snapshot.docs.map(doc => {
                    return { ...doc.data(), id: doc.id }
                  }))
                })}>$3000 a $5000</Dropdown.Item>
                <Dropdown.Item onClick={() => traerProductos(5000, 50000).then(snapshot => {
                  setPrendas(snapshot.docs.map(doc => {
                    return { ...doc.data(), id: doc.id }
                  }))
                })}>Más de $5000</Dropdown.Item>
                <Dropdown.Item><button onClick={() => traerProductos(1, 50000).then(snapshot => {
                  setPrendas(snapshot.docs.map(doc => {
                    return { ...doc.data(), id: doc.id }
                  }))
                })} className="btn btn-danger" style={{ height: '100%' }}>Borrar Filtros</button></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
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
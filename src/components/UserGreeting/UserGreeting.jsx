import React, { useEffect, useState } from 'react'
import ItemList from '../ItemList/ItemList';
import { ropa } from '../../ropa';
import { Routes, Route } from 'react-router-dom';
import ItemDetailContainer from '../ItemDetailContainer/ItemDetailContainer';
import { Spinner } from 'react-bootstrap';

const UserGreeting = () => {

  const [prendas, setPrendas] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch
  // async function traerProductosConFetch () {
  //   return fetch ('url')
  //     .then(res => res.json())
  // }

  // useEffect(() => {
  //   traerProductosConFetch()
  //     .then(prendaArray => setPrendas(prendaArray));
  // }, [])


  // fetch con un timeout
  // function traerProductos () {
  //   const myPromise = new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       fetch ('url')
  //       .then(productos => resolve(productos));

  //     }, 2000);
  //   });
  //   return myPromise;
  // }

  function traerProductos() {
    const myPromise = new Promise((resolve, reject) => {
      const productos = ropa;
      setTimeout(() => {
        resolve(productos);
      }, 2000);
    });
    return myPromise;
  }

  useEffect(() => {
    setLoading(true);
    traerProductos()
      .then(prendaArray => setPrendas(prendaArray))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
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
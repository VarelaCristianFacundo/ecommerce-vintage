import { useEffect, useState } from 'react'
import ItemList from '../ItemList/ItemList';
import { Routes, Route } from 'react-router-dom';
import ItemDetailContainer from '../ItemDetailContainer/ItemDetailContainer';
import { Dropdown, Spinner } from 'react-bootstrap';
import './UserGreeting.css';
import { fetchItems } from "../../store/catalog"

const UserGreeting = () => {

  const [prendas, setPrendas] = useState([]);
  const [loading, setLoading] = useState(true);

  // El catalogo sale de src/data/items.json. fetchItems mantiene la forma
  // asincrona que tenia la lectura de Firestore, asi que el spinner y el
  // filtrado por precio siguen funcionando igual.
  const aplicarFiltro = (min, max) => fetchItems(min, max).then(setPrendas)

  useEffect(() => {
    aplicarFiltro(1, 200000)
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
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
                <Dropdown.Item onClick={() => aplicarFiltro(1, 3000)}>Hasta $3000</Dropdown.Item>
                <Dropdown.Item onClick={() => aplicarFiltro(3000, 5000)}>$3000 a $5000</Dropdown.Item>
                <Dropdown.Item onClick={() => aplicarFiltro(5000, 50000)}>Más de $5000</Dropdown.Item>
                <Dropdown.Item><button onClick={() => aplicarFiltro(1, 50000)} className="btn btn-danger" style={{ height: '100%' }}>Borrar Filtros</button></Dropdown.Item>
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

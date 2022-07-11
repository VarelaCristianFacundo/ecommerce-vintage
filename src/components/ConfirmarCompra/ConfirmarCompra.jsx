import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react'
import { Row } from 'react-bootstrap'
import CartContext from '../../store/cart-context';
import CartWidgetDetail from '../CartWidgetDetail/CartWidgetDetail';

import { Link } from 'react-router-dom';

const ConfirmarCompra = () => {

    const cartCtx = useContext(CartContext);


    return (
        <div>
            <Row xs={1} md={1} className="g-1 px-80 ml-80 mr-80">
                {cartCtx.products.map((item, key) => <div><CartWidgetDetail item={item} key={key} /></div>)}
            </Row>
            {cartCtx.products.length > 0 ? (
                <>

                    <div>
                        <h4 className='text-2xl font-semibold text-center mt-2 mb-4'>Precio Total: $ {cartCtx.totalPrice()}</h4>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to='/checkout' style={{ textDecoration: "none" }}>
                            <button className="btn btn-graySelected" style={{ borderColor: "#40434E", display: 'flex' }}>
                                <div className="cart-widget ml-1 mr-1"><FontAwesomeIcon icon={faCartShopping} size="1x" /></div>
                                Confirmar Compra
                            </button>
                        </Link>
                        <div style={{ marginLeft: "1%" }}></div>
                        <button onClick={cartCtx.clear} className="btn btn-danger" style={{ width: "5%", borderColor: 'red', display: 'flex' }}>
                            Vaciar
                            <div className="cart-widget"><FontAwesomeIcon icon={faTrash} size="1x" style={{ marginLeft: '80%' }} /></div>
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div style={{display: "flex", flexDirection:"column"}} className='mt-4 content-center align-center items-center self-auto'>
                        <img style={{ width: "30%" }} src="https://thumbs.dreamstime.com/b/vector-del-carro-de-la-compra-del-supermercado-carro-de-la-compra-vac%C3%ADo-de-la-vista-lateral-aislado-en-el-fondo-blanco-92593244.jpg" alt="carrito" />
                        <h1 className='font-medium text-5xl font-semibold text-gray-500 mt-4'>El carrito está vacio</h1>
                    </div>
                </>
            )}
        </div>
    )
}

export default ConfirmarCompra
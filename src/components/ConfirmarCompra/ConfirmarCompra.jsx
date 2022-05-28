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
            <Row xs={1} md={1} className="g-1">
                {cartCtx.products.map((item, key) => <CartWidgetDetail item={item} key={key} />)}
            </Row>
            {cartCtx.products.length > 0 ? (
                <>

                    <div>
                        <h4>Precio Total: $ {cartCtx.totalPrice()}</h4>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to='/checkout' style={{ textDecoration: "none" }}>
                            <button className="btn btn-graySelected" style={{ borderColor: "#40434E", display: 'flex' }}>
                                <div className="cart-widget"><FontAwesomeIcon icon={faCartShopping} size="1x" /></div>
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
                    <img style={{width:"30%"}} src="https://thumbs.dreamstime.com/b/vector-del-carro-de-la-compra-del-supermercado-carro-de-la-compra-vac%C3%ADo-de-la-vista-lateral-aislado-en-el-fondo-blanco-92593244.jpg" alt="" />
                    <h1>El carrito está vacio</h1>
                </>
            )}
        </div>
    )
}

export default ConfirmarCompra
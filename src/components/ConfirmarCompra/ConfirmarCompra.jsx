import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
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
                        <Link to='/checkout' style={{textDecoration: "none"}}>
                            <button className="btn btn-gray" style={{ marginRight: "2%", borderColor: "#40434E", display: 'flex' }}>
                                <div className="cart-widget"><FontAwesomeIcon icon={faCheck} size="1x" style={{ marginLeft: '80%' }} /></div>
                                Confirmar Compra
                            </button>
                        </Link>
                        <button onClick={cartCtx.clear} className="btn btn-danger" style={{ width: "8%", borderColor: 'red', display: 'flex' }}>
                            Vaciar
                            <div className="cart-widget"><FontAwesomeIcon icon={faTrash} size="1x" style={{ marginLeft: '100%' }} /></div>
                        </button>
                    </div>
                </>
            ) : (
                <h1>El carrito está vacio</h1>
            )}
        </div>
    )
}

export default ConfirmarCompra
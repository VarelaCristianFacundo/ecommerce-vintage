import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react'
import { Row } from 'react-bootstrap'
import CartContext from '../../store/cart-context';
import CartWidgetDetail from '../CartWidgetDetail/CartWidgetDetail';


const ConfirmarCompra = () => {
    const cartCtx = useContext(CartContext);

    return (
        <div>
            <Row xs={1} md={1} className="g-1">
                {cartCtx.products.map((item, key) => <CartWidgetDetail item={item} key={key} />)}
            </Row>
            {cartCtx.products.length > 0 ? (
            <>
                <h4>Precio Total: $ {cartCtx.totalPrice()}</h4>
                <button onClick={cartCtx.clear} className="btn btn-danger" style={{ marginTop: "5px", width: "20%", border: 0 }}>
                    <div className="cart-widget"><FontAwesomeIcon icon={faTrash} size="1x" /></div>
                    Vaciar Carrito
                </button>
            </>
            ) : (
            <h1>El carrito está vacio</h1>
            )}
        </div>
    )
}

export default ConfirmarCompra
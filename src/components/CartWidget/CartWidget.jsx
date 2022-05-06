import React, { useContext, useState } from 'react';
import '../LogoutButton/LogoutButton.css';
import '../ItemCount/ItemCount.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Button, Offcanvas, Row } from 'react-bootstrap';

import './CartWidget.css';
import { Link } from 'react-router-dom';
import CartContext from '../../store/cart-context';
import CartWidgetDetail from '../CartWidgetDetail/CartWidgetDetail';

const CartWidget = () => {

    const cartCtx = useContext(CartContext);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button onClick={handleShow} className='ms-5 btn-white'>
                <div className="cart-widget">
                    <FontAwesomeIcon icon={faCartShopping} size="2x" />
                </div>
            </Button>
            <Offcanvas show={show} onHide={handleClose} placement={'end'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Mi Carrito</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row xs={1} md={2} className="g-3">
                        {cartCtx.products.map((item) => <CartWidgetDetail item={item} />)}
                    </Row>
                    <Link clas to="/cart" style={{ textDecoration: 'none'}}>                        
                        <button onClick={handleClose} className="btn btn-gray" style={{ marginTop: "5px",  width: "100%" }}>
                        <div className="cart-widget"><FontAwesomeIcon icon={faCartShopping} size="1x" /></div>
                        Ir a mi carrito</button>
                    </Link>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default CartWidget;

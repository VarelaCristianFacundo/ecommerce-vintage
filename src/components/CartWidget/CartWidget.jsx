import React, { useContext, useState } from 'react';
import '../LogoutButton/LogoutButton.css';
import '../ItemCount/ItemCount.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Button, Offcanvas, Row } from 'react-bootstrap';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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
                    {cartCtx.totalCount() > 0 && <span className="units">{cartCtx.totalCount()}</span>}
                    
                </div>
            </Button>
            <Offcanvas show={show} onHide={handleClose} placement={'end'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Mi Carrito</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row xs={1} md={1} className="g-1">
                        {cartCtx.products.map((item, key) => <CartWidgetDetail item={item} key={key}/>)}
                    </Row>
                    <Link to="/cart" style={{ textDecoration: 'none'}}>                        
                        <button onClick={handleClose} className="btn btn-graySelected" style={{ marginTop: "5px",  width: "80%" }}>
                        <div className="cart-widget"><FontAwesomeIcon icon={faCartShopping} size="1x" /></div>
                        Ir a mi carrito</button>
                        <button onClick={cartCtx.clear} className="btn btn-danger" style={{ marginTop: "5px",  width: "20%", border: 0 }}>
                        <div className="cart-widget"><FontAwesomeIcon icon={faTrash} size="1x" /></div>
                        Vaciar</button>
                    </Link>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default CartWidget;

import React, { useContext, useState } from 'react';
import '../LogoutButton/LogoutButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Button, Nav, Offcanvas, Row } from 'react-bootstrap';

import './CartWidget.css';
import { Link } from 'react-router-dom';
import CartContext from '../../store/cart-context';

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
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row>
                        <div>{cartCtx.products.map((i,index) => {
                            return <div key={index}>
                                {i.name}
                                {i.talle}
                                {i.cantidad}
                            </div>
                        })}</div>
                    </Row>
                    <button onClick={handleClose}>
                        <Nav.Link to="/cart" as={Link}>Cart</Nav.Link>
                    </button>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default CartWidget;

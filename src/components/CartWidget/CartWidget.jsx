import React, { useState } from 'react';
import '../LogoutButton/LogoutButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Button, Offcanvas } from 'react-bootstrap';

import './CartWidget.css';

const CartWidget = () => {
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
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default CartWidget;

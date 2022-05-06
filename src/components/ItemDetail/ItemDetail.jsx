import React, { useContext, useEffect, useState } from 'react';
import { Col, Card, Container, Row } from 'react-bootstrap';
import ItemCount from '../ItemCount/ItemCount';
import './ItemDetail.css';
import Rating from '@mui/material/Rating';
import CartContext from '../../store/cart-context';

const ItemDetail = ({ item }) => {

    const [talle, setTalle] = useState('m');
    const cartCtx = useContext(CartContext);

    useEffect (() => {
        console.log(cartCtx);
    })

    function onAdd(cantidad) {
        cartCtx.addProduct(item)
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Card.Img src={item.imagen} height={350} style={{ objectFit: "contain" }} />
                    </Col>
                    <Col>
                        <Card.Title>{item.titulo}</Card.Title>
                        <Rating name="size-small" defaultValue={2} size="small" />
                        <hr></hr>
                        <Card.Text className='textoStyle'>{item.cartTexto}</Card.Text>
                        <Card.Text className='textoStyle'>Precio:  <span className='precioStyle'>$ {item.precio}</span></Card.Text>
                        <hr></hr>
                        <button className="btn btn-talle col-1" onClick={() => setTalle('xs')}>XS</button>
                        <button className="btn btn-talle col-1" onClick={() => setTalle('s')}>S</button>
                        <button className="btn btn-talle col-1" onClick={() => setTalle('m')}>M</button>
                        <button className="btn btn-talle col-1" onClick={() => setTalle('l')}>L</button>
                        <button className="btn btn-talle col-1" onClick={() => setTalle('xl')}>XL</button>
                        <br></br>
                        <hr></hr>
                        <Row xs={2}>
                            <ItemCount stock={item.stock} initial={1} onAdd={onAdd} />
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ItemDetail
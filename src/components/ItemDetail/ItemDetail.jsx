import React, { useContext, useEffect, useState } from 'react';
import { Col, Card, Container, Row, Nav } from 'react-bootstrap';
import ItemCount from '../ItemCount/ItemCount';
import './ItemDetail.css';
import Rating from '@mui/material/Rating';
import CartContext from '../../store/cart-context';
import { Link } from 'react-router-dom';

const ItemDetail = ({ item }) => {

    const [talle, setTalle] = useState('m');
    const cartCtx = useContext(CartContext);
    const [confirmar, setConfirmar] = useState(false);
    const [cantidad, setCantidad] = useState(0);

    useEffect(() => {

    })

    function onAdd(cant) {
        setConfirmar(true);
        setCantidad(cant);
    }

    function onConfirmar() {
        cartCtx.addProduct({
            imagen: item.imagen,
            name: item.titulo,
            precio: item.precio,
            cantidad: cantidad,
            talle: talle
        });
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

                        {
                            !confirmar ? (
                                <Row xs={2}>
                                    <ItemCount stock={item.stock} initial={1} onAdd={onAdd} />
                                </Row>
                            ) : (
                                <Link to="/cart" style={{ textDecoration: 'none' }}>
                                    <button onClick={onConfirmar} className="btn btn-gray" style={{ marginTop: "5px" }}>Confirmar Compra</button>
                                </Link>
                            )
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ItemDetail
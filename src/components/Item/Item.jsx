import React from 'react';
import { Col, Card } from 'react-bootstrap';
import '../../components/ItemDetail/ItemDetail.css'
import { Link } from 'react-router-dom';

const Item = ({ item }) => {

    function onAdd(cantidad) {
        console.log(cantidad);
    }

    return (
        <Col>
            <Card>
                <Link to={`/item/${item.id}`} style={{ textDecoration: 'none' }}>
                    <Card.Img variant="top" src={item.imagen} height={350} style={{ objectFit: "contain" }} />
                </Link>
                <Card.Body>
                    <Card.Title>{item.titulo}</Card.Title>
                    <Card.Subtitle className='textoStyle'>Precio:  <span className='precioStyle'>$ {item.precio}</span></Card.Subtitle>
                    <br />                    
                    <Link to={`/item/${item.id}`} style={{ textDecoration: 'none' }}>
                        <button className="btn btn-gray" style={{ marginTop: "5px" }}>Ver Detalle</button>
                    </Link>

                </Card.Body>
            </Card>
        </Col>
    )
}

export default Item
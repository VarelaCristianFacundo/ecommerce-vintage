import React from 'react';
import { Col, Card } from 'react-bootstrap';
import ItemCount from '../ItemCount/ItemCount';
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
                    <Card.Text>
                        {item.cartTexto}
                    </Card.Text>
                    <ItemCount stock={item.stock} initial={1} onAdd={onAdd} />
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Item
import React from 'react';
import { Col, Card } from 'react-bootstrap';
import '../../components/ItemDetail/ItemDetail.css'
import { Link } from 'react-router-dom';

const Item = ({ item }) => {

    return (
        <Col>
            <Card className='bg-white px-10 py-4 w-100 h-100 rounded-3xl border-2 bordergray-100'>
                <Link to={`/item/${item.id}`} style={{ textDecoration: 'none' }}>
                    <Card.Img className='h-60' variant="top" src={item.imagen} height={350} style={{ objectFit: "contain" }} />
                </Link>
                <Card.Body className='text-center'>
                    <Card.Title>{item.titulo}</Card.Title>
                    <Card.Subtitle className='textoStyle'>Precio:  <span className='precioStyle'>$ {item.precio}</span></Card.Subtitle>
                    <br />                    
                    <Link className='px-10' to={`/item/${item.id}`} style={{ textDecoration: 'none' }}>
                        <button className="btn btn-graySelected" style={{ marginTop: "5px" }}>Ver Detalle</button>
                    </Link>

                </Card.Body>
            </Card>
        </Col>
    )
}

export default Item
import React from 'react'
import { Card, Col } from 'react-bootstrap'

const CartWidgetDetail = ({ item }) => {
    return (
        <Col>
            <Card>  
                <Card.Img variant="top" src={item.imagen} height={150} style={{ objectFit: "contain" }} />
                <Card.Body>
                    <Card.Title>{item.titulo}</Card.Title>
                    <Card.Subtitle className='textoStyle'>Precio:  <span className='precioStyle'>$ {item.precio}</span></Card.Subtitle>
                    <br />
                    <Card.Text>
                        {item.name}
                        {item.talle}
                        {item.cantidad}
                    </Card.Text>

                </Card.Body>
            </Card>
        </Col>
    )
}

export default CartWidgetDetail
import React, { useContext } from 'react'
import { Card, Col } from 'react-bootstrap'
import CartContext from '../../store/cart-context';

const CartWidgetDetail = ({ item }) => {

    const cartCtx = useContext(CartContext);

    function onRemover(){
        cartCtx.removeProduct(item.id);
    }

    return (
        <Col>
            <Card>        
                <br></br>          
                <Card.Img variant="top" src={item.imagen} height={170} style={{ objectFit: "contain" }} />
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
                <button onClick={onRemover} className="btn btn-danger" style={{ marginLeft: "50px", marginRight: "50px", marginTop: "20px", marginBottom: "20px" }}>X</button>
            </Card>
        </Col>
    )
}

export default CartWidgetDetail
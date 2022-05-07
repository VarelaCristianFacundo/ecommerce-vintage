import React, { useContext } from 'react'
import { Card, Col } from 'react-bootstrap'
import CartContext from '../../store/cart-context';

const CartWidgetDetail = ({ item }) => {

    const cartCtx = useContext(CartContext);

    function onRemover() {
        cartCtx.removeProduct(item.id);
    }

    return (
        <Col>
            <Card style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Card.Img variant="top" src={item.imagen} height={100} width={100} style={{ objectFit: "contain" }} />
                <Card.Body style={{ width:"100%" }}>
                    <Card.Title>{item.titulo}</Card.Title>
                    <Card.Subtitle style={{marginBottom:0}} className='textoStyle'><span className='precioStyle'>$ {item.precio}</span></Card.Subtitle>
                    <Card.Text style={{marginBottom:0}}>
                        {item.name}
                    </Card.Text>
                    <Card.Text style={{marginBottom:0}}>
                        Talle: {item.talle}
                    </Card.Text>
                    <Card.Text style={{marginBottom:0}}>
                        Cantidad: {item.cantidad}
                    </Card.Text>

                </Card.Body>
                <button onClick={onRemover} className="btn btn-danger" style={{ position: "absolute", right: 0, top: 0 }}>X</button>
            </Card>
        </Col>
    )
}

export default CartWidgetDetail
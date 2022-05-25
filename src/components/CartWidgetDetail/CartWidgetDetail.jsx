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
                <Card.Body style={{ width:"170%", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <Card.Title>{item.titulo}</Card.Title>
                    <Card.Text style={{marginBottom:0, fontSize:"16px" }}>
                        {item.name}
                    </Card.Text>
                    <Card.Text style={{marginBottom:0}}>
                    <Card.Subtitle style={{marginBottom:0}} className='textoStyle'><span className='precioStyle'>$ {item.precio * item.cantidad}</span></Card.Subtitle>
                    <div style={{fontWeight: "bold", fontSize:"13px"}}>Talle: {item.talle}</div> 
                    </Card.Text>
                    <Card.Text style={{marginBottom:0}}>
                    <div style={{fontWeight: "bold", fontSize:"13px"}}>Precio Unitario: ${item.precio}</div>                         
                    </Card.Text>
                    <Card.Text style={{marginBottom:0}}>
                    <div style={{fontWeight: "bold", fontSize:"13px"}}>Cantidad: {item.cantidad}</div>                         
                    </Card.Text>
                </Card.Body>
                <button onClick={onRemover} className="btn btn-danger" style={{ position: "absolute", right: 0, top: 0 }}>X</button>
            </Card>
        </Col>
    )
}

export default CartWidgetDetail
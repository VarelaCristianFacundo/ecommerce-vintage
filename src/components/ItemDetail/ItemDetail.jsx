import React, { useContext, useState } from 'react';
import { Col, Card, Container, Row } from 'react-bootstrap';
import ItemCount from '../ItemCount/ItemCount';
import './ItemDetail.css';
import Rating from '@mui/material/Rating';
import CartContext from '../../store/cart-context';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


const ItemDetail = ({ item }) => {

    const [talle, setTalle] = useState('m');
    const cartCtx = useContext(CartContext);
    const [confirmar, setConfirmar] = useState(false);
    const [cantidad, setCantidad] = useState(0);

    function onAdd(cant) {
        setConfirmar(true);
        setCantidad(cant);
        // }

    }

    function onConfirmar() {
        if (cartCtx.isInCart(item.id)) {
            Swal.fire({
                title: "Atención",
                text: "Este producto ya se encuentra agregado en el carrito. ¿Está seguro que desea agregarlo?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: '#B12704',
                cancelButtonColor: '#40434E',
                confirmButtonText: 'Si, ¡ Agregalo !',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    cartCtx.addProduct({
                        id: item.id,
                        imagen: item.imagen,
                        name: item.titulo,
                        precio: item.precio,
                        cantidad: cantidad,
                        talle: talle
                    })
                    Swal.fire({
                        title: "¡Producto Agregado!",
                        text: "Su producto ha sido agregado al carrito.",
                        icon: "success",
                        confirmButtonColor: '#40434E',
                        confirmButtonText: '¡ Gracias por su compra !',
                    })
                }
            })
        }
        else {
            cartCtx.addProduct({
                id: item.id,
                imagen: item.imagen,
                name: item.titulo,
                precio: item.precio,
                cantidad: cantidad,
                talle: talle
            })
        }


    }

    return (
        <div>
            <Container>
                <Row className='py-10'>
                    <Col className='px-20'>
                        <Card.Img className='bg-white px-10 py-4 w-100 h-50 rounded-3xl border-2 bordergray-100' src={item.imagen} height={350} style={{ objectFit: "contain" }} />
                    </Col>
                    <Col className='text-center'>
                        <Card.Title className='mt-5'>{item.titulo}</Card.Title>
                        <Rating className='mt-2' name="size-small" defaultValue={2} size="small" />
                        <hr></hr>
                        <Card.Text className='textoStyle mt-2'>{item.cartTexto}</Card.Text>
                        <Card.Text className='textoStyle mt-2'>Stock: {item.stock}</Card.Text>
                        <Card.Text className='textoStyle mt-2 mb-2'>Precio:  <span className='precioStyle'>$ {item.precio}</span></Card.Text>
                        <hr></hr>
                        {
                            !confirmar ? (
                                <div className='px-24 mt-4'>
                                    <Row className='w-100 px-8'>
                                        <ItemCount stock={item.stock} initial={1} onAdd={onAdd} />
                                    </Row>
                                </div>

                            ) : (
                                <>
                                    <button className="btn btn-talle col-1 m-3" onClick={() => setTalle('XS')}>XS</button>
                                    <button className="btn btn-talle col-1 m-3" onClick={() => setTalle('S')}>S</button>
                                    <button className="btn btn-talle col-1 m-3" onClick={() => setTalle('M')}>M</button>
                                    <button className="btn btn-talle col-1 m-3" onClick={() => setTalle('L')}>L</button>
                                    <button className="btn btn-talle col-1 m-3" onClick={() => setTalle('XL')}>XL</button>
                                    <br />
                                    <hr></hr>
                                    <Link to="/" style={{ textDecoration: 'none' }}>
                                        <button onClick={onConfirmar} className="btn btn-graySelected" style={{ marginTop: "5px" }}>Confirmar Compra ({cantidad})</button>
                                    </Link>
                                </>
                            )
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ItemDetail
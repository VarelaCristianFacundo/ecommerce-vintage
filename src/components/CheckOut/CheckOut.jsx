import React, { useContext, useState } from 'react'
import { collection, addDoc } from "firebase/firestore"
import db from "../../store/firebase"
import CartContext from '../../store/cart-context'
import { Button, Card, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap';

const CheckOut = () => {

    const cartCtx = useContext(CartContext);
    const [load, setLoad] = useState(false)
    const [orderID, setOrderID] = useState()

    const [buyer, setBuyer] = useState({
        Nombre: "",
        Email: "",
        Telefono: ''
    })

    const { Nombre, Email, Telefono } = buyer;

    const handleInputChange = (e) => {
        setBuyer(({
            ...buyer,
            [e.target.name]: e.target.value
        }))

        console.log(e.target);

    }

    // const updateOrder = () => {
    //     const documentoModificar = doc(db, "Orders", item.id)
    //     await updateDoc(documentoModificar.{price:200})

    // }

    const generateOrder = async (data) => {
        setLoad(true)
        try {
            const col = collection(db, "Orders")
            const order = await addDoc(col, data)
            setOrderID(order.id)
            setLoad(false)
            cartCtx.clear()
            console.log(order);
            console.log(order.id);
        }
        catch (error) {

        }
    }

    const handleSubmit = (e) => {
        const dia = new Date();
        e.preventDefault()
        const total = cartCtx.totalPrice()
        const items = cartCtx.products.map(e => { return { id: e.id, title: e.name, price: e.precio, amount: e.cantidad } })
        const data = { buyer, total, dia, items }
        console.log("data", data);
        generateOrder(data)
    }

    return (
        <>
            {load ? <Spinner animation="border" role="status">
                <span className="visually-hidden"></span>
            </Spinner>
                : (!orderID &&
                    <div style={{ display: "flex", marginTop: "5%" }}>
                        <div>
                            <br />
                            <h1 style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginLeft: "200px" }}>Para finalizar tu compra</h1>
                            <h3 style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginLeft: "200px" }}>Ingresá los siguientes datos</h3>
                            <br />
                            <br />
                            <br />
                            <Form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginLeft: "200px" }}>
                                <br />
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ display: "flex", alignItems: "flex-start" }}>Nombre y apellido</Form.Label>
                                    <Form.Control style={{ width: "150%" }} type="text" placeholder="Ingrese su nombre" name="Nombre" value={Nombre} onChange={handleInputChange} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ display: "flex", alignItems: "flex-start" }}>Correo Electrónico</Form.Label>
                                    <Form.Control style={{ width: "150%" }} type="email" placeholder="Ingrese su email" name="Email" value={Email} onChange={handleInputChange} required />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ display: "flex", alignItems: "flex-start" }}>Número de teléfono</Form.Label>
                                    <Form.Control style={{ width: "150%" }} type="number" placeholder="Ingrese su teléfono" name="Telefono" value={Telefono} onChange={handleInputChange} required />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>
                                <br />
                                <br />
                                <input
                                    type="submit"
                                    value="Finalizar Compra"
                                    className='btn btn-graySelected'
                                />
                            </Form>
                        </div>

                        <div>
                            <img style={{marginLeft:"5%"}} src="../assets/graciasCompra.png" alt="" />
                        </div>
                    </div>)
            }

            <div>
                {
                    orderID && (
                        <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginTop:"5%"}}>
                            <Card style={{ width: '30rem', padding:"1%" }}>
                                <Card.Img variant="top" src="https://elcomercio.pe/resizer/SRg8HsrwVKRmEBikuiHTLS5G3iY=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/MNXPPXB6ORB3TJET6L52BAXZWM.jpg" />
                                <Card.Body>
                                    <Card.Title as='h2'>Compra Finalizada con Éxito</Card.Title>
                                    <Card.Text as='h5'>
                                        {`Su código de compra es: ${orderID}`}
                                    </Card.Text>
                                    <Button className='btn-graySelected' to="/" variant="primary"><Link to="/" style={{textDecoration:"none", color:"white"}}>Realizar Otra Compra</Link></Button>
                                </Card.Body>
                            </Card>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default CheckOut
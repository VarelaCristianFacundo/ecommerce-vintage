import React, { useContext, useState } from 'react'
import { collection, addDoc } from "firebase/firestore"
import db from "../../store/firebase"
import CartContext from '../../store/cart-context'
import { Spinner } from 'react-bootstrap'
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
                : (!orderID && <div>
                    <br />
                    <h1 style={{display:"flex", flexDirection:"column", alignItems:"flex-start", marginLeft:"200px"}}>Para finalizar tu compra</h1>
                    <h3 style={{display:"flex", flexDirection:"column", alignItems:"flex-start", marginLeft:"200px"}}>Ingresá los siguientes datos</h3>
                    <br />
                    <br />
                    <br />
                    <Form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", alignItems:"flex-start", marginLeft:"200px"}}>
                    <br />
                        <Form.Group className="mb-3">
                            <Form.Label style={{display:"flex", alignItems:"flex-start"}}>Nombre y apellido</Form.Label>
                            <Form.Control style={{width:"200%"}} type="text" placeholder="Ingrese su nombre" name="Nombre" value={Nombre} onChange={handleInputChange} required />                            
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label style={{display:"flex", alignItems:"flex-start"}}>Correo Electrónico</Form.Label>
                            <Form.Control style={{width:"200%"}} type="email" placeholder="Ingrese su email" name="Email" value={Email} onChange={handleInputChange} required />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label style={{display:"flex", alignItems:"flex-start"}}>Número de teléfono</Form.Label>
                            <Form.Control style={{width:"200%"}} type="number" placeholder="Ingrese su teléfono" name="Telefono" value={Telefono} onChange={handleInputChange} required />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <input
                            type="submit"
                            value="Finalizar Compra"
                            className='btn btn-graySelected'
                        />
                    </Form>
                </div>)
            }

            <div>
                {
                    orderID && (
                        <div>
                            <h4>Compra Finalizada con Éxito</h4>
                            <h4>{`Su código de compra es: ${orderID}`}</h4>
                            <Link to="/"><h5>Realizar otra compra</h5></Link>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default CheckOut
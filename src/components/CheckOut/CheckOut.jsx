import React, { useContext, useState } from 'react'
import { collection, addDoc } from "firebase/firestore"
import db from "../../store/firebase"
import CartContext from '../../store/cart-context'
import { Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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
        const data = { total, dia, items }
        console.log("data", data);
        generateOrder(data)
    }

    return (
        <>
            <h1>Finalizando Compra</h1>
            <hr />
            {load ? <Spinner animation="border" role="status">
                <span className="visually-hidden"></span>
            </Spinner>
                : (!orderID && <div>
                    <h4>Completar Datos:</h4>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="Nombre"
                            placeholder="Nombre"
                            value={Nombre}
                            onChange={handleInputChange}
                            required
                        />
                        <br />
                        <input
                            type="email"
                            name="Email"
                            placeholder="Email"
                            value={Email}
                            onChange={handleInputChange}
                            required
                        />
                        <br />
                        <input
                            type="number"
                            name="Telefono"
                            placeholder="Telefono"
                            value={Telefono}
                            onChange={handleInputChange}
                            required
                        />
                        <br />
                        <br />
                        <input
                            type="submit"
                            value="Finalizar Compra"
                            className='btn btn-success'
                        />
                    </form>
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
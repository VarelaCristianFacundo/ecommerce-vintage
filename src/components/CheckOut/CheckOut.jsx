import React, { useContext, useState } from 'react'
import { collection, addDoc, updateDoc } from "firebase/firestore"
import db from "../../store/firebase"
import CartContext from '../../store/cart-context'

const CheckOut = () => {

    const cartCtx = useContext(CartContext);

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
        try {
            const col = collection(db, "Orders")
            const order = await addDoc(col, data)
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
        console.log(buyer);
        console.log(total);
        console.log(dia);
        console.log(items);
        generateOrder(data)
    }

    return (
        <div>
            <h1>Completar Datos</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="Nombre"
                    placeholder="Nombre"
                    value={Nombre}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="email"
                    name="Email"
                    placeholder="Email"
                    value={Email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="Telefono"
                    placeholder="Telefono"
                    value={Telefono}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="submit"
                    value="Finalizar Compra"
                    className='btn btn-success'
                />
            </form>
        </div>
    )
}

export default CheckOut
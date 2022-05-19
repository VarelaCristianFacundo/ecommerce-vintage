import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react'
import { Row } from 'react-bootstrap'
import Swal from 'sweetalert2';
import CartContext from '../../store/cart-context';
import CartWidgetDetail from '../CartWidgetDetail/CartWidgetDetail';
import { collection, addDoc, updateDoc } from "firebase/firestore"
import db from "../../store/firebase"

const ConfirmarCompra = () => {

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

    function completarCompra() {
        Swal.fire({
            title: 'How old are you?',
            icon: 'question',
            input: 'range',
            inputLabel: 'Your age',
            html:
                '<input id="swal-input1" class="swal2-input">' +
                '<input id="swal-input2" class="swal2-input">' +
                '<input id="swal-input3" class="swal2-input">',
            inputLabel: 'Your age',
            inputAttributes: {
                min: 8,
                max: 120,
                step: 1
            },
            inputValue: 25
        })
    }

    return (
        <div>
            <Row xs={1} md={1} className="g-1">
                {cartCtx.products.map((item, key) => <CartWidgetDetail item={item} key={key} />)}
            </Row>
            {cartCtx.products.length > 0 ? (
                <>
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
                    <div>
                        <h4>Precio Total: $ {cartCtx.totalPrice()}</h4>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button onClick={completarCompra} className="btn btn-gray" style={{ width: "14%", marginRight: "2%", borderColor: "#40434E", display: 'flex' }}>
                            Confirmar Compra
                            <div className="cart-widget"><FontAwesomeIcon icon={faCheck} size="1x" style={{ marginLeft: '80%' }} /></div>
                        </button>
                        <button onClick={cartCtx.clear} className="btn btn-danger" style={{ width: "8%", borderColor: 'red', display: 'flex' }}>
                            Vaciar
                            <div className="cart-widget"><FontAwesomeIcon icon={faTrash} size="1x" style={{ marginLeft: '100%' }} /></div>
                        </button>
                    </div>
                </>
            ) : (
                <h1>El carrito está vacio</h1>
            )}
        </div>
    )
}

export default ConfirmarCompra
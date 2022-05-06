import { useState } from "react";

import '../LogoutButton/LogoutButton.css';
import './ItemCount.css'

function ItemCount({ stock, initial, onAdd }) {
    const [contadorValue, actualizarContador] = useState(initial);

    return (
        <div className="container">
            <div className="row">
                <button className="btn btn-masmenos col-2" onClick={() => {
                        if (contadorValue > 1)
                            actualizarContador(contadorValue - 1);
                    }}>-</button>
                <input type="text" className="col-8" style={{ textAlign: "center", fontSize: "20px" }} value={contadorValue} readOnly/>
                <button className="btn btn-masmenos col-2" onClick={() => {
                        if (contadorValue < stock)
                            actualizarContador(contadorValue + 1)
                    }}>+</button>
            </div>
            <br></br>
            <button className="btn btn-gray" style={{ marginTop: "5px" }} onClick={() => (contadorValue <= stock) && onAdd(contadorValue)}>Agregar al carrito</button>
        </div>
    );
}

export default ItemCount;
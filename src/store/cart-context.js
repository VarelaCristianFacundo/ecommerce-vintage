import React, { createContext, useState } from 'react'

const CartContext = createContext({
    products: []
});


export const CartContextProvider = ({ children }) => {
    const [productList, setProductList] = useState([]);    

    const addProduct = (product) => {

    const indice = productList.findIndex(p => p.name === product.name && p.talle === product.talle)

        if (indice !== -1) {
            setProductList(
                productList.map((i) => {
                    if (i.name === product.name && i.talle === product.talle) {
                        return { ...i, cantidad: i.cantidad + product.cantidad }
                    }
                    else {
                        return i
                    }
                })
            )
        } else {
            setProductList([product, ...productList]);
        }
    }


    const removeProduct = (id) => {
        console.log(id);

        setProductList(productList.filter(i => i.id !== id))
    }

    const clear = () => {

    }

    const isInCart = (id) => {
        return true;
    }
    

    return (
        <CartContext.Provider value={{
            products: productList,
            addProduct: addProduct,
            removeProduct: removeProduct,
            clear: clear,
            isInCart: isInCart
        }}>
            {children}
        </CartContext.Provider>
    )
}




export default CartContext
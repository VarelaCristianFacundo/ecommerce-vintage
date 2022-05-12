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
        setProductList(productList.filter(i => i.id !== id))
    }

    const clear = () => {
        setProductList([]);
    }

    const isInCart = (id) => {
        return productList.some((i) => {
            if (i.id === id)
                return true;
            else
                return false;            
        })
    }

    const totalCount = () => {
        return productList.reduce((total, item) => total + item.cantidad, 0)
    }
    
    const totalPrice = () => {
        return productList.reduce((total, item) => total + item.cantidad * item.precio, 0)
    }

    const unitsPerProduct = (id) => {
        return productList.find((item) => item.id === id).cantidad;
    }

    return (
        <CartContext.Provider value={{
            products: productList,
            addProduct: addProduct,
            removeProduct: removeProduct,
            clear: clear,
            isInCart: isInCart,
            totalCount: totalCount,
            totalPrice: totalPrice,
            unitsPerProduct: unitsPerProduct
        }}>
            {children}
        </CartContext.Provider>
    )
}




export default CartContext
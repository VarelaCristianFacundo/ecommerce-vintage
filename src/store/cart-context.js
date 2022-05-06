import React, { createContext, useState } from 'react'

const CartContext = createContext({
    products: []
});


export const CartContextProvider = ({ children }) => {
    const [productList, setProductList] = useState([]);

    const addProduct = (product) => {
        setProductList([product, ...productList]);
    }


    const removeProduct = (id) => {
        setProductList(productList.filter(i => i.id !== id))
    }


    return (
        <CartContext.Provider value={{
            products: productList,
            addProduct: addProduct,
            removeProduct: removeProduct
        }}>
            {children}
        </CartContext.Provider>
    )
}




export default CartContext
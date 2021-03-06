import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import ItemDetail from '../ItemDetail/ItemDetail'


const ItemDetailContainer = ({ ropa }) => {
    const { id } = useParams()

    // useMemo se utiliza para no volver a iterar entre las ropas
    const ropaElegida = useMemo (() => {        
        return ropa.find((item) => {
            return item.id === id;
        })
    },[id]) 

    return (
        <div> 
            <ItemDetail item={ropaElegida} />            
        </div>
    )
}

export default ItemDetailContainer
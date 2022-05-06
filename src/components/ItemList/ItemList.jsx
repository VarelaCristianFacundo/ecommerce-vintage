import React, { useMemo } from 'react'
import { Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import Item from '../Item/Item';

const ItemList = ({ropa}) => {
    const { id } = useParams()
    
    const ropaElegida = useMemo (() => {                
        if (id === undefined)
            return ropa;
        else
            return ropa.filter((item) => {
                return item.category === id;        
        })
    },[id, ropa]) 

    return (
        <div>
            <Row xs={1} md={4} className="g-4">
                {ropaElegida.map((item) => <Item item={item} key={item.id} />)}
            </Row>
        </div>
    )
}

export default ItemList
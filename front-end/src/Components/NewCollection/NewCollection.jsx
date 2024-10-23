import React from 'react'
import "./NewCollections.css";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Item from '../item/Item';
function NewCollection() {

    const fetchProduct = async () => {
        const res = await axios.get("http://localhost:3001/newcollections", { withCredentials: true, });
        return res.data;
    };
    const { data: new_collections } = useQuery({
        queryKey: ["new_collections"],
        queryFn: fetchProduct
    });
    return (
        <div className='new-collections'>
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="collections">
                {new_collections && new_collections.length > 0 ? (
                    new_collections.map((item) => (
                        <Item key={item._id} id={item._id} name={item.name} image={`http://localhost:3001/${item.image}`} new_price={item.new_price} old_price={item.old_price} />
                    ))
                ) : (
                    <p>No New Collections available.</p>
                )}
            </div>
        </div>
    )
}

export default NewCollection
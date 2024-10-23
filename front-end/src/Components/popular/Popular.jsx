import React from 'react'
import "./popular.css";
import Item from '../item/Item';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

function Popular() {
    const fetchProduct = async () => {
        const res = await axios.get("https://full-stack-e-commerce-website-are8.onrender.com/popularinwomen", { withCredentials: true, });
        return res.data;
    };
    const { data: popularinwomen } = useQuery({
        queryKey: ["popularinwomen"],
        queryFn: fetchProduct
    });


    return (
        <div className='popular'>
            <h1>POPULAR IN WOMEN</h1>
            <hr />
            <div className="popular-item">
                {popularinwomen && popularinwomen.length > 0 ? (
                    popularinwomen.map((item) => (
                        <Item key={item._id} id={item._id} name={item.name} image={`https://full-stack-e-commerce-website-are8.onrender.com/${item.image}`} new_price={item.new_price} old_price={item.old_price} />
                    ))
                ) : (
                    <p>No popular items available.</p>

                )}
            </div>
        </div>
    )
}

export default Popular

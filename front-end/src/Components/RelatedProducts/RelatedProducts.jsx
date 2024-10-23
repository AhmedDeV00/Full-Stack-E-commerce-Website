import React from 'react'
import "./RelatedProducts.css"
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Item from '../item/Item';

function RelatedProducts() {
    const fetchProduct = async () => {
        const res = await axios.get("https://full-stack-e-commerce-website-are8.onrender.com/popularinwomen", { withCredentials: true, });
        return res.data;
    };
    const { data: relatedProducts } = useQuery({
        queryKey: ["relatedProducts"],
        queryFn: fetchProduct
    });
    return (
        <div className='relatedproduct'>
            <h1>Realted Products</h1>
            <hr />
            <div className="relatedproduct-item">
                {relatedProducts && relatedProducts.length > 0 ? (
                    relatedProducts.map((item) => (
                        <Item key={item._id} id={item._id} name={item.name} image={`https://full-stack-e-commerce-website-are8.onrender.com/${item.image}`} new_price={item.new_price} old_price={item.old_price} />
                    ))
                ) : (
                    <p>No popular items available.</p>
                )}
            </div>
        </div>
    )
}
export default RelatedProducts

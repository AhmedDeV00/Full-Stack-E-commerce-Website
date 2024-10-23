import React from 'react';
import "./listproduct.css";
import axios from "axios";
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import cross_icon from "../../assets/cross_icon.png";

const fetchInfo = async () => {
    const res = await axios.get("http://localhost:3001/allproducts", {
        withCredentials: true,
    });

    return res.data.products;
};

function ListProduct() {
    const { data: products = [], error, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: fetchInfo,
    });

    /// To remove product
    const deleteProduct = async (id) => {
        await axios.delete(`http://localhost:3001/removeproduct/${id}`, {
            withCredentials: true,
        });
    };
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries("products");
        },
    });
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    console.log(products);

    return (
        <div className='list-product'>
            <h1>All Products List</h1>
            <div className="listproduct-format-main">
                <p>Product</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {products.map(product => (
                    <div key={product._id} className="listproduct-format-main">
                        <img src={`http://localhost:3001/${product.image}`} className='listproduct-product-icon' alt="" />
                        <p>{product.name}</p>
                        <p>${product.old_price}</p>
                        <p>${product.new_price}</p>
                        <p>{product.category}</p>
                        <img className='listproduct-remove-icon' src={cross_icon} alt="" onClick={() => mutation.mutate(product._id)} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListProduct;

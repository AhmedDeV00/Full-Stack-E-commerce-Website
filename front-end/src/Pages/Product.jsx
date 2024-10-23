import React from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import Breadcrum from '../Components/breadcrum/Breadcrum';
import SingleProduct from '../Components/SingleProduct/SingleProduct';
import DescBox from '../Components/DescBox/DescBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

function Product() {
    const { id } = useParams();

    const OneProduct = async () => {
        const { data } = await axios.get(`https://full-stack-e-commerce-website-are8.onrender.com/product/${id}`);
        return data;
    };

    const { data: one_product, isLoading, error } = useQuery({
        queryKey: ['OneProduct', id],
        queryFn: OneProduct,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Product not found</div>;

    return (
        <div className='product'>
            <Breadcrum one_product={one_product} />
            <SingleProduct one_product={one_product} />
            <DescBox />
            <RelatedProducts />
        </div>
    )
}

export default Product

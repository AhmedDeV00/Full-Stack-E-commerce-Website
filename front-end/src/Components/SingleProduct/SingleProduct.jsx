import React, { useContext } from 'react'
import "./Singleproduct.css";
import star_icon from "../assets/Frontend_Assets/star_icon.png";
import star_dull_icon from "../assets/Frontend_Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopCategory';



function SingleProduct({ one_product }) {
    const { addToCart } = useContext(ShopContext);



    return (
        <div className='Singleproduct'>
            <div className="Singleproduct-left">
                <div className="Singleproduct-img-list">
                    <img src={`https://full-stack-e-commerce-website-are8.onrender.com/${one_product.image}`} alt="" />
                    <img src={`https://full-stack-e-commerce-website-are8.onrender.com/${one_product.image}`} alt="" />
                    <img src={`https://full-stack-e-commerce-website-are8.onrender.com/${one_product.image}`} alt="" />
                    <img src={`https://full-stack-e-commerce-website-are8.onrender.com/${one_product.image}`} alt="" />
                </div>
                <div className="Singleone_product-img">
                    <img src={`https://full-stack-e-commerce-website-are8.onrender.com/${one_product.image}`} alt="" className="Singleproduct-main-img" />
                </div>
            </div>
            <div className="Singleproduct-right">
                <h1>{one_product.name}</h1>
                <div className="Singleproduct-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="Singleproduct-right-prices">
                    <div className="Singleproduct-right-price-old">${one_product.old_price}</div>
                    <div className="Singleproduct-right-price-new">${one_product.new_price}</div>
                </div>
                <div className="Singleproduct-right-desc">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt molestias placeat possimus eaque sint est voluptas quis doloribus iusto porro, quidem accusantium. Itaque, esse voluptates.
                </div>
                <div className="Singleproduct-right-size">
                    <h1>Select Size</h1>
                    <div className="Singleproduct-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={() => {
                    addToCart(one_product._id);
                    console.log(one_product._id);
                }}>ADD TO CART</button>
                <p className='Singleproduct-right-category'><span>Category</span>Women, T-Shirt, Crop Top</p>
                <p className='Singleproduct-right-category'><span>Tags </span>Modern, Latest</p>
            </div>
        </div>
    );
}

export default SingleProduct;

import React, { useContext } from 'react'
import "./cartitems.css"
import { ShopContext } from '../../Context/ShopCategory'
import remove_icon from "../assets/Frontend_Assets/cart_cross_icon.png";

function CartItems() {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
    return (
        <div className='CartItems'>
            <div className="CartItems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                const quantity = cartItems[e._id];
                if (quantity && quantity > 0) {
                    return (
                        <div key={e._id}>
                            <div className="CartItems-format CartItems-format-main">
                                <img className='CartIcon-product-icon' src={`https://full-stack-e-commerce-website-are8.onrender.com/${e.image}`} alt="" />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <button className='CartItems-quantity'>{quantity}</button>
                                <p>${e.new_price * quantity}</p>
                                <img className='CartItems-remove-icon' onClick={() => { removeFromCart(e._id) }} src={remove_icon} alt="" />
                            </div>
                            <hr />
                        </div>
                    );
                } else {
                    return null;
                }
            })}
            <div className="CartItems-down">
                <div className="CartItems-total">
                    <h1> Cart Totals</h1>
                    <div>
                        <div className="CartItems-total-item">
                            <p>Subtatal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="CartItems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="CartItems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
                <div className="CartItems-promocode">
                    <p>If you have a promo code, Enter it Here</p>
                    <div className="CartItems-promobox">
                        <input type="text" />
                        <button className='btn'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems

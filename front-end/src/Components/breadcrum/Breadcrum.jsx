import React from 'react'
import "./breadcrum.css";
import arrow_icon from "../assets/Frontend_Assets/breadcrum_arrow.png";

function Breadcrum({ one_product }) {

    return (
        <div className='breadcrum'>
            HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {one_product.category} <img src={arrow_icon} alt="" /> {one_product.name}
        </div>
    )
}

export default Breadcrum
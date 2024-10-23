import React, { useState } from 'react';
import "./addproduct.css";
import upload_area from "../../assets/upload_area.svg";
import axios from "axios"

function AddProduct() {
    const [image, setImage] = useState(null);
    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", image)
            const res = await axios.post("http://localhost:3001/api/upload", formData);
            return `upload/images/${res.data}`;
        } catch (error) {
            console.log(error);
        }
    }

    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "",
        new_price: "",
        old_price: ""
    });

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const addproduct = async (e) => {
        e.preventDefault();
        try {
            let imgUrl = "";
            if (image) imgUrl = await upload();
            const newProductData = { ...productDetails, image: imgUrl };
            const res = await axios.post("http://localhost:3001/addproduct", newProductData, {
                withCredentials: true,
            });
            console.log(res);
            alert("product added!")
            setImage(null)
            setProductDetails({
                category: "",
                name: "",
                new_price: "",
                old_price: ""
            })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='addproduct'>
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='addproduct-selector'>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-img' alt="" />
                </label>
                <input onChange={imageHandler} type="file" name='file' id='file-input' hidden />
            </div>
            <button onClick={addproduct} className='addproduct-btn'>ADD</button>
        </div>
    );
}

export default AddProduct;

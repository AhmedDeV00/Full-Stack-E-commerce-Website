import React from 'react'
import "./admin.css";
import Sidebar from '../../components/sidebar/Sidebar';
import AddProduct from '../../components/addProduct/AddProduct';
import { Routes, Route } from 'react-router-dom';
import ListProduct from '../../components/listProduct/ListProduct';

function Admin() {
    return (
        <div className='admin'>
            <Sidebar />
            <Routes>
                <Route path='/addproduct' element={<AddProduct />} />
                <Route path='/listproduct' element={<ListProduct />} />
            </Routes>
        </div>
    )
}

export default Admin
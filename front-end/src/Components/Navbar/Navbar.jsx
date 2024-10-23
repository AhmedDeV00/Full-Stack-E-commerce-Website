import React, { useContext, useRef, useState } from 'react'
import "./navbar.css";
import logo from "../assets/Frontend_Assets/logo.png";
import cart_icon from "../assets/Frontend_Assets/cart_icon.png";
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopCategory';
import nav_dropdown from "../assets/Frontend_Assets/nav_dropdown.png";
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext';



function Navbar() {

    const { getTotalCartItems } = useContext(ShopContext);
    const navigate = useNavigate();
    const [menu, setMenu] = useState("shop");
    const menuRef = useRef()
    const { currentUser, logout } = useContext(AuthContext)

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle("nav-menu-visible");
        e.target.classList.toggle("open");
    }
    const handleLogout = () => {
        logout();
        navigate("/login");
    }
    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>SHOPPER</p>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className="nav-menu">
                <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: "none" }} to="/">Shop {menu === "shop" ? <hr /> : <></>}</Link></li>
                <li onClick={() => { setMenu("mens") }}><Link style={{ textDecoration: "none" }} to="/mens">Men{menu === "mens" ? <hr /> : <></>}</Link></li>
                <li onClick={() => { setMenu("womens") }}><Link style={{ textDecoration: "none" }} to="/womens">Women{menu === "womens" ? <hr /> : <></>}</Link></li>
                <li onClick={() => { setMenu("kids") }}><Link style={{ textDecoration: "none" }} to="/kids">Kids{menu === "kids" ? <hr /> : <></>}</Link></li>
            </ul>
            <div className="nav-login-cart">
                {currentUser
                    ? <button onClick={handleLogout}>Logout</button>
                    : <Link to="/login"><button>Login</button></Link>}
                <Link to="/cart"><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar
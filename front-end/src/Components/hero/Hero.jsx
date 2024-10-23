import React from 'react'
import "./hero.css";
import hand_icon from "../assets/Frontend_Assets/hand_icon.png";
import arrow_icon from "../assets/Frontend_Assets/arrow.png";
import hero_img from "../assets/Frontend_Assets/hero_image.png";

function Hero() {
    return (
        <div className='hero'>
            <div className="hero-left">
                <h2>NEW ARRIVALS ONLY</h2>
                <div>
                    <div className="hero-hand-icon">
                        <p>New</p>
                        <img src={hand_icon} alt="" />
                    </div>
                    <p>collections</p>
                    <p>For Everyone</p>
                </div>
                <div className="hero-latest-btn">
                    <div>Latest Collection</div>
                    <img src={arrow_icon} alt="" />
                </div>
            </div>
            <div className="hero-right">
                <img src={hero_img} alt="" />
            </div>
        </div>
    )
}

export default Hero;
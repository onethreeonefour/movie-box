import React from 'react'
import './Navigation.css';
import { Link } from 'react-router-dom';
import Logo from '../../Images/logo-short.svg'
function Navbar() {
    return (
        <div className="nav">
            <input type="checkbox" id="nav-check" />
            <div className="nav-header">
                <div className="nav-title">
                    <Link to="/"><img src={Logo} alt="tmdb" className="nav-logo" /></Link>
                </div>
            </div>
            <div className="nav-btn">
                <label htmlFor="nav-check">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>

            <div className="nav-links">

            </div>
        </div >
    )
}

export default Navbar


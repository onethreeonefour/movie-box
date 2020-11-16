import React from 'react'
import './Navigation.css';
import { Link } from 'react-router-dom';
function Navbar() {
    return (
        <div className="nav">
            <input type="checkbox" id="nav-check" />
            <div className="nav-header">
                <div className="nav-title">
                    <Link to="/">MovieBox</Link>
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
                <a href="//github.io/jo_geek" target="_blank">TV</a>
                <a href="http://stackoverflow.com/users/4084003/" target="_blank">Movie</a>
                <a href="https://in.linkedin.com/in/jonesvinothjoseph" target="_blank">People</a>

            </div>
        </div >
    )
}

export default Navbar


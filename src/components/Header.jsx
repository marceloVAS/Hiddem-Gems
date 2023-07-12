import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import './UI/Header.css'

export default function Header() {
    const location = useLocation();
    return (
        <div className='row header mb-5'>
            <div className='logo'>
                <div className='logo-txt'>
                    <h1>Hidden Gems</h1>
                    <p>Find unknown artists & songs that are similar to your favorites</p>
                </div>
                <span className="diamond"></span>
            </div>
            <nav className="navbar navbar-expand-lg ">
                <div className="container d-flex justify-content-sm-end justify-content-center">
                    <div>
                        <ul className="navbar-nav ">
                            <li className="nav-item">
                                {/* <a className="nav-link active" href="#">HOME</a> */}
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to='/'>HOME</Link>
                            </li>
                            <li className="nav-item">
                                {/* <a className="nav-link" href="#">ABOUT</a> */}
                                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to='/about'>ABOUT</Link>
                            </li>
                            <li className="nav-item">
                                {/* <a className="nav-link" aria-current="page" href="#">FEEDBACK</a> */}
                                <Link className="nav-link" to='/'>FEEDBACK</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
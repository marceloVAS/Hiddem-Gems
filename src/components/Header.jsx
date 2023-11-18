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
                    <ul className="navbar-nav ">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to='/'>HOME</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to='/about'>ABOUT</Link>
                        </li>
                        <li className="nav-item">
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfDEpJE_skZ5IEWuSjfQvM5kxvXbkG3pwu75KCHHcwmX0yDPA/viewform?usp=sf_link" className="nav-link" target="_blank">FEEDBACK</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
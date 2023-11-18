import React from 'react';
import './UI/Footer.css'

export default function Header() {
    return (
        <div className='row'>
            <nav className="navbar footer">
                <div className="container d-flex justify-content-start">
                <ul className="navbar-nav">
                        <li className="nav-item">
                            <p className='footer-txt'>v1 | built by Marcelo Sousa</p>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href='https://www.linkedin.com/in/marcelovas/' target="_blank">LINKEDIN</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href='https://www.marcelovas.com/index.html' target="_blank">PORTFOLIO</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
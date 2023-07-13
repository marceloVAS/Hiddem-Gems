import React from 'react';
import './UI/Footer.css'

export default function Header() {
    return (
        <div className='row header mb-5'>
            <nav className="navbar navbar-expand-lg ">
                <div className="container d-flex justify-content-sm-end justify-content-center">
                    <div>
                        <ul className="navbar-nav ">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">HOME</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">ABOUT</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#">FEEDBACK</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
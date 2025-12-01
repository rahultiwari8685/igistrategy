"use client";

import { useState } from "react";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdowns, setDropdowns] = useState({
        home: false,
        blog: false,
        shop: false,
        page: false,
        submenu: false,
    });

    const toggleDropdown = (name) => {
        setDropdowns({
            ...dropdowns,
            [name]: !dropdowns[name],
        });
    };

    return (
        <header className="main_header_area" id="header">
            <div className="container">
                <div className="header_menu">
                    <nav className="navbar navbar-expand-lg">


                        <a className="navbar-brand" href="/">
                            {/* <img
                                src="/assets/images/logo.png"
                                alt="Logo"
                                style={{ height: 45 }}
                            /> */}
                            {/* <img src="images/kyr.png" alt="" height={100} width={100} /> */}
                            <h6 className="kyr-ground">
                                Know Your Reality
                            </h6>

                        </a>


                        <button
                            className="navbar-toggler"
                            type="button"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <i className="fa fa-bars" />
                        </button>


                        <div className={`navbar-collapse navbar_supported ${menuOpen ? "show" : ""}`}>
                            <ul className="navbar-nav">


                                <li className="dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        onClick={() => toggleDropdown("home")}
                                    >
                                        Home
                                    </a>
                                    {dropdowns.home && (
                                        <ul className="dropdown-menu show">
                                            <li><a href="/">Home Version 1</a></li>
                                            <li><a href="/index-2">Home Version 2</a></li>
                                        </ul>
                                    )}
                                </li>


                                <li>
                                    <a className="nav-link" href="/about">About us</a>
                                </li>


                                <li className="dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        onClick={() => toggleDropdown("blog")}
                                    >
                                        Blog
                                    </a>
                                    {dropdowns.blog && (
                                        <ul className="dropdown-menu show">
                                            <li><a href="/blog">Blog list</a></li>
                                            <li><a href="/blog-details">Blog Details</a></li>
                                            {/* <li><a href="/news-2">News v2</a></li>
                                            <li><a href="/news-3">News v3</a></li>
                                            <li><a href="/news-details">News details</a></li>
                                            <li><a href="/video-details">Video details</a></li> */}
                                        </ul>
                                    )}
                                </li>


                                <li className="dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        onClick={() => toggleDropdown("shop")}
                                    >
                                        Reports
                                    </a>
                                    {dropdowns.shop && (
                                        <ul className="dropdown-menu show">
                                            <li><a href="/shop">Shop</a></li>
                                            <li><a href="/shop-details">Shop Details</a></li>
                                        </ul>
                                    )}
                                </li>


                                <li className="dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        onClick={() => toggleDropdown("page")}
                                    >
                                        Poll
                                    </a>
                                    {dropdowns.page && (
                                        <ul className="dropdown-menu show">

                                            {/* SUBMENU */}
                                            <li className="dropdown-sub">
                                                <a
                                                    className="nav-link dropdown-toggle"
                                                    onClick={() => toggleDropdown("submenu")}
                                                >
                                                    Sub Menu
                                                </a>

                                                {dropdowns.submenu && (
                                                    <ul className="dropdown-menu show">
                                                        <li><a href="#">Sub Menu v1</a></li>
                                                        <li><a href="#">Sub Menu v2</a></li>
                                                    </ul>
                                                )}
                                            </li>

                                            <li><a href="/register">Register</a></li>
                                            <li><a href="/login">Login</a></li>
                                            <li><a href="/error">Error (404)</a></li>
                                        </ul>
                                    )}
                                </li>

                                {/* CONTACT */}
                                <li>
                                    <a className="nav-link" href="/contact">Contact us</a>
                                </li>

                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}

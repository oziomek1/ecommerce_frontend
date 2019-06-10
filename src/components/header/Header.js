import React, { Component } from 'react';
import {NavLink} from "react-router-dom";

import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container">
                    <div className="navbar-collapse collapse">
                        <HeaderHome/>
                        <HeaderAuth/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;

const HeaderHome = () => {
    return (
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <NavLink className="navbar-brand" to="/" activeClassName="active">Home</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/product" activeClassName="active">Products</NavLink>
            </li>
        </ul>
    )
};

const HeaderAuth = () => {
    const isAuth = window.sessionStorage.getItem('token') !== null;
    const isAdmin = window.sessionStorage.getItem('isAdmin') === 'true';
    if (isAuth) {
        return (
            <ul className="navbar-nav">
                {isAdmin === true ? (
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/setting" activeClassName="active">Settings</NavLink>
                    </li>
                ) : (
                    <div/>
                )}
                <li className="nav-item">
                    <NavLink className="nav-link" to="/order" activeClassName="active">Orders</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/user" activeClassName="active">Account</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/signout" activeClassName="active">Log out</NavLink>
                </li>
            </ul>
        )
    } else {
        return (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/signin" activeClassName="active">Sign in</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/signup" activeClassName="active">Sign up</NavLink>
                </li>
            </ul>
        )
    }
};

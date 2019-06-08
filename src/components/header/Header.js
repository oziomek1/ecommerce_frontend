import React, { Component } from 'react';
import {NavLink} from "react-router-dom";

import './Header.css';

class Header extends Component {

    render() {
        return (
            <div className="container">
                <div className="navbar navbar-expand navbar-dark bg-dark">
                    <div className="navbar-collapse collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="navbar-brand" to="/" activeClassName="active">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/category" activeClassName="active">Category</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/product" activeClassName="active">Products</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/order" activeClassName="active">Order</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/user" activeClassName="active">User</NavLink>
                            </li>
                        </ul>
                        {/*<ul className="navbar-nav">*/}
                            {/*<li className="nav-item">*/}
                                {/*<NavLink className="nav-link" to="/addcategory" activeClassName="active">Add*/}
                                    {/*Category</NavLink>*/}
                            {/*</li>*/}
                            {/*<li className="nav-item">*/}
                                {/*<NavLink className="nav-link" to="/addproduct" activeClassName="active">Add*/}
                                    {/*Product</NavLink>*/}
                            {/*</li>*/}
                        {/*</ul>*/}
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/signin" activeClassName="active">Sign in</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/signup" activeClassName="active">Sign up</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/signout" activeClassName="active">Log out</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;

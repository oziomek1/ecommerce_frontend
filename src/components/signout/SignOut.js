import React, { Component } from 'react';

import './SignOut.css';
import Header from "../header/Header";
import {Link} from "react-router-dom";

class SignOut extends Component {

    render() {
        return (
            <>
                <Header/>
                <div className="container">
                    <h1>Logout!</h1>
                    <p>Already a member? <Link to="/signin">Sign in</Link></p>
                </div>
            </>
        );
    }
}

export default SignOut;

import React, { Component } from 'react';

import './SignUp.css';
import Header from "../header/Header";
import {Link} from "react-router-dom";

class SignUp extends Component {

    render() {
        return (
            <>
                <Header/>
                <div className="container">
                    <h1>Sign Up!</h1>
                    <p>Already a member? <Link to="/signin">Sign in</Link></p>
                </div>
            </>
        );
    }
}

export default SignUp;

import React, { Component } from 'react';

import './Login.css';
import Header from "../header/Header";

class Login extends Component {

    render() {
        return (
            <>
                <Header/>
                <div className="container">
                    <h1>Login!!</h1>
                </div>
            </>
        );
    }
}

export default Login;
import React, { Component } from 'react';

import './Home.css';
import Header from "../header/Header";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: window.sessionStorage.getItem('email'),
            firstName: window.sessionStorage.getItem('firstName'),
            lastName: window.sessionStorage.getItem('lastName'),
            socialID: window.sessionStorage.getItem('socialID'),
            token: window.sessionStorage.getItem('token'),
            redirectToLogin: false,
            isAuth: false,
        };
    }

    render() {
        return (
            <>
                <Header/>
                <div className="container">
                    <h1>Welcome {window.sessionStorage.getItem('firstName')} {this.state.lastName}</h1>
                </div>
            </>
        );
    }
}

export default Home;

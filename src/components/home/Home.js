import React, { Component } from 'react';

import './Home.css';
import Header from "../header/Header";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            socialID: '',
            token: '',
            redirectToLogin: false,
            isAuth: false,
        };
    }

    async componentDidMount() {
        if (window.sessionStorage.getItem('firstname')) {
            const socialID = window.sessionStorage.getItem('socialID');
            const email = window.sessionStorage.getItem('email');
            const firstName = window.sessionStorage.getItem('firstName');
            const lastName = window.sessionStorage.getItem('lastName');
            const token = window.sessionStorage.getItem('token');
            this.setState({
                email: email,
                firstName: firstName,
                lastName: lastName,
                socialID: socialID,
                token: token,
            });
        }

        return this.props.handleFirstName;
    }

    render() {
        return (
            <>
                <Header/>
                <div className="container">
                    <h1>Welcome {this.state.firstName} {this.state.lastName}</h1>
                </div>
            </>
        );
    }
}

export default Home;

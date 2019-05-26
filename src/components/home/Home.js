import React, { Component } from 'react';

import './Home.css';
import Header from "../header/Header";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectToLogin: false,
            isAuth: false,
        };
    }

    async componentDidMount() {
        const token = window.sessionStorage.getItem('token');
        console.log('Token', token);
    }

    render() {
        return (
            <>
                <Header/>
                <div className="container">
                    <h1>Home!!</h1>
                </div>
            </>
        );
    }
}

export default Home;
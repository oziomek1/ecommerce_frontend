import React, { Component } from 'react';

import './Home.css';
import Header from "../header/Header";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectToLogin: false,
            isAuth: false,
            email: '',
            firstName: '',
            lastName: '',
        };
    }

    async componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        this.setState({
            email: params.get('email'),
            firstName: params.get('firstname'),
            lastName: params.get('lastname'),
        });

        if(params.get('firstname')) {
            return this.props.handleFirstName;
        }
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

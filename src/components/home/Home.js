import axios from 'axios';
import React, { Component } from 'react';

import './Home.css';
import Header from "../header/Header";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectToLogin: false,
            isAuth: false,
            firstName: '',
            lastName: '',
        };
    }

    async componentDidMount() {
        const token = window.sessionStorage.getItem('token');

        if (token !== null) {
            try {
                const response = await axios.get(
                    '/user',
                    {
                        headers: {
                            'X-Auth-Token': token,
                        },
                    },
                );
                const data = response.data;

                this.setState({
                    firstName: data.firstName,
                    lastName: data.lastName,
                });
            } catch (error) {
                console.log(error);
                this.setState({ redirectToLogin: true });
            }
        }
    }


    render() {
        return (
            <>
                <Header/>
                <div className="container">
                    <div className="row justify-content-center">
                        <h1>Welcome {this.state.firstName} {this.state.lastName}</h1>
                    </div>
                        <hr />
                    <div className="row justify-content-center">
                        <img className="d-block w-75" src="images/spain.jpg" alt="First slide"/>
                    </div>
                </div>
            </>
        );
    }
}

export default Home;

import axios from "axios";
import React, { Component } from 'react';

import './SignOut.css';
import Header from "../header/Header";
import {Link, Redirect} from "react-router-dom";

class SignOut extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shouldRedirectSignIn: false,
        };
    }

    async componentDidMount() {
        const token = window.sessionStorage.getItem('token');
        try {
            await axios.get('/signOut',
                {
                    headers: {
                        'X-Auth-Token': token,
                    },
                },
            );

            sessionStorage.clear();

            this.setState({
                shouldRedirectSignIn: true,
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const shouldRedirectSignIn = this.state.shouldRedirectSignIn;

        if (shouldRedirectSignIn) {
            return <Redirect to='/signin'/>
        }

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

import axios from "axios";
import React, { Component } from 'react';

import './SignOut.css';
import Header from "../header/Header";
import {Link, Redirect} from "react-router-dom";

class SignOut extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shouldRedirectHome: false,
        };
    }

    async componentDidMount() {
        try {
            await axios.get('/signOut');

            sessionStorage.clear();

            this.setState({
                shouldRedirectHome: true,
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        if (this.state.shouldRedirectHome) {
            return <Redirect to='/'/>
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

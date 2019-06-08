import axios from "axios";
import React, { Component } from 'react';

import './SignIn.css';
import Header from "../header/Header";
import {Link, Redirect} from "react-router-dom";

class SignIn extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            shouldRedirectHome: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    handleChangeEmail(event) {
        this.setState({email: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit() {
        if (this.state.email !== '' && this.state.password) {
            axios.post('/signIn', {
                email: this.state.email,
                password: this.state.password
            })
                .then((response) => {
                    this.setState({
                        shouldRedirectHome: true
                    });
                    console.log(response.data);
                    this.props.history.push('/category');
                })
                .catch((error) => {
                    console.log(error);
                    this.props.history.push('/category');

                });
        }
    }

    render() {
        if (this.state.shouldRedirectHome) {
            return <Redirect to="/" />;
        }

        return (
            <>
                <Header/>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <h1 className="text-center">Sign In</h1>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Email:</label>
                                    <div className="col-sm-10">
                                        <input
                                            id="email"
                                            className="form-control"
                                            placeholder="Email"
                                            value={this.state.email}
                                            onChange={this.handleChangeEmail}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Password:</label>
                                    <div className="col-sm-10">
                                        <input
                                            id="password"
                                            type="password"
                                            className="form-control"
                                            placeholder="password"
                                            value={this.state.password}
                                            onChange={this.handleChangePassword}
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success">
                                    Log in
                                </button>
                            </form>
                            <hr />
                            <p>Not a member? <Link to="/signup">Sign up</Link></p>
                            <p>Or sign in via existing accounts:</p>
                            <div className="container-fluid">
                                <div className="row vertical-align">
                                    <a href="http://localhost:9000/authenticate/facebook" className="facebook">
                                        <img src="images/facebook.png" width="64px" height="64px" alt="facebook login"/>
                                    </a>
                                    <a href="http://localhost:9000/authenticate/google" className="google">
                                        <img src="images/google.png" width="64px" height="64px" alt="google login"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default SignIn;

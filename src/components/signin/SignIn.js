import axios from "axios";
import React, { Component, FormEvent } from 'react';

import './SignIn.css';
import Header from "../header/Header";
import {Link, Redirect} from "react-router-dom";

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            rememberMe: false,
            shouldRedirectHome: false,
            passedWrongCredentials: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeRememberMe = this.handleChangeRememberMe.bind(this);
    }

    handleChangeEmail(event) {
        this.setState({email: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    handleChangeRememberMe(event) {
        this.setState({rememberMe: event.target.value});
    }

    handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (this.state.email !== '' && this.state.password) {
            await axios.post('/signIn', {
                email: this.state.email,
                password: this.state.password,
                rememberMe: this.state.rememberMe,
            })
                .then((response) => {
                    const data = response.data;
                    window.sessionStorage.setItem('token', data['token']);

                    this.setState({
                        shouldRedirectHome: true
                    });
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({
                        passedWrongCredentials: true,
                    })
                });
        }
    }

    render() {
        const passedWrongCredentials = this.state.passedWrongCredentials;

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
                            {passedWrongCredentials &&
                                <div className="alert alert-warning" role="alert">
                                    Wrong sign in credentials. Please try again
                                </div>
                            }
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Email:</label>
                                    <div className="col-sm-9">
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
                                    <label className="col-sm-3 col-form-label">Password:</label>
                                    <div className="col-sm-9">
                                        <input
                                            id="password"
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            value={this.state.password}
                                            onChange={this.handleChangePassword}
                                        />
                                    </div>
                                </div>
                                <div className="form-check">
                                    <input
                                        id="rememberMe"
                                        type="checkbox"
                                        className="form-check-input"
                                        value={this.state.rememberMe}
                                        onChange={this.handlerChangerememberMe}
                                    />
                                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                                </div>
                                <button type="submit" className="btn btn-success">
                                    Sign in
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

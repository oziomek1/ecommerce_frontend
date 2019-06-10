import axios from "axios";
import React, { Component, FormEvent } from 'react';

import './SignUp.css';
import Header from "../header/Header";
import {Link, Redirect} from "react-router-dom";

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shouldRedirectHome: false,
            firstName: '',
            lastName: '',
            address: '',
            email: '',
            password: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }


    handleChangeFirstName(event) {
        this.setState({firstName: event.target.value});
    }

    handleChangeLastName(event) {
        this.setState({lastName: event.target.value});
    }

    handleChangeAddress(event) {
        this.setState({address: event.target.value});
    }

    handleChangeEmail(event) {
        this.setState({email: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (this.state.email !== '' && this.state.password) {
            await axios.post('/signUp', {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                email: this.state.email,
                password: this.state.password
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
                            <h1 className="text-center">Sign Up</h1>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">First name:</label>
                                    <div className="col-sm-9">
                                        <input
                                            id="firstname"
                                            className="form-control"
                                            placeholder="First name"
                                            value={this.state.firstName}
                                            onChange={this.handleChangeFirstName}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Last name:</label>
                                    <div className="col-sm-9">
                                        <input
                                            id="lastname"
                                            className="form-control"
                                            placeholder="Last name"
                                            value={this.state.lastName}
                                            onChange={this.handleChangeLastName}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Address:</label>
                                    <div className="col-sm-9">
                                        <input
                                            id="address"
                                            className="form-control"
                                            placeholder="Address"
                                            value={this.state.address}
                                            onChange={this.handleChangeAddress}
                                        />
                                    </div>
                                </div>
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
                                <button type="submit" className="btn btn-success">
                                    Sign up
                                </button>
                            </form>
                            <hr />
                            <p>Already a member? <Link to="/signin">Sign in</Link></p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default SignUp;

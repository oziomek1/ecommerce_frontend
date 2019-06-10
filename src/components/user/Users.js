import axios from "axios";
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import './Users.css';
import User from "./User";
import Header from "../header/Header";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            users: [],
            shouldRedirectSignIn: false,
        };
    }

    async componentDidMount() {
        const token = window.sessionStorage.getItem('token');
        if (token !== null) {
            const promise = await axios.get('/user',
                {
                    headers: {
                        'X-Auth-Token': token,
                    },
                },
            );
            const response = promise.data;
            this.setState({user: response});
            const promiseUsers = await axios.get('/users/bySocial/' + response.loginInfo.providerKey,
                {
                    headers: {
                        'X-Auth-Token': token,
                    },
                },
            );
            const responseUsers = promiseUsers.data[0];

            this.setState({users: responseUsers});
            console.log(response, responseUsers, response.loginInfo.providerKey);
        } else {
            this.setState({shouldRedirectSignIn: true});
        }
    }

    render() {
        if (this.state.shouldRedirectSignIn) {
            return <Redirect to='/signin' />;
        }

        if (this.state.user) {
            return (
                <>
                    <Header/>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-10">
                                <h1 className="text-center">Account details {this.state.user.firstName} {this.state.user.lastName}</h1>
                                <User
                                    userID={this.state.users.userID}
                                    userSocialID={this.state.users.userSocialID}
                                    userEmail={this.state.user.email}
                                    userFirstname={this.state.user.firstName}
                                    userLastname={this.state.user.lastName}
                                    userAddress={this.state.user.address}
                                />
                            </div>
                        </div>
                    </div>
                </>
            );
        }
        return null;
    }
}

export default Users;

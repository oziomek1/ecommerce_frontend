import axios from "axios";
import React, { Component } from 'react';

import './Users.css';
import User from "./User";
import Header from "../header/Header";

class Users extends Component {
    constructor() {
        super();
        this.state = {
            user: []
        };
    }

    async componentDidMount() {
        const token = window.sessionStorage.getItem('token');

        const promise = await axios.get('/user',
            {
                headers: {
                    'X-Auth-Token': token,
                },
            },
        );
        const response = promise.data;
        console.log(response);
        this.setState({user : response});
    }

    render() {
        if (this.state.user) {
            return (
                <>
                    <Header/>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-10">
                                <h1 className="text-center">User info</h1>
                                <User
                                    userID={this.state.user.userID}
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

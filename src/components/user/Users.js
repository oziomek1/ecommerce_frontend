import axios from "axios";
import React, { Component } from 'react';

import './Users.css';
import User from "./User";
import Header from "../header/Header";

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        };
    }

    async componentDidMount() {
        const promise = await axios.get('/users');
        const response = promise.data;
        this.setState({users : response});
    }

    render() {
        return (
            <>
                <Header/>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-10">
                            <h1 className="text-center">Users list</h1>
                            { this.state.users.map((user, index) =>
                                <User
                                    key={index}
                                    userID={user.userID}
                                    userEmail={user.userEmail}
                                    userFirstname={user.userFirstname}
                                    userLastname={user.userLastname}
                                    userAddress={user.userAddress}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Users;
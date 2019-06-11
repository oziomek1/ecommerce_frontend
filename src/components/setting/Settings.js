import axios from "axios";
import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";

import './Settings.css';
import Header from "../header/Header";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: [],
            users: [],
            shouldRedirectSignIn: false,
        };
    }

    async componentDidMount() {
        const token = window.sessionStorage.getItem('token');
        const isAdmin = window.sessionStorage.getItem('isAdmin') === 'true';
        if (isAdmin) {
            if (token !== null) {
                const promise = await axios.get('/user',
                    {
                        headers: {
                            'X-Auth-Token': token,
                        },
                    },
                );
                const response = promise.data;
                this.setState({});
                const promiseUsers = await axios.get('/users',
                    {
                        headers: {
                            'X-Auth-Token': token,
                        },
                    },
                );
                const responseUsers = promiseUsers.data;
                this.setState({
                    admin: response,
                    users: responseUsers,
                });
            } else {
                this.setState({shouldRedirectSignIn: true});
            }
        } else {
            this.setState({shouldRedirectSignIn: true});
        }
    }

    render() {
        if (this.state.shouldRedirectSignIn) {
            return <Redirect to='/signin' />;
        }

        if (this.state.admin) {
            return (
                <>
                    <Header/>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-6">
                                <div className="list-group">
                                    <div className="row justify-content-center">
                                        <h3>Settings:</h3>
                                    </div>
                                    <Link to="/category" className={`list-group-item list-group-item-action`}>Categories List</Link>
                                    <Link to="/addcategory" className={`list-group-item list-group-item-action`}>Add category</Link>
                                    <Link to="/product" className={`list-group-item list-group-item-action`}>Products List</Link>
                                    <Link to="/addproduct" className={`list-group-item list-group-item-action`}>Add product</Link>
                                    <Link to="/order" className={`list-group-item list-group-item-action`}>Orders List</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
        return null;
    }
}

export default Settings;

import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import './Orders.css';
import Order from './Order';
import Header from "../header/Header";

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            user: '',
            shouldRedirectSignIn: false,
        };
    }

    async componentDidMount() {
        const token = window.sessionStorage.getItem('token');
        if (token !== null) {
            const userID = window.sessionStorage.getItem('userID');
            const promise = await axios.get('/orders/byUser/' + userID,
                {
                    headers: {
                        'X-Auth-Token': token,
                    },
                },
            );
            const response = promise.data;
            const promiseUser = await axios.get('/user',
                {
                    headers: {
                        'X-Auth-Token': token,
                    },
                },
            );
            const responseUser = promiseUser.data;
            this.setState({
                orders: response,
                user: responseUser,
            });
        } else {
            this.setState({ shouldRedirectSignIn: true });
        }
    }

    render() {
        if (this.state.shouldRedirectSignIn) {
            return <Redirect to='/signin' />;
        }

        return (
            <>
                <Header/>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-10">
                            <h1 className="text-center">Orders for {this.state.user.firstName} {this.state.user.lastName}:</h1>
                            { this.state.orders.map((order, index) =>
                                <Order
                                    key={index}
                                    orderID={order.orderID}
                                    userID={order.userID}
                                    orderAddress={order.orderAddress}
                                    orderDate={order.orderDate}
                                    orderShipped={order.orderShipped}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Orders;

import axios from 'axios';
import React, { Component } from 'react';

import './Orders.css';
import Order from './Order';
import Header from "../header/Header";

class Orders extends Component {
    constructor() {
        super();
        this.state = {
            orders: []
        };
    }

    async componentDidMount() {
        const promise = await axios.get('/orders');
        const response = promise.data;
        this.setState({orders: response});
    }

    render() {
        return (
            <>
                <Header/>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-10">
                            <h1 className="text-center">Orders list</h1>
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
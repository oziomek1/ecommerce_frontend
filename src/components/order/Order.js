import axios from 'axios';
import React, { Component } from 'react';

import './Orders.css';

class Order extends Component {
    constructor() {
        super();
        this.state = {
            orderDetails: []
        };
    }

    async componentDidMount() {
        const promise = await axios.get('/orderDetail/byOrder/' + this.props.orderID);
        const response = promise.data;
        this.setState({orderDetails: response});
    }

    render() {
        return (
            <div className="user">
                <div className="jumbotron jumbotron-fluid">
                    <div className="row justify-content-center">
                        <h4><strong>Order ID: {this.props.orderID}</strong></h4>
                    </div>
                    <div className="row">
                        <div className="offset-1 col-5">
                            <p><strong>User ID</strong>: {this.props.userID}</p>
                            <p><strong>Order address</strong>: {this.props.orderAddress}</p>
                            <p><strong>Order date</strong>: {this.props.orderDate}</p>
                            <p><strong>Order shipped</strong>: {this.renderShipped()}</p>
                        </div>
                        <div className="offset-1 col-5">
                            {this.state.orderDetails.map(order =>
                                <div>
                                    <p><strong>Order net price</strong>: {order.orderDetailPriceNet}</p>
                                    <p><strong>Order gross price</strong>: {order.orderDetailPriceGross}</p>
                                    <p><strong>Product ID</strong>: {order.productID}</p>
                                    <p><strong>No. of items</strong>: {order.productQuantity}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        )
    }

    renderShipped() {
        if(this.state.orderShipped) {
            return (
                <span className="badge badge-success">
                    Shipped <i className="fa fa-check"></i>
                </span>
            )
        } else {
            return (
                <span className="badge badge-danger">
                    Not Shipped <i className="fa fa-close"></i>
                </span>
            )
        }
    }

}

export default Order;
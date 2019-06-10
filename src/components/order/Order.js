import axios from 'axios';
import React, { Component } from 'react';

import './Orders.css';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDetails: [],
            user: '',
            product: '',
            allLoaded: '',
        };
    }

    async componentDidMount() {
        const token = window.sessionStorage.getItem('token');
        const promiseDetail = await axios.get('/orderDetail/byOrder/' + this.props.orderID,
            {
                headers: {
                    'X-Auth-Token': token,
                },
            },
        );
        const responseDetail = promiseDetail.data;
        this.setState({orderDetails: responseDetail});

        const promiseUser = await axios.get('/user',
            {
                headers: {
                    'X-Auth-Token': token,
                },
            },
        );
        const responseUser = promiseUser.data;

        const promiseProduct = await axios.get('/products/' + this.state.orderDetails[0].productID,
            {
                headers: {
                    'X-Auth-Token': token,
                },
            },
        );
        const responseProduct = promiseProduct.data;
        this.setState({
            user: responseUser,
            product: responseProduct,
            allLoaded: true,
        })

    }

    render() {
        if (this.state.allLoaded) {
            return (
                <div className="user">
                    <div className="jumbotron jumbotron-fluid">
                        <div className="row justify-content-center">
                            <h2><strong>Product: {this.state.product[0].productName}</strong></h2>
                        </div>
                        <div className="row">
                            <div className="offset-1 col-5">
                                <p><strong>User</strong>: {this.state.user.firstName} {this.state.user.lastName}</p>
                                <p><strong>Order address</strong>: {this.props.orderAddress}</p>
                                <p><strong>Order date</strong>: {this.props.orderDate}</p>
                                <p><strong>Description</strong>: {this.state.product[0].productDescription}</p>
                            </div>
                            <div className="offset-1 col-5">
                                {this.state.orderDetails.map((order, index) =>
                                    <div key={index}>
                                        <p><strong>Net price</strong>: {order.orderDetailPriceNet} PLN</p>
                                        <p><strong>Gross price</strong>: {order.orderDetailPriceGross} PLN</p>
                                        <p><strong>No. of items</strong>: {order.productQuantity}</p>
                                        <p><strong>Order shipped</strong>: {this.renderShipped()}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <br/>
                </div>
            )
        }
        return <div>Loading...</div>
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

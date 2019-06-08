import axios from 'axios';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './Orders.css';
import Header from "../header/Header";

class AddOrder extends Component {
    constructor() {
        super();
        this.state = {
            orderID: '',
            orders: [],
            userID: 4,
            orderAddress: '',
            orderShipped: false,
            productID: '',
            productQuantity: 1,
            productPriceNet: '',
            productPriceGross: '',
            orderDetailsPriceNet: '',
            orderDetailsPriceGross: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeOrderAddress = this.handleChangeOrderAddress.bind(this);
        this.handleChangeProductQuantity = this.handleChangeProductQuantity.bind(this);
    }

    async componentDidMount() {
        let productPriceNet = parseInt(this.props.match.params.priceNet, 10);
        let productPriceGross = parseInt(this.props.match.params.priceGross, 10);
        this.setState({
            productID: parseInt(this.props.match.params.id, 10),
            productPriceNet: productPriceNet,
            productPriceGross: productPriceGross,
            orderDetailsPriceNet: productPriceNet,
            orderDetailsPriceGross: productPriceGross,
        });
    }

    handleChangeOrderAddress(event) {
        this.setState({orderAddress: event.target.value});
    }
    handleChangeProductQuantity(event) {
        let productQuantity = parseInt(event.target.value, 10);
        let orderDetailsPriceNet = productQuantity * this.state.productPriceNet;
        let orderDetailsPriceGross = productQuantity * this.state.productPriceGross;
        this.setState({
            productQuantity: productQuantity,
            orderDetailsPriceNet: orderDetailsPriceNet,
            orderDetailsPriceGross: orderDetailsPriceGross,
        });
    }
    handleSubmit() {
        if (this.state.productID !== '' && this.state.userID !== '') {
            axios.post('/orders/add', {
                userID: this.state.userID,
                orderAddress: this.state.orderAddress,
                productQuantity: this.state.productQuantity,
                productID: this.state.productID,
                orderDetailsPriceNet: this.state.orderDetailsPriceNet,
                orderDetailsPriceGross: this.state.orderDetailsPriceGross
            })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    render() {
        return (
            <>
                <Header/>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <h1 className="text-center">Add Order</h1>
                            <form onSubmit={this.handleSubmit}>
                                <br/>
                                <div className="row">
                                    <div className="col-6">
                                    <p id="userID">UserID: {this.state.userID}</p>
                                    </div>
                                    <div className="col-6">
                                        <p id="userID">ProductID: {this.state.productID}</p>
                                    </div>
                                </div>
                                <br/>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Address:</label>
                                    <div className="col-sm-10">
                                        <input
                                            id="orderAddress"
                                            type="text"
                                            className="form-control"
                                            placeholder="Address"
                                            value={this.state.orderAddress}
                                            onChange={this.handleChangeOrderAddress}
                                        />
                                    </div>
                                </div>
                                <br/>
                                <p id="productPriceNet">Net price per item: {this.state.productPriceNet}</p>
                                <br/>
                                <p id="productPriceGross">Gross price per item: {this.state.productPriceGross}</p>
                                <br/>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Product Quantity:</label>
                                    <div className="col-sm-10">
                                        <input
                                            id="orderProductQuantity"
                                            type="number"
                                            min="1"
                                            max="100"
                                            className="form-control"
                                            placeholder="Quantity"
                                            value={this.state.productQuantity}
                                            onChange={this.handleChangeProductQuantity}
                                        />
                                    </div>
                                </div>
                                <br/>
                                <p id="orderTotalPriceNet">Total net price: {this.state.orderDetailsPriceNet}</p>
                                <br/>
                                <p id="orderTotalPriceGross">Total gross price: {this.state.orderDetailsPriceGross}</p>
                                <br/>
                                <button type="submit" className="btn btn-success">
                                    Add
                                </button>
                            </form>
                            <hr />
                            <Link to="/order">
                                <p className="btn btn-info">Go to orders!</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AddOrder;

import axios from 'axios';
import React, { Component, FormEvent } from 'react';
import { Redirect } from "react-router-dom";

import './Orders.css';
import Header from "../header/Header";

class AddOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            readParams: false,
            params: '',
            orderID: '',
            firstName: '',
            lastName: '',
            userID: '',
            orderAddress: '',
            orderShipped: false,
            productImageURL: '',
            productDescription: '',
            productName: '',
            productID: '',
            productQuantity: 1,
            productPriceNet: '',
            productPriceGross: '',
            orderDetailsPriceNet: '',
            orderDetailsPriceGross: '',
            shouldRedirectSignIn: false,
            shouldRedirectProducts: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeOrderAddress = this.handleChangeOrderAddress.bind(this);
        this.handleChangeProductQuantity = this.handleChangeProductQuantity.bind(this);
    }

    async componentDidMount() {
        const params = await new URLSearchParams(this.props.location.search);
        if (params.get('productID')) {
            this.setState({
                params: params,
                readParams: true,
            });
        }
        const token = window.sessionStorage.getItem('token');
        if (token !== null) {
            try {
                const response = await axios.get(
                    '/user',
                    {
                        headers: {
                            'X-Auth-Token': token,
                        },
                    },
                );
                const data = response.data;

                if (this.state.readParams) {
                    const productResponse = await axios.get(
                        '/products/' + this.state.params.get('productID'),
                        {
                            headers: {
                                'X-Auth-Token': token,
                            },
                        },
                    );
                    const productData = productResponse.data[0];
                    console.log('productresponse', productResponse.data[0]);

                    this.setState({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        userID: data.userID,
                        orderAddress: data.address,
                        productName: productData.productName,
                        productImageURL: productData.productImageURL,
                        productDescription: productData.productDescription,
                        productID: parseInt(this.state.params.get('productID')),
                        productPriceNet: parseInt(this.state.params.get('priceNet'), 10),
                        productPriceGross: parseInt(this.state.params.get('priceGross'), 10),
                        orderDetailsPriceNet: parseInt(this.state.params.get('priceNet'), 10),
                        orderDetailsPriceGross: parseInt(this.state.params.get('priceGross'), 10),
                    });
                    console.log('state', this.state);
                }
            } catch (error) {
                console.log(error);
                this.setState({ shouldRedirectSignIn: true });
            }
        } else {
            this.setState({ shouldRedirectSignIn: true });
        }
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
    handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (this.state.productID !== '' && this.state.userID !== '') {
            await axios.post('/orders/add', {
                userID: this.state.userID,
                orderAddress: this.state.orderAddress,
                productQuantity: this.state.productQuantity,
                productID: this.state.productID,
                orderDetailsPriceNet: this.state.orderDetailsPriceNet,
                orderDetailsPriceGross: this.state.orderDetailsPriceGross
            })
                .then((response) => {
                    console.log(response.data);
                    this.setState({
                        shouldRedirectProducts: true,
                    })
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    render() {
        if (this.state.shouldRedirectSignIn) {
            return <Redirect to='/signin' />;
        }
        if (this.state.shouldRedirectProducts) {
            return <Redirect to='/product' />;
        }

        return (
            <>
                <Header/>
                <div className="container">
                    <div className="m-4">
                        <div className="card text-center">
                            <h2 className="card-header">
                                Prepare order, {this.state.firstName}
                            </h2>
                            <div className="card-body">
                                <h3 className="card-title">Product: <b>{this.state.productName}</b></h3>
                                <img className="card-img-top" src={"images/" + this.props.productImageURL} alt="Trip illustration"/>
                                <p className="card-title">Description: {this.state.productDescription}</p>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label className="col-form-label">Address:</label>
                                        <div className="offset-3 col-sm-6">
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
                                    <p id="productPriceNet">Net price per person: {this.state.productPriceNet}</p>
                                    <br/>
                                    <p id="productPriceGross">Gross price per person: {this.state.productPriceGross}</p>
                                    <br/>
                                    <div className="form-group">
                                        <label className="col-form-label">Person number:</label>
                                        <div className="offset-4 col-sm-4">
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
                                    <p id="orderTotalPriceGross">Total gross
                                        price: {this.state.orderDetailsPriceGross}</p>
                                    <br/>
                                    <button type="submit" className="btn btn-success">
                                        Order
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AddOrder;

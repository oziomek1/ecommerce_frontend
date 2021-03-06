import axios from 'axios';
import React, { Component, FormEvent } from 'react';
import { Link, Redirect } from "react-router-dom";

import './Products.css';
import Header from "../header/Header";

class AddProduct extends Component {
    constructor() {
        super();
        this.state = {
            productName: '',
            productDescription: '',
            categoryID: '',
            categories: [],
            productImageURL: '',
            productPriceNet: '',
            productPriceGross: '',
            taxVat: 23,
            shouldRedirectProducts: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeProductName = this.handleChangeProductName.bind(this);
        this.handleChangeProductDescription = this.handleChangeProductDescription.bind(this);
        this.handleChangePriceNet = this.handleChangePriceNet.bind(this);
        this.handleChangeTaxVat = this.handleChangeTaxVat.bind(this);
        this.handleChangeCategoryID = this.handleChangeCategoryID.bind(this);
        this.handleChangeImageURL = this.handleChangeImageURL.bind(this);
    }

    async componentDidMount() {
        const promise = await axios.get('/categories',
            {
                headers: {
                    'X-Auth-Token': window.sessionStorage.getItem('token'),
                },
            },
        );
        const response = promise.data;
        this.setState({categories: response});
    }

    handleChangeProductName(event) {
        this.setState({productName: event.target.value});
    }
    handleChangeProductDescription(event) {
        this.setState({productDescription: event.target.value});
    }
    handleChangePriceNet(event) {
        let productPriceNet = parseInt(event.target.value, 10);
        let productPriceGross = parseInt(productPriceNet * (100 + this.state.taxVat) / 100, 10);
        this.setState({
            productPriceNet: productPriceNet,
            productPriceGross: productPriceGross,
        });
    }
    handleChangeTaxVat(event) {
        let taxVat = parseInt(event.target.value, 10);
        let productPriceGross = parseInt(this.state.productPriceNet * (100 + this.state.taxVat) / 100, 10);
        this.setState({
            taxVat: taxVat,
            productPriceGross: productPriceGross,
        });
    }
    handleChangeCategoryID(event) {
        let categoryID = parseInt(event.target.value, 10);
        this.setState({categoryID: categoryID});
    }

    handleChangeImageURL(event) {
        this.setState({productImageURL: event.target.value});
    }

    handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (this.state.productName !== '' && this.state.categoryID !== '') {
            await axios.post('/products/add', {
                productName: this.state.productName,
                productDescription: this.state.productDescription,
                categoryID: this.state.categoryID,
                productImageURL: this.state.productImageURL,
                productPriceNet: this.state.productPriceNet,
                productPriceGross: this.state.productPriceGross
            })
                .then((response) => {
                    this.setState({
                        shouldRedirectProducts: true,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    render() {
        const shouldRedirectProducts = this.state.shouldRedirectProducts;

        if (shouldRedirectProducts) {
            return <Redirect to="/product" />
        }
        return (
            <>
                <Header/>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <h1 className="text-center">Add Product</h1>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Name:</label>
                                    <div className="col-sm-9">
                                        <input
                                            id="productName"
                                            className="form-control"
                                            placeholder="Name"
                                            value={this.state.productName}
                                            onChange={this.handleChangeProductName}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Description:</label>
                                    <div className="col-sm-9">
                                        <input
                                            id="productDescription"
                                            type="text"
                                            className="form-control"
                                            placeholder="Description"
                                            value={this.state.productDescription}
                                            onChange={this.handleChangeProductDescription}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Image URL:</label>
                                    <div className="col-sm-9">
                                        <input
                                            id="imageURL"
                                            type="text"
                                            className="form-control"
                                            placeholder="Image URL"
                                            value={this.state.productImageURL}
                                            onChange={this.handleChangeImageURL}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Net price:</label>
                                    <div className="col-sm-9">
                                        <input
                                            id="productPriceNet"
                                            type="number"
                                            className="form-control"
                                            placeholder="Net price"
                                            value={this.state.productPriceNet}
                                            onChange={this.handleChangePriceNet}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Tax Vat:</label>
                                    <div className="col-sm-9">
                                        <input
                                            id="productTax"
                                            type="number"
                                            className="form-control"
                                            placeholder="Tax Vat"
                                            value={this.state.taxVat}
                                            onChange={this.handleChangeTaxVat}
                                        />
                                    </div>
                                </div>
                                <br/>
                                <p id="productPriceGross">Gross price: {this.state.productPriceGross}</p>
                                <br/>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Category:</label>
                                    <div className="col-sm-9">
                                        <select
                                            className="custom-select mr-sm-2"
                                            id="productCategoryID"
                                            onChange={this.handleChangeCategoryID}
                                        >
                                            {this.state.categories.map((category, index) =>
                                                <option selected="selected" key={index} value={category.categoryID}>
                                                    {category.categoryName}
                                                </option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success">
                                    Add
                                </button>
                            </form>
                            <hr />
                            <Link to="/product">
                                <p className="btn btn-info">Go to products!</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AddProduct;

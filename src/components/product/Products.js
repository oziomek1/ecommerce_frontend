import axios from 'axios';
import React, { Component } from 'react';

import './Products.css';
import Product from './Product';
import Header from "../header/Header";
import {Link} from "react-router-dom";

class Products extends Component {
    constructor() {
        super();
        this.state = {
            products: []
        };
    }

    async componentDidMount() {
        const promise = await axios.get('/products');
        const response = promise.data;
        this.setState({products: response});
    }

    render() {
        return (
            <>
                <Header/>
                <div className="container">
                    <div className="row justify-content-center">
                        <h1 className="text-center">Products list</h1>
                        <div className="col-10">
                            <div className="card-deck">
                                {this.state.products.map(product =>
                                    <Product
                                        productID={product.productID}
                                        productName={product.productName}
                                        productDescription={product.productDescription}
                                        productPriceNet={product.productPriceNet}
                                        productPriceGross={product.productPriceGross}
                                    />
                                )}
                            </div>
                            <hr />
                            <Link to="/addproduct">
                                <p className="btn btn-info">Add new product!</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Products;
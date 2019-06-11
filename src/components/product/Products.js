import axios from 'axios';
import React, { Component } from 'react';

import './Products.css';
import Product from './Product';
import Header from "../header/Header";
import {Link} from "react-router-dom";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            categories: [],
            displayCategoryID: 0,
        };
        this.setCategory = this.setCategory.bind(this);
    }

    async componentDidMount() {
        const promise = await axios.get('/products');
        const response = promise.data;
        this.setState({products: response});
        const categoriesPromise = await axios.get('/categories');
        const categoriesResponse = categoriesPromise.data;
        this.setState({
            categories: [...categoriesResponse, {'categoryID': 0, 'categoryName': 'All'}].reverse()
        });
    }

    setCategory(category) {
        this.setState({displayCategoryID: category.categoryID});
    }

    render() {
        const isAdmin = window.sessionStorage.getItem('isAdmin') === 'true';
        return (
            <>
                <Header/>
                <div className="container">
                    <h1 className="text-center col-12">Take a trip of your life</h1>
                    <div className="row justify-content-center">
                        <div className="col-2">
                            <Menu setCategory={this.setCategory} state={this.state}/>
                        </div>
                        <div className="col-10">
                            <div className="card-deck">
                                {this.state.products
                                    .filter((item) => item.categoryID === this.state.displayCategoryID || this.state.displayCategoryID === 0)
                                    .map((product, index) =>
                                    <Product
                                        key={index}
                                        productID={product.productID}
                                        productName={product.productName}
                                        productDescription={product.productDescription}
                                        productImageURL={product.productImageURL}
                                        productPriceNet={product.productPriceNet}
                                        productPriceGross={product.productPriceGross}
                                    />
                                )}
                            </div>
                            <hr/>
                            {isAdmin &&
                                <Link to="/addproduct">
                                    <p className="btn btn-primary">Add new product!</p>
                                </Link>
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const Menu = ({state, state: { categories }, setCategory}) => (
    <div className="list-group">
        <div className="row justify-content-center">
            <p>Choose destination:</p>
        </div>
        {categories.map(category => (
            <button
                type="button"
                href="#"
                className={`list-group-item list-group-item-action`}
                key={category.categoryID}
                onClick={() => setCategory(category)}
            >
                {category.categoryName}
            </button>
        ))}
    </div>
);

export default Products;

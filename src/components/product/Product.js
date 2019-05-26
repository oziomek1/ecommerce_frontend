import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Products.css';

class Product extends Component {

    render() {
        return (
            <div className="product col-lg-4 col-md-6">
                <div className="card m-1">
                    <div className="card-body">
                        <h3 className="card-title">
                            <p>Item: {this.props.productName}</p>
                        </h3>
                        <div className="col-12">
                            <p>Net price: {this.props.productPriceNet} PLN</p>
                            <p>Gross price: {this.props.productPriceGross} PLN</p>
                            <div className="card-text m-1">
                                <br/>
                                <p className="offset-1">{this.props.productDescription}</p>
                                <br/>
                            </div>
                            <Link to={'/addorder'
                                + '/' + this.props.productID
                                + '/' + this.props.productPriceNet
                                + '/' + this.props.productPriceGross
                            }>
                                <p className="btn btn-success"> To cart!</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;
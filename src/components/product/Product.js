import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Products.css';

class Product extends Component {

    render() {
        return (
            <div className="product col-lg-4 col-md-6">
                <div className="card m-1">
                    <Link to={'/addorder?productID=' + this.props.productID +
                        '&priceNet=' + this.props.productPriceNet + '&priceGross=' + this.props.productPriceGross}>
                        <img className="card-img-top" src={"images/" + this.props.productImageURL} alt={this.props.productName}/>
                    </Link>
                    <div className="card-body">
                        <Link to={'/addorder?productID=' + this.props.productID +
                            '&priceNet=' + this.props.productPriceNet + '&priceGross=' + this.props.productPriceGross}>
                            <h3 className="card-title row justify-content-center">
                                <p>{this.props.productName}</p>
                            </h3>
                        </Link>
                        <div className="col-12">
                            <div className="mb-4 card-text row justify-content-center">
                                <br/>
                                <div>{this.props.productDescription}</div>
                            </div>
                            <div className="row justify-content-center">
                                <Link to={'/addorder?productID=' + this.props.productID +
                                    '&priceNet=' + this.props.productPriceNet + '&priceGross=' + this.props.productPriceGross}>
                                    <p className="btn btn-success"> Buy</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-muted">
                        <div className="row justify-content-center">
                            <div className="price-net">{this.props.productPriceNet} PLN Net</div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="price-gross">{this.props.productPriceGross} PLN Gross</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;

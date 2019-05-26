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
                            <a href="#">Item: {this.props.productName}</a>
                        </h3>
                        <div className="col-12">
                            <p>Net price: {this.props.productPriceNet}</p>
                            <p>Gross price: {this.props.productPriceGross}</p>
                            <p className="card-text">Description: {this.props.productDescription}</p>
                            <Link to={'/addorder/' + this.props.productID}>
                                <p className="btn btn-success"> To cart!</p>
                            </Link>
                        </div>
                    </div>
                </div>

                {/*<div className="col-lg-4 col-md-6 mb-4">*/}
                    {/*<div className="card h-100">*/}
                        {/*<Link to={'/addorder/' + this.props.productID}>*/}
                            {/*<img className="card-img-top" src="http://placehold.it/700x400" alt={this.props.productName}/>*/}
                        {/*</Link>*/}
                        {/*<div className="card-body">*/}
                            {/*<h4 className="card-title">*/}
                                {/*<a href="#">{this.props.productName}</a>*/}
                            {/*</h4>*/}
                            {/*<h5>Price Gross: {this.props.productPriceGross} PLN</h5>*/}
                            {/*<h6>Price Net: {this.props.productPriceNet} PLN</h6>*/}
                            {/*<p className="card-text">{this.props.productDescription}</p>*/}
                            {/*<Link to={'/addorder/' + this.props.productID}>*/}
                                {/*<h2 className="btn btn-warning"> To cart!</h2>*/}
                            {/*</Link>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default Product;
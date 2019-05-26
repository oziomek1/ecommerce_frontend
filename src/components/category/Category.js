import axios from 'axios';
import React, { Component } from 'react';

import './Category.css';
import Header from "../header/Header";
import {Link} from "react-router-dom";

class Category extends Component {
    constructor() {
        super();
        this.state = {
            categories: []
        };
    }

    async componentDidMount() {
        const promise = await axios.get('/categories');
        const response = promise.data;
        this.setState({categories : response});
    }

    render() {

        return (
            <>
                <Header/>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <h1 className="text-center">Categories list</h1>
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Categories</th>
                                    </tr>
                                </thead>
                                <tbody>
                                { this.state.categories.map((category, index) => (
                                    <tr key={index}>
                                        <td>{category.categoryName}</td>
                                    </tr>
                                )) }
                                </tbody>
                            </table>
                            <hr />
                            <Link to="/addcategory">
                                <p className="btn btn-info">Add new category!</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Category;
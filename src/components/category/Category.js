import axios from 'axios';
import React, { Component } from 'react';

import './Category.css';
import Header from "../header/Header";
import {Link} from "react-router-dom";

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
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
        this.setState({categories : response});
    }

    render() {

        return (
            <>
                <Header/>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <h1 className="text-center">Categories list</h1>
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Categories</th>
                                        <th width="200px">Edit or Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                { this.state.categories.map((category, index) => (
                                    <tr key={index}>
                                        <td>{category.categoryName}</td>
                                        <td>
                                            <Link to={"/editcategory/?id=" + category.categoryID}>
                                                <div className="btn btn-success edit">Edit</div>
                                            </Link>
                                            <span className="m-1"/>
                                            <Link to={"/deletecategory/?id=" + category.categoryID}>
                                                <div className="btn btn-danger delete">Delete</div>
                                            </Link>
                                        </td>
                                    </tr>
                                )) }
                                </tbody>
                            </table>
                            <hr />
                            <Link to="/addcategory">
                                <p className="btn btn-primary">Add new category!</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Category;

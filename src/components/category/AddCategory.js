import axios from 'axios';
import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";

import './Category.css';
import Header from "../header/Header";

class AddCategory extends Component {
    constructor() {
        super();
        this.state = {
            categoryName: '',
            shouldRedirectCategories: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeCategoryName = this.handleChangeCategoryName.bind(this);
    }

    handleChangeCategoryName(event) {
        this.setState({categoryName: event.target.value});
    }

    handleSubmit() {
        if (this.state.categoryName !== '') {
            axios.post('/categories/add', {
                categoryName: this.state.categoryName
            })
                .then((response) => {
                    console.log(response.data);
                    this.setState({
                        shouldRedirectCategories: true,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    render() {
        const shouldRedirectCategories = this.state.shouldRedirectCategories;

        if (shouldRedirectCategories) {
            return <Redirect to="/category" />
        }
        return (
            <>
                <Header/>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <h1 className="text-center">Add Category</h1>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Name:</label>
                                    <div className="col-sm-10">
                                        <input
                                            id="categoryName"
                                            className="form-control"
                                            placeholder="Name"
                                            value={this.state.categoryName}
                                            onChange={this.handleChangeCategoryName}
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success">
                                    Add
                                </button>
                            </form>
                            <hr />
                            <Link to="/category">
                                <p className="btn btn-info">Go to categories!</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AddCategory;

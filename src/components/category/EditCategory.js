import axios from 'axios';
import React, { Component, FormEvent } from 'react';
import { Link, Redirect } from "react-router-dom";

import './Category.css';
import Header from "../header/Header";

class EditCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryID: '',
            categoryName: '',
            readParams: false,
            shouldRedirectCategories: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeCategoryName = this.handleChangeCategoryName.bind(this);
    }

    async componentDidMount() {
        const params = await new URLSearchParams(this.props.location.search);
        if (params.get('id')) {
            this.setState({
                params: params,
            });
        }
        const token = window.sessionStorage.getItem('token');
        if (token !== null) {
            const promise = await axios.get('/categories/' + this.state.params.get('id'),
                {
                    headers: {
                        'X-Auth-Token': window.sessionStorage.getItem('token'),
                    },
                },
            );
            const response = promise.data[0];
            this.setState({
                categoryID : response.categoryID,
                categoryName : response.categoryName,
                readParams: true,
            });
        }

    }

    handleChangeCategoryName(event) {
        this.setState({categoryName: event.target.value});
    }

    handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (this.state.categoryName !== '') {
            await axios.put('/categories/edit/' + this.state.categoryID, {
                categoryName: this.state.categoryName
            })
                .then((response) => {
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
        const readParams = this.state.readParams;

        if (shouldRedirectCategories) {
            return <Redirect to="/category" />
        }

        if (readParams) {
            return (
                <>
                    <Header/>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <h1 className="text-center">Edit Category</h1>
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
                                        Edit
                                    </button>
                                </form>
                                <hr/>
                                <Link to="/category">
                                    <p className="btn btn-info">Go to categories!</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
        return null;
    }
}

export default EditCategory;

import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import './Products.css';

class DeleteProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldRedirectProducts: false,
        };
    }

    async componentDidMount() {
        const params = await new URLSearchParams(this.props.location.search);
        if (params.get('id')) {
            this.setState({
                params: params,
            });
        }
        const token = window.sessionStorage.getItem('token');
        try {
            await axios.post('/products/delete/' + this.state.params.get('id'),
                {
                    headers: {
                        'X-Auth-Token': token,
                    },
                },
            );

            this.setState({
                shouldRedirectProducts: true,
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const shouldRedirectProducts = this.state.shouldRedirectProducts;

        if (shouldRedirectProducts) {
            return <Redirect to="/product" />
        }
        return <div>Loading...</div>
    }
}

export default DeleteProduct;

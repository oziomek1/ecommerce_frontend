import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import './Category.css';

class DeleteCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shouldRedirectCategories: false,
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
            await axios.post('/categories/delete/' + this.state.params.get('id'),
                {
                    headers: {
                        'X-Auth-Token': token,
                    },
                },
            );

            this.setState({
                shouldRedirectCategories: true,
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const shouldRedirectCategories = this.state.shouldRedirectCategories;

        if (shouldRedirectCategories) {
            return <Redirect to="/category" />
        }
        return <div>Loading...</div>
    }
}

export default DeleteCategory;

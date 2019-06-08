import React, { Component } from 'react';

import {Redirect} from 'react-router-dom';

class SocialSignInBroker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectToHome: false,
            isAuth: false,
            email: '',
            firstName: '',
            lastName: '',
            socialID: '',
            token: '',
        };
    }

    async componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        if(params.get('firstname')) {
            this.setState({
                redirectToHome: true,
                email: params.get('email'),
                firstName: params.get('firstName'),
                lastName: params.get('lastName'),
                socialID: params.get('socialID'),
                token: params.get('token'),
            });
            window.sessionStorage.setItem('socialID', this.state.socialID);
            window.sessionStorage.setItem('email', this.state.email);
            window.sessionStorage.setItem('firstName', this.state.firstName);
            window.sessionStorage.setItem('lastName', this.state.lastName);
            window.sessionStorage.setItem('token', this.state.token);

            return this.props.handleFirstName;
        }
    }

    render() {
        if (this.state.redirectToHome) {
            return (
                <Redirect to="/"/>
            )
        }
        return null;
    }
}

export default SocialSignInBroker;

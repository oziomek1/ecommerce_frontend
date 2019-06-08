import React, { Component } from 'react';

import {Redirect} from 'react-router-dom';

class SocialSignInBroker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectToHome: false,
            isAuth: false,
            params: '',
        };
    }

    async componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        if(params.get('email')) {
            this.setState({
                params: params,
                redirectToHome: true
            });
        }
    }

    render() {
        if (this.state.redirectToHome) {
            window.sessionStorage.setItem('socialID', this.state.params.get('socialID'));
            window.sessionStorage.setItem('email', this.state.params.get('email'));
            window.sessionStorage.setItem('firstName', this.state.params.get('firstname'));
            window.sessionStorage.setItem('lastName', this.state.params.get('lastname'));
            window.sessionStorage.setItem('token', this.state.params.get('token'));
            return (
                <Redirect to="/"/>
            )
        }
        return null;
    }
}

export default SocialSignInBroker;

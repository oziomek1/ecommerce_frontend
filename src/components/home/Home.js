import axios from 'axios';
import React, { Component } from 'react';

import './Home.css';
import Header from "../header/Header";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectToLogin: false,
            isAuth: false,
            firstName: '',
            lastName: '',
        };
    }

    async componentDidMount() {
        const token = window.sessionStorage.getItem('token');

        if (token !== null) {
            try {
                const response = await axios.get(
                    '/user',
                    {
                        headers: {
                            'X-Auth-Token': token,
                        },
                    },
                );
                const data = response.data;

                this.setState({
                    firstName: data.firstName,
                    lastName: data.lastName,
                });

                // const user: User = {
                //     id: data.id,
                //     userName: data['username'],
                //     email: data.email,
                //     createdDate: moment(data['created_date']).toDate(),
                //     lastLogin: moment(data['last_login_date']).toDate(),
                // };
                //
                // this.setState({
                //     user,
                //     authenticated: true,
                // });
            } catch (error) {
                console.log(error);
                this.setState({ redirectToLogin: true });
            }
        }
    }


    render() {
        return (
            <>
                <Header/>
                <div className="container">
                    <h1>Welcome {this.state.firstName} {this.state.lastName}</h1>
                </div>
            </>
        );
    }
}

export default Home;

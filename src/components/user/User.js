import React, { Component } from 'react';

import './Users.css';

class User extends Component {

    render() {
        return (
            <div className="user">
                <div className="jumbotron jumbotron-fluid">
                    <div className="row justify-content-center">
                        <h2><strong>Details:</strong></h2>
                    </div>
                    <div className="row">
                        <div className="offset-1 col-5">
                            <p><strong>First Name</strong>: {this.props.userFirstname}</p>
                            <p><strong>Last Name</strong>: {this.props.userLastname}</p>
                            <p><strong>ID</strong>: {this.props.userID}</p>
                        </div>
                        <div className="offset-1 col-5">
                            <p><strong>Address</strong>: {this.props.userAddress}</p>
                            <p><strong>Email</strong>: {this.props.userEmail}</p>
                            <p><strong>Social ID</strong>: {this.props.userSocialID}</p>
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        )
    }

}

export default User;

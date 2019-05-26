import React, { Component } from 'react';

import './Users.css';

class User extends Component {

    render() {
        return (
            <div className="user">
                <div className="jumbotron jumbotron-fluid">
                    <div className="row justify-content-center">
                        <h4><strong>User ID: {this.props.userID}</strong></h4>
                    </div>
                    <div className="row">
                        <div className="offset-1 col-5">
                            <p><strong>User name</strong>: {this.props.userFirstname}</p>
                            <p><strong>User surname</strong>: {this.props.userLastname}</p>
                        </div>
                        <div className="offset-1 col-5">
                            <p><strong>User address</strong>: {this.props.userAddress}</p>
                            <p><strong>User email</strong>: {this.props.userEmail}</p>
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        )
    }

}

export default User;
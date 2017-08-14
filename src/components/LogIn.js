import React from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as allActions from '../actions/creators';

class LogIn extends React.Component {
    constructor () {
        super();
        this.state = {
            wrongPass: false,
            userNotFound: false
        }
        this.submitHandler = this.submitHandler.bind(this);
    }
    submitHandler (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/logging',
            contentType: 'application/json',
            data: JSON.stringify({
                email: this.refs.email.value,
                password: this.refs.password.value
            }),
            success: (data) => {
                if (data.wrongPassword) {
                    this.setState({
                        wrongPass: true,
                        userNotFound: false,
                    });
                } else if (data.userNotFound) {
                    this.setState({
                        userNotFound: true,
                        wrongPass: false,
                    });
                } else {
                    this.props.actions.logIn();
                    localStorage.setItem('token', data.token);
                    this.props.actions.setUserData(data.returnedData);
                }
            }
        });
    }
    render () {
        return (
            <div className="input-form">
                <form className="input-form__form" onSubmit={this.submitHandler}>
                    <input type="text" placeholder="email" ref="email" className="input-form__input"/>
                    <input type="password" placeholder="password" ref="password" className="input-form__input"/>
                    <input type="submit" value="Log In" className="input-form__submit"/>
                </form>
                {this.state.wrongPass ? <p className="input-form__warning">Wrong password</p> : null}
                {this.state.userNotFound ? <p className="input-form__warning">User not found</p> : null}
            </div>     
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.appState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(allActions, dispatch)
    }
}


LogIn = connect(mapStateToProps, mapDispatchToProps)(LogIn);

module.exports = LogIn;  
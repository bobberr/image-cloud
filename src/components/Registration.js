const React = require('react');
const $ = require('jquery');
const connect = require('react-redux').connect;
const bindActionCreators = require('redux').bindActionCreators;
import * as actions from '../actions/creators';

class Registration extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit (e) {
        e.preventDefault();
        const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        if (email.match(emailReg) && password != '') {
            $.ajax({
                url: '/registration',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    email,
                    password
                }),
                success: (data) => {
                    if (data.success) {
                        this.props.actions.toggleSuccess();
                        this.refs.email.value = '';
                        this.refs.password.value = '';
                    } else {
                        this.props.actions.existedUser();
                    }
                }
            });
        } else {
            this.props.actions.toggleError();
        }
    }
    render () {
        return (
            <div className="input-form">
                <form className="form" onSubmit={this.handleSubmit} className="input-form__form">
                    <input type="text" name="email" ref="email" placeholder="email" className="input-form__input"/>
                    <input type="password" name="password" ref="password" placeholder="password" className="input-form__input"/>
                    <input type="submit" value="Create account" className="input-form__submit"/>
                </form>
                {this.props.data.success ? <p className="input-form__warning">Successful registration</p> : null}
                {this.props.data.errorRegistr ? <p className="input-form__warning">Error with registration, please enter the correct email</p> : null}
                {this.props.data.existedUser ? <p className="input-form__warning">The user already exists</p> : null}
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
        actions: bindActionCreators(actions, dispatch)
    }
}

const Result = connect(mapStateToProps, mapDispatchToProps)(Registration);

module.exports = Result;
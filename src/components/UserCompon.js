const Registration = require('./Registration');
const React = require('react');
const LogIn = require('./LogIn');
import LoggedUser from './LoggedUser';
import {connect} from 'react-redux';

class UserCompon extends React.Component {
    render () {
        if (this.props.data.loggedIn) { 
            return (
                <LoggedUser/>
            )
        } else {
            return (
                <div className="log-reg-compon">
                    <div className="container">
                        <div className="log-reg-compon__wrapper" >
                            <h3 className="log-reg-compon__title">Login or create an account</h3>
                            <div className="log-reg-compon__compon-wrapper">
                                <Registration/>      
                                <LogIn/>                                                   
                            </div>
                        </div>
                    </div>                 
                </div>
            )
        }
    }
};

const mapStateToProps = (state) => {
    return {
        data: state.appState
    }
}



UserCompon = connect(mapStateToProps)(UserCompon);

module.exports = UserCompon;
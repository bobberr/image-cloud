import React from 'react';
import * as actions from '../actions/creators';
import $ from 'jquery';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ImageComponent from './ImageComponent';
import ReactFilestack from 'filestack-react';

class LoggedUser extends React.Component {
    constructor () {
        super();
        this.state = {
            imageUrl: null,
            valuesError: false
        }
        this.logOut = this.logOut.bind(this);
        this.successHandler = this.successHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    logOut () {
        this.props.actions.logOut();
    }
    successHandler (data) {
        this.setState({
            imageUrl: data.filesUploaded[0].url
        });
    }
    submitHandler (e) {
        e.preventDefault();
        if (this.state.imageUrl == null || this.refs.title.value == '' || this.refs.description.value == '') {
            this.setState({valuesError: true})
        } else {
                $.ajax({
                type: "POST",            
                url: "/postimage",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({
                    token: localStorage.getItem('token'),
                    title: this.refs.title.value,
                    description: this.refs.description.value,
                    email: this.props.data.data.email,
                    imageUrl: this.state.imageUrl
                }),
                success: (data) => {
                    this.props.actions.setUserData(data.data);
                }
            });
            this.refs.title.value = '';
            this.refs.description.value = '';
            this.setState({
                imageUrl: null,
                valuesError: false
            });
        }
    }
    render () {
        var options = {
            maxFiles: 1
        }
        if (this.props.data.data) {
            var data = Object.assign({}, this.props.data.data);
            var images = data.images.map((image, i) => {
                return <ImageComponent key={i} url={image.url} title={image.title} description={image.description}/>
            });
            var email = data.email;
        } else {
            images = [];
            email = '';
        }
        
        return (
            <div className="logged-background">
                <div className="container">
                    <div className="logged">
                        <div className="logged__user-block">
                            <p className="logged__name">Hello {email} </p>                
                            <button onClick={this.logOut} className="logged__log-out">Log out</button>
                        </div>
                        <div className="upload-block">
                            <div className="logged__image-container">
                                {images.length == 0 ? <p>There are no images yet, upload your first images</p> : images}                    
                            </div>
                            {this.state.imageUrl ? 
                                <div className="control-block">
                                    <p>Upload of the image is finished, enter title and description for the photo</p>
                                    <form onSubmit={this.submitHandler} className="control-block__form">
                                        <input type="text" placeholder="Title" ref="title" className="control-block__input"/>
                                        <input type="text" placeholder="Description" ref="description" className="control-block__input"/>
                                        <input type="submit" value="Submit" className="control-block__submit"/>
                                        {this.state.valuesError ? <p className="control-block__warning">You didn't enter title or description</p> : null}
                                    </form>
                                </div> : 
                                <div className="control-block">
                                    <ReactFilestack
                                        apikey="ADANezFnNRCu4ub4dOXRCz"
                                        buttonText="Upload more"
                                        onSuccess={this.successHandler}
                                        options={options}
                                        buttonClass="upload-button"
                                        />
                                </div>
                            }
                        </div>
                    </div>
                </div> 
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

LoggedUser = connect(mapStateToProps, mapDispatchToProps)(LoggedUser);

module.exports = LoggedUser;
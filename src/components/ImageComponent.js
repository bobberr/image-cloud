import React from 'react';

class ImageComponent extends React.Component {
    render () {
        return (
            <div className="image-component">
                <img src={this.props.url}/> 
                <h3>{this.props.title}</h3>
                <p>{this.props.description}</p>
            </div>
        )
    }
}

module.exports = ImageComponent;
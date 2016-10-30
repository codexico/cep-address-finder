import React, {Component} from 'react';

class Box extends Component {
    render() {
        return (
            <div className="box">
                <h2>{this.props.title}</h2>
                {this.props.children}
            </div>
        )
    }
}
export default Box;

import React, {Component} from 'react';
import './Icon.css';

class Icon extends Component {
    handleClick = (event) => {
        this.props.onClick();
    }

    render() {
        return (
            <span
                className={`icon ${this.props.type}`}
                onClick={this.handleClick}
            ></span>
        );
  }
}

export default Icon;

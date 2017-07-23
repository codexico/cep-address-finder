import React, {Component} from 'react';
import Icon from '../../components/Icon/Icon';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCard: true
        };
    }

    handleClick = () => {
        this.props.handleCloseCard();
    }

    render() {
        return (
            <div className={`card`}>
                {this.props.children}
                <Icon
                    type="icon-close card_icon"
                    onClick={this.handleClick}
                    />
            </div>
        )
    }
}

export default Card;

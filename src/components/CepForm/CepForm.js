import React, {Component} from 'react';
import {isValidCepFormat, formatCepValue} from '../../modules/helpers';

class CepForm extends Component {
    handleChange = (event) => {
        this.props.onChange(event.target.value);
    }

    handleSubmit = () => {
        if (isValidCepFormat(formatCepValue(this.props.value))) {
            this.props.onSubmit(formatCepValue(this.props.value));
        }
    }

    render() {
        return (
            <div>
                <label
                    htmlFor="CepFormInput"
                    className="label"
                    >CEP</label>
                <input
                    id="CepFormInput"
                    className="input"
                    type="text"
                    value={formatCepValue(this.props.value)}
                    onChange={this.handleChange}
                    placeholder="00000-000"
                    maxLength="9"
                    pattern="^\d{5}-\d{3}$"
                    />
                <button
                    className="button"
                    onClick={this.handleSubmit}
                >Buscar</button>
            </div>
        );
    }
}

export default CepForm;

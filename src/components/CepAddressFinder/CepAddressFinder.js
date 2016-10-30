import React, { Component } from 'react';
import GMap from '../../components/GMap/GMap';
import Address from '../../components/Address/Address';
import Box from '../../components/Box/Box';
import CepForm from '../../components/CepForm/CepForm';
import Card from '../../components/Card/Card';
import { isValidCepFormat, getJson } from '../../modules/helpers';


function getAddressByCep(value) {
    let url = `https://viacep.com.br/ws/${value.replace('-','')}/json`;
    return getJson(url);
}

class CepAddressFinder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            address: "",
            cep: "",
            showCard: false
        };
        this.currentCep = null;
    }

    handleCloseCard = () => {
        this.setState({showCard: false});
    }

    handleCepChange = (value) => {
        this.setState({value});

        // valid and different
        if (isValidCepFormat(value) && value !== this.currentCep) {
            this.currentCep = value;

            // TODO: show loader and block form

            getAddressByCep(value).then((address) => {
                if (!address.erro) {
                    this.setState({address: address});
                    this.setState({cep: address.cep});
                    this.setState({showCard: true});
                } else {
                    // CEP não encontrado
                    // TODO: show message
                }
            });
        }
    }

    handleSubmit = (value) => {
        this.handleCepChange(value);
    }

    render() {
        return (
            <div>
                <h1>Consulta de Endereço</h1>
                <Box title="Consultar">
                    <CepForm
                        value={this.state.value}
                        onChange={this.handleCepChange}
                        onSubmit={this.handleSubmit}
                        />
                </Box>
                <Card
                    showCard={this.state.showCard}
                    handleCloseCard={this.handleCloseCard}
                    >
                    <Address address={this.state.address} />
                    <GMap cep={this.state.cep} elementId="map" />
                </Card>
            </div>
        );
    }
}

export default CepAddressFinder;

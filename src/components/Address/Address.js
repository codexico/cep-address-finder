import React from 'react';

export default function Address(props) {
    return (
        <adress
                className="address">
            <h2
                className="address_logradouro"
                >{props.address.logradouro}</h2>
            <p
                className="address_bairro"
                >{props.address.bairro}</p>
            <p
                className="address_localidade"
                >{props.address.localidade} - {props.address.uf}</p>
            <p
                className="address_cep"
                >{props.address.cep}</p>
        </adress>
    );
}

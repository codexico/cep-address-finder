import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import Address from './Address';
import CepAddressFinder from '../CepAddressFinder/CepAddressFinder';
import data from '../../data/cep.json';

describe('Address', () => {

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Address address={data.address} />, div);
    });

    it('starts none', () => {
        const wrapper = mount((<CepAddressFinder />));
        expect(wrapper.find('.address_cep').length).toEqual(0);
    });

    it('show address', () => {
        const wrapper = mount((<CepAddressFinder />));
        wrapper.setState({ showCard: true, address: data.address });
        expect(wrapper.find('.address_cep').text()).toEqual(data.address.cep);
        expect(wrapper.find('.address_localidade').text())
            .toEqual(`${data.address.localidade} - ${data.address.uf}`);
    });

});

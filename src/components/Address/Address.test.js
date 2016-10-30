import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import Address from './Address';
import CepAddressFinder from '../CepAddressFinder/CepAddressFinder';
import data from '../../data/cep.json';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Address address={data.address} />, div);
});

it('show address', () => {
    const wrapper = mount((<CepAddressFinder />));
    wrapper.setState({ address: data.address });
    expect(wrapper.find('.address_cep').text()).toEqual(data.address.cep);
    expect(wrapper.find('.address_localidade').text())
    .toEqual(`${data.address.localidade} - ${data.address.uf}`);
});

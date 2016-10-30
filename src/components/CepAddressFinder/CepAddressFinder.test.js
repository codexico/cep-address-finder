import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import CepAddressFinder from './CepAddressFinder';
import data from '../../data/cep.json';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CepAddressFinder />, div);
});

it('renders title', () => {
  const wrapper = shallow(<CepAddressFinder />);
  const welcome = <h1>Consulta de Endereço</h1>;
  // expect(wrapper.contains(welcome)).to.equal(true);
  expect(wrapper.contains(welcome)).toEqual(true);
});

it('show card', () => {
    const wrapper = mount((<CepAddressFinder />));
    expect(wrapper.find('.card.hidden').length).toEqual(1);
    wrapper.setState({ showCard: true });
    expect(wrapper.find('.card').length).toEqual(1);
    expect(wrapper.find('.card.hidden').length).toEqual(0);
});

it('hide card', () => {
    const wrapper = mount((<CepAddressFinder />));
    expect(wrapper.find('.card.hidden').length).toEqual(1);
    wrapper.setState({ showCard: true });

    wrapper.find('.icon-close').simulate('click');
    expect(wrapper.find('.card.hidden').length).toEqual(1);
});

it('show address', () => {
    const wrapper = mount((<CepAddressFinder />));
    wrapper.setState({ address: data.address });
    expect(wrapper.find('.address_cep').text()).toEqual(data.address.cep);
});

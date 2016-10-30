import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import Card from './Card';
import Icon from '../Icon/Icon';
import CepAddressFinder from '../CepAddressFinder/CepAddressFinder';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Card />, div);
});

it('renders icon', () => {
    const wrapper = mount((<Card
         showCard={true} handleCloseCard={null} ></Card>));
    expect(wrapper.find('.icon').length).toEqual(1);
});

it('card starts hidden', () => {
    const card = shallow((<Card
         showCard={false} handleCloseCard={null} ></Card>));
    expect(card.find('.card.hidden').length).toEqual(1);

    const wrapper = mount((<CepAddressFinder />));
    expect(wrapper.find('.card.hidden').length).toEqual(1);
});

it('show card with props', () => {
    const card = shallow((<Card
         showCard={true} handleCloseCard={null} ></Card>));
    expect(card.find('.card').length).toEqual(1);
    expect(card.find('.card.hidden').length).toEqual(0);
});

it('show card from parent', () => {
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

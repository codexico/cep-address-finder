import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import CepForm from './CepForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CepForm value="" />, div);
});

it('input text empty', () => {
  const form = shallow(<CepForm value='' />);

  expect(form.find('input').text()).toEqual('');
});

it('input text format', () => {
  const form = shallow(<CepForm value='00000-000' />);
  expect(form.find('input').props().value).toEqual('00000-000');
});

it('format input text format', () => {
  const form = shallow(<CepForm value='00000000' />);
  expect(form.find('input').props().value).toEqual('00000-000');
});

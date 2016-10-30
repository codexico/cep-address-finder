import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import Box from './Box';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Box />, div);
});

it('renders title', () => {
  const wrapper = shallow(<Box title="Foo" />);
  const title = <h2>Foo</h2>;
  expect(wrapper.contains(title)).toEqual(true);
});

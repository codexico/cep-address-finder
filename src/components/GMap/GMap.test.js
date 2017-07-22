import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import GMap from './GMap';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GMap />, div);
});

it('input text empty', () => {
  const gmap = shallow(<GMap gmapId='foo' />);

  expect(gmap.is('#foo')).toEqual(true);
});

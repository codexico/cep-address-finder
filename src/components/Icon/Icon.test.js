import React from 'react';
import {shallow} from 'enzyme';
import Icon from './Icon';

it('renders Icon', () => {
  // Render a checkbox with label in the document
  const icon = shallow(
    <Icon />
  );

  expect(icon.text()).toEqual('');
  expect(icon.hasClass('icon')).toEqual(true);
});

it('renders icon type', () => {
  // Render a checkbox with label in the document
  const icon = shallow(
      <Icon
          type="icon-close"
          onClick={null}
          />
  );

  expect(icon.hasClass('icon-close')).toEqual(true);
});

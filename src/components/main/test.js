import React from 'react';
import Main from '.';
import { shallow } from 'enzyme';

describe('Main', () => {
  it('Should render correctly', () => {
    const wrapper = shallow(<Main />);
    expect(wrapper).toMatchSnapshot();
  });
});

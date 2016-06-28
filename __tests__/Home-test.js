import React from 'react';

import { describe, it } from 'mocha';

import { mount } from 'enzyme';
import { expect } from 'chai';

import Home from '../app/components/home/Home';
import store from '../app/redux/store';

describe('Redux testing', () => {
  it('should increase counter on click', () => {
    const wrapper = mount(<Home store={store} />);
    const button = wrapper.find('#add-click-count');
    button.simulate('click');
    expect(store.getState().ticker).to.equal(1);
    button.simulate('click');
    expect(store.getState().ticker).to.equal(2);
    expect(button.text()).to.equal('Click count: 2');
  });
});

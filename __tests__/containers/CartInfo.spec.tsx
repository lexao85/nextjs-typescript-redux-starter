import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import CartInfo, { CartInfo as DumbCartInfo } from '../../src/containers/CartInfo';
import reduxMockStore from 'redux-mock-store';
import { IStore } from 'src/store';

describe('>>> CartInfo --- Snapshot', () => {
  it('+++capturing Snapshot of CartInfo', () => {
    const rendered = shallow(<DumbCartInfo currency="$" totalCount={5} totalPrice={103.78} />);
    expect(rendered).toMatchSnapshot();
  });
});

describe('>>> CartInfo --- Render with Store', () => {
  const mockStore = reduxMockStore<IStore>();
  const initialStore: IStore = {
    app: {
      currency: '$',
      productList: [],
    },
    cart: {
      items: [],
      totalCount: 0,
      totalPrice: 0,
    },
  };

  it('+++ render the connected CartInfo', () => {
    const store = mockStore(initialStore);
    const wrapper = mount(<Provider store={store}><CartInfo /></Provider>);
    expect(wrapper.length).toEqual(1);
  });

  it('+++ correct elements count in cart info', () => {
    const store = mockStore(initialStore);
    const wrapper = mount(<Provider store={store}><CartInfo /></Provider>);
    expect(wrapper.find('div[children="Elements in cart: 0"]').length).toEqual(1);
  });
});

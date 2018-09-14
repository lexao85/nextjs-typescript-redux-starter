import { Product } from './../../src/store/ducks/app';
import cart, {
  addItem, removeItem, clearCart, CartState, TypeKeys, AddItemAction,
} from './../../src/store/ducks/cart';
import reduxMockStore, { MockStoreCreator } from 'redux-mock-store';

describe('>>>R E D U C E R --- Test cart reducer', () => {
  let initialState: CartState;
  let testProduct: Product;
  let expectedState: CartState;
  let expectedState2: CartState;
  let addItemAction: AddItemAction;
  let mockStore: MockStoreCreator<CartState, {}>;

  beforeEach(() => {
    initialState = {
      items: [],
      totalCount: 0,
      totalPrice: 0,
    };
    testProduct = {
      id: 'uid-000',
      name: 'Test Product',
      price: 5.85,
    };
    expectedState = {
      items: [{ product: { ...testProduct }, totalPrice: 5.85, count: 1 }],
      totalCount: 1,
      totalPrice: 5.85,
    };
    expectedState2 = {
      items: [{ product: { ...testProduct }, totalPrice: 11.7, count: 2 }],
      totalCount: 2,
      totalPrice: 11.7,
    };
    addItemAction = {
      type: TypeKeys.ADD_ITEM,
      product: testProduct,
    };

    mockStore = reduxMockStore<CartState>();
  });

  it('+++ reducer for ADD_ITEM', () => {
    const state = cart(initialState, addItemAction);
    expect(state).toEqual(expectedState);
  });

  it('+++ addItem Action : add new', () => {
    const store = mockStore(initialState);
    store.dispatch(addItem(testProduct));
    expect(cart(store.getState(), store.getActions()[0])).toEqual(expectedState);
  });

  it('+++ addItem Action : add existed', () => {
    const store = mockStore(expectedState);
    store.dispatch(addItem(testProduct));
    expect(cart(store.getState(), store.getActions()[0])).toEqual(expectedState2);
  });

  it('+++ removeItem Action', () => {
    const store = mockStore({ ...expectedState });
    expect(store.getState().totalCount).toEqual(1);
    expect(store.getState().totalPrice).toEqual(5.85);
    store.dispatch(removeItem(0));
    expect(cart(store.getState(), store.getActions()[0])).toEqual(initialState);
  });

  it('+++ clearCart Action', () => {
    const store = mockStore(expectedState);
    store.dispatch(clearCart());
    expect(cart(store.getState(), store.getActions()[0])).toEqual(initialState);
  });

  it('+++ some other action', () => {
    const store = mockStore(expectedState);
    store.dispatch({ type: 'other action' });
    expect(cart(store.getState(), store.getActions()[0])).toEqual(expectedState);
  });

});

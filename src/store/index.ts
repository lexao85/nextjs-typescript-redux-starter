import { AppState } from './ducks/app';
import { CartState } from './ducks/cart';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import ducks from './ducks';

export interface IStore {
  app: AppState;
  cart: CartState;
}

export function initializeStore(initialState?: IStore) {
  return createStore(ducks, initialState, composeWithDevTools(applyMiddleware(reduxThunk)));
}

import { combineReducers } from 'redux';
import app from './app';
import cart from './cart';

export default combineReducers({
  app,
  cart,
});

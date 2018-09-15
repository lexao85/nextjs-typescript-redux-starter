import { connect } from 'react-redux';
import React from 'react';
import { IStore } from '../store';

interface IStateProps {
  totalCount: number;
  totalPrice: number;
  currency: string;
}

// tslint:disable-next-line:function-name
export function CartInfo(props: IStateProps) {
  return (
    <div style={{ padding: 5, pointerEvents: 'none' }} >
      <div>{`Elements in cart: ${props.totalCount}`}</div>
      <div>{`Total price: ${props.currency}${props.totalPrice.toFixed(2)}`}</div>
    </div>
  );
}

const mapStateToProps = (state: IStore): IStateProps => {
  const { totalCount, totalPrice } = state.cart;
  return { totalCount, totalPrice, currency: state.app.currency };
};

export default connect(mapStateToProps)(CartInfo);

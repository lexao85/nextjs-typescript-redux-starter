import { connect } from 'react-redux';
import React from 'react';
import { IStore } from '../store';
import { Dispatch } from 'redux';
import { CartItem, clearCart, removeItem } from '../store/ducks/cart';

interface IStateProps {
  items: CartItem[];
  totalPrice: number;
  totalCount: number;
  currency: string;
}

interface IDispatchProps {
  onRemoveItem: (index: number) => () => any;
  onRemoveAll: () => void;
}

type IProductListProps = IStateProps & IDispatchProps;

// tslint:disable-next-line:function-name
function Cart(props: IProductListProps) {
  if (!props.items || !props.items.length) {
    return (<div>Your cart is empty</div>);
  }
  const cartItems = props.items.map((item, index) => {
    return (
      <React.Fragment key={item.product.id}>
        <div style={{ width: '20%', flexGrow: 1 }}>
          {item.product.name}
        </div>
        <div style={{ width: '20%', flexGrow: 1 }}>
          {item.count}
        </div>
        <div style={{ width: '20%', flexGrow: 1 }}>
          {`${props.currency}${item.product.price}`}
        </div>
        <div style={{ width: '20%', flexGrow: 1 }}>
          {`${props.currency}${item.totalPrice.toFixed(2)}`}
        </div>
        <div style={{ width: '20%', flexGrow: 1 }}>
          <button title="Remove" onClick={props.onRemoveItem(index)} style={{ cursor: 'pointer' }}>
            <svg className="svg-icon">
              <use xlinkHref="#remove" />
            </svg>
          </button>
        </div>
      </React.Fragment>
    );
  });
  return (
    <div style={{ flexWrap: 'wrap', alignItems: 'center', display: 'flex', padding: 0, margin: 0 }}>
      <div style={{ width: '20%', flexGrow: 1 }}><b>Product</b></div>
      <div style={{ width: '20%', flexGrow: 1 }}><b>Count</b></div>
      <div style={{ width: '20%', flexGrow: 1 }}><b>Price</b></div>
      <div style={{ width: '20%', flexGrow: 1 }}><b>Total</b></div>
      <div style={{ width: '20%', flexGrow: 1 }} />
      {cartItems}
      <div style={{ width: '20%', flexGrow: 1 }}><b>Total:</b></div>
      <div style={{ width: '20%', flexGrow: 1 }}><b>{props.totalCount}</b></div>
      <div style={{ width: '20%', flexGrow: 1 }} />
      <div style={{ width: '20%', flexGrow: 1 }}>
        <b>{`${props.currency}${props.totalPrice.toFixed(2)}`}</b>
      </div>
      <div style={{ width: '20%', flexGrow: 1 }}>
        <button title="Remove All" onClick={props.onRemoveAll} style={{ cursor: 'pointer' }}>
          <svg className="svg-icon">
            <use xlinkHref="#remove-all" />
          </svg>
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state: IStore): IStateProps => {
  const { currency } = state.app;
  const { items, totalPrice, totalCount } = state.cart;
  return { items, totalPrice, totalCount, currency };
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  onRemoveAll: () => dispatch(clearCart()),
  onRemoveItem: (index: number) => () => dispatch(removeItem(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

import { connect } from 'react-redux';
import React from 'react';
import { Product } from '../store/ducks/app';
import { IStore } from '../store';
import { Dispatch } from 'redux';
import { addItem } from '../store/ducks/cart';

interface IStateProps {
  productList: Product[];
  currency: string;
}

interface IDispatchProps {
  onBuy: (product: Product) => () => void;
}

type IProductListProps = IStateProps & IDispatchProps;

// tslint:disable-next-line:function-name
function ProductList(props: IProductListProps) {
  const products = props.productList.map((product) => {
    return (
      <React.Fragment key={product.id}>
        <div style={{ width: '30%', flexGrow: 1 }}>{product.name}</div>
        <div style={{ width: '45%', flexGrow: 1 }}>{`${props.currency}${product.price}`}</div>
        <div style={{ width: '25%', flexGrow: 1 }}>
          <button title="Buy" onClick={props.onBuy(product)} style={{ cursor: 'pointer' }}>
            <svg className="svg-icon">
              <use xlinkHref="#buy" />
            </svg>
          </button>
        </div>
      </React.Fragment>
    );
  });
  return (
    <div style={{ flexWrap: 'wrap', display: 'flex', alignItems: 'center', padding: 0, margin: 0 }}>
      <div style={{ width: '30%', flexGrow: 1 }}><b>Product</b></div>
      <div style={{ width: '45%', flexGrow: 1 }}><b>Price</b></div>
      <div style={{ width: '25%', flexGrow: 1 }} />
      {products}
    </div>
  );
}

const mapStateToProps = (state: IStore): IStateProps => {
  const { productList, currency } = state.app;
  return { productList, currency };
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  onBuy: (product: Product) => () => dispatch(addItem(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

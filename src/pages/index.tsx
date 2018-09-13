import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import ProductList from '../containers/ProductList';
import CartInfo from '../containers/CartInfo';

export default () => {
  return (
    <div>
      <Head key="title">
        <title>Main</title>
      </Head>
      <div style={{ width: '100%', display: 'inline-block' }}>
        <Link href="/cart" as="/cart">
          <div style={{ float: 'right', cursor: 'pointer', pointerEvents: 'all' }}>
            <CartInfo />
          </div>
        </Link>
      </div>
      <ProductList />
    </div>
  );
};

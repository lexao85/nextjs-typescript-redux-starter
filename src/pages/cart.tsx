import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Cart from '../containers/Cart';
import CartInfo from '../containers/CartInfo';

export default () => (
  <>
    <Head key="title">
      <title>Edit your cart</title>
    </Head>
    <div><Link href="/" as="/"><a>Go to main</a></Link></div>
    <div style={{ width: '100%', display: 'inline-block' }}>
      <div style={{ float: 'right', cursor: 'pointer', pointerEvents: 'all' }}>
        <CartInfo />
      </div>
    </div>
    <div>
      <Cart />
    </div>
  </>
);

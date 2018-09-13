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
    <header>Edit cart</header>
    <div className="container">
      <main>
        <div><Link href="/" as="/"><a>Go to main</a></Link></div>
        <Cart />
      </main>
      <aside>
        <CartInfo />
      </aside>
    </div>
    <footer>{`©${new Date().getFullYear()}`}</footer>
  </>
);

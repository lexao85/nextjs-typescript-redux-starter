import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import ProductList from '../containers/ProductList';
import CartInfo from '../containers/CartInfo';

import cartInfoScss from '../styles/cartInfo.scss';

export default () => {
  return (
    <>
      <Head key="title">
        <title>Main</title>
      </Head>
      <Head key="cart_info">
        <style dangerouslySetInnerHTML={{ __html: cartInfoScss }} />
      </Head>
      <header>Buy products</header>
      <div className="container">
        <main>
          <ProductList />
        </main>
        <aside>
          <Link href="/cart" as="/cart">
            <div className="cartInfo" style={{ cursor: 'pointer', pointerEvents: 'all' }}>
              <CartInfo />
            </div>
          </Link>
        </aside>
      </div>
      <footer>{`©${new Date().getFullYear()}`}</footer>
    </>
  );
};

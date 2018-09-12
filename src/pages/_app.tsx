import nextReduxWrapper from 'next-redux-wrapper';
import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { initializeStore, IStore } from '../store';
import { setProducts } from '../store/ducks/app';

const makeStore = (initialState: IStore) => {
  return initializeStore(initialState);
};

class MyApp extends App {
  public static async getInitialProps(initialProps: any) {

    const { Component, ctx } = initialProps;

    if (ctx.isServer) {
      ctx.store.dispatch(setProducts([
        { id: 'uid-1', name: 'Product1', price: 4.95 },
        { id: 'uid-2', name: 'Product2', price: 10.85 },
        { id: 'uid-3', name: 'Product3', price: 20.98 },
        { id: 'uid-4', name: 'Product4', price: 13.75 },
        { id: 'uid-5', name: 'Product5', price: 0.85 },
      ]));
    }

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return { pageProps };

  }

  public render() {
    const { Component, pageProps, store } = (this as any).props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default nextReduxWrapper(makeStore)(MyApp);

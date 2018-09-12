// State and initial state

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface AppState {
  productList: Product[];
  currency: string;
}

const initialState: AppState = {
  productList: [],
  currency: '$',
};

// Actions

export enum TypeKeys {
  SET_PRODUCTS = 'nextjs-ts-starter/app/SET_PRODUCTS',
  SET_CURRENCY = 'nextjs-ts-starter/app/SET_CURRENCY',
}

export interface SetProductsAction {
  type: TypeKeys.SET_PRODUCTS;
  productList: Product[];
}

export interface SetCurrencyAction {
  type: TypeKeys.SET_CURRENCY;
  currency: string;
}

export type ActionTypes = SetProductsAction | SetCurrencyAction;

// reducer

export default function reducer(state: AppState = initialState, action: ActionTypes): AppState {
  switch (action.type) {
    case TypeKeys.SET_PRODUCTS: {
      return { ...state, productList: action.productList };
    }

    case TypeKeys.SET_CURRENCY: {
      return { ...state, currency: action.currency };
    }

    default: {
      return state;
    }
  }
}

// action creators

export const setProducts = (productList: Product[]): SetProductsAction => ({
  productList, type: TypeKeys.SET_PRODUCTS,
});

export const setCurrency = (currency: string): SetCurrencyAction => ({
  currency, type: TypeKeys.SET_CURRENCY,
});

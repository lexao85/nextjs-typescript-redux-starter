import { Product } from './app';

// State and initial state

export interface CartItem {
  product: Product;
  count: number;
  totalPrice: number;
}

export interface CartState {
  items: CartItem[];
  totalPrice: number;
  totalCount: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

// Actions

export enum TypeKeys {
  ADD_ITEM = 'nextjs-ts-starter/cart/ADD_ITEM',
  REMOVE_ITEM = 'nextjs-ts-starter/cart/REMOVE_ITEM',
  CLEAR_CART = 'nextjs-ts-starter/cart/CLEAR_CART',
}

export interface AddItemAction {
  type: TypeKeys.ADD_ITEM;
  product: Product;
}

export interface RemoveItemAction {
  type: TypeKeys.REMOVE_ITEM;
  index: number;
}

export interface ClearCartAction {
  type: TypeKeys.CLEAR_CART;
}

export type ActionTypes = AddItemAction | RemoveItemAction | ClearCartAction;

// reducer

export default function reducer(state: CartState = initialState, action: ActionTypes): CartState {
  switch (action.type) {
    case TypeKeys.CLEAR_CART: {
      return { ...state, items: [] };
    }

    case TypeKeys.REMOVE_ITEM: {
      const items = [...state.items];
      const removedItem = items.splice(action.index, 1);
      return {
        ...state,
        items,
        totalPrice: state.totalPrice - removedItem[0].product.price,
        totalCount: state.totalCount - removedItem[0].count,
      };
    }

    case TypeKeys.ADD_ITEM: {
      const items = [...state.items];
      const existedItem = items.find(el => el.product.id === action.product.id);
      if (existedItem) {
        existedItem.count += 1;
        existedItem.totalPrice += existedItem.product.price;
      } else {
        items.push({ product: action.product, count: 1, totalPrice: action.product.price });
      }
      return {
        ...state,
        items,
        totalPrice: state.totalPrice + action.product.price,
        totalCount: state.totalCount + 1,
      };
    }

    default: {
      return state;
    }
  }
}

// action creators

export const addItem = (product: Product): AddItemAction => ({
  product, type: TypeKeys.ADD_ITEM,
});

export const removeItem = (index: number): RemoveItemAction => ({
  index, type: TypeKeys.REMOVE_ITEM,
});

export const clearCart = (): ClearCartAction => ({
  type: TypeKeys.CLEAR_CART,
});

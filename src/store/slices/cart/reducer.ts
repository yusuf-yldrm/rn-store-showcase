import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartProductItem } from "../../../types/Product";
import { ICart, ICartState } from "./../../../types/Cart";

export const initialState = {
  cart: [],
};

export const CartData = createSlice({
  name: "cartData",
  initialState: initialState,
  reducers: {
    addNewItem: (state: ICart, action: PayloadAction<CartProductItem>) => {
      const { payload } = action;
      const index = state.cart.findIndex(
        (el) => el.product.title === payload.product.title
      );

      if (index > -1) {
        const newState = [...state.cart];
        newState[index] = {
          ...newState[index],
          quantity: payload.quantity + 1,
        };

        state.cart = newState;
      } else {
        state.cart = [
          ...state.cart,
          {
            product: payload.product,
            quantity: payload.quantity + 1,
          },
        ];
      }
    },
    decreaseQuantityItem: (state: ICart, action: PayloadAction<number>) => {
      const { payload } = action;
      const quantity = state.cart[payload].quantity;

      if (quantity == 0) {
        removeCartItem(payload);
      }

      const newState = state.cart;

      newState[payload] = {
        product: state.cart[payload].product,
        quantity: quantity > 0 ? quantity - 1 : 0,
      };

      state.cart = newState;
    },
    removeCartItem: (state: ICart, action: PayloadAction<number>) => {
      const { payload } = action;
      state.cart.splice(payload, 1);
    },
  },
});

export const { addNewItem, removeCartItem, decreaseQuantityItem } =
  CartData.actions;
export const cartStateData = (state: ICartState) => state.cart.cart;
export default CartData.reducer;

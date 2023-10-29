import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductItem } from "../../../types/Product";
import { ICart, ICartState } from "./../../../types/Cart";

export const initialState = {
  cart: [], //Initial state of the cart
};
//  imporIProduct

export const CartData = createSlice({
  name: "cartData",
  initialState: initialState,
  reducers: {
    addNewItem: (state: ICart, action: PayloadAction<ProductItem>) => {
      state.cart = [...state.cart, action.payload];
    },
    removeCartItem: (state: ICart, action: PayloadAction<number>) => {
      const { payload } = action;
      state.cart.splice(payload, 1);
    },
  },
});

export const { addNewItem, removeCartItem } = CartData.actions;
export const cardStateData = (state: ICartState) => state.cart.cart;
export default CartData.reducer;

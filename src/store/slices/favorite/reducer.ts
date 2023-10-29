import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFavorite, IFavoriteState } from "../../../types/Favorite";
import { ProductItem } from "../../../types/Product";

export const initialState = {
  favorite: [], //Initial state of the cart
};

export const FavoriteData = createSlice({
  name: "favoriteData",
  initialState: initialState,
  reducers: {
    addNewItem: (state: IFavorite, action: PayloadAction<ProductItem>) => {
      state.favorite = [...state.favorite, action.payload];
    },
    removeItem: (state: IFavorite, action: PayloadAction<number>) => {
      const { payload } = action;
      state.favorite.splice(payload, 1);
    },
  },
});

export const { addNewItem, removeItem } = FavoriteData.actions;
export const favoriteStateData = (state: IFavoriteState) =>
  state.favorite.favorite;
export default FavoriteData.reducer;
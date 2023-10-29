import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFavorite, IFavoriteState } from "../../../types/Favorite";
import { ProductItem } from "../../../types/Product";

export const initialState = {
  favorite: [],
};

export const FavoriteData = createSlice({
  name: "favoriteData",
  initialState: initialState,
  reducers: {
    addNewFavoriteItem: (
      state: IFavorite,
      action: PayloadAction<ProductItem>
    ) => {
      console.log(action.payload);
      state.favorite = [...state.favorite, action.payload];
    },
    removeFavoriteItem: (state: IFavorite, action: PayloadAction<number>) => {
      const { payload } = action;
      state.favorite.splice(payload, 1);
    },
  },
});

export const { addNewFavoriteItem, removeFavoriteItem } = FavoriteData.actions;
export const favoriteStateData = (state: IFavoriteState) =>
  state.favorite.favorite;
export default FavoriteData.reducer;

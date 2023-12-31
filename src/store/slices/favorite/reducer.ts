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
      state.favorite = [...state.favorite, action.payload];
    },
    removeFavoriteItem: (state: IFavorite, action: PayloadAction<number>) => {
      const { payload } = action;

      const filteredArray = state.favorite.filter(
        (item) => item.id !== payload
      );

      state.favorite = filteredArray;
    },
  },
});

export const { addNewFavoriteItem, removeFavoriteItem } = FavoriteData.actions;
export const favoriteStateData = (state: IFavoriteState) =>
  state.favorite.favorite;
export default FavoriteData.reducer;
